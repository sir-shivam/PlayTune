import React from 'react'
import Nav from './nav'

export default function Home() {
  return (
    <div>
            <div className='full w-screen h-screen bg-[#0f0f0f] flex'>
                {/* <div className='w-[20vw] h-[96vh]  rounded-3xl  bg-gradient-to-bl from-[#3c0633] to-[#840f3b]  '></div>
                 */}
                 <Nav />
                <div className='w-[80vw] h-[100vh]'>
                    <div className='h-[40%] w-[100%]   flex '>
                        <div className='w-[70%]  h-[100%] content-end '>
                            <div className='text-7xl text-white m-10 ' >Discover </div>
                            <div className='flex  m-10 ' >
                                <div className='inline-block text-white m-6 ml-0 ' >Popular</div>
                                <div className='inline-block text-white m-6 ml-0 ' >Popular</div>
                                <div className='inline-block text-white m-6 ml-0 ' >Popular</div>
                                <div className='inline-block text-white m-6 ml-0 ' >Popular</div>
                                <div className='inline-block text-white m-6 ml-0 ' >Popular</div>
                                <div className='inline-block text-white m-6 ml-0 ' >Popular</div>
                            </div>
                        </div>
                        <div className='text-white flex ml-[10%] mt-[5%]  ' >
                            <div className='w-[80px] h-[80px] border rounded-[50%]   '   > </div>
                            <div className=' h-[80px] flex flex-col justify-evenly items-center ml-4 '>
                                <p>Shivam</p>
                                <p>India</p>
                            </div>
                        </div>
                    </div>
                    <div className=' h-[60%] flex w-[100%]   '>
                    <div  className='w-[28%] border h-[80%] rounded-2xl m-8 '   ></div>
                    <div  className='w-[28%] border h-[80%] rounded-2xl m-8 '   ></div>
                    <div  className='w-[28%] border h-[80%] rounded-2xl m-8 '   ></div>
                    </div>
                </div>
            </div>

    </div>
  )
}
