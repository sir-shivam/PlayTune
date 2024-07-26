import React, { useContext, useEffect, useRef, useState } from "react";
import SongContext from "./context";
import AddtoPlaylist from "../pages/AddtoPlaylist";
import { authPost } from "../utils/serverFetch";
import LikeIcon from "../pages/LikeSong";

export default function Streaming() {
  const [addtolist, setAddtolist] = useState(false);
  const { songInfo, setSongInfo } = useContext(SongContext);
  const { currentData } = useContext(SongContext);
  const [soundPlayed, setSoundPlayed] = useState(null);
  const [isPaused, setPause] = useState(true);
  const [duration, setDuration] = useState(0);
  const [time, setTime] = useState(0);

  const progressBarRef = useRef(null);

  useEffect(() => {
    if (!songInfo) return;
    changeSound(songInfo.track);
  }, [songInfo]);

  const changeSound = (songsrc) => {
    if (soundPlayed) {
      soundPlayed.pause();
    }

    const sound = new Audio(songsrc);
    sound.onended = playNext;

    sound.addEventListener("canplay", () => {
      setDuration((sound.duration / 60).toFixed(2));
    });

    sound.addEventListener("timeupdate", () => {
      if (progressBarRef.current) {
        const progress = (sound.currentTime / sound.duration) * 100;
        progressBarRef.current.value = progress;
      }
      setTime((sound.currentTime / 60).toFixed(2));
    });

    setSoundPlayed(sound);
    sound.play();
    setPause(false);
  };

  const togglePlay = () => {
    if (!soundPlayed) return;

    if (isPaused) {
      soundPlayed.play();
    } else {
      soundPlayed.pause();
    }
    setPause(!isPaused);
  };

  const playNext = () => {
    const currentIndex = currentData.findIndex(
      (item) => item._id === songInfo._id
    );
    if (currentIndex !== -1 && currentIndex + 1 < currentData.length) {
      setSongInfo(currentData[currentIndex + 1]);
    }
  };

  const playPrevious = () => {
    const currentIndex = currentData.findIndex(
      (item) => item._id === songInfo._id
    );
    if (currentIndex !== -1 && currentIndex > 0) {
      setSongInfo(currentData[currentIndex - 1]);
    }
  };

  const progressChange = (e) => {
    if (soundPlayed) {
      const newTime = (e.target.value * soundPlayed.duration) / 100;
      soundPlayed.currentTime = newTime;
    }
  };

  const addTolist1 = async (playlistId) => {
    const response = await authPost("/playlist/add/song", {
      playlistId,
      songId: songInfo._id,
    });
    if (response._id) {
      setAddtolist(false);
    }
  };

  return (
    <div>
      {addtolist && (
        <AddtoPlaylist
          closeModel={() => setAddtolist(false)}
          addTolist1={addTolist1}
        />
      )}

      <div className="streaming w-[80vw] ml-[10%]  md:w-[48vw] h-[18vh] bg-gradient-to-br from-[#c81d77] to-[#6710c2] fixed bottom-6 md:ml-[35vw] rounded-3xl flex items-center p-4 shadow-lg">
        <div className="circle w-[140px] h-[140px] rounded-full bg-gradient-to-tr from-[#a11313] flex-shrink-0 border-4 border-white overflow-hidden">
          <img
            alt="thumbnail"
            className="w-full h-full object-cover"
            src={songInfo.thumbnail}
          />
        </div>
        <div className="w-full ml-4 flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <div className="text-3xl font-semibold">{songInfo.name}</div>
              <div className="text-gray-400">
                {songInfo.artist ? songInfo.artist.name : songInfo.creator}
              </div>
            </div>
            <div className="flex items-center text-3xl ">
              <LikeIcon info={songInfo} size={"4xl"} />
              <i
                className="fa-solid fa-plus text-4xl hover:cursor-pointer hover:text-white mx-2"
                onClick={() => setAddtolist(true)}
              ></i>
            </div>
          </div>
          <div className="flex items-center mt-2">
            <span>{time}</span>
            <input
              id="progressBar"
              ref={progressBarRef}
              type="range"
              min="0"
              max="100"
              className="w-full mx-2"
              onChange={progressChange}
            />
            <span>{duration}</span>
          </div>
          <div className="flex justify-around items-center text-3xl mt-2">
            <i
              className="fa-solid fa-backward-step hover:cursor-pointer"
              onClick={playPrevious}
            ></i>
            <div
              onClick={togglePlay}
              className="w-10 h-10 hover:bg-slate-700 rounded-full flex justify-center items-center"
            >
              {isPaused ? (
                <i className="fa-solid fa-play ml-1"></i>
              ) : (
                <i className="fa-solid fa-pause"></i>
              )}
            </div>
            <i
              className="fa-solid fa-forward-step hover:cursor-pointer"
              onClick={playNext}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
}
