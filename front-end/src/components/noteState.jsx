import React, { useState } from "react";
import SongContext from "./context";
import Streaming from "./Streaming";

function NoteState({ children }) {
  const [songInfo, setSongInfo] = useState({});
  const [currentData, setCurrentData] = useState({});
  const [Songclicked, setSongclicked] = useState(null);
  const [code , setcode] = useState(null);
  const [detail , setdetail] = useState({});




  console.log(songInfo);

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
      }}
    >
      {songInfo.name ? <Streaming /> : ""}

      {children}
    </SongContext.Provider>
  );
}

export default NoteState;
