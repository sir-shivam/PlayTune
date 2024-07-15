import React, { useContext, useEffect, useState } from "react";
import { SongCard } from "./SongCard";
import { Howl ,Howler } from "howler";
import Nav from "./nav";
import { authGet } from "../utils/serverFetch";
import SongContext from "./context";

export default function MySong() {
  const [songData, setSongData] = useState([]);
  const { currentData , setCurrentData   } = useContext(SongContext);

  const [soundPlayed , setsoundPlayed] = useState(null);
  

  useEffect(() => {
    const getData = async () => {
      const response = await authGet("/song/get/mylikedsongs");
      setSongData(response.likedSongs);
      setCurrentData(response.likedSongs);
      console.log(response);
    };
    getData();
  }, []);


  return (
    <div>
      <div className="full w-screen h-screen bg-[#0f0f0f] flex">
        <Nav />
        <div className="w-[80vw] h-[100vh]  p-8">
          <div className="text-lg font-semibold text-white pb-4 pl-2 ">
            My Songs
          </div>
          <div className="space-y-3 overflow-auto">
            {songData.map((item) => {
              return <SongCard info={item}  />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
