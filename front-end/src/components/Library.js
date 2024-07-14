import React, { useEffect, useState } from 'react'
import Nav from './nav'
import { authGet } from '../utils/serverFetch';
import { useNavigate } from 'react-router-dom';



export default function Library() {

  const [myList, setmyList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await authGet("/playlist/get/byme") ;
      
      setmyList(data);
    };

    getData(); 
    
  },[])
  

  const PlaylistCard = ({info , playlistId })=>{
    const navigate = useNavigate();
    return(
     <div  className=' h-28 border  rounded-2xl m-8 flex  flex-col  items-center cursor-pointer ' onClick={()=>{navigate("/playlist/view/"+ playlistId )}}  >
     <div  className='box1 border w-[50%] h-[40%] mt-3 rounded-xl '></div>
     <div className='border w-[80%] h-[50%] m-4'></div>
     </div>
    )
   }


  return (
    <div>
        <div className='full w-screen h-screen bg-[#0f0f0f] flex' >
        <Nav/>
        <div className=' h-[100%] w-[100%]  overflow-y-auto  text-white'>
          <div className='font-bold text-3xl text-center m-5' >PlayList</div>
        <div className=' h-full  w-full  border  grid gap-8 grid-cols-5 '>
         {
          myList.map((item)=>{
            return  (<PlaylistCard key={JSON.stringify(item )} info={item} playlistId={item._id}  /> )
          })
         }
        </div>

        </div>
        </div>
    </div>
  )
}
