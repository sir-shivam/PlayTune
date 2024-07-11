import React from 'react';
import { useCookies } from 'react-cookie';
import {Link, useNavigate} from 'react-router-dom';


const Nav = () => {
    let test1;
    const [cookie,setCookie] = useCookies(["token"]);
    const navigate = useNavigate();
    if(cookie.token){
      test1=true;  
    }
    else{
        test1 = false; 
    }
    console.log(cookie);
    const Autherised = () => {
        return(
            <>
            <li className=' w-[80%] h-[8%] content-center pl-8   rounded-xl hover:border  cursor-pointer  '> 
            <Link  to="/signUp">Sign Up</Link>
            </li>
            <li className=' w-[80%] h-[8%] content-center pl-8   rounded-xl hover:border  cursor-pointer  '> 
            <Link  to="/signUp">Log In</Link>
            </li>
            </>
    )
    }
    
    const  UnAutherised = ()=> {
        return(
        
            <li className=' w-[80%] h-[8%] content-center pl-8   rounded-xl hover:border  cursor-pointer  '> 
            <Link   onClick={logout} to="/login" >Logout</Link></li>
    )
    }

    function deleteCookie(cookieName) {
        document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/";
      }
      
    const logout = () => {
        deleteCookie("token");
        navigate("/login");
    }

    
    return (
        <div>
            <div className='w-[20vw] h-[96vh]  rounded-3xl  bg-gradient-to-bl from-[#3c0633] to-[#840f3b]  content-end pb-16 mt-3 '>
            <div className=' h-[30%]  ' >
                <p className=' w-[60%] h-[80px] rounded-xl  ml-[15%] flex justify-center items-center text-white text-3xl bg-gradient-to-br   ' >D-Tune</p>
            </div>
            <ul className='Nav-ul flex flex-col justify-around items-center text-white  h-[60%]  '>
                <li className=' w-[80%] h-[8%] content-center pl-8   rounded-xl hover:border  cursor-pointer  '>
                <i class="fa-solid fa-house mr-[50px] "></i>
                    <Link  to="/home" >Home</Link> </li>
                <li className=' w-[80%] h-[8%] content-center pl-8   rounded-xl hover:border  cursor-pointer ' >
                <i class="fa-solid fa-bookmark mr-[50px]"></i><Link  to="/music" >View</Link> </li>
                <li className=' w-[80%] h-[8%] content-center pl-8   rounded-xl hover:border  cursor-pointer '>
                <i class="fa-solid fa-magnifying-glass mr-[50px] "></i><Link  to="/search" >Search</Link> </li>
                <li className=' w-[80%] h-[8%] content-center pl-8   rounded-xl hover:border  cursor-pointer  '>
                <i class="fa-solid fa-warehouse  mr-[50px]"></i><Link  to="/library   " >Library</Link></li>
                < >{test1? <div className=' w-[80%] h-[8%] content-center pl-8   rounded-xl hover:border  cursor-pointer  '>
                <i class="fa-solid fa-warehouse  mr-[50px]"></i><Link to="/mymusic" >My Music </Link> </div> :(<></>) } </>
                
                {/* <li className=' w-[60%] h-[8%]    rounded-xl hover:border  cursor-pointer flex justify-center text-sky-400 '><Link  to="/login" >Login</Link> */}
                {/* </li> */}
                <li  >{ test1? (<UnAutherised />)
                 :(<Autherised />) } </li>
            </ul> 
            </div>
        </div>
    )
}



export default Nav;