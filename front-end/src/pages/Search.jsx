import React, { useContext, useState, useEffect } from "react";
import Nav from "../components/nav";
import { authGet } from "../utils/serverFetch";
import { SongCard } from "../components/SongCard";
import SongContext from "../components/context";
import { sendRequest } from "./FriendReq";
import debounce from "lodash.debounce"; 
import Loader from "../components/loader/Loader";

export const getButtonText = (user, reqSent) => {
  let state = "Send Friend Request";
  reqSent.forEach((e) => {
    if (e.receiver === user._id) {
      if (e.status === "pending") {
        state = "Friend Request Already Sent";
      } else if (e.status === "accepted") {
        state = "Friend";
      } else if (e.status === "rejected") {
        state = "Rejected, Send Again";
      }
    } else if (user.friends.includes(e.sender)) {
      state = "Friend";
    }
  });
  return state;
};

export default function Search() {
  const [isFocus, setFocus] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [songData, setSongData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [reqSent, setReqSent] = useState([]);
  const [searchType, setSearchType] = useState("song");
  const [isLoading, setIsLoading] = useState(false);
  const { currentData, setCurrentData } = useContext(SongContext);

  useEffect(() => {
    if (searchText) {
      setIsLoading(true);
      debounceSearch(searchText);
    } else {
      setSongData([]);
      setUserData([]);
    }
  }, [searchText]);

  const search = async (query) => {
    try {
      if (searchType === "song") {
        const response1 = await authGet(`/song/get/name/${query}`);
        setSongData(response1);
        setCurrentData(response1);
      } else if (searchType === "people") {
        const response = await authGet(`/song/user/${query}`);
        setUserData(response);
      }
    } catch (error) {
      console.error("Error fetching search data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const debounceSearch = debounce((query) => search(query), 300);

  const checkRequest = async () => {
    try {
      const response = await authGet(`/request/checkrequest/byme`);
      setReqSent(response);
    } catch (error) {
      console.error("Error checking friend request:", error);
    }
  };

  return (
    <div className="h-screen bg-[#0f0f0f] text-white flex  overflow-hidden">
      <div className="hidden md:block">
        <Nav />
      </div>
      <div className="w-full md:w-[80vw] flex flex-col">
        <div className="md:hidden">
          <Nav />
        </div>
        <div className="h-28 flex justify-center items-center">
          <div className="w-4/5 h-full flex justify-center items-center">
            <div
              className={`w-full h-[50%] rounded-full bg-gray-800 flex items-center pl-5 ${
                isFocus ? "border border-white" : ""
              }`}
            >
              <i
                className="fa fa-search text-white w-[10%] text-2xl"
                aria-hidden="true"
              ></i>
              <input
                type="text"
                placeholder="Search Song / Artist / Playlist / User"
                className="w-[80%] h-full pl-5 rounded-r-full bg-gray-800 focus:outline-none"
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    search(searchText);
                    checkRequest();
                  }
                }}
              />
              <div className="w-[10%] flex justify-end pr-3">
                <select
                  className="bg-gray-800 text-white rounded-full focus:outline-none"
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                >
                  <option value="song">Songs</option>
                  <option value="people">People</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="px-8 py-4">
          <h2>
            Showing Search Result for <span className="font-bold">{searchText}</span>:
          </h2>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {searchType === "song" && songData.length > 0 ? (
              <div className="space-y-3   h-[77%] overflow-y-auto p-8">
                {songData.map((item) => (
                  <SongCard
                    info={item}
                    key={item._id}
                    playSound={() => {}}
                  />
                ))}
              </div>
            ) : searchType === "people" && userData.length > 0 ? (
              <div className="space-y-3 h-[77%] overflow-y-auto px-8">
                {userData.map((user) => (
                  <div
                    key={user._id}
                    className="flex items-center p-2 h-20 bg-gray-800 px-8 rounded-2xl hover:bg-gray-700"
                  >
                    <div className="text-white">{user.name}</div>
                    <button
                      className="ml-auto bg-blue-500 px-3 py-1 rounded-full  text-white hover:bg-blue-600 transition"
                      onClick={() => {
                        sendRequest(user);
                      }}
                    >
                      {getButtonText(user, reqSent)}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-xl">
                Nothing to Show: Please try to modify your search
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
