import React, { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import Streaming from "./Streaming";
import SongContext from "./context";
import CreatePlaylist from "../pages/CreatePlaylist";

const Nav = () => {
  const { songInfo, setSongInfo } = useContext(SongContext);
  const { soundPlayed, setsoundPlayed } = useState(null);
  const [PlaylistModel, setPlaylistModel] = useState(false);

  let test1;
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  if (cookie.token) {
    test1 = true;
  } else {
    test1 = false;
  }
  const Autherised = () => {
    return (
      <div className=" w-[100%] flex flex-col justify-center items-center ">
        <div className=" w-[80%] h-[50px] content-center    rounded-xl hover:border  cursor-pointer pl-[25%] text-sky-500  ">
        <Link to="/signUp"> 
        <li>
          Sign Up
        </li></Link>
        </div>
        <div className="w-[80%] h-[50px] content-center    rounded-xl hover:border  cursor-pointer pl-[25%] text-sky-500 ">
        <Link to="/login">
        <li >
          Log In
        </li></Link>
        </div>
      </div>
    );
  };

  const UnAutherised = () => {
    return (
        <div className=" w-[80%] h-[50px] content-center    rounded-xl hover:border  cursor-pointer pl-[25%] text-sky-500 ml-[10%] ">
        <Link onClick={logout} to="/login">    
      <li >
          Logout
        
      </li></Link>
      </div>
    );
  };

  function deleteCookie(cookieName) {
    document.cookie =
      cookieName + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/";
  }

  const logout = () => {
    deleteCookie("token");
    navigate("/login");
  };

  return (
    <div>
      {PlaylistModel && <CreatePlaylist closeModel={()=>{setPlaylistModel(false)}} />}
        
      <div className="w-[20vw] h-[96vh]  rounded-3xl  bg-gradient-to-bl from-[#3c0633] to-[#840f3b]  content-end pb-16 mt-3 ">
        <div className=" h-[30%]  ">
          <p className=" w-[60%] h-[80px] rounded-xl  ml-[15%] flex justify-center items-center text-white text-3xl bg-gradient-to-br   ">
            D-Tune
          </p>
        </div>
        <ul className="Nav-ul flex flex-col justify-around items-center text-white  h-[60%]  ">
          <div className=" w-[80%] h-[8%] content-center pl-8   rounded-xl hover:border  cursor-pointer  "  >
            <Link to="/home">
              <li>
                <i className="fa-solid fa-house mr-[50px] "></i>
                Home
              </li>
            </Link>{" "}
          </div>
          <div className=" w-[80%] h-[8%] content-center pl-8   rounded-xl hover:border  cursor-pointer "
          onClick={()=> {
            setPlaylistModel(true); 
          }}
          >
            <Link to="/playlist">
              <li>
                <i className="fa-solid fa-bookmark mr-[50px]"></i>
                Creat Playlist 
              </li>
            </Link>{" "}
          </div>
    <div className=" w-[80%] h-[8%] content-center pl-8   rounded-xl hover:border  cursor-pointer ">
    <Link to="/search">
          <li >
            <i class="fa-solid fa-magnifying-glass mr-[50px] "></i>
            Search
          </li></Link>{" "}
          </div>
<div className=" w-[80%] h-[8%] content-center pl-8   rounded-xl hover:border  cursor-pointer  ">
<Link to="/library   ">
          <li >
            <i className="fa-solid fa-warehouse  mr-[50px]"></i>
            Library
          </li></Link>
          </div>
          <>
            {test1 ? (
              <div className=" w-[80%] h-[8%] content-center pl-8   rounded-xl hover:border  cursor-pointer  ">
                    <Link to="/mymusic">
                <li>
                <i className="fa-solid fa-warehouse  mr-[50px]"></i>
                My Music 
                </li></Link>{" "}
              </div>
            ) : (
              <></>
            )}{" "}
          </>

          <li className="w-[100%] h-auto ">
            {test1 ? <UnAutherised /> : <Autherised />}{" "}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
