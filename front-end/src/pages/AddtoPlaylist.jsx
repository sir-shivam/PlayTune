import React, { useEffect, useState } from "react";
import { authGet } from "../utils/serverFetch";

export default function AddtoPlaylist({ closeModel, addTolist1 }) {
  const [playlistName, setPlaylistName] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const handlePlaylistNameChange = (event) => {
    setPlaylistName(event.target.value);
  };

  const handleThumbnailChange = (event) => {
    setThumbnail(event.target.value);
  };

  const [myList, setmyList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await authGet("/playlist/get/byme");

      setmyList(data);
    };
    getData();
  }, []);

  const ListComponent = ({ info, addTolist1 }) => {
    return (
      <div
        className="bg-black flex w-full items-center  hover:bg-gray-500 hover:bg-opacity-35 rounded-lg "
        onClick={() => {
          addTolist1(info._id);
        }}
      >
        <div>
          <img
            alt="thumbnail"
            src={info.thumbnail}
            className="h-10 w-10 rounded"
          ></img>
        </div>
        <div className="text-white font-semibold">
          <div>{info.name} </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="absolute w-screen h-screen bg-[#0f0f0f] z-[4] bg-opacity-40 flex justify-center items-center"
      onClick={closeModel}
    >
      <div
        className="w-2/5 bg-[#d8e1e9] rounded-md flex flex-col h-2/4  p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center text-xl font-bold pb-4">
          Select Playlist
        </div>
        <div className="space-y-4 flex flex-col h-[80%] overflow-y-auto  ">
          {myList.map((item) => {
            return (
              <ListComponent
                key={JSON.stringify(item)}
                info={item}
                addTolist1={addTolist1}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
