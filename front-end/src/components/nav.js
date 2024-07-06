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
            <ul className='Nav-ul bg-sky-400 '>
                <li className='inline-block'><Link  to="/" >Home</Link> </li>
                <li className='inline-block'><Link  to="/music" >Stream</Link> </li>
                <li className='inline-block'><Link  to="/search" >Search</Link> </li>
                <li className='inline-block'><Link  to="/login" >Login</Link></li>
                <li className='inline-block'>{ auth? <Link  onClick={logout} to="/signUp" >Logout</Link> : <Link to="/signUp" >SignUp</Link> } </li>
            </ul> 
        </div>
    )
}

export default Nav;