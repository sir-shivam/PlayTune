import React, { useContext, useEffect, useState } from "react";
import Nav from "./nav";
import { useNavigate } from "react-router-dom";
import { authGet } from "../utils/serverFetch";
import Loader from "./loader/Loader";
import SongContext from "./context";

export default function Home() {
  const [myList1, setMyList1] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSinger, setIsSinger] = useState(false);
  const { currentUser, setCurrentUser } = useContext(SongContext);
  const [profileExpanded, setProfileExpanded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await authGet("/playlist/get/all");
        setMyList1(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };



    const fetchInfo = async () => {
      try {
        const userInfo = await authGet("/request/view");
        setCurrentUser(userInfo);
        setIsSinger(userInfo.singer); 
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    getData();
    fetchInfo();
  }, []);


  const getColorFromName = (name) => {
    const colors = ["#f5a623", "#4a90e2", "#50e3c2", "#bd10e0", "#7ed321"];
    const charCode = name.charCodeAt(0);
    return colors[charCode % colors.length];
  };

  const userName = currentUser.name || "User";
    const userInitial = userName.charAt(0).toUpperCase();
    const profileColor = getColorFromName(userName);

  const Profile = () => {
    const toggleProfile = () => {
      setProfileExpanded(!profileExpanded);
    };

    return (
      <div className="relative">
        <div
          className="flex items-center cursor-pointer"
          onClick={toggleProfile}
        >
          <div className="w-[60px] h-[60px] border rounded-full flex justify-center items-center overflow-hidden"  style={{ backgroundColor: profileColor }}>
            {userInitial}
          </div>
          <div className="ml-4 text-white">{currentUser.name}</div> 
        </div>
        {profileExpanded && (
          <div className="absolute bg-white text-black p-4 rounded-lg mt-2 shadow-lg right-0 w-[200px]">
            <div className="text-lg font-bold">{currentUser.name}</div>
            <div>Email: {currentUser.email}</div> 
            <div>Role: {isSinger ? "Singer" : "Listener"}</div>
          </div>
        )}
      </div>
    );
  };

  const PlaylistCard1 = ({ info, playlistId }) => {
    const navigate = useNavigate();
    return (
      <div
        className="w-full h-full border rounded-2xl m-4 p-4 flex flex-col items-center cursor-pointer"
        onClick={() => {
          navigate("/playlist/view/" + playlistId);
        }}
      >
        <div className="w-[80%] h-[20%] text-white text-2xl flex justify-center items-center">
          {info.name}
        </div>
        <img
          alt="thumbnail"
          src={info.thumbnail}
          className="w-[80%] h-[65%] mt-3 rounded-xl object-cover"
        />
      </div>
    );
  };

  return (
    <div className="w-full h-screen bg-[#0f0f0f] flex flex-col md:flex-row">
      <div className="hidden md:block">
        <Nav />
      </div>
      <div className="w-full md:w-[80vw] h-full">
        <div className="md:hidden">
          <Nav />
        </div>
        <div className="flex flex-col md:flex-row items-center md:items-start md:h-[25%] w-full p-4 md:p-10">
          <div className="flex flex-col w-full md:w-[70%] text-white">
            <div className="text-4xl md:text-7xl mb-4">Discover</div>
            <div className="flex flex-wrap">
              {["Popular", "Trending", "New", "Hot", "Charts", "Genres"].map(
                (category, index) => (
                  <div
                    key={index}
                    className="inline-block text-white m-2 opacity-50 cursor-pointer"
                  >
                    {category}
                  </div>
                )
              )}
            </div>
          </div>
          <div className="text-white flex mt-4 md:ml-[12%] md:mt-[1%] items-center">
            <Profile  />
            {isSinger && (
              <div className="text-white border-l-2 pl-3 cursor-pointer ml-4" onClick={()=>{
                navigate("/upload");
              }} >
                Upload song
              </div>
            )}
          </div>
        </div>
        <div className="h-[72%] w-[97%] p-4 md:p-8 overflow-y-auto">
          {loading ? (
            <Loader />
          ) : (
            <div className="grid gap-4 md:gap-8 grid-cols-2 md:grid-cols-3">
              {myList1.map((item) =>
                item.visibilty === "public" ? (
                  <PlaylistCard1 key={item._id} info={item} playlistId={item._id} />
                ) : (
                  ""
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
