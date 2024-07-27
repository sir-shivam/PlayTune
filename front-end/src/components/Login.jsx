import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { unauthPost } from "../utils/serverFetch";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [cookies, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

const clientId = 'AyNc3hK4wBdsnBtA'; 
const redirectUri = 'https://dtune.vercel.app/callback'; 
const scopes = ['openid','email', 'profile', 'user']; 


const authorizationUrl = `https://auth.delta.nitt.edu/authorize?` +
  `client_id=${clientId}&` +
  `redirect_uri=${encodeURIComponent(redirectUri)}&` +
  `response_type=code&` +
  `grant_type=authorization_code&` +
  `state=sdafsdghb&` +
  `scope=${scopes.join(' ')}` +
  `&nonce=bscsbascbadcsbasccabs`;


  const collectData = async () => {
    if(!email || !password){
      toast.error("please enter both the fields");
    }
    try {
      setLoading(true);
      const data = { email, password };
      const response = await unauthPost("/auth/login", data);
      if (response && !response.err) {
        console.log(response);
        const token = response.token;
        const date = new Date();
        date.setDate(date.getDate() + 30);
        setCookie("token", token, { path: "/", expires: date });
        toast.success("Login Successfull!!");
        navigate("/home");
      } else {
        alert(response.message);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const collectData5 = async () => {
    setLoading1(true);
    window.location.href = await authorizationUrl;
    setTimeout(() => {
      setLoading1(false);
    }, 5000);
  };

  return (
    
    <div className=" w-screen h-screen bg-[#0f0f0f] flex flex-col justify-center items-center md:flex-row">
        <div className="md:w-[880px] w-screen   h-[80px] md:h-[680px] mt-[-5%] flex flex-col md:flex-row justify-center items-center relative"><div>
            <p className="text-[3rem] md:text-[5rem] text-white mt-[-10%] ">Welcome Back.!</p>
          </div>
          <div className="md:w-[302px] md:h-[302px] w-[200px] h-[200px]   rounded-[50%] bg-gradient-to-b from-[#430356] to-[#0f0f0f] md:absolute fixed top-[160px] left-2 md:left-auto md:top-auto  md:ml-[90%] md:mt-[-60%]  "></div>
          <div className="md:w-[220px] md:h-[220px] w-[160px] h-[160px]   rounded-[50%]  bg-gradient-to-tl from-[#430356] to-[#0f0f0f] md:absolute md:ml-[200%]  md:mt-[69%] md:right-auto md:bottom-auto  fixed bottom-0 right-4 "></div>
        </div>
        <div className="frame1 md:w-[480px] md:h-[680px] w-[420px] h-[600px] border-[0.1px]  rounded-2xl end mt-5 md:mt-0  z-[2] flex flex-col justify-center items-center">
          <div className="status text-3xl text-white ml-[-56%] ">LogIn</div>
          <div className="status text-sm text-white mb-2 ml-[-52%] ">
            Enjoy Listening!
          </div>

          <input
            className="inputBox w-[75%] h-12 m-[15px] rounded-xl bg-transparent border  pl-3  text-white "
            type="text"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            placeholder="Enter Email"
          />

          <input
            className="inputBox w-[75%] h-12 m-[15px] rounded-xl bg-transparent border   pl-3 text-white "
            type="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
          />

          <div className="flex mb-2 ml-[-48%]">
            <input
              className="inline-block"
              type="checkbox"
              id="remember-me"
              name="remember-me"
            />
            <label for="remember-me" className="text-white inline-block">
              Remember me
            </label>
          </div>

          <button
            className=" text-white w-[75%] h-12 m-[15px] rounded-xl bg-transparent bg-gradient-to-r from-[#628eff] to-[#430356] "
            onClick={collectData}
            type="button"
          >
            {loading ? "Processing..." : "LogIn"}
          </button>
          <div className="logged text-white flex  ml-[78px] ">
            Don't have an Account?{" "}
            <p className="ml-2 text-[#628eff] ">
              <Link to="/signUp">Sign Up... </Link>{" "}
            </p>{" "}
          </div>
          <div className=" w-[75%] h-[5%] pt-[10%]">
          <button
            className=" text-white font-bold w-full h-16  rounded-xl bg-transparent bg-gradient-to-r from-[#628eff] to-[#17a53f] "
            onClick={collectData5}
            type="button"
          >
            {loading1 ? "Processing..." : "Login With D-Auth"}
          </button>
          </div>
        </div>
      </div>
    
  );
};

export default Login;
