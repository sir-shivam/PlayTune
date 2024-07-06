import React, {useState, useEffect} from 'react';
import {Navigate, useNavigate} from "react-router-dom"; 

const SignUp = ()=> {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setemail] = useState("");
    const navigate = useNavigate();

    useEffect(()=> {
        const auth = localStorage.getItem("user");
        if(auth)
        {
            navigate("/")
        }
    })

    const collectData = async () => {
        console.log(name, email, password);
        let result = await fetch("http://localhost:4000/register", {
            method: "post",
            body: JSON.stringify({name,email,password}),
            headers: {
                "Content-Type":"application/json"
            },
        });
        result = await result.json();
        console.warn(result);
        localStorage.setItem("user",JSON.stringify(result));
        navigate("/");
    }

    return(
        <div>
            <h1>Register</h1>
            <input className='inputBox' type='text'  
            value={name} onChange={(e) =>setName(e.target.value)} placeholder='Enter Name' />

            <input className='inputBox' type='text' 
            value={email} onChange={(e) =>setemail(e.target.value)} placeholder='Enter Email' />
            
            <input className='inputBox' type='Password' 
            value={password} onChange={(e) =>setPassword(e.target.value)} placeholder='Enter Password' />
            
            <button onClick={collectData} className='appButton' type='button'>Sign Up</button>
            <div  ></div>
        </div>


        
    )
}

export default SignUp;