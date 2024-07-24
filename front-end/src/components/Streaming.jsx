import React, { useContext, useLayoutEffect, useRef, useState } from "react";
import SongContext from "./context";
import AddtoPlaylist from "../pages/AddtoPlaylist";
import { authPost } from "../utils/serverFetch";
import LikeIcon from "../pages/LikeSong";

let played;

export default function Streaming() {
  let progressBar;
  let wavesurfer;

  const [addtolist, setAddtolist] = useState(false);

  const { songInfo, setSongInfo } = useContext(SongContext);
  const { currentData, setCurrentData } = useContext(SongContext);
  const { Songclicked, setSongclicked } = useContext(SongContext);

  console.log(songInfo);
  const [soundPlayed, setsoundPlayed] = useState(null);
  const [isPaused, setPause] = useState(true);
  const [duration, setduration] = useState(0);
  const [time, setTime] = useState(0);
  let status = "play";

  const first = useRef(true);

  useLayoutEffect(() => {
    if (!songInfo) {
      return;
    }
    changeSound(songInfo.track);
  }, [songInfo || songInfo.track]);

  const changeSound = (songsrc) => {
    if (soundPlayed) {
      soundPlayed.pause();
    }

    let sound = new Audio(songsrc, {
      preload: "metadata",
    });

    sound.onended = function () {
      playNext();
    };

    sound.addEventListener("canplay", function () {
      console.log("Audio is ready to play (readyState: 4).");
      setduration((sound.duration / 60).toFixed(2));
    });

    setsoundPlayed(sound);
    sound.play();

    sound.addEventListener("timeupdate", () => {
      let progressBar = document.querySelector("#progressBar");
      let progress = parseInt((sound.currentTime / sound.duration) * 100);
      progressBar.value = progress;
      setTime((sound.currentTime / 60).toFixed(2));
    });
    setPause(false);
  };

  const pauseSound = () => {
    soundPlayed.pause();
  };

  const playSound = () => {
    if (!soundPlayed) {
      return;
    }
    soundPlayed.play();
  };

  const playNext = () => {
    for (let i = 0; i < currentData.length; i++) {
      if (currentData[i] === songInfo && i + 1 < currentData.length) {
        setSongInfo(currentData[i + 1]);
        return;
      }
    }
  };

  const playPrevious = () => {
    for (let i = 0; i < currentData.length; i++) {
      if (currentData[i] === songInfo && i - 1 >= 0) {
        setSongInfo(currentData[i - 1]);
        return;
      }
    }
  };

  const progressChange = () => {
    let progressBar = document.querySelector("#progressBar");
    soundPlayed.currentTime = (progressBar.value * soundPlayed.duration) / 100;
  };

  const addTolist1 = async (playlistId) => {
    console.log("hello");
    const songId = songInfo._id;

    const response = await authPost("/playlist/add/song", {
      playlistId,
      songId,
    });
    console.log(response);
    if (response._id) {
      setAddtolist(false);
    }
  };

  const togglePlay = () => {
    if (isPaused) {
      status = "play";
      playSound();
      setPause(false);
      console.log(status);
    } else {
      pauseSound();
      setPause(true);
      status = "pause";
      console.log(status);
    }
  };

  console.log(played);

  return (
    <div>
      {addtolist && (
        <AddtoPlaylist
          closeModel={() => {
            setAddtolist(false);
          }}
          addTolist1={addTolist1}
        />
      )}

      <div className="streaming w-[48vw] h-[18vh] bg-gradient-to-br from-[#c81d77] to-[#6710c2] fixed bottom-6 ml-[35vw] rounded-3xl flex ">
        <div className="circle w-[140px] h-[140px] rounded-[50%] bg-gradient-to-tr from-[#a11313]  ml-[-10%] border mt-2 flex justify-center items-center ">
          <img
            alt="thumbnail"
            className="border w-[80%] h-[80%] rounded-[50%]"
            src={songInfo.thumbnail}
          />
        </div>
        <div className=" w-[80%] ml-2 flex flex-col justify-around items-center">
          <div className=" w-[100%] h-[50%] flex justify-between items-center ">
            <div className="w-4/5  flex flex-col ml-3  ">
              <div className="text-3xl">{songInfo.name} </div>
              <div className=" opacity-60">{songInfo.artist ? songInfo.artist.name : songInfo.creator }</div>
            </div>
            <div className="flex  justify-end">
              <div>
                <LikeIcon info={songInfo} text={"4xl"} />
              </div>

              <i
                class="fa-regular fa-add text-4xl hover:cursor-pointer hover:text-white mx-2 "
                onClick={() => {
                  setAddtolist(true);
                }}
              ></i>
            </div>
          </div>
          <div className="flex w-full justify-center items-center">
            <div> {time} </div>
            <input
              id="progressBar"
              type="range"
              name="range"
              min={"0"}
              max={"100"}
              // value={0}
              className="w-[90%]  mx-2  "
              onChange={progressChange}
            />
            <div> {duration} </div>
          </div>
          <div className=" w-[40%] h-[20%] justify-around flex items-center text-3xl ">
            <i
              class="fa-solid fa-backward-step hover:cursor-pointer"
              onClick={() => {
                playPrevious();
              }}
            ></i>
            <div
              onClick={() => {
                togglePlay();
              }}
              className="w-10 h-10 hover:bg-slate-700 rounded-full  flex justify-center items-center"
            >
              {isPaused ? (
                <i class={`fa-solid fa-play ml-[6px]`} />
              ) : (
                <i class={`fa-solid fa-pause`} />
              )}
            </div>
            <i
              class="fa-solid fa-forward-step hover:cursor-pointer"
              onClick={playNext}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
}
