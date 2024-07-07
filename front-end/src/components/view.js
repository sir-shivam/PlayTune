import React from 'react'
import Nav from './nav'

export default function View() {
  return (
    <div>
        <div className='full w-screen h-screen bg-[#0f0f0f] flex'>
        <Nav />
        <div className=' h-[100%] w-[100%] overflow-auto  '>
            <div className='w-[95%] ml-[3%] h-[10%]  sticky top-[4%] mb-[70px] rounded-2xl bg-gradient-to-l from-[#840f3b] to-[#2e0427] flex justify-around items-center ' > 
                <div className="text-white m-4 border-2 border-[transparent] hover:border-[white] w-[12%] h-[50%] content-center text-center  rounded-lg ">Singer</div>
                <div className="text-white m-4 border-2 border-[transparent] hover:border-[white] w-[12%] h-[50%] content-center text-center  rounded-lg    ">Singer</div>
                <div className="text-white m-4 border-2 border-[transparent] hover:border-[white] w-[12%] h-[50%] content-center text-center  rounded-lg    ">Singer</div>
                <div className="text-white m-4 border-2 border-[transparent] hover:border-[white] w-[12%] h-[50%] content-center text-center  rounded-lg    ">Singer</div>
                <div className="text-white m-4 border-2 border-[transparent] hover:border-[white] w-[12%] h-[50%] content-center text-center  rounded-lg    ">Singer</div>
            </div>
                    <div className='ml-5 w-[98%] flex  h-[40%] '>
                    <div  className='w-[18%]  border h-[75%] rounded-2xl m-4 '   ></div>
                    <div  className='w-[18%]  border h-[75%] rounded-2xl m-4 '   ></div>
                    <div  className='w-[18%]  border h-[75%] rounded-2xl m-4 '   ></div>
                    <div  className='w-[18%]  border h-[75%] rounded-2xl m-4 '   ></div>
                    <div  className='w-[18%]  border h-[75%] rounded-2xl m-4 '   ></div>
                    </div>
                    <div className='ml-5 w-[98%] flex  h-[40%] '>
                    <div  className='w-[18%]  border h-[75%] rounded-2xl m-4 '   ></div>
                    <div  className='w-[18%]  border h-[75%] rounded-2xl m-4 '   ></div>
                    <div  className='w-[18%]  border h-[75%] rounded-2xl m-4 '   ></div>
                    <div  className='w-[18%]  border h-[75%] rounded-2xl m-4 '   ></div>
                    <div  className='w-[18%]  border h-[75%] rounded-2xl m-4 '   ></div>
                    </div>
                    <div className='ml-5 w-[98%] flex  h-[40%] '>
                    <div  className='w-[18%]  border h-[75%] rounded-2xl m-4 '   ></div>
                    <div  className='w-[18%]  border h-[75%] rounded-2xl m-4 '   ></div>
                    <div  className='w-[18%]  border h-[75%] rounded-2xl m-4 '   ></div>
                    <div  className='w-[18%]  border h-[75%] rounded-2xl m-4 '   ></div>
                    <div  className='w-[18%]  border h-[75%] rounded-2xl m-4 '   ></div>
                    </div>
                    </div>
        </div>

    </div>
  )
}
