import React, { useState } from "react";
import SongContext from "./context"; 

function NoteState({ children }) { 

  const [songInfo, setSongInfo , ] = useState({}); 


  return (
    <SongContext.Provider value={{ songInfo, setSongInfo }}>
      {children}
    </SongContext.Provider>
  );
}

export default NoteState;
