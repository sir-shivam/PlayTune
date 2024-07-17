import React, { useContext, useState } from "react";
import Nav from "../components/nav";
import { authGet } from "../utils/serverFetch";
import { SongCard } from "../components/SongCard";
import SongContext from "../components/context";

export default function Search() {
  const [isFocus, setFocus] = useState(false);
  const [searchText, setsearchText] = useState("");
  const [songData, setSongData] = useState([]);
  const { currentData, setCurrentData } = useContext(SongContext);

  console.log(searchText);

  const searchSong = async () => {
    const reponse = await authGet("/song/get/name/" + searchText);
    setSongData(reponse);
    setCurrentData(reponse);
    console.log();

    //  setsearchText("");
  };

  return (
    <div>
      <div className="full w-screen h-screen bg-[#0f0f0f] flex">
        <Nav />
        <div className="w-[80vw] h-[100vh] text-white px-8  ">
          <div className="h-28  ">
            <div className="w-4/5 h-full flex justify-center items-center ml-24">
              <div
                className={`w-[80%] h-[50%]  rounded-full bg-gray-800 flex pl-5 justify-center items-center ${
                  isFocus ? "border border-white" : ""
                } `}
              >
                <i
                  class="fa fa-search text-white w-[10%] h- flex items-center justify-center text-2xl rounded-l-full "
                  aria-hidden="true"
                ></i>
                <input
                  type="text"
                  placeholder="Search Song / Artist/ playlist ?"
                  className="w-[90%] h-full pl-5  rounded-r-full bg-gray-800 flex focus:outline-none "
                  onFocus={() => {
                    setFocus(true);
                  }}
                  onBlur={() => {
                    setFocus(false);
                  }}
                  value={searchText}
                  onChange={(e) => {
                    setsearchText(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      searchSong();
                    }
                  }}
                />
              </div>
            </div>
          </div>
          {songData.length > 0 ? (
            <div className="space-y-3 overflow-auto">
              <div className="  ">
                Showing Search Result for{" "}
                <span className="font-bold"> {searchText} </span>:
              </div>
              {songData.map((item) => {
                return (
                  <SongCard
                    info={item}
                    key={JSON.stringify(item)}
                    playSound={() => {}}
                  />
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-xl">
              Nothing to Show : plrease try to modify search
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
