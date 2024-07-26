import React, { useEffect, useState } from "react";
import { authPost } from "../utils/serverFetch";

const LikeIcon = ({ info, text }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      const songId = info._id;
      const response = await authPost("/song/likestatus", { songId });
      if (response === "liked") {
        setIsLiked(true);
      }
      setIsLoading(false);
    };

    fetchLikeStatus();
  }, [info._id]);

  const handleLike = async (event) => {
    event.stopPropagation();
    const songId = info._id;
    let response;
    if (isLiked) {
      response = await authPost("/song/unlike", { songId });
      setIsLiked(false);
    } else {
      response = await authPost("/song/like", { songId });
      setIsLiked(true);
    }
    console.log(response);
  };

  if (isLoading) {
    return <i className="fa-regular fa-heart mx-5 text-gray-500 animate-pulse"></i>;
  }

  return (
    <i
      className={`fa-heart mx-5 hover:text-pink-500 hover:cursor-pointer text-${text} ${
        isLiked ? "fa-solid text-pink-500" : "fa-regular"
      }`}
      onClick={handleLike}
    ></i>
  );
};

export default LikeIcon;
