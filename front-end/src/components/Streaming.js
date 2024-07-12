import React from 'react'
import Nav from './nav'

export default function Streaming() {




  return (
    <div>
        {/* <Nav /> */}
        <div className='streaming w-[60vw] h-[28vh] bg-gradient-to-br from-[#c81d77] to-[#6710c2] fixed bottom-6 ml-[30vw] rounded-3xl flex ' >
            <div className='circle w-[220px] h-[220px] rounded-[50%] bg-gradient-to-tr from-[#a11313]  ml-[-10%] border mt-2 flex justify-center items-center '>
              <div className='border w-[70%] h-[70%] rounded-[50%] '  ></div>
            </div>
            <div className='border w-[70%] ml-[5%] flex flex-col justify-around items-center'>
              <div className='border w-[100%] h-[50%]  '  ></div>
            <input type='range' name='range' min={"0"} max={"100"} className='w-[90%]  mt-[-15px]  ' />
            <div className='border w-[40%] h-[20%] justify-around flex items-center text-3xl ' > 
            <i class="fa-solid fa-house  "></i>
            <i class="fa-solid fa-house  "></i>
            <i class="fa-solid fa-house  "></i>
            </div>
            </div>
        </div>
    </div>
  )
}

