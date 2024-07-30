import React, { useContext, useEffect, useState } from "react";
import Nav from "../components/nav";
import { useParams } from "react-router-dom";
import { authGet, authPost } from "../utils/serverFetch";
import { SongCard } from "../components/SongCard";
import SongContext from "../components/context";
import Loader from "../components/loader/Loader";

export default function SinglePlaylist() {
  const [listDetail, setlistDetail] = useState({});
  const { currentData, setCurrentData } = useContext(SongContext);
  const [loading, setLoading] = useState(false);

  const { playlistId } = useParams();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      try {
        const response = await authGet("/playlist/get/list/" + playlistId);
        console.log(response);

      
        setlistDetail(response);
        setCurrentData(response.songs);
      
      } catch (error) {
        console.error("Error fetching playlist data:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [playlistId]);

  

  return (
    <div>
      <div className="full w-screen h-screen   bg-[#0f0f0f] md:flex overflow-hidden ">
        <Nav />
        <div>
        <div className="h-[8%] text-white w-[80%] ml-[10%] flex justify-center items-center  text-3xl border-b-[1px] mt-2 mb-4">
                    Playlist : {listDetail.name}{" "}
          </div>
        <div className="md:w-[80vw] w-full h-[65vh]  md:h-[85vh]   md:mt-8 mt-2 text-white  p-12  overflow-auto">
          
          {loading ? (
            <Loader />
          ) : (
            <>
              {listDetail._id && (
                <div>
                  
                  <div className="space-y-3 md:h-[80%]    ">
                    {listDetail.songs.map((item) => {
                      return (
                        <SongCard
                          info={item}
                          key={JSON.stringify(item)}
                          playSound={() => {}}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}
