import React, { useEffect, useState } from "react";
import Nav from "./nav";
import { authGet, authPost } from "../utils/serverFetch";
import { useNavigate } from "react-router-dom";
import CreatePlaylist from "../pages/CreatePlaylist";
import Loader from "./loader/Loader";

export const PlaylistCard = ({ info, playlistId }) => {
  const navigate = useNavigate();
  return (
    <div
      className="w-full border-opacity-80 bg-gray-400 bg-opacity-10 hover:bg-opacity-30 rounded-2xl m-8 flex flex-col items-center cursor-pointer pt-4 transition duration-300 transform hover:scale-105"
      onClick={() => {
        navigate("/playlist/view/" + playlistId);
      }}
    >
      <img
        alt="thumbnail"
        src={info.thumbnail}
        className="box1 w-[80%] h-[70%] mt-3 rounded-xl"
      />
      <div className="w-[80%] text-2xl m-4">{info.name}</div>
      <div className="text-white ml-[-10px]">
        Total Duration : {(info.totaltime).toFixed(2)} min
      </div>
    </div>
  );
};

export default function Library() {
  const [PlaylistModel, setPlaylistModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [myList, setmyList] = useState([]);
  const [activeTab, setActiveTab] = useState("all"); // default tab

  useEffect(() => {
    getData(activeTab);
  }, [activeTab]);

  const getData = async (act) => {
    setLoading(true);
    try {
      const response = await authGet("/playlist/get/" + act);
      setmyList(response);
      response.map((item) => {
        item.name === "Liked Songs" ? letupdate(item) : console.log("hello");
      });
    } catch (error) {
      console.error("Error fetching playlist data:", error);
    } finally {
      setLoading(false);
    }
  };

  const letupdate = async (item) => {
    const updation = async () => {
      const res = await authGet("/song/get/mylikedsongs");
      item.songs = res.likedSongs;
      let playlistId = item._id;
      let allsongs = res.likedSongs;
      let totaltime = 0;
      item.songs.forEach((element) => {
        totaltime += element.time;
      });
      const res1 = await authPost("/playlist/updatetime", {
        totaltime,
        playlistId,
        allsongs,
      });
      console.log(item._id);
    };
    updation();
  };

  return (
    <div>
      {PlaylistModel && (
        <CreatePlaylist
          closeModel={() => {
            setPlaylistModel(false);
          }}
        />
      )}

      <div className="w-screen h-screen bg-[#0f0f0f] flex overflow-hidden">
        <div className="hidden md:block">
          <Nav />
        </div>

        <div className="h-[100%] w-[100%] text-white">
          <div className="md:hidden">
            <Nav />
          </div>
          <div className="flex w-[80%] ml-[10%] justify-around items-center border-b-2">
            <div
              className={`font-bold text-center cursor-pointer transition-all duration-300 ${
                activeTab === "byme" ? "text-3xl" : "text-lg"
              }`}
              onClick={() => setActiveTab("byme")}
            >
              My Playlist
            </div>

            <div
              className={`font-bold text-center cursor-pointer transition-all duration-300 m-5 ml-32 ${
                activeTab === "all" ? "text-3xl" : "text-lg"
              }`}
              onClick={() => setActiveTab("all")}
            >
              Playlist
            </div>

            <div
              className={`font-bold text-center cursor-pointer transition-all duration-300 m-5 ${
                activeTab === "create" ? "text-3xl" : "text-lg"
              }`}
              onClick={() => {
                setPlaylistModel(true);
                setActiveTab("create");
              }}
            >
              Create Playlist
              <i className="fa-regular fa-add ml-3"></i>
            </div>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <div className="w-full h-[72%]  md:h-[88%] md:p-6 overflow-y-auto">
              <div className="w-[90%] md:w-[95%] grid grid-cols-2 md:grid-cols-4 gap-4">
                {myList.map((item) => (
                  <PlaylistCard
                    key={JSON.stringify(item)}
                    info={item}
                    playlistId={item._id}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
