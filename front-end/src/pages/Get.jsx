import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { authGet, unauthPost } from "../utils/serverFetch"; 
import axios from "axios";
import Loader from "../components/loader/Loader";
import SongContext from "../components/context";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";


const TokenRequest = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [error, setError] = useState(null);
  const {detail , setdetail} = useContext(SongContext);
  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies(["token"]);


  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const codeValue = params.get("code");
    console.log(codeValue);
    const finalCode = codeValue;

    if (finalCode) {
      fetchAccessToken(finalCode);
    }
  }, []);

  const fetchAccessToken = async (codeValue) => {
    try {
      const tokenEndpoint = "https://auth.delta.nitt.edu/api/oauth/token";
      const clientId = "AyNc3hK4wBdsnBtA"; 
      const clientSecret = "a~.nrEafu54su6uUGwc0qAf44H0iuCPT"; //process.env.REACT_APP_CLIENT_SECRET; 
      const redirectUri = "https://dtune.vercel.app/callback";

      const data = {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "authorization_code",
        code: codeValue, 
        redirect_uri: redirectUri,
      };

      const formUrlEncoded = new URLSearchParams(data).toString();

      const response = await axios.post("/api/oauth/token", formUrlEncoded, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      console.log(response.data);
      setAccessToken(response.data.access_token);
      nextToken(response.data.access_token);
    } catch (err) {
      setError(err);
      console.error("Error obtaining access token:", err);
    }
  };

  const nextToken = async (sentToken) => {
    await axios
      .get("/api/oauth/oidc/key")
      .then((response) => {
        let  userData = response.data;
        console.log(userData);
        secondToken(sentToken);
      })
      .catch((error) => {
        console.error("Error accessing user resources:", error);
      });
  };

  const secondToken = async (sentToken) => {
    const response = await fetch("/api/resources/user", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sentToken}`,
        },
    });

    const newres = await response.json();
    console.log(newres);
    setdetail(newres);
    collectData2(newres);
  };


  const collectData2 = async (newres) => {
    const data = { name : `${newres.name}`, email : `${newres.email}`, password : `${newres.id}`};
    const respose = await unauthPost("/auth/delta/login", data);

    if (respose && !respose.err) {
      console.log(respose);
      const token = respose;
      const date = new Date();
      date.setDate(date.getDate() + 1);
      setCookie("token", token, { path: "/", expires: date });
      toast.success("Login Successfull!!");
      navigate("/home");
    } else {
      alert(respose.message);
    }
  };


  return (
      <div className="full w-screen h-screen bg-[#0f0f0f] flex">
      < Loader />
    </div>
  );
};

export default TokenRequest;
