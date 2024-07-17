import React, { useContext, useEffect, useState } from "react";
import Nav from "./nav";
import { authGet } from "../utils/serverFetch";
import { SongCard } from "./SongCard";
import SongContext from "./context";

export default function View() {
  const { currentData, setCurrentData } = useContext(SongContext);

  const [allSong, setAllSong] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await authGet("/song/get/all");

      setAllSong(data);
      setCurrentData(data);
    };
    getData();
  }, []);

  return (
    <div>
      <div className="full w-screen h-screen bg-[#0f0f0f] flex">
        <Nav />
        <div className="h-[90%] w-[90%] mt-2">
          <div className="h-[8%] text-white w-[80%] ml-[10%] flex justify-center items-center  text-3xl border-b-[1px] mb-4">
            Available Songs
          </div>
          <div className=" h-[95%] overflow-auto px-16  ">
            {allSong.map((item) => {
              return <SongCard info={item} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
