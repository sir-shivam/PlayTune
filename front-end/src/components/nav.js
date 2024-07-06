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
            <ul className='Nav-ul'>
                <li><Link to="/" >Home</Link> </li>
                <li><Link to="/music" >Stream</Link> </li>
                <li><Link to="/search" >Search</Link> </li>
                <li><Link to="/login" >Login</Link></li>
                <li>{ auth? <Link onClick={logout} to="/signUp" >Logout</Link> : <Link to="/signUp" >SignUp</Link> } </li>
            </ul>
        </div>
    )
}

export default Nav;