import React from 'react';
import {Link, useNavigate} from 'react-router-dom';


const Nav = () => {
    const auth = localStorage.getItem("user");
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/signUp");
    }
    return (
        <div>
            <div className='w-[20vw] h-[96vh]  rounded-3xl  bg-gradient-to-bl from-[#3c0633] to-[#840f3b]  content-end pb-16 mt-3 '>
            <div className=' h-[30%]  ' >
                <p className=' w-[60%] h-[80px] rounded-xl  ml-[15%] flex justify-center items-center text-white text-3xl bg-gradient-to-br   ' >D-Tune</p>
            </div>
            <ul className='Nav-ul flex flex-col justify-around items-center text-white  h-[60%]  '>
                <li className=' w-[60%] h-[8%] content-center pl-8   rounded-xl '><Link  to="/" >Home</Link> </li>
                <li className=' w-[60%] h-[8%] content-center pl-8   rounded-xl '><Link  to="/music" >View</Link> </li>
                <li className=' w-[60%] h-[8%] content-center pl-8   rounded-xl '><Link  to="/search" >Search</Link> </li>
                <li className=' w-[60%] h-[8%] content-center pl-8   rounded-xl '><Link  to="/login" >Login</Link></li>
                <li className=' w-[60%] h-[8%] content-center pl-8   rounded-xl '><Link  to="/library   " >Library</Link></li>
                <li className=' w-[60%] h-[8%] content-center pl-8   rounded-xl '>{ auth? <Link  onClick={logout} to="/signUp" >Logout</Link> : <Link to="/signUp" >SignUp</Link> } </li>
            </ul> 
            </div>
        </div>
    )
}

export default Nav;