import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-full bg-[#0f0f0f] bg-opacity-75 z-50 flex justify-center items-center ">
      <div className="relative">
        <div className="w-16 h-16 bg-gradient-to-r from-[#c81d77] to-[#6710c2] rounded-full animate-ping"></div>
        <div className=" w-full h-full bg-gradient-to-r from-[#6710c2] to-[#c81d77] rounded-full opacity-50 animate-pulse"></div>
      </div>
    </div>
  );
};

export default Loader;
