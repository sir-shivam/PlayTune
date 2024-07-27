import React, { useState } from "react";
import Nav from "./nav";
import CloudinaryUpload from "./upload";
import { authPost } from "../utils/serverFetch";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function SongUpload() {
  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [playUrl, setPlayUrl] = useState("");
  const [songName, setSongname] = useState();
  const navigate = useNavigate();



  const submitSong = async () => {
    try {
      const data = { name, thumbnail, track: playUrl };
      const response = await authPost("/song/create", data);
      if (response.err) {
        toast.success("Could not upload");
      } else {
        toast.success("Success");
        navigate("/home");
      }
    } catch (error) {
      console.error("Error uploading song:", error);
      toast.error("An error occurred while uploading the song");
    }
  };
  

  return (
    <div className="w-full h-screen bg-[#0f0f0f] flex flex-col md:flex-row">
  <div className="hidden md:block">
    <Nav />
  </div>
  <div className="w-full md:w-[80vw] h-full flex flex-col items-center justify-center p-4">
    <div className="md:hidden">
      <Nav />
    </div>
    <div className="border-2 border-gray-300 p-8 rounded-lg w-[90%] md:w-[60%]">
      <h1 className="text-center text-white text-2xl mb-8">Upload Song</h1>
      <input
        className="box1 border w-[330px] h-[50px] text-black bg-gray-300 placeholder-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-8"
        placeholder="Song Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="box1 border w-[330px] h-[50px] text-black bg-gray-300 placeholder-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-8"
        placeholder="Thumbnail URL"
        type="text"
        value={thumbnail}
        onChange={(e) => setThumbnail(e.target.value)}
      />
      <div className="w-full flex  mb-8">
        {songName ? (
          <div className="bg-white w-5/6 rounded-lg p-2 text-center ">
            {songName.substring(0, 20)}...
          </div>
        ) : (
          <CloudinaryUpload setUrl={setPlayUrl} setName={setSongname} />
        )}
      </div>
      <div
        className="bg-blue-500 text-white w-[120px] h-[50px] flex items-center justify-center rounded-md cursor-pointer hover:bg-blue-600 transition duration-300"
        onClick={submitSong}
      >
        Submit Song
      </div>
    </div>
  </div>
</div>

  
      );
}
