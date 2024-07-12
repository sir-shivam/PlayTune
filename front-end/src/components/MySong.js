import React, { useEffect, useState } from "react";
import { SongCard } from "./SongCard";
import { Howl ,Howler } from "howler";
import Nav from "./nav";
import { authGet } from "../utils/serverFetch";

export default function MySong() {
  const [songData, setSongData] = useState([]);
  const [soundPlayed , setsoundPlayed] = useState(null);

  const playSound= (songsrc)=> {
    if(soundPlayed){
      soundPlayed.stop();
    }

    let sound = new Howl({
      src: [songsrc],
      html5:true,
    });
    setsoundPlayed(sound);
    sound.play();
  }


  useEffect(() => {
    const getData = async () => {
      const response = await authGet("/song/get/mysongs");
      setSongData(response);
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
              return <SongCard info={item} playSound={playSound} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
