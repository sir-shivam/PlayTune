// import React, { useContext, useState } from "react";
// import Nav from "../components/nav";
// import { authGet } from "../utils/serverFetch";
// import { SongCard } from "../components/SongCard";
// import SongContext from "../components/context";

// export default function Search() {
//   const [isFocus, setFocus] = useState(false);
//   const [searchText, setsearchText] = useState("");
//   const [songData, setSongData] = useState([]);
//   const { currentData, setCurrentData } = useContext(SongContext);

//   console.log(searchText);

//   const searchSong = async () => {
//     const reponse = await authGet("/song/get/name/" + searchText);
//     setSongData(reponse);
//     setCurrentData(reponse);
//     console.log();
//   };

//   return (
//     <div>
//       <div className="full w-screen h-screen bg-[#0f0f0f] flex">
//         <Nav />
//         <div className="w-[80vw] h-[100vh] text-white px-8  ">
//           <div className="h-28  ">
//             <div className="w-4/5 h-full flex justify-center items-center ml-24">
//               <div
//                 className={`w-[80%] h-[50%]  rounded-full bg-gray-800 flex pl-5 justify-center items-center ${
//                   isFocus ? "border border-white" : ""
//                 } `}
//               >
//                 <i
//                   class="fa fa-search text-white w-[10%] h- flex items-center justify-center text-2xl rounded-l-full "
//                   aria-hidden="true"
//                 ></i>
//                 <input
//                   type="text"
//                   placeholder="Search Song / Artist/ playlist ?"
//                   className="w-[90%] h-full pl-5  rounded-r-full bg-gray-800 flex focus:outline-none "
//                   onFocus={() => {
//                     setFocus(true);
//                   }}
//                   onBlur={() => {
//                     setFocus(false);
//                   }}
//                   value={searchText}
//                   onChange={(e) => {
//                     setsearchText(e.target.value);
//                   }}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter") {
//                       searchSong();
//                     }
//                   }}
//                 />
//               </div>
//             </div>
//           </div>
//           {songData.length > 0 ? (
//             <div className="space-y-3 overflow-auto">
//               <div className="  ">
//                 Showing Search Result for{" "}
//                 <span className="font-bold"> {searchText} </span>:
//               </div>
//               {songData.map((item) => {
//                 return (
//                   <SongCard
//                     info={item}
//                     key={JSON.stringify(item)}
//                     playSound={() => {}}
//                   />
//                 );
//               })}
//             </div>
//           ) : (
//             <div className="p-8 text-xl">
//               Nothing to Show : plrease try to modify search
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useContext, useState } from "react";
import Nav from "../components/nav";
import { authGet } from "../utils/serverFetch";
import { SongCard } from "../components/SongCard";
import SongContext from "../components/context";

export default function Search() {
  const [isFocus, setFocus] = useState(false);
  const [searchText, setsearchText] = useState("");
  const [songData, setSongData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [searchType, setSearchType] = useState("song"); // "song" or "people"
  const { currentData, setCurrentData } = useContext(SongContext);

  console.log(searchText);

  const search = async () => {
    if (searchType === "song") {
      const response = await authGet("/song/get/name/" + searchText);
      setSongData(response);
      setCurrentData(response);
    } else if (searchType === "people") {
      const response = await authGet("/song/get/name/" + searchText); // Adjust the endpoint as needed
      setUserData(response);
      setCurrentData(response);
    }
    console.log();
  };

  return (
    <div>
      <div className="full w-screen h-screen bg-[#0f0f0f] flex">
      <div className="hidden md:block">
      <Nav />
      </div>
      <div className="w-full  md:w-[80vw] border h-full">
      <div className=" md:hidden">
      <Nav />
      </div>
          <div className="h-28 flex justify-center items-center">
            <div className="w-4/5 flex justify-center items-center ml-24">
              <div
                className={`w-[80%] border h-[70%] rounded-full bg-gray-800 flex pl-5 justify-center items-center ${
                  isFocus ? "border border-white" : ""
                }`}
              >
                <i
                  className="fa fa-search text-white w-[10%] flex items-center justify-center text-2xl rounded-l-full"
                  aria-hidden="true"
                ></i>
                <input
                  type="text"
                  placeholder="Search Song / Artist / Playlist / User?"
                  className="w-[80%] h-full pl-5 rounded-r-full bg-gray-800 focus:outline-none"
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
                      search();
                    }
                  }}
                />
                <div className="w-[10%] flex justify-end pr-3">
                  <select
                    className="bg-gray-800 text-white rounded-full focus:outline-none"
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                  >
                    <option value="song">Songs</option>
                    <option value="people">People</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          {searchType === "song" && songData.length > 0 ? (
            <div className="space-y-3 overflow-auto">
              <div>
                Showing Search Result for <span className="font-bold">{searchText}</span>:
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
          ) : searchType === "people" && userData.length > 0 ? (
            <div className="space-y-3 overflow-auto">
              <div>
                Showing Search Result for <span className="font-bold">{searchText}</span>:
              </div>
              {userData.map((user) => (
                <div key={user._id} className="flex items-center p-2 bg-gray-800 rounded-md">
                  <div className="text-white">{user.name}</div>
                  <button className="ml-auto bg-blue-500 px-3 py-1 rounded-full text-white">
                    Send Friend Request
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-xl">
              Nothing to Show: Please try to modify your search
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
