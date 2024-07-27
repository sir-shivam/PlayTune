import React, { useEffect, useState } from "react";
import SongContext from "./context";
import Streaming from "./Streaming";
import { authGet } from "../utils/serverFetch";

function NoteState({ children }) {
  const [songInfo, setSongInfo] = useState({});
  const [currentData, setCurrentData] = useState({});
  const [Songclicked, setSongclicked] = useState(null);
  const [code , setcode] = useState(null);
  const [detail , setdetail] = useState({});
  const [currentUser , setCurrentUser] = useState({});
  const [isMinimized, setIsMinimized] = useState(false);





  return (
    <SongContext.Provider
      value={{
        songInfo,
        setSongInfo,
        currentData,
        setCurrentData,
        Songclicked,
        setSongclicked,
        code , 
        setcode,
        detail , 
        setdetail,
        currentUser , 
        setCurrentUser,
        isMinimized,
        setIsMinimized
      }}
    >
      {songInfo.name ? <Streaming /> : ""}

      {children}
    </SongContext.Provider>
  );
}

export default NoteState;
