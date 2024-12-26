import React from "react";

import Lottie from "lottie-react";

import Data from "@/public/mshk-image-to-lottie.json";

function Loading() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen overflow-x-scroll">
      <Lottie className="w-[200px] sm:w-[400px]" animationData={Data} />
    </div>
  );
}

export default Loading;
