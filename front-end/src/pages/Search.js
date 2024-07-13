import React, { useState } from 'react'
import Nav from '../components/nav'
import { authGet } from '../utils/serverFetch';

export default function Search() {
  const [isFocus , setFocus] = useState(false);
  const [searchText, setsearchText] = useState("");

  const searchSong = async()=> {
    const reponse = await authGet(
      "/song/get/name/" + searchText);
     console.log(reponse);
     setsearchText(""); 
    }

  return (
    <div>
            <div className='full w-screen h-screen bg-[#0f0f0f] flex'>
            <Nav />
            <div className='w-[80vw] h-[100vh] text-white '>
              <div className='h-28 border  '>
                <div className='w-3/5 h-full flex justify-center items-center'>
                <div className={`w-[80%] h-[50%]  rounded-full bg-gray-800 flex  justify-center items-center ${isFocus? "border border-white":""} `}>
                <i class="fa fa-search text-white w-[10%] h-full flex items-center justify-center text-2xl " aria-hidden="true"></i>
                  <input type='text'  placeholder='Search Song / Artist/ playlist ?'
                 className='w-[90%] h-full pl-5  rounded-r-full bg-gray-800 flex focus:outline-none ' 
                 onFocus={()=>{
                  setFocus(true);
                 }}
                 onBlur={()=>{
                  setFocus(false);
                 }}
                 value={searchText}
                 onChange={(e)=> {setsearchText(e.target.value)}}
                 onKeyDown={(e)=>{
                  if(e.key==="Enter"){
                    searchSong();
                  }
                 }}
                 />
                  </div>
                </div>
              </div>
            </div>

            </div>
    </div>
  )
}
