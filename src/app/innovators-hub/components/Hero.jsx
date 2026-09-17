"use client";
import AnimatedBox from "../../../common/animation/AnimatedBox";
import ApplyNowButton from "../../../components/homepage/ApplyNowButton";
import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";

const HeroSectionNewPage = ({ open, setOpen }) => {
  return (
    <section className="bg-[#1724A4] flex-1 w-full lg:py-[60px] py-[24px] overflow-hidden">
      <div className="mt-6">
        <div className="w-full  lg:hidden p-5 flex items-center flex-col justify-center ">
          <AnimatedBox
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <Image
              src="/assets/assets/innovators-hub/hero-image1.svg"
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
              src="/assets/assets/innovators-hub/hero-image4.svg"
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
              GenZ Innovators Hub – Social Impact Edition
            </div>
            <div className="font-mulish text-center text-white text-[16px] px-6">
              Where Values Meet Action
              <br />
              <span className="text-[12px]"> Powered by TribesforGOOD </span>
            </div>
            <div className="flex justify-center gap-2 lg:gap-5 my-5 items-center lg:my-8 flex-col lg:flex-row">
              <ApplyNowButton url="https://docs.google.com/document/d/1flLv7b1DNiAujaUApuG3KIe4F1TMUFMpfssLNbdNfnQ/edit?tab=t.0" />

              <AnimatedBox className="bg-gray-100 border-gray-300 border cursor-pointer w-max px-4 p-2 hover:opacity-80 font-raleway font-medium text-gray-700 outline-none rounded-md">
                <button
                  onClick={() => setOpen(true)} // Now using the prop from parent
                >
                  Download Brochure
                </button>
              </AnimatedBox>
            </div>
          </div>
        </AnimatedBox>
      </div>
      <div className="lg:flex hidden items-center justify-center h-full">
        <div className="max-w-6xl p-10 flex flex-col gap-5 h-max items-center justify-center relative  mx-auto w-full">
          <AnimatedBox
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="absolute top-0 left-0"
          >
            <Image
              src="/assets/assets/innovators-hub/hero-image2.svg"
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
              src="/assets/assets/innovators-hub/hero-image1.svg"
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
              src="/assets/assets/innovators-hub/hero-image3.svg"
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
              src="/assets/assets/innovators-hub/hero-image4.svg"
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
              <div className="font-raleway text-white font-extrabold text-[60px] leading-[72px] max-w-2xl text-center mx-auto tracking-wide">
                GenZ Innovators Hub <br />
                Social Impact Edition
              </div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="font-mulish max-w-xl  text-center leading-[36px]  text-[24px] text-white"
              >
                Where Values Meet Action
                <br />
                <span className="text-[18px]"> Powered by TribesforGOOD </span>
              </motion.div>
            </div>
            <div className="flex justify-center gap-2 lg:gap-5 my-5 items-center lg:my-0 flex-col lg:flex-row">
              <ApplyNowButton url="https://docs.google.com/forms/d/e/1FAIpQLSdsd6fZUeQn5DW__-3y7uGoDsnTmVjlyaZ5YPNQABghGBKX5Q/viewform?embedded=true" />

              <button
                className="bg-gray-100 border-gray-300 border cursor-pointer w-max px-4 p-2 hover:opacity-80 font-raleway font-medium text-gray-700 outline-none rounded-md"
                onClick={() => setOpen(true)}
              >
                Download Brochure
              </button>
            </div>
          </AnimatedBox>
        </div>
      </div>

      {/* Remove this line since the modal is now handled in Dashboard */}
      {/* <EmailModal open={open} setOpen={setOpen} /> */}
    </section>
  );
};

export default HeroSectionNewPage;
