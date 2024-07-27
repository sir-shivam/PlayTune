import React, { useEffect, useState } from "react";
import { authPost } from "../utils/serverFetch";

const LikeIcon = ({ info, text , setlikes  }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading1, setisloading1] = useState(false);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const songId = info._id;
        const response = await authPost("/song/likestatus", { songId });
        console.log(response)
        if (response === "liked") {
          setIsLiked(true);
        }
      } catch (error) {
        console.error("Error fetching like status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLikeStatus();
  }, [info._id]);

  const handleLike = async (event) => {
    event.stopPropagation();
    setisloading1(true);

    const songId = info._id;
    try {
      let response;
      if (isLiked) { 
        response = await authPost("/song/unlike", { songId });
        console.log(songId)
        setlikes(response.likes.length)

        setIsLiked(false);
      } else {
        response = await authPost("/song/like", { songId });
        console.log(response.likes.length)
        setlikes(response.likes.length)
        setIsLiked(true);
        
      }
      console.log(response);
    } catch (error) {
      console.error("Error updating like status:", error);
    }finally{
      setisloading1(false);
    }
  };

  if (isLoading) {
    return <i className="fa-regular fa-heart mx-5 text-xl text-gray-500 animate-pulse"></i>;
  }

  return (
    isLoading1 ? 
    <div className="mx-5 h-5 w-5 text-3xl text-gray-500 rounded-full border border-t-2 animate-spin"></div> 
    : 
    <i
      className={`fa-heart mx-5 hover:text-pink-500 hover:cursor-pointer text-${text} ${
        isLiked ? "fa-solid text-pink-500" : "fa-regular"
      }`}
      onClick={handleLike}
    ></i>
  );


};

export default LikeIcon;
