import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { unauthPost } from "../utils/serverFetch";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [cookies, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const collectData = async () => {
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

  return (
    <div>
      <div className="full w-screen h-screen bg-[#0f0f0f] flex">
        <div className="w-[880px] h-[680px] mt-9 flex justify-center items-center relative">
          <div>
            <p className="text-[5rem] text-white ">Welcome Back.!</p>
          </div>
          <div className="w-[302px] h-[302px]   rounded-[50%] bg-gradient-to-b from-[#430356] to-[#0f0f0f] absolute ml-[90%] mt-[-52%]  "></div>
          <div className="w-[220px] h-[220px]   rounded-[50%]  bg-gradient-to-tl from-[#430356] to-[#0f0f0f] absolute ml-[200%]  mt-[69%] "></div>
        </div>
        <div className="frame1 w-[480px] h-[680px] border-[0.1px]  rounded-2xl end mt-14  z-[2] flex flex-col justify-center items-center">
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
        </div>
      </div>
    </div>
  );
};

export default Login;
