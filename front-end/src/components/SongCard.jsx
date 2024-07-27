import React, { useContext, useLayoutEffect, useState } from "react";
import SongContext from "./context";
import LikeIcon from "../pages/LikeSong";

export let player = false;

export function SongCard({ info, playSound }) {
  const { songInfo, setSongInfo } = useContext(SongContext);
  const { Songclicked, setSongclicked } = useContext(SongContext);
  const [total, setTotal] = useState("3:55");
  let sound1;

  useLayoutEffect(() => {
    sound1 = new Audio(info.track, { preload: "metadata" });

    sound1.addEventListener("canplay", () => {
      setTotal((sound1.duration / 60).toFixed(2));
    });
  }, [info.track]);

  return (
    <div
      className="flex h-[6rem] hover:bg-gray-500 hover:bg-opacity-35 pl-4  p-2  rounded-md"
      onClick={() => {
        setSongInfo(info);
        setSongclicked(sound1);
      }}
    >
      <div
        className="w-20 rounded-lg bg-cover"
        style={{ backgroundImage: `url(${info.thumbnail})` }}
      ></div>

      <div className="flex w-full pr-5">
        <div className="text-white flex flex-col justify-center pl-8 w-5/6">
          <div className="cursor-pointer hover:underline text-lg md:text-2xl">
            {info.name}
          </div>
          <div className="hidden md:block text-sm md:text-xl text-gray-400 cursor-pointer hover:underline">
            {info.artist ? info.artist.name : info.creator}
          </div>
        </div>
        <div className="w-2/6 text-gray-400 flex justify-around items-center">
          <div className="flex justify-center items-center">
            <div>{info.likes.length}</div>
            <LikeIcon info={info} text="2xl" />
          </div>
          <div>{total}</div>
        </div>
      </div>
    </div>
  );
}

