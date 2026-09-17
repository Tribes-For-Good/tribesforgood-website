"use client";
import AnimatedBox from "@/common/animation/AnimatedBox";
import { useState } from "react";
import Image from "next/image";
import EmailModal from "@/components/modal/EmailModal"; // Import the modal

const ProgramSchedule = () => {
  const [openModal, setOpenModal] = useState(false); // Modal state

  return (
    <>
      {/* Email Modal for both desktop and mobile */}
      <EmailModal
        open={openModal}
        setOpen={setOpenModal}
        downloadType="program-schedule"
      />

      <AnimatedBox className="max-w-7xl hidden lg:flex items-center justify-center p-5 py-10 lg:py-16 lg:justify-between  flex-col-reverse lg:flex-row gap-2 mx-auto">
        <div className="w-full  lg:px-5 flex flex-col items-center lg:items-start ">
          <AnimatedBox className="  text-[#1F2937]  text-[24px] lg:text-[32px]  font-bold mb-1 lg:mb-3">
            Program Schedule
          </AnimatedBox>
          <AnimatedBox className="font-mulish max-w-md text-muted text-center lg:text-left text-[16px] lg:text-[20px]">
            Enter your email address & then click below to download the full
            schedule in PDF format.
          </AnimatedBox>
          <div className="flex w-full max-w-lg flex-col gap-5 my-8 lg:my-10">
            {/* file */}
            <AnimatedBox className="bg-white flex items-center justify-between shadow-custom border p-3 rounded-lg lg:rounded-xl">
              <div className="flex gap-3 lg:gap-5 items-center ">
                <div className="flex bg-gold w-[32px] h-[32px] lg:w-[48px] lg:h-[48px] items-center rounded-md justify-center">
                  <Image
                    alt=""
                    height={10}
                    width={10}
                    className="w-[24px] h-[24px] lg:w-[32px] lg:h-[32px] object-cover"
                    src="/assets/assets/program/file.svg"
                  />
                </div>
                <div className="font-mulish">
                  <div className="text-[14px] font-medium lg:font-semibold  lg:text-[20px]">
                    Programschedule.pdf
                  </div>
                  <div className="text-[14px] font-light lg:text-[20px] text-muted ">
                    24.6 MB
                  </div>
                </div>
              </div>
            </AnimatedBox>
            {/* button */}
            <AnimatedBox
              className="bg-primary cursor-pointer w-max px-4 p-2 hover:opacity-80 text-black font-raleway font-medium border-none outline-none rounded-md"
              onClick={() => {
                setOpenModal(true);
              }}
            >
              Download
            </AnimatedBox>
          </div>
        </div>
        <AnimatedBox className="w-full mb-16  transform lg:-translate-y-5 lg:mb-0">
          <div className="relative w-[300px] h-[220px] lg:w-[34rem] mx-auto lg:ml-auto lg:h-[400px] ">
            {/* Background Layers */}
            <div className="relative top-0 left-1/2 -translate-x-1/2  right-0  h-1/2 bg-green !w-[75%] rounded-lg  -z-20"></div>
            <AnimatedBox
              initial={{ y: 0 }}
              whileInView={{ y: 20 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="absolute top-0 left-0 right-0 m-auto w-[90%] h-1/2 bg-yellow-200  rounded-lg transform translate-y-0 -z-10"
            ></AnimatedBox>

            {/* Main Content */}
            <AnimatedBox
              initial={{ y: 0 }}
              whileInView={{ y: 40 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="absolute top-0 left-0 right-0 m-auto translate-y-0 w-full h-full rounded-lg overflow-hidden z-0"
            >
              <Image
                alt=""
                height={10}
                width={10}
                className="w-full h-full object-cover"
                src="/assets/assets/program/image.svg"
              />
            </AnimatedBox>
          </div>
        </AnimatedBox>
      </AnimatedBox>

      {/* MOBILE VIEW */}
      <AnimatedBox className="flex lg:hidden flex-col items-center justify-center p-5 py-10 gap-2 mx-auto">
        <AnimatedBox className="  text-[#1F2937]  text-[24px] lg:text-[32px]  font-bold mb-1 lg:mb-3">
          Program Schedule
        </AnimatedBox>
        <AnimatedBox className="font-mulish max-w-md text-muted text-center lg:text-left text-[16px] lg:text-[20px]">
          Enter your email address & then click below to download the full
          schedule in PDF format.
        </AnimatedBox>
        <div className="flex w-full max-w-lg  flex-col gap-5 my-8 lg:my-10">
          {/* file */}
          <AnimatedBox className="bg-white flex items-center  justify-between shadow-custom border p-3 rounded-lg lg:rounded-xl">
            <div className="flex gap-3 lg:gap-5 items-center ">
              <div className="flex bg-gold w-[32px] h-[32px] lg:w-[48px] lg:h-[48px] items-center rounded-md justify-center">
                <Image
                  alt=""
                  height={10}
                  width={10}
                  className="w-[24px] h-[24px] lg:w-[32px] lg:h-[32px] object-cover"
                  src="/assets/assets/program/file.svg"
                />
              </div>
              <div className="font-mulish">
                <div className="text-[14px] font-medium lg:font-semibold  lg:text-[20px]">
                  Programschedule.pdf
                </div>
                <div className="text-[14px] font-light lg:text-[20px] text-muted ">
                  24.6 MB
                </div>
              </div>
            </div>
          </AnimatedBox>
          {/* button */}
          <AnimatedBox
            className="bg-primary cursor-pointer w-max mx-auto px-4 p-2 hover:opacity-80 text-black font-raleway font-medium border-none outline-none rounded-md"
            onClick={() => setOpenModal(true)}
          >
            Download
          </AnimatedBox>
        </div>
      </AnimatedBox>
    </>
  );
};

export default ProgramSchedule;
