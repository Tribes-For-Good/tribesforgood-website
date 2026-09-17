"use client";
import AnimatedBox from "@/common/animation/AnimatedBox";
import Image from "next/image";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import ApplyNowButton from "./ApplyNowButton";

const HeroSection = ({ open, setOpen, setDownloadType }) => {
  useEffect(() => {}, [open]);

  return (
    <section className="bg-[#1724A4] flex-1 w-full lg:py-[60px] py-[24px] overflow-hidden">
      <div className="mt-6">
        <div className="w-full lg:hidden px-6 py-5 flex items-center flex-col justify-center">
          {/* changed p-5 to px-6 py-5 for mobile padding */}
          <AnimatedBox
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <Image
              src="/assets/assets/hero/hero1.svg"
              width={10}
              height={10}
              className="w-[10rem] -translate-x-10 translate-y-10"
              alt=""
              priority
            />
          </AnimatedBox>
          <AnimatedBox
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            <Image
              src="/assets/assets/hero/hero2.svg"
              width={10}
              height={10}
              className="w-[10rem] translate-x-10 "
              alt=""
              priority
            />
          </AnimatedBox>
        </div>
        <AnimatedBox transition={{ duration: 0.5 }}>
          <div className="flex lg:hidden flex-col gap-3">
            <div className="font-raleway text-white px-6 font-extrabold text-[24px] text-center tracking-wide">
              {/* changed px-20 to px-6 for mobile heading */}
              School of Changemakers
            </div>
            <div className="font-mulish text-center text-[16px] px-6 text-white">
              Asia&apos;s first & largest online School of Changemakers with
              over 5000+ social impact heroes
            </div>
            <div className="flex justify-center gap-2 lg:gap-5 my-5 items-center lg:my-8 flex-col lg:flex-row">
              <ApplyNowButton url="https://docs.google.com/forms/d/e/1FAIpQLSdsd6fZUeQn5DW__-3y7uGoDsnTmVjlyaZ5YPNQABghGBKX5Q/viewform?embedded=true" />

              <AnimatedBox className="bg-gray-100 border-gray-300 border cursor-pointer w-max px-4 p-2 hover:opacity-80 font-raleway font-medium text-gray-700 outline-none rounded-md">
                <button
                  onClick={() => {
                    setDownloadType("brochure"); // NEW
                    setOpen(true);
                  }}
                >
                  Download Brochure
                </button>
              </AnimatedBox>
              <AnimatedBox className="bg-gray-100 border-gray-300 border cursor-pointer w-max px-4 p-2 hover:opacity-80 font-raleway font-medium text-gray-700 outline-none rounded-md">
                <button
                  onClick={() => {
                    window.location.href = "/innovators-hub";
                  }}
                >
                  GenZ Incubator
                </button>
              </AnimatedBox>
            </div>
          </div>
        </AnimatedBox>
      </div>
      <div className="lg:flex hidden px-8 py-8 items-center justify-center h-full">
        {/* changed p-8 to px-8 py-8 for desktop padding */}
        <div className="max-w-6xl px-8 py-8 flex flex-col gap-5 h-max items-center justify-center relative mx-auto w-full">
          {/* changed p-8 to px-8 py-8 for desktop inner box */}
          <AnimatedBox
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="absolute top-0 left-0"
          >
            <Image
              src="/assets/assets/hero/hero1.svg"
              width={10}
              height={10}
              className="w-[11rem] "
              alt=""
              priority
            />
          </AnimatedBox>
          <AnimatedBox
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="absolute top-0 right-0"
          >
            <Image
              src="/assets/assets/hero/hero2.svg"
              width={10}
              height={10}
              className="w-[12rem] "
              alt=""
              priority
            />
          </AnimatedBox>
          <AnimatedBox
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="absolute bottom-0 left-0"
          >
            <Image
              src="/assets/assets/hero/hero3.svg"
              width={10}
              height={10}
              className="w-[12rem] object-contain"
              alt=""
              priority
            />
          </AnimatedBox>
          <AnimatedBox
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="absolute bottom-0 right-0"
          >
            <Image
              src="/assets/assets/hero/hero4.svg"
              width={10}
              height={10}
              className="w-[11rem] "
              alt=""
              priority
            />
          </AnimatedBox>
          <AnimatedBox
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-10 justify-center "
          >
            <div className="flex flex-col gap-2">
              <div className="font-raleway text-white font-extrabold text-[60px] leading-[72px] max-w-lg text-center mx-auto tracking-wide">
                School of Changemakers
              </div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="font-mulish max-w-xl  text-center leading-[36px]  text-[24px] text-white"
              >
                Asia&apos;s first & largest online School of Changemakers with
                over 5000+ social impact heroes
              </motion.div>
            </div>
            <div className="flex justify-center gap-2 lg:gap-5 my-5 items-center lg:my-8 flex-col lg:flex-row">
              <ApplyNowButton url="https://docs.google.com/forms/d/e/1FAIpQLSdsd6fZUeQn5DW__-3y7uGoDsnTmVjlyaZ5YPNQABghGBKX5Q/viewform?embedded=true" />

              <button
                className="bg-gray-100 border-gray-300 border cursor-pointer w-max px-4 p-2 hover:opacity-80 font-raleway font-medium text-gray-700 outline-none rounded-md"
                onClick={() => {
                  setDownloadType("brochure"); // NEW
                  setOpen(true);
                }}
              >
                Download Brochure
              </button>
              <button
                className="bg-gray-100 border-gray-300 border cursor-pointer w-max px-4 p-2 hover:opacity-80 font-raleway font-medium text-gray-700 outline-none rounded-md"
                onClick={() => {
                  window.location.href = "/innovators-hub";
                }}
              >
                GenZ Incubator
              </button>
              {open && "hello"}
            </div>
          </AnimatedBox>
        </div>
      </div>
      {/* Remove this line since the modal is now handled in Dashboard */}
      {/* <EmailModal open={open} setOpen={setOpen} /> */}
    </section>
  );
};

export default HeroSection;
