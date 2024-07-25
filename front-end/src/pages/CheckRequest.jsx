import React, { useEffect, useState } from 'react'

import { authGet, authPost } from '../utils/serverFetch';
import Nav from '../components/nav';
import Loader from '../components/loader/Loader';
import toast from "react-hot-toast";


export default function CheckRequest() {

    const [allReqest, setallRequest] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        checkFriendRequest();
    }, []);

    const checkFriendRequest = async () => {
        setLoading(true);
        try {
          const response = await authGet(`/request/received`);
          console.log(response);
          setallRequest(response);
        } catch (error) {
          console.error('Error checking friend request:', error);
          // Handle error, e.g., show an error message
        }finally {
            setLoading(false);
          }
      };


      const  Usercard = ({info}) => {
        return(
        <div
      className="flex h-[6rem] hover:bg-gray-500 hover:bg-opacity-35   p-2 rounded-md  "
      
    >
      <div className="flex  w-full pr-5">
        <div className="text-white flex flex-col  justify-center pl-8 w-5/6 ">
          <div className="cursor-pointer hover:underline text-2xl ">
            {info.sender.name}
          </div>
          
        </div>
        <div className="w-2/6 flex justify-around items-center ">
          <div className="flex justify-between items-center">
            <div className='border rounded-xl p-2 mx-8 cursor-pointer'onClick={()=>{
                acceptRequest(info)
            }}>  Accept </div>
            <div className='border rounded-xl p-2  cursor-pointer ' onClick={()=>{
                rejectRequest(info);
            }}>Reject</div>
          </div>
        </div>
      </div>
    </div>)
    } 


    const acceptRequest = async (info) => {
        // setLoading1(true);
        console.log("hello");
        try {
      
          const response = await authPost("/request/accept/" + info._id );
            
          toast.success(response.message);
          console.log("Friend request sent successfully:", response);
      
        } catch (error) {
          toast.error('Error sending friend request');
          console.error("Error sending friend request:", error);
        } finally {
        //   setLoading1(false);
        }
      };

      const rejectRequest = async (info) => {
        // setLoading1(true);
        console.log("hello");
        try {
      
          const response = await authPost("/request/reject/" + info._id );
            
          toast.success(response.message);
          console.log("Friend request sent successfully:", response);
      
        } catch (error) {
          toast.error('Error sending friend request');
          console.error("Error sending friend request:", error);
        } finally {
        //   setLoading1(false);
        }
      };



  return (
<div>
          <div className="full w-screen h-screen bg-[#0f0f0f] flex ">
            <Nav />
    
            <div className="w-[80vw] h-[93vh] mt-8 text-white  p-10 overflow-auto">
            <div className="flex justify-center items-center font-bold text-2xl mt-[-30px] h-16  ">
                        Friend Request
                      </div>
              {loading ? (
                <Loader/>
              ) : (
                <>
                  { 
                    <div>
                      
                      <div className="space-y-3 h-[80%]   ">
                        {allReqest.map((item) => {
                          return (
                            <Usercard

                              info={item}
                              key={JSON.stringify(item)}
                            />
                          );
                        })}
                      </div>
                    </div>
                  }
                </>
              )}
            </div>
          </div>
        </div>
      )
}
