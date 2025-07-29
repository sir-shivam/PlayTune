import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { unauthPost } from "../utils/serverFetch";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";

const SignUp = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setemail] = useState("");
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const [loading1, setLoading1] = useState(false);

  const collectData = async () => {
    const checkbox = document.getElementById('singer');
    let singer = false;
    console.log(checkbox.checked);
    if(checkbox.checked){
      singer = true;
    }
    const data = { name, email, password ,singer};
    const respose = await unauthPost("/auth/register", data);

    if (respose && !respose.err) {
      console.log(respose);
      console.log(respose.token);
      const token = respose.token;
      const date = new Date();
      date.setDate(date.getDate() + 1);
      setCookie("token", token, { path: "/", expires: date });
      toast.success("SignUp Successfull!!");
      navigate("/home");
    } else {
      alert(respose.message);
    }
  };

  const clientId = "AyNc3hK4wBdsnBtA";
  const redirectUri = "http://localhost:3000/callback";
  // const redirectUri = "https://dtune.vercel.app/callback";
  const scopes = ["openid", "email", "profile", "user"];

  const authorizationUrl =
    `https://auth.delta.nitt.edu/authorize?` +
    `client_id=${clientId}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `response_type=code&` +
    `grant_type=authorization_code&` +
    `state=sdafsdghb&` +
    `scope=${scopes.join(" ")}` +
    `&nonce=bscsbascbadcsbasccabs`;

  const collectData5 = async () => {
    setLoading1(true);
    window.location.href = await authorizationUrl;
    setTimeout(() => {
      setLoading1(false);
    }, 5000);
  };

          
  return (
    <div>
       <div className=" w-screen h-screen bg-[#0f0f0f] flex flex-col justify-center items-center md:flex-row">
        <div className="md:w-[880px] w-screen   h-[80px] md:h-[680px]   flex flex-col md:flex-row justify-center items-center relative"><div>
        <div className="mt-[-18%]">
            <p className="text-[#628eff]  md:text-[4rem] text-[2rem] mb-[-4%] ">Play-Tune</p>
            <p className="md:text-[5rem] text-[3rem]  text-white  ">Welcomes You !!</p>
            {/* <p className='text-[1.3rem] text-white underline mt-[-4%] ml-[1rem] '>Play the Beat !!</p> */}
          </div>
          </div>
          <div className="md:w-[302px] md:h-[302px] w-[180px] h-[180px]   rounded-[50%] bg-gradient-to-b from-[#430356] to-[#0f0f0f] md:absolute fixed top-[180px] left-2 md:left-auto md:top-auto  md:ml-[90%] md:mt-[-60%]  "></div>
          <div className="md:w-[220px] md:h-[220px] w-[160px] h-[160px]   rounded-[50%]  bg-gradient-to-tl from-[#430356] to-[#0f0f0f] md:absolute md:ml-[200%]  md:mt-[69%] md:right-auto md:bottom-auto  fixed bottom-0 right-4 "></div>
        </div>
        <div className="frame1  md:w-[480px] md:h-[680px] w-[420px] h-[600px]  border-[0.1px]  rounded-2xl end mt-5 md:mt-0  z-[2] flex flex-col justify-center items-center">
          <div className="status text-3xl text-white ml-[45%] ">Sign In...</div>
          <div className="status text-sm text-white mb-2 ml-[52%] ">
            Enjoy Listening!
          </div>

          <label className="text-white ml-[-56%] mb-[-2%]  ">Enter Name</label>
          <input
            className="inputBox w-[75%] h-12 m-[15px] rounded-xl bg-transparent border  pl-3  text-white "
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
            id="name"
          />

          <label className="text-white ml-[-56%] mb-[-2%]  ">Enter Email</label>
          <input
            className="inputBox w-[75%] h-12 m-[15px] rounded-xl bg-transparent border  pl-3  text-white "
            type="text"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            placeholder="Enter Email"
            id="email"
          />

          <label className="text-white ml-[-49%] mb-[-2%]  ">
            Create Password
          </label>
          <input
            className="inputBox w-[75%] h-12 m-[15px] rounded-xl bg-transparent border   pl-3 text-white "
            type="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            id="password"
          />

          <div className="flex mb-2 ">
            <input
              className="inline-block mr-2"
              type="checkbox"
              id="singer"
              name="singer"
            />
            <label for="singer" className="text-white inline-block">
              I'm a Singer ...register me as an  Artist Account
            </label>
          </div>

          <button
            className=" text-white w-[75%] h-12 m-[15px] rounded-xl bg-transparent bg-gradient-to-r from-[#628eff] to-[#430356] "
            onClick={(e) => {
              e.preventDefault();
              collectData();
            }}
            type="button"
          >
            Sign Up
          </button>

          <div className="registered text-white flex  ml-[78px] ">
            Already have an Account?{" "}
            <p className="ml-2 text-[#628eff] ">
              <Link to="/login">Log In... </Link>{" "}
            </p>{" "}
          </div>
          <div className=" w-[75%] h-[5%] pt-[5%]">
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
    </div>
  );
};

export default SignUp;
