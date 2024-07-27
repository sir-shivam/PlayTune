import React, { useEffect, useState } from "react";
import { authGet, authPost } from "../utils/serverFetch";
import CreatePlaylist from "../pages/CreatePlaylist";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

export default function CombinePlaylists({ closeModel }) {
  const [playlists, setPlaylists] = useState([]);
  const [playlist1Id, setPlaylist1Id] = useState("");
  const [playlist2Id, setPlaylist2Id] = useState("");
  const [temporaryPlaylist, setTemporaryPlaylist] = useState(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const data = await authGet("/playlist/view");
        setPlaylists(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };
    fetchPlaylists();
  }, []);

  const handleCreateTemporaryPlaylist = async () => {
    if(playlist1Id == playlist2Id){
        return toast.error("Select Unique Playlists");
    }
    try {
      const response = await authPost("/playlist/party/mode", {
        playlistId1: playlist1Id,
        playlistId2: playlist2Id,
      });
      setTemporaryPlaylist(response);
      toast.success("Party Mode Playlist Created");
    } catch (error) {
      console.error("Error creating temporary playlist:", error);
    }
  };

  return (
    <div
      className="absolute w-screen h-screen bg-[#0f0f0f] z-[4] bg-opacity-40 flex justify-center items-center text-black"
      onClick={closeModel}
    >
      <div
        className="w-1/4 bg-[#d8e1e9] rounded-md flex flex-col h-2/4 p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center text-xl font-bold pb-4 border-b-2 border-black">
          Combine Playlists
        </div>
        <div className="space-y-4 flex flex-col h-[80%] overflow-y-auto">
          <div className="flex flex-col">
            <label htmlFor="playlist1" className="font-semibold">Select First Playlist</label>
            <select
              id="playlist1"
              value={playlist1Id}
              onChange={(e) => setPlaylist1Id(e.target.value)}
              className="p-2 rounded-md border border-black "
            >
              <option value="" disabled>Select a playlist</option>
              {playlists.map((playlist) => (
                <option key={playlist._id} value={playlist._id}>
                  {playlist.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="playlist2" className="font-semibold">Select Second Playlist</label>
            <select
              id="playlist2"
              value={playlist2Id}
              onChange={(e) => setPlaylist2Id(e.target.value)}
              className="p-2 rounded-md border border-black"
            >
              <option value="" disabled>Select a playlist</option>
              {playlists.map((playlist) => (
                <option key={playlist._id} value={playlist._id}>
                  {playlist.name}
                </option>
              ))}
            </select>
          </div>
          <div
            className="w-full h-10 border border-black flex justify-center items-center font-bold rounded-xl hover:cursor-pointer mt-5"
            onClick={handleCreateTemporaryPlaylist}
          >
            Create Temporary Playlist
          </div>
        </div>
      </div>
    </div>
  );
}
