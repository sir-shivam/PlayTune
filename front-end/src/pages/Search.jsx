import React, { useContext, useState } from "react";
import Nav from "../components/nav";
import { authGet } from "../utils/serverFetch";
import { SongCard } from "../components/SongCard";
import SongContext from "../components/context";
import { sendRequest } from "./FriendReq";




export const getButtonText = (user , reqSent) => {
  let state = "Send Friend Request";
  reqSent.forEach((e)=>{
  console.log(e.sender);

    if(e.receiver === user._id){

    if (e.status === "pending") {
      state ="Friend Request Already Sent"
      
    }
    if (e.status === "accepted") {
      state = "Friend";
      
    }
    if (e.status === "rejected") {
      state = "Rejected, Send Again";
      
    }
    
  }
  else if((user.friends).includes(e.sender)){
    state = "Friend";
  }
  })

  return state;
  
};

export default function Search() {
  const [isFocus, setFocus] = useState(false);
  const [searchText, setsearchText] = useState("");
  const [songData, setSongData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [reqSent, setreqSent] = useState([]);
  const [searchType, setSearchType] = useState("song"); // "song" or "people"
  const { currentData, setCurrentData } = useContext(SongContext);

  console.log(searchText);

  const search = async () => {
   
      const response1 = await authGet("/song/get/name/" + searchText);
      setSongData(response1);
      setCurrentData(response1);

   
      const response = await authGet("/song/user/" + searchText); 
      setUserData(response);
    console.log(response);

    
  };



  const checkRequest = async () => {
    try {
      const response = await authGet(`/request/checkrequest/byme`);
      console.log(response);
      setreqSent(response);

    } catch (error) {
      console.error('Error checking friend request:', error);
      
    }
  };

  

  return (
    <div>
      <div className="full w-screen h-screen bg-[#0f0f0f] flex text-white">
      <div className="hidden md:block">
      <Nav />
      </div>
      <div className="w-full  md:w-[80vw]  h-full">
      <div className=" md:hidden">
      <Nav />
      </div>
          <div className="h-28 flex justify-center items-center">
            <div className="w-4/5 h-full   flex justify-center items-center ml-[-5%] md:ml-16">
              <div
                className={`w-[80%]  h-[50%] rounded-full bg-gray-800 flex  pl-5 justify-center items-center ${
                  isFocus ? "border border-white" : ""
                }`}
              >
                <i
                  className="fa fa-search text-white w-[10%] flex items-center justify-center text-2xl rounded-l-full"
                  aria-hidden="true"
                ></i>
                <input
                  type="text"
                  placeholder="Search Song / Artist / Playlist / User?"
                  className="w-[80%] h-full pl-5 rounded-r-full bg-gray-800 focus:outline-none"
                  onFocus={() => {
                    setFocus(true);
                  }}
                  onBlur={() => {
                    setFocus(false);
                  }}
                  value={searchText}
                  onChange={(e) => {
                    setsearchText(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      search();
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
          <div>
                Showing Search Result for <span className="font-bold">{searchText}</span>:
              </div>
          {searchType === "song" && songData.length > 0 ? (
            <div className="space-y-3 h-[82%] overflow-y-auto p-8">
              
              {songData.map((item) => {
                return (
                  <SongCard
                    info={item}
                    key={JSON.stringify(item)}
                    playSound={() => {}}
                  />
                );
              })}
            </div>
          ) : searchType === "people" && userData.length > 0 ? (
            <div className="space-y-3 h-[82%] overflow-y-auto">
              
              {userData.map((user) => (
                <div key={user._id} className="flex hover:bg-opacity-45 px-8 w-5/6 h-[80px] items-center p-2 bg-gray-800 rounded-2xl ml-[8%]">
                  <div className="text-white ">{user.name}</div>
                  <button className="ml-auto bg-blue-500 px-3 py-1 rounded-full text-white" 
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
        </div>
      </div>
    </div>
  );
}


