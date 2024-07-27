import React, { useContext, useEffect, useState } from "react";
import { SongCard } from "./SongCard";
import Nav from "./nav";
import { authGet } from "../utils/serverFetch";
import SongContext from "./context";
import Loader from "./loader/Loader";

export default function MySong() {
  const [songData, setSongData] = useState([]);
  const { currentData, setCurrentData } = useContext(SongContext);

  const [soundPlayed, setsoundPlayed] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await authGet("/song/get/mylikedsongs");
        setSongData(response.likedSongs);
        setCurrentData(response.likedSongs);
        console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <div>
      <div className="full w-screen h-screen bg-[#0f0f0f] flex ">
      <div className="hidden md:block">
      <Nav />
      </div>
      <div className="w-full  md:w-[80vw]  h-full md:p-8">
      <div className=" md:hidden">
      <Nav />
      </div>
          <div className="text-lg font-semibold text-white pb-4 pl-2 ">
            My Songs
          </div>

          {loading ? <Loader /> :
          
          
          <div className="space-y-3 h-[95%] overflow-auto ">{
            songData.length==0 ? (<div className="text-white h-28 font-bold text-2xl flex justify-center items-center " > No Liked Songs </div>):(
            songData.map((item) => {
              return <SongCard info={item} />
            }))
}</div>
}


        </div>
      </div>
    </div>
  );
}
