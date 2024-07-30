import React, { useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SongContext from "./context";

const Nav = () => {
  const [cookie, , removeCookie] = useCookies(["token"]);
  const currentLocation = useLocation();
  const [activeLink, setActiveLink] = useState(currentLocation.pathname);
  const navigate = useNavigate();
  const { Songclicked, setSongclicked } = useContext(SongContext);

  useEffect(() => {
    setActiveLink(currentLocation.pathname);
  }, [currentLocation]);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  const logout = () => {
    removeCookie("token");
    setSongclicked(false);
    navigate("/login");
  };

  return (
    <div className="w-screen h-[10rem] md:w-[20vw] md:h-[96vh] bg-gradient-to-bl from-[#3c0633] to-[#840f3b] md:pt-8  md:p-4 md:rounded-3xl rounded-b-xl mt-4  md:overflow-auto">
      <div className="flex flex-col   items-center h-full text-white  ">
        <div className="md:mb-8 mb-2 md:h-auto  h-full w-full flex justify-center items-center ">
         
          <h1 className="text-4xl font-bold text-white tracking-widest ">
            D-Tune
          </h1>
        </div>
        <ul className="flex md:flex-col overflow-auto md:overflow: visible h-full  p-8 border-[#0f0f0f] border-t-4 flex-row gap-4 w-full">
          <NavItem
            to="/home"
            icon="fa-house"
            label="Home"
            active={activeLink === "/home"}
            onClick={handleLinkClick}
          />
          <NavItem
            to="/playlist"
            icon="fa-music"
            label="All Songs"
            active={activeLink === "/playlist"}
            onClick={handleLinkClick}
          />
          <NavItem
            to="/search"
            icon="fa-magnifying-glass"
            label="Search"
            active={activeLink === "/search"}
            onClick={handleLinkClick}
          />
          <NavItem
            to="/library"
            icon="fa-list"
            label="PlayLists"
            active={activeLink === "/library"}
            onClick={handleLinkClick}
          />
          <NavItem
            to="/party"
            icon="fa-glass-cheers"
            label="Party"
            active={activeLink === "/party"}
            onClick={handleLinkClick}
          />
          {cookie.token && (
            <>
              <NavItem
                to="/mymusic"
                icon="fa-heart"
                label="LikedSongs"
                active={activeLink === "/mymusic"}
                onClick={handleLinkClick}
              />
              <NavItem
                to="/allfriend"
                icon="fa-user-friends"
                label="Friends"
                active={activeLink === "/allfriend"}
                onClick={handleLinkClick}
              />
            </>
          )}
          <li className="w-full">
            {cookie.token ? (
              <div className="w-full flex justify-center">
                <button
                  onClick={logout}
                  className="w-[80%] h-[50px] bg-red-600 hover:bg-red-700 rounded-xl text-white"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="w-full flex flex-col items-center gap-2">
                <Link
                  to="/signUp"
                  className="w-[80%] h-[50px] flex justify-center items-center bg-green-600 hover:bg-green-700 rounded-xl text-white"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="w-[80%] h-[50px] flex justify-center items-center bg-blue-600 hover:bg-blue-700 rounded-xl text-white"
                >
                  Log In
                </Link>
              </div>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

const NavItem = ({ to, icon, label, active, onClick }) => (
  <li
    className={`w-full flex items-center gap-4 px-4 py-2 rounded-xl cursor-pointer ${
      active ? "bg-white text-black" : "hover:bg-gray-800"
    }`}
    onClick={() => onClick(to)}
  >
    <i className={`fa-solid ${icon}`}></i>
    <Link to={to} className="w-full flex items-center">
      <span>{label}</span>
    </Link>
  </li>
);

export default Nav;
