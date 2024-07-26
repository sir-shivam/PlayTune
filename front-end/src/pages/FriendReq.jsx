import React, { useEffect, useState } from 'react'
import { authGet, authPost } from '../utils/serverFetch';
import { SongCard } from '../components/SongCard';
import Nav from '../components/nav';
import Loader from '../components/loader/Loader';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';


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

    const navigate = useNavigate();

    useEffect(() => {
        myuser("all");
        allfriend1();
      }, []);
    
      const myuser = async (act) => {
        setLoading(true);
    
        try {

          const response = await authGet("/auth/user/" + act);
          setallUser(response);
          console.log(response);
         
        } catch (error) {
          console.error("Error fetching playlist data:", error);
        } finally {
          setLoading(false);
        }
      };


     const  Usercard = ({info}) => {
        return(
        <div
      className="flex h-[6rem] hover:bg-gray-500 hover:bg-opacity-35   p-2 rounded-md  "
      onClick={() => {
        sendRequest(info);

      }}
    >
      <div className="flex  w-full pr-5">
        <div className="text-white flex flex-col  justify-center pl-8 w-5/6 ">
          <div className="cursor-pointer hover:underline text-2xl ">
            {info.name}
          </div>
          
        </div>
        <div className="w-2/6 text-gray-400 flex justify-around items-center ">
          <div className="flex justify-center items-center">
            <div>{info.name}</div>
            {/* <LikeIcon info={info} text={"2xl"} /> */}
            hello
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
          <div className="full w-screen h-screen bg-[#0f0f0f] flex ">
            <Nav />
    
            <div className="w-[80vw] h-[93vh] mt-8 text-white  p-10 overflow-auto">
            <div className="flex justify-between items-center font-bold text-2xl mt-[-30px] h-16  ">
                        People : 
                        <div className=' text-xl p-2 border rounded-xl cursor-pointer bg-gray-600 bg-opacity-0 hover:bg-opacity-100 ' onClick={()=> {
                        navigate("/friendrequest");
                        }}>Check Friend Request</div>
                      </div>

                      <div className='w-full'>
                        <div className='w-full bg-gray-700 bg-opacity-30 h-10 flex justify-center items-center font-bold text-2xl rounded-2xl' >Friends</div>
              {loading1 ? (
                <Loader/>
              ) : (
                <>
                  { 
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
                    </div>
                  }
                </>
              )}
              </div>

                      <div className='w-full'>
                      <div className='w-full bg-gray-700 bg-opacity-30 h-10 flex justify-center items-center font-bold text-2xl rounded-2xl' >Suggested other Users</div>

              {loading ? (
                <Loader/>
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
