import AnimatedBox from "@/common/animation/AnimatedBox";
import BulletPoint from "@/components/BulletPoint";
import ApplyNowButton from "@/components/homepage/ApplyNowButton";
import Footer from "@/components/homepage/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import React from "react";

const contentData = {
  sectionTwo: [
    {
      title: "Build & Test",
      subHeading: "",
      description1: [
        "Every year, young people share brilliant ideas to solve pressing global problems. But here’s the truth:",
        "Most of them never make it past the whiteboard. They’re too raw. Too untested. Or built without a connection to the communities they aim to serve.",
      ],
      list: [
        {
          title: "We’re here to change that.",
          bullet: [
            "The GenZ Innovators Hub is where students turn vision into action, creating real, ethical, and scalable solutions, tested directly in communities that need them. Over 6 weeks, students in groups identify real-world problems, create hyper-local solutions, and pilot their ideas with support from social sector leaders, designers, and industry mentors. Whether the focus is on tech to change the world, inclusion in makeup and beauty standards, providing access to healthcare, or driving climate resilience and sustainability, students leave not just with a working prototype—but with proof of what’s possible. We don’t need more ideas. We need more responsible problem-solvers—people who can build solutions that are ethical, feasible, and ready for scale. The GenZ Innovators Hub gives young people the mindset, tools, and testing ground to do just that. This is where values meet action",
          ],
        },
        {
          title: "What Makes This Different?",
          bullet: [
            "Build and test a real prototype in local communities.",
            "Design with ethics at the core.",
            "Get mentored by industry experts & social leaders without losing your spark",
            "Work in teams of 3–5 on real-world problems.",
          ],
        },
      ],
      description2:
        "Whether you’re a curious explorer, seeking personal growth or looking for a chance to make real impact, join us on this incredible transformative journey and be part of something bigger!",
      buttonName: "Write to us",
      buttonUrl: "",
    },
  ],
};

const MiddleSection = () => {
  return (
    <div className="overflow-hidden relative flex flex-col  items-center justify-center">
      <div className="w-full pt-[20px] lg:pt-[40px] bg-hero-gradient overflow-hidden">
        {contentData?.sectionTwo?.map((section, i) => {
          return <ContentComponent key={i} data={section} index={i} />;
        })}
      </div>
    </div>
  );
};

export default MiddleSection;

const ContentComponent = ({ data, index }) => {
  return (
    <AnimatedBox className={`${index % 2 === 0 ? "" : "bg-white"} w-full`}>
      <div
        className={` p-5 flex flex-col max-w-6xl mx-auto items-center w-full  justify-center gap-4 lg:gap-8`}
      >
        <div className="flex  flex-col lg:gap-2 gap-1">
          <div className="font-raleway text-center font-bold lg:text-[32px]">
            {data?.title}
          </div>
          <div className="flex flex-col text-muted text-[14px] lg:text-[20px] font-mulish gap-5">
            <AnimatedBox className="text-left  lg:leading-[30px] lg:text-center">
              {data?.subHeading}
            </AnimatedBox>
          </div>
        </div>
        <div className="text-muted flex text-[14px] lg:text-[20px] flex-col gap-3">
          {data?.description1?.map((desc, i) => {
            return (
              <AnimatedBox
                className="text-left  lg:leading-[30px] lg:text-center"
                key={i}
              >
                {desc}
              </AnimatedBox>
            );
          })}
        </div>
        {data?.list?.map((item, i) => (
          <AnimatedBox
            key={i}
            className="flex w-full mt-8 flex-col gap-2 lg:gap-6"
          >
            <div className="font-mulish text-center font-semibold lg:text-[24px] lg:leading-[36px]">
              {item?.title}
            </div>
            <div className="flex w-full flex-col lg:gap-4 gap-4">
              {item?.title === "We’re here to change that." ? (
                <p className="flex-1 font-mulish font-medium text-muted text-[14px] lg:text-[20px] lg:leading-[30px]">
                  {item?.bullet?.join(" ")}
                </p>
              ) : (
                item?.bullet?.map((bullet, j) => (
                  <BulletPoint key={j} data={{ description: bullet }} />
                ))
              )}
            </div>
          </AnimatedBox>
        ))}
      </div>
    </AnimatedBox>
  );
};
