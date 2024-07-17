import { useState } from "react";
import { authPost } from "../utils/serverFetch";

const LikeIcon = ({ info, text }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isload, setIsload] = useState(true);

  const onLoad = async () => {
    const songId = info._id;
    const response = await authPost("/song/likestatus", { songId });
    if (response === "liked") {
      setIsLiked(true);
    }

    console.log(response);
  };

  if (isload) {
    onLoad();
    setIsload(false);
  }

  const handleLike = async (info, event) => {
    event.stopPropagation();
    const songId = info._id;
    let response;
    if (isLiked) {
      response = await authPost("/song/unlike", { songId });
      console.log(response);
      setIsLiked(false);
    } else {
      response = await authPost("/song/like", { songId });
      console.log(response);
      setIsLiked(true);
    }
  };

  return (
    <i
      className={`fa-regular fa-heart  mx-5 hover:text-pink-500 hover:cursor-pointer text-${text}`}
      style={isLiked ? { color: "#ec4899" } : null}
      onClick={(e) => handleLike(info, e)}
    ></i>
  );
};

export default LikeIcon;
