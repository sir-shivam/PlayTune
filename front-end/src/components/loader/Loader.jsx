import React from "react";

const Loader = () => {
  return (
    <div class=" w-full h-full bg-gray-900 bg-opacity-10 z-50 flex justify-center items-center">
      <div class="w-10 h-10 rounded-full border border-white border-t-[3px] border-opacity-75 animate-spin"></div>
    </div>
  );
};

export default Loader;
