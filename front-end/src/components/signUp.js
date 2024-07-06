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
            {/* <h1>Register</h1>
            <input className='inputBox' type='text'  
            value={name} onChange={(e) =>setName(e.target.value)} placeholder='Enter Name' />

            <div  ></div> */}

            <div className='full w-screen h-screen bg-[#0f0f0f] flex'>
                <div className='w-[880px] h-[680px] mt-9 flex justify-center items-center relative'>
                    <div>
                <p className='text-[5rem] text-white '>Welcome Back.!</p>
                {/* <p className='text-[1.3rem] text-white underline mt-[-4%] ml-[1rem] '>Play the Beat !!</p> */}
                </div>
                    <div className='w-[302px] h-[302px]   rounded-[50%] bg-gradient-to-b from-[#430356] to-[#0f0f0f] absolute ml-[90%] mt-[-52%]  '  ></div>
                    <div className='w-[220px] h-[220px]   rounded-[50%]  bg-gradient-to-tl from-[#430356] to-[#0f0f0f] absolute ml-[200%]  mt-[69%] '></div>
                 </div>
                <div className='frame1 w-[480px] h-[680px] border-[0.1px]  rounded-2xl end mt-14  z-[2] flex flex-col justify-center items-center'>

                <div className='status text-3xl text-white ml-[-56%] ' >LogIn</div>
                <div className='status text-sm text-white mb-2 ml-[-52%] ' >Will have Fun!</div>
                
                

                <input className='inputBox w-[75%] h-12 m-[15px] rounded-xl bg-transparent border  pl-3 ' type='text' 
                value={email} onChange={(e) =>setemail(e.target.value)} placeholder='Enter Email' />
            
                <input className='inputBox w-[75%] h-12 m-[15px] rounded-xl bg-transparent border   pl-3' type='Password' 
                value={password} onChange={(e) =>setPassword(e.target.value)} placeholder='Enter Password' />

                <div className='flex mb-2 ml-[-48%]'>
                <input className='inline-block' type="checkbox" id="remember-me" name="remember-me" />
                <label for="remember-me"  className='text-white inline-block'>Remember me</label>
                </div>
            
                <button className=" text-white w-[75%] h-12 m-[15px] rounded-xl bg-transparent bg-gradient-to-r from-[#628eff] to-[#430356] " onClick={collectData} type='button'>Sign Up/ LogIn</button>
            
                </div>

            </div>
        </div>


        
    )
}

export default SignUp;