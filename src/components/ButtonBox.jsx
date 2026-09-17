import AnimatedBox from "@/common/animation/AnimatedBox";
import React from "react";

const ButtonBox = ({ name, url }) => {
  return (
    <AnimatedBox className="bg-primary   cursor-pointer w-max px-4 p-2 hover:opacity-80 text-black font-raleway font-medium border-none outline-none rounded-md">
      <a href={url}>{name}</a>
    </AnimatedBox>
  );
};

export default ButtonBox;
