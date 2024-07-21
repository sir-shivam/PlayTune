import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { unauthPost } from "../utils/serverFetch";
import { useCookies } from "react-cookie";

const SignUp = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setemail] = useState("");
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const collectData = async () => {
    const data = { name, email, password };
    const respose = await unauthPost("/auth/register", data);

    if (respose && !respose.err) {
      console.log(respose);
      console.log(respose.token);
      const token = respose.token;
      const date = new Date();
      date.setDate(date.getDate() + 1);
      setCookie("token", token, { path: "/", expires: date });
      alert("success");
      navigate("/home");
    } else {
      alert(respose.message);
    }
  };

  return (
    <div>
      <div className="full w-screen h-screen bg-[#0f0f0f] flex">
        <div className="w-[880px] h-[680px] mt-9 flex justify-center items-center relative">
          <div>
            <p className="text-[#628eff]  text-[4rem] mb-[-4%] ">D-Tune</p>
            <p className="text-[5rem] text-white  ">Welcomes You !!</p>
            {/* <p className='text-[1.3rem] text-white underline mt-[-4%] ml-[1rem] '>Play the Beat !!</p> */}
          </div>
          <div className="w-[302px] h-[302px]   rounded-[50%] bg-gradient-to-b from-[#430356] to-[#0f0f0f] absolute ml-[90%] mt-[-52%]  "></div>
          <div className="w-[220px] h-[220px]   rounded-[50%]  bg-gradient-to-tl from-[#430356] to-[#0f0f0f] absolute ml-[200%]  mt-[69%] "></div>
        </div>
        <div className="frame1 w-[480px] h-[680px] border-[0.1px]  rounded-2xl end mt-14  z-[2] flex flex-col justify-center items-center">
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
        </div>
      </div>
    </div>
  );
};

export default SignUp;
