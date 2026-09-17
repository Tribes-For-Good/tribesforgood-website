import AnimatedBox from "@/common/animation/AnimatedBox";
import React from "react";
import ApplyNowButton from "./ApplyNowButton";

const programs = [
  {
    title: "Global Challenges & Social Justice",
    description: [
      "For Aspiring Changemakers ready to experience the world of social impact",
      "Explore a diverse range of global issues, from socioeconomic to environmental causes.",
      "Blend theory with real-world insights, and problem-solving.",
      "Impactful, hands-on projects in a collaborative environment.",
      "1 month (3 classes a week, 1 hr at a fixed time) + 1 year mentorship",
      "INR 29,500 + gst",
    ],
    highlights:
      "Live Project, Virtual Field Visits and Mentor Support, Certificate and LOR*",
  },
  {
    title: "GenZ Incubator & Social Entrepreneurship",
    description: [
      "For advanced changewarriors to take your passion project or experience to the next level!",
      "Design and initiate local to pan-India interventions.",
      "Immersive program transitioning from vision to impact.",
      "Pursue awards for funding and global recognition of your solutions",
      "6 weeks (2/3 classes a week, 1 hr at a fixed time) + 1 year mentorship",
      "INR 38,000 + gst",
    ],
    highlights:
      "Social Impact Initiative, Field Visits and Mentor Support, Awards Certificate and LOR*",
  },
];

const GlobalChallenges = () => {
  return (
    <AnimatedBox>
      <div className="bg-hero-gradient px-5 py-10 lg:py-16">
        <h2 className="  text-[#1F2937] text-center text-[24px] lg:text-[32px] px-16 font-bold mb-3 lg:mb-8">
          Programs
        </h2>
        <div className="flex py-5 max-w-6xl mx-auto flex-col  md:flex-row gap-3 lg:gap-10  justify-between">
          {programs.map((program, index) => (
            <Card key={index} {...program} />
          ))}
        </div>
      </div>
    </AnimatedBox>
  );
};

const Card = ({ title, description, duration, fees, highlights }) => {
  return (
    <AnimatedBox className="bg-white  w-full overflow-hidden  shadow-custom border h-auto  flex flex-col p-3 lg:p-5 lg:px-8 rounded-2xl ">
      <h1 className="text-[20px] font-raleway pr-10 mb-6 lg:text-[24px] font-bold   lg:text-nowrap ">
        {title}
      </h1>
      <ul className="mb-4 px-5 text-muted lg:text-[16px] font-mulish pr-8 list-outside list-disc">
        {description.map((item, index) => (
          <AnimatedBox key={index}>
            <li key={index} className="mb-2 ">
              {item}
            </li>
          </AnimatedBox>
        ))}
      </ul>
      <AnimatedBox>
        <p className="text-[#1F2937] font-mulish my-4 mb-6">
          Highlights : {highlights}
        </p>
      </AnimatedBox>
      <div className="mt-auto">
        {" "}
        <ApplyNowButton url="https://docs.google.com/forms/d/e/1FAIpQLSdsd6fZUeQn5DW__-3y7uGoDsnTmVjlyaZ5YPNQABghGBKX5Q/viewform?embedded=true" />
      </div>
    </AnimatedBox>
  );
};

export default GlobalChallenges;
