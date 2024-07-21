import React, { useEffect, useState } from "react";
import Nav from "./nav";
import { authGet } from "../utils/serverFetch";
import { useNavigate } from "react-router-dom";
import CreatePlaylist from "../pages/CreatePlaylist";
import Loader from "./loader/Loader";

export default function Library() {
  const [PlaylistModel, setPlaylistModel] = useState(false);
  const [loading, setLoading] = useState(false);

  const [myList, setmyList] = useState([]);

  useEffect(() => {
    getData("all");
  }, []);

  const getData = async (act) => {
    setLoading(true);

    try {
      const response = await authGet("/playlist/get/" + act);
      setmyList(response);
    } catch (error) {
      console.error("Error fetching playlist data:", error);
    } finally {
      setLoading(false);
    }
  };

  const PlaylistCard = ({ info, playlistId }) => {
    const navigate = useNavigate();
    return (
      <div
        className=" w-full   border-opacity-100 rounded-2xl m-8 flex  flex-col  items-center cursor-pointer  "
        onClick={() => {
          navigate("/playlist/view/" + playlistId);
        }}
      >
        <img
          alt="thumbnail"
          src={info.thumbnail}
          className="box1  w-[80%] h-[70%] mt-3 rounded-xl "
        ></img>
        <div className=" w-[80%] text-2xl m-4">{info.name} </div>
      </div>
    );
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

      <div className="w-screen h-screen bg-[#0f0f0f] flex">
        <Nav />

        <div className=" h-[100%] w-[100%]    text-white">
          <div className="flex w-[80%] ml-[10%] justify-around items-center  border-b-2">
            <div
              className="font-bold  hover:cursor-pointer text-center "
              onClick={() => {
                getData("byme");
              }}
            >
              My PlayList{" "}
            </div>

            <div
              className="font-bold text-3xl text-center hover:cursor-pointer m-5 ml-32"
              onClick={() => {
                getData("all");
              }}
            >
              PlayList
            </div>
            <div
              className="font-bold  text-center hover:cursor-pointer m-5"
              onClick={() => {
                setPlaylistModel(true);
              }}
            >
              Create PlayList
              <i class="fa-regular fa-add ml-3"></i>
            </div>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="w-full h-[88%] p-6 overflow-y-auto ">
                <div className=" w-[95%]   grid grid-cols-4 gap-4 ">
                  {myList.map((item) => (
                    <PlaylistCard
                      key={JSON.stringify(item)}
                      info={item}
                      playlistId={item._id}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
