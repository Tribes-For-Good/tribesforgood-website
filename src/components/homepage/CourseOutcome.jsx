import AnimatedBox from "@/common/animation/AnimatedBox";
import React from "react";
import CalButton from "./CalButton";
import { PopupButton, PopupWidget } from "react-calendly";
import CalendlyEmbed from "./CalButton";
import ApplyNowButton from "./ApplyNowButton";

const CourseOutcome = () => {
  return (
    <AnimatedBox className="bg-hero-gradient hidden lg:block  py-10 lg:py-16">
      <h2 className="text-[#1F2937] px-5 text-center text-[24px] lg:text-[32px] px-12 font-bold mb-2 lg:mb-5">
        Course outcome
      </h2>
      <p className="font-mulish max-w-4xl px-5 mx-auto text-muted text-center text-[16px] lg:text-[20px]">
        Real-World Impact and Changemaking Skills
      </p>
      <div className="max-w-7xl mx-auto mt-8 my-5 px-5 ">
        <div className="flex flex-col text-muted text-[24px] font-mulish gap-5">
          <AnimatedBox className="text-center">
            Our School of Changemakers brings meaningful, hands-on projects into
            the classroom that have real, visible impact within just a few
            weeks. Learners gain confidence in presenting their ideas, public
            speaking, and build strong, impactful connections with the
            communities pan India. Our program supports students in becoming
            “micro-influencers” who drive positive change in their communities.
          </AnimatedBox>
          <AnimatedBox className="text-center">
            Exceptional student-led projects receive incubation and support at
            TribesforGOOD, creating pathways for continued growth and success.
            The program also focusses on intent, creative leadership, design
            thinking, lean data analysis and social entrepreneurship.
          </AnimatedBox>
        </div>
        {/* <div className="flex justify-center gap-2 lg:gap-5 my-5 my-5 items-center lg:my-8 flex-col lg:flex-row">
          <AnimatedBox className="bg-primary   cursor-pointer w-max px-4 p-2 hover:opacity-80 text-black font-raleway font-medium border-none outline-none rounded-md">
            <CalButton />
          </AnimatedBox>

          <ApplyNowButton url="https://docs.google.com/forms/d/e/1FAIpQLSdsd6fZUeQn5DW__-3y7uGoDsnTmVjlyaZ5YPNQABghGBKX5Q/viewform?embedded=true" />
        </div> */}
      </div>
    </AnimatedBox>
  );
};

export default CourseOutcome;
