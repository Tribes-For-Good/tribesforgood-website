import AnimatedBox from "@/common/animation/AnimatedBox";
import Image from "next/image";
import React from "react";

const Data = () => {
  return (
    <div className="bg-[#FFFDF1] w-full p-[24px] overflow-hidden">
      <AnimatedBox transition={{ duration: 0.5 }}>
        <div className="max-w-6xl mx-auto  flex items-center  flex-col lg:flex-row  justify-between">
          <div className="gap-8 flex flex-wrap justify-center lg:flex-row lg:w-full lg:justify-between">
            <div className="flex min-w-48  gap-4 items-center ">
              <div className="flex items-center bg-gold w-[48px] lg:w-[80px] lg:h-[80px] h-[48px] justify-center rounded lg:rounded-xl ">
                <Image
                  alt=""
                  width={10}
                  height={10}
                  src="/assets/assets/data/changemakers.svg"
                  className="w-[32px] lg:w-[60px]"
                />
              </div>
              <div className="font-mulish text-[16px] lg:text-[24px] font-semibold">
                <div className="">5000+</div>
                <div>Changemakers</div>
              </div>
            </div>
            <div className="flex min-w-48 gap-4  items-center">
              <div className="flex items-center bg-primary w-[48px] lg:w-[80px] lg:h-[80px] h-[48px] justify-center rounded lg:rounded-xl ">
                <Image
                  alt=""
                  width={10}
                  height={10}
                  src="/assets/assets/data/countries.svg"
                  className="w-[32px] lg:w-[60px]"
                />
              </div>
              <div className="font-mulish flex-1 text-[16px] lg:text-[24px] font-semibold">
                <div className="">15+</div>
                <div>Countries</div>
              </div>
            </div>
            <div className="flex min-w-48 gap-4 items-center">
              <div className="flex items-center bg-green w-[48px] lg:w-[80px] lg:h-[80px] h-[48px] justify-center rounded lg:rounded-xl ">
                <Image
                  alt=""
                  width={10}
                  height={10}
                  src="/assets/assets/data/service.svg"
                  className="w-[32px] lg:w-[60px]"
                />
              </div>
              <div className="font-mulish text-[16px] lg:text-[24px] font-semibold">
                <div className="">71,500+</div>
                <div>Service hours</div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedBox>
    </div>
  );
};

export default Data;
