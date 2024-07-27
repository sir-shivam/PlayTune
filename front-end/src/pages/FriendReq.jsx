import React, { useEffect, useState } from 'react'
import { authGet, authPost } from '../utils/serverFetch';
import { SongCard } from '../components/SongCard';
import Nav from '../components/nav';
import Loader from '../components/loader/Loader';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { getButtonText } from './Search';


export const sendRequest = async (info) => {
  try {
    const recId = info._id;
    const data = { recId };
    console.log(data);

    const response = await authPost("/request/create", data);
      
    toast.success(response.message);
    console.log("Friend request sent successfully:", response);

  } catch (error) {
    toast.error('Error sending friend request');
    console.error("Error sending friend request:", error);
  } finally {
  }
};

export default function FriendReq() {

    const [allUser, setallUser] = useState([]);
    const [friend1, setFriend] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
  const [reqSent, setreqSent] = useState([]);


    const navigate = useNavigate();

    useEffect(() => {
        myuser("all");
        allfriend1();
        checkRequest();
      }, []);
    
      const myuser = async (act) => {
        setLoading(true);
    
        try {

          const response = await authGet("/auth/user/" + act);
          setallUser(response);
          console.log(response);
         
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };


      const checkRequest = async () => {
        try {
          const response = await authGet(`/request/checkrequest/byme`);
          console.log(response);
          setreqSent(response);
    
        } catch (error) {
          console.error('Error checking friend request:', error);
          
        }
      };

     const  Usercard = ({info}) => {
      console.log(info);
        return(
        <div
      className="flex h-[6rem] hover:bg-gray-500 hover:bg-opacity-35  bg-gray-800 bg-opacity-20  p-2 rounded-xl  "
      
    >
      <div className="flex  w-full pr-5">
        <div className="text-white flex flex-col  justify-center pl-8 w-5/6 ">
          <div className="cursor-pointer hover:underline text-2xl ">
            {info.name}
          </div>
          
        </div>
        <div className="w-2/6 text-gray-400 flex justify-around items-center ">
          <div className="flex justify-center items-center">
          <button className="ml-auto bg-blue-500 px-3 py-1 rounded-full text-white" 
                  onClick={() => {
                    sendRequest(info);
                  }}
                  >
                    
                   {getButtonText(info, reqSent)}
                  </button>
          </div>
        </div>
      </div>
    </div>)
    } 


  


    

    const allfriend1 = async () => {
        setLoading1(true);
        try {
      
          const response = await authGet("/request/friends");
          setFriend(response);
          console.log(response);
          toast.success(response.message);

          console.log("Friend request sent successfully:", response);
      
        } catch (error) {
          toast.error('Error sending friend request');
          console.error("Error sending friend request:", error);
        } finally {
          setLoading1(false);
        }
      };


    console.log(allUser)
    
  return (

    (
        <div>
          <div className="full w-screen h-screen bg-[#0f0f0f] flex flex-col md:flex-row ">
            <Nav />
    
            <div className="md:w-[80vw] w-full h-[93vh] mt-8 text-white  p-10 overflow-auto">
            <div className="flex justify-between items-center font-bold text-2xl mt-[-30px] h-16  ">
                        People : 
                        <div className=' text-xl p-2 border rounded-xl cursor-pointer bg-gray-600 bg-opacity-0 hover:bg-opacity-100 ' onClick={()=> {
                        navigate("/friendrequest");
                        }}>Check Friend Request</div>
                      </div>

                      <div className='w-full'>
                        <div className='w-[95%] bg-gray-700 bg-opacity-30 h-10 flex justify-center items-center font-bold text-2xl rounded-2xl m-8' >Friends ({friend1.length}) </div>
              {loading1 ? (
                <div className='my-[8%] '>
                <Loader />
                </div>
              ) : (
                <>
                  { friend1.length ? 
                    <div>
                      
                      <div className="space-y-3 h-[80%]   ">
                        {friend1.map((item) => {
                          return (
                            <Usercard
                              info={item}
                              key={JSON.stringify(item)}
                            />
                          );
                        })}
                      </div>
                    </div> :
                    <div className='text-white font-bold h-20 text-2xl flex items-center'> You don't Have friend </div>
                  }
                </>
              )}
              </div>

                      <div className='w-full'>
                      <div className='w-[95%] bg-gray-700 bg-opacity-30 h-10 flex justify-center items-center font-bold text-2xl rounded-2xl m-8' >Suggested other Users</div>

              {loading ? (
                <div className='mt-[20%] '>
                <Loader />
                </div>
              ) : (
                <>
                  { 
                    <div>
                      
                      <div className="space-y-3 h-[80%]   ">
                        {allUser.map((item) => {
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
        </div>
      )
  )
}
