import React, { useState } from 'react';
import { authPost } from '../utils/serverFetch';

export default function CreatePlaylist({ closeModel }) {
  const [playlistName, setPlaylistName] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const handlePlaylistNameChange = (event) => {
    setPlaylistName(event.target.value);
  };

  const handleThumbnailChange = (event) => {
    setThumbnail(event.target.value);
  };

  const createPlaylist = async () => {
    try {
      const response = await authPost('/playlist/create', {
        name: playlistName,
        thumbnail,
        songs: [], // Assuming songs will be added later
      });

      if (response.ok) {
        // Handle successful playlist creation (e.g., close modal, show success message)
        console.log('Playlist created successfully!');
      } else {
        // Handle error (e.g., display error message to user)
        const errorData = await response.json();
        console.error('Playlist creation failed:', errorData);
      }
    } catch (error) {
      // Handle unexpected errors (e.g., network issues)
      console.error('Error creating playlist:', error);
    }
  };

  return (
    <div
      className="absolute w-screen h-screen bg-[#0f0f0f] z-[4] bg-opacity-40 flex justify-center items-center"
      onClick={closeModel}
    >
      <div
        className="w-2/5 bg-[#d8e1e9] rounded-md flex flex-col h-2/4  p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center text-xl font-bold pb-4">Create Playlist</div>
        <div className="space-y-4 flex flex-col h-[80%]">
          <label className="mb-[-15px]">Playlist Name</label>
          <input
            type="text"
            placeholder="Playlist Name"
            className="h-12 pl-4 rounded-lg"
            value={playlistName}
            onChange={handlePlaylistNameChange} // Use onChange handler
          />

          <label className="mb-[-15px] h-12 flex pt-9">Thumbnail</label>
          <input
            type="text"
            placeholder="Thumbnail"
            className="h-12 pl-4 rounded-lg"
            value={thumbnail}
            onChange={handleThumbnailChange} // Use onChange handler
          />
        </div>
        <div
          className="bg-white w-1/3 rounded-lg flex font-bold justify-center h-[40px] items-center ml-[60%]"
          onClick={createPlaylist} // Call createPlaylist on click
        >
          Create
        </div>
      </div>
    </div>
  );
}
