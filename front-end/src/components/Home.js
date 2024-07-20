import React, { useEffect, useState } from "react";
import Nav from "./nav";
import { useNavigate } from "react-router-dom";
import { authGet } from "../utils/serverFetch";
import Loader from "./loader/Loader";

export default function Home() {
  const [myList1, setmyList1] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const getData = async () => {
      setLoading(true); 
  
      try {
        const response = await authGet("/playlist/get/all");
        setmyList1(response);
      } catch (error) {
        console.error("Error fetching playlist data:", error); 
      } finally {
        setLoading(false); 
      }
    };
  
    getData();
  }, []);
  

  const PlaylistCard1 = ({ info, playlistId }) => {
    const navigate = useNavigate();
    return (
      <div
        className=" w-full h-full border  rounded-2xl m-8 flex  flex-col  items-center  "
        onClick={() => {
          navigate("/playlist/view/" + playlistId);
        }}
      >
        <div className="r w-[80%] h-[20%] m-2 text-white text-3xl flex justify-center items-center">
          {info.name}{" "}
        </div>
        <img
          alt="thumbnail"
          src={info.thumbnail}
          className="box1  w-[80%] h-[65%] mt-3 rounded-xl "
        ></img>
      </div>
    );
  };

  return (
    <div>
      <div className="full w-screen h-screen bg-[#0f0f0f] flex">
        <Nav />
        <div className="w-[80vw] h-[100vh]">
          <div className="h-[25%] w-[100%]   flex ">
            <div className="w-[70%]  h-[100%] content-end pb-3 ">
              <div className="text-7xl text-white m-10 ">Discover </div>
              <div className="flex  m-10 ">
                <div className="inline-block text-white m-6 ml-0 opacity-50  ">
                  Popular
                </div>
                <div className="inline-block text-white m-6 ml-0 opacity-50  ">
                  Popular
                </div>
                <div className="inline-block text-white m-6 ml-0 opacity-50  ">
                  Popular
                </div>
                <div className="inline-block text-white m-6 ml-0 opacity-50  ">
                  Popular
                </div>
                <div className="inline-block text-white m-6 ml-0 opacity-50  ">
                  Popular
                </div>
                <div className="inline-block text-white m-6 ml-0 opacity-50  ">
                  Popular
                </div>
              </div>
            </div>
            <div className="text-white flex ml-[10%] mt-[5%]  ">
              <div className="w-[60px] h-[60px] border rounded-[50%] flex justify-center items-center  ">
                <i class="fa-solid fa-user text-4xl "></i>
              </div>
              <div className=" h-[60px] flex flex-col justify-evenly items-center ml-4 ">
                <p>Shivam</p>
                <p>India</p>
              </div>
            </div>
          </div>

          <div className="h-[72%] w-[95%] p-8  overflow-y-auto ">
          {loading ? <Loader /> : 
            <>
            <div className="   grid gap-8 grid-cols-3 ">
              {myList1.map((item) => {
                return (
                  <PlaylistCard1
                    key={JSON.stringify(item)}
                    info={item}
                    playlistId={item._id}
                  />
                );
              })}
            </div>
            </>
          }

          </div>
        </div>
      </div>
    </div>
  );
}
