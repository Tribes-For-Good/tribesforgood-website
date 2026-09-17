import AnimatedBox from "@/common/animation/AnimatedBox";
import React from "react";
import CalButton from "./CalButton";
import ApplyNowButton from "./ApplyNowButton";
import ButtonBox from "../ButtonBox";

const FindYourCourse = () => {
  return (
    <AnimatedBox className="bg-hero-gradient lg:bg-none px-5 py-8 lg:py-15 overflow-hidden">
      <h2 className="text-[#1F2937] text-center text-[24px] lg:text-[32px] px-12 font-bold mb-2 lg:mb-3">
        Find Your Course
      </h2>
      <p className="font-mulish max-w-4xl mx-auto text-muted text-center text-[16px] lg:text-[24px]">
        Schedule a call with us now to find a perfect course for you.
      </p>
      <div className="flex justify-center gap-2 lg:gap-5 my-5 my-5 items-center lg:my-8">
        <ButtonBox name="Write to us" url="/contact" />
        <ApplyNowButton url="https://docs.google.com/forms/d/e/1FAIpQLSdsd6fZUeQn5DW__-3y7uGoDsnTmVjlyaZ5YPNQABghGBKX5Q/viewform?embedded=true" />
      </div>
    </AnimatedBox>
  );
};

export default FindYourCourse;
