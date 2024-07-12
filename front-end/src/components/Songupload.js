import React, { useState } from 'react'
import Nav from './nav'
import CloudinaryUpload from './upload'
import { authPost } from '../utils/serverFetch';
import { useNavigate } from 'react-router-dom';

export default function Mymusic() {
    const [name,setName] = useState("");
    const [thumbnail , setThumbnail] = useState("");
    const [playUrl, setPlayUrl] = useState("");
    const [songName, setSongname] = useState();
    const navigate = useNavigate();
    const submitSong =async ()=>{

        const data = { name, thumbnail, track: playUrl };
        const response = await authPost(
            "/song/create", 
            data
        );
        if(response.err){
            alert("couldnot upload");
        }
        alert("success");
        navigate("/home");

    }

  return (
    
            <div className='full w-screen h-screen bg-[#0f0f0f] flex'>
                
                <Nav />
                <div>
                <input className='box1 border w-[20%] h-[10%]  ' value={name} setValue={setName} />
                <input className='box1 border w-[20%] h-[10%]  'value={thumbnail} setValue={setThumbnail} />
                <div className='w-[10vw] h-[10vw] border rounded-full  text-white  justify-center items-center '  >Select track</div>


                <div>
                    {
                        songName? (
                            <div className='bg-white rounded-lg '>
                                {songName.substring(0,20)}...
                            </div>
                        ):
                        (
                            <CloudinaryUpload setUrl={setPlayUrl} setName={setSongname} />
                        )
                    }
                </div>
                <div className='bg-white w-5 h-4 cursor-pointer  ' onClick={submitSong}  >Submit song</div>
            </div>
           

 
    </div>
  )
}
