import React from 'react';
import {Link} from 'react-router-dom';


const Nav = () => {
    return (
        <div>
            <ul className='Nav-ul'>
                <li><Link to="/" >Home</Link> </li>
                <li><Link to="/music" >Stream</Link> </li>
                <li><Link to="/search" >Search</Link> </li>
                <li><Link to="/signUp" >SignUp</Link> </li>
                <li><Link to="/logout" >Logout</Link> </li>
            </ul>
        </div>
    )
}

export default Nav;