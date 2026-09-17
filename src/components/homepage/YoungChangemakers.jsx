import AnimatedBox from "@/common/animation/AnimatedBox";
import Image from "next/image";
import React from "react";

const data = [
  {
    desk: "/assets/assets/young-changemakers/naisha.svg",
    mobile: "/assets/assets/young-changemakers/naishamob.svg",
  },
  {
    desk: "/assets/assets/young-changemakers/shreyaan.svg",
    mobile: "/assets/assets/young-changemakers/shreyaanmob.svg",
  },
  {
    desk: "/assets/assets/young-changemakers/luupeta.svg",
    mobile: "/assets/assets/young-changemakers/luupetamob.svg",
  },
  {
    desk: "/assets/assets/young-changemakers/anahita.svg",
    mobile: "/assets/assets/young-changemakers/anahitamob.svg",
  },
];

const YoungChangemakers = () => {
  return (
    <AnimatedBox>
      <div className="lg:bg-hero-gradient bg-white px-5 py-10 lg:py-16">
        <h2 className="text-[#1F2937] text-center text-[24px] lg:text-[32px] px-12 font-bold mb-2 lg:mb-5">
          Young Changemakers Paving the way for Social Impact
        </h2>
        <p className="font-mulish max-w-4xl mx-auto text-muted text-center text-[16px] lg:text-[20px]">
          Think superheroes, but in real life. Our changemakers are paving the
          way for a brighter and more equitable future.
        </p>
        <div className="flex gap-10 my-10 lg:my-12 flex-wrap items-center justify-center">
          {data.map((image, i) => {
            return (
              <AnimatedBox key={i}>
                <Image
                  alt=""
                  src={image.desk}
                  width={10}
                  height={10}
                  className="lg:w-[271px] lg:block hidden lg:h-[484px] "
                />
                <Image
                  alt=""
                  src={image.mobile}
                  width={10}
                  height={10}
                  className=" lg:hidden  w-[360px] w-full  "
                />
              </AnimatedBox>
            );
          })}
        </div>
      </div>
    </AnimatedBox>
  );
};

export default YoungChangemakers;
