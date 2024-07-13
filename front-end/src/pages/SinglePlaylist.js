import React, { useEffect, useState } from 'react'
import Nav from '../components/nav'
import { useParams } from 'react-router-dom'
import { authGet } from '../utils/serverFetch';
import { SongCard } from '../components/SongCard';

export default function SinglePlaylist() {
    const [listDetail, setlistDetail] = useState({});
    const {playlistId} = useParams();

    useEffect(() => {
        const getData =  async ()=>{
            const response = await authGet("/playlist/get/list/" + playlistId );
            setlistDetail(response);
        }
        getData();
    },[]);

  return (
    <div>
        <div className="full w-screen h-screen bg-[#0f0f0f] flex">
        <Nav />
        <div className="w-[80vw] h-[100vh] text-white  p-8">
            {
                listDetail._id && <div>
        <div>{listDetail.name} </div>
        <div className="space-y-3 overflow-auto">
               
                {listDetail.songs.map((item) => {
                  return <SongCard info={item} key={JSON.stringify(item)} playSound={()=>{}}  />;
                  })}
              </div>
              </div>
                  }
        </div>
        </div>
    </div>
  )
}
