import React, { useContext, useState } from "react";
import SongContext from "./context";
import NoteState from "./noteState";

export let player = false;

export function SongCard({info, playSound}) {
   const {soundPlayed , setsoundPlayed} = useState();

  const { songInfo, setSongInfo} = useContext(SongContext);
  console.log(songInfo );
  
  


  return (
    <div className="flex h-[4rem] hover:bg-gray-500 hover:bg-opacity-35   p-2 rounded-md  " onClick={()=> { setSongInfo(info) }} >
      <div
        className="w-12    bg-cover bg  "
        style={{
          backgroundImage: `url(${info.thumbnail})`,
        }}
      ></div>

      <div className="flex  w-full pr-5">
        <div className="text-white flex flex-col  justify-center pl-4 w-5/6  ">
          <div className="cursor-pointer hover:underline  ">
            {info.name}
          </div>
          <div className="text-x text-gray-400 cursor-pointer hover:underline  ">
            {info.artist.name}
          </div>
        </div>
        <div className="w-1/6 text-gray-400   flex justify-end items-center ">
          3:55
        </div>
      </div>
    </div>
  );
}
