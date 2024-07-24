import React, { useState } from "react";
import Nav from "./nav";
import CloudinaryUpload from "./upload";
import { authPost } from "../utils/serverFetch";
import { useNavigate } from "react-router-dom";

export default function SongUpload() {
  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [playUrl, setPlayUrl] = useState("");
  const [songName, setSongname] = useState();
  const navigate = useNavigate();



  const submitSong = async () => {
    const data = { name, thumbnail, track: playUrl };
    const response = await authPost("/song/create", data);
    if (response.err) {
      alert("couldnot upload");
    }
    alert("success");
    navigate("/home");
  };

  return (
    <div className="full w-screen h-screen bg-[#0f0f0f] flex">
      <Nav />
      <div>
        <input
          className="box1 border w-[330px] h-[50px] text-black bg-gray-600 "
          placeholder="song"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="box1  w-[330px] h-[50px]  text-black border-red-400 border "
          placeholder="song"
          type="text"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
        />

        <div>
          {songName ? (
            <div className="bg-white w-5/6 rounded-lg ">
              {songName.substring(0, 20)}...
            </div>
          ) : (
            <CloudinaryUpload setUrl={setPlayUrl} setName={setSongname} />
          )}
        </div>
        <div className="bg-white w-20 h-20 cursor-pointer  " onClick={submitSong}>
          Submit song
        </div>
      </div>
    </div>
  );
}
