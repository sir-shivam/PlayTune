
import React, { useEffect, useState } from "react";
import { authGet } from "../utils/serverFetch";

import toast from "react-hot-toast";
import CombinePlaylists from "./partyMode";
import Nav from "../components/nav";
import { PlaylistCard } from "../components/Library";
import Loader from "../components/loader/Loader";

export default function PartyModePlaylists() {
  const [playlists, setPlaylists] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
   const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true);
    const fetchPartyModePlaylists = async () => {
      try {
        const data = await authGet("/playlist/party");
        setPlaylists(data);
      } catch (error) {
        console.error("Error fetching party mode playlists:", error);
        toast.error("Failed to fetch playlists");
      } finally{
        setLoading(false);
      }
    };
    fetchPartyModePlaylists();
  }, []);

  return (
    <div className="w-screen h-screen bg-[#0f0f0f] flex overflow-hidden">
    <div className=" hidden md:block">
    <Nav />
    </div>

      <div className=" h-[100%] w-[100%]     text-white">
      <div className=" md:hidden">
    <Nav />
    </div>
    <div className="flex justify-around items-center h-28 w-[80%] ml-[10%] border-b-2">
      <h1 className="text-2xl font-bold mb-4">Party Mode Playlists</h1>
      <button
        className="mb-4 p-2 bg-blue-500 text-white rounded-lg"
        onClick={() => setShowCreateModal(true)}
      >
        Create Party Mode Playlist
      </button>
      </div>
        
      {showCreateModal && (
        <CombinePlaylists closeModel={() => setShowCreateModal(false)} />
      )}
    {
        loading? <Loader /> :
    
      <div className="w-full max-w-4xl grid  grid-cols-2 md:grid-cols-3 gap-4">
        {playlists ? playlists.map((playlist) => (
                <PlaylistCard
                key={JSON.stringify(playlist)}
                info={playlist}
                playlistId={playlist._id}
              />
          
        )):
        <div className="font-bold text-white">No Party Mode Playlist </div>
    }
      </div>
}
    </div>
    </div>
  );
}

