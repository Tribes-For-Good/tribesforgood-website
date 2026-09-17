import AnimatedBox from "@/common/animation/AnimatedBox";
import Image from "next/image";
import React from "react";

const ProjectSelection = () => {
  return (
    <AnimatedBox className="bg-white hidden lg:block px-5 py-10 lg:py-16 overflow-hidden">
      <h2 className="text-[#1F2937] text-center text-[24px] lg:text-[32px] px-12 font-bold mb-2 lg:mb-3">
        Project Selection
      </h2>
      <div className="max-w-7xl my-5 flex items-center justify-center gap-10 mx-auto">
        <div className="font-mulish flex flex-col font-semibold text-[20px]">
          <div className="flex">
            <AnimatedBox
              initial={{ x: -30, y: -30 }}
              whileInView={{ x: 0, y: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="w-[240px] translate-y-4 translate-x-4 bg-[#F1DD7480] opacity-50 h-[240px] rounded-full flex items-center justify-center">
                <div className="w-[189px] text-center">Passions</div>
              </div>
            </AnimatedBox>
            <AnimatedBox
              initial={{ x: 30, y: -30 }}
              whileInView={{ x: 0, y: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="w-[240px] translate-y-4 -translate-x-4 bg-[#44D9E666] opacity-40 h-[240px] rounded-full flex items-center justify-center">
                <div className="w-[189px] text-center">Skillset</div>
              </div>
            </AnimatedBox>
          </div>
          <div className="flex">
            <AnimatedBox
              initial={{ x: -30, y: 30 }}
              whileInView={{ x: 0, y: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="w-[240px] -translate-y-4 translate-x-4 bg-[#44D9E666] opacity-40 h-[240px] rounded-full flex items-center justify-center">
                <div className="w-[189px] text-center">Subject Interest</div>
              </div>
            </AnimatedBox>
            <AnimatedBox
              initial={{ x: 30, y: 30 }}
              whileInView={{ x: 0, y: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="w-[240px] -translate-y-4 -translate-x-4 bg-[#F1DD7480] opacity-50 h-[240px] rounded-full flex items-center justify-center">
                <div className="w-[141px] text-center">Past achievements</div>
              </div>
            </AnimatedBox>
          </div>
        </div>
        <AnimatedBox
          initial={{ x: -80 }}
          whileInView={{ x: 0 }}
          transition={{ duration: 1 }}
        >
          <Image
            src="/assets/assets/arrow/arrow1.svg"
            className="w-32"
            width={10}
            height={10}
            alt=""
          />
        </AnimatedBox>
        <AnimatedBox
          initial={{ x: 80 }}
          whileInView={{ x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="p-5 bg-white border border-gold font-semibold text-[24px] font-raleway h-max max-w-60  rounded-md text-center">
            Social Impact Live project
          </div>
        </AnimatedBox>
      </div>
    </AnimatedBox>
  );
};

export default ProjectSelection;
