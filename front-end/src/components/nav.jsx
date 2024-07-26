import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate , useLocation} from "react-router-dom";

const Nav = () => {
  let test1;
  const [cookie, setCookie] = useCookies(["token"]);
  const currentLocation = useLocation();
  const [activeLink, setActiveLink] = useState(currentLocation.pathname);
  const navigate = useNavigate();
  if (cookie.token) {
    test1 = true;
  } else {
    test1 = false;
  }

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  // fixed top-12 z-10 md:static
  const Autherised = () => {
    return (
      <div className=" w-[100%] flex flex-col justify-center  items-center ">
        <div className=" w-[80%] h-[50px] content-center    rounded-xl hover:border  cursor-pointer pl-[25%] text-sky-500  ">
          <Link to="/signUp">
            <li>Sign Up</li>
          </Link>
        </div>
        <div className="w-[80%] h-[50px] content-center    rounded-xl hover:border  cursor-pointer pl-[25%] text-sky-500 ">
          <Link to="/login">
            <li>Log In</li>
          </Link>
        </div>
      </div>
    );
  };

  const UnAutherised = () => {
    return (
      <div className=" w-[120px] mt-4 h-[50px] content-center    rounded-xl hover:border  cursor-pointer pl-[25%] text-sky-500 ml-[10%] ">
        <Link onClick={logout} to="/login">
          <li>Logout</li>
        </Link>
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
  <div className="w-screen  h-24 md:w-[20vw] md:h-[96vh] rounded-3xl bg-gradient-to-bl from-[#3c0633] to-[#840f3b] content-end pb-16 mt-4 overflow-auto">
    <div className="h-[30%]">
      <p className="w-[60%] h-[80px] rounded-xl ml-[15%] hidden md:flex justify-center items-center text-white text-3xl bg-gradient-to-br">
        D-Tune
      </p>
    </div>
    <ul className="Nav-ul flex flex-row md:flex-col justify-around pt-6 md:pt-0 text-2xl md:text-xl items-center text-white h-[60%]  ">
      <div className={`w-[80%] h-[8%] content-center pl-8 rounded-xl hover:border cursor-pointer ${activeLink === '/home' ? 'border opacity-100' : 'opacity-70'}`}   onClick={() => handleLinkClick('/home')}>
        <Link to="/home">
          <li className="flex items-center">
            <i className="fa-solid fa-house mr-[50px]"></i>
            <span className="hidden md:inline">Home</span>
          </li>
        </Link>
      </div>
      <div className={`w-[80%] h-[8%] content-center pl-8 rounded-xl hover:border cursor-pointer ${activeLink === '/playlist' ? 'border opacity-100' : 'opacity-70'}`} onClick={() => handleLinkClick('/playlist')} >
        <Link to="/playlist">
          <li className="flex items-center">
            <i className="fa-solid fa-music mr-[50px]"></i>
            <span className="hidden md:inline">All Songs</span>
          </li>
        </Link>
      </div>
      <div className={`w-[80%] h-[8%] content-center pl-8 rounded-xl hover:border cursor-pointer ${activeLink === '/search' ? 'border opacity-100' : 'opacity-70'}`} onClick={() => handleLinkClick('/search')}>
        <Link to="/search">
          <li className="flex items-center">
            <i className="fa-solid fa-magnifying-glass mr-[50px]"></i>
            <span className="hidden md:inline">Search</span>
          </li>
        </Link>
      </div>
      <div className={`w-[80%] h-[8%] content-center pl-8 rounded-xl hover:border cursor-pointer ${activeLink === '/library' ? 'border opacity-100' : 'opacity-70'}`} onClick={() => handleLinkClick('/library')}>
        <Link to="/library">
          <li className="flex items-center">
            <i className="fa-solid fa-list mr-[50px]"></i>
            <span className="hidden md:inline">PlayLists</span>
          </li>
        </Link>
      </div>
      <div className={`w-[80%] h-[8%] content-center pl-8 rounded-xl hover:border cursor-pointer ${activeLink === '/party' ? 'border opacity-100' : 'opacity-70'}`} onClick={() => handleLinkClick('/party')}>
        <Link to="/party">
          <li className="flex items-center">
            <i className="fa-solid fa-glass-cheers mr-[50px]"></i>
            <span className="hidden md:inline">Party</span>
          </li>
        </Link>
      </div>
      {test1 && (
        <>
          <div className={`w-[80%] h-[8%] content-center pl-8 rounded-xl hover:border cursor-pointer ${activeLink === '/mymusic' ? 'border opacity-100' : 'opacity-70'}`} onClick={() => handleLinkClick('/mymusic')}>
            <Link to="/mymusic">
              <li className="flex items-center">
                <i className="fa-solid fa-heart mr-[50px]"></i>
                <span className="hidden md:inline">LikedSongs</span>
              </li>
            </Link>
          </div>
          <div className={`w-[80%] h-[8%] content-center pl-8 rounded-xl hover:border cursor-pointer ${activeLink === '/allfriend' ? 'border opacity-100' : 'opacity-70'}`} onClick={() => handleLinkClick('/allfriend')}>
            <Link to="/allfriend">
              <li className="flex items-center">
                <i className="fa-solid fa-user-friends mr-[50px]"></i>
                <span className="hidden md:inline">Friends</span>
              </li>
            </Link>
          </div>
        </>
      )}
      <li className="w-[100%] h-auto">
        {test1 ? <UnAutherised /> : <Autherised />}
      </li>
    </ul>
  </div>
</div>

  );
};

export default Nav;
