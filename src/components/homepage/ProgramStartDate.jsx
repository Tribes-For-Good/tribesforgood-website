import AnimatedBox from "@/common/animation/AnimatedBox";
import React from "react";
// import { PopupButton } from "react-calendly";
// import CalButton from "./CalButton";
// import ApplyNowButton from "./ApplyNowButton";
import ButtonBox from "../ButtonBox";
const ProgramStartDate = () => {
  return (
    <AnimatedBox className="bg-white px-5 py-10 lg:py-16 overflow-hidden">
      <h2 className="text-[#1F2937] text-center text-[24px] lg:text-[32px] px-12 font-bold mb-2 lg:mb-3">
        Program Start dates
      </h2>
      <p className="font-mulish max-w-4xl mx-auto text-muted text-center text-[16px] lg:text-[20px]">
        Students can choose from 4 week
        or 6 week options
      </p>
      <p className="font-mulish max-w-2xl mx-auto text-muted my-3 text-center text-[12px] lg:text-[18px]">
        1 March / 15 March / 1 April / 15 April / 1 May / 15 May / 1 June / 15 June / 1 July / 15 July
      </p>
      <div className="flex justify-center gap-2 lg:gap-5 my-5 items-center lg:my-8 flex-col lg:flex-row">
        <ButtonBox name="Write to us" url="/contact" />
      </div>
    </AnimatedBox>
  );
};

export default ProgramStartDate;
