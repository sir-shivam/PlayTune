import React from 'react'
import Nav from './nav'

export default function Library() {
  return (
    <div>
        <div className='full w-screen h-screen bg-[#0f0f0f] flex' >
        <Nav/>
        <div className=' h-[100%] w-[100%] overflow-auto  border'></div>
        </div>
    </div>
  )
}
