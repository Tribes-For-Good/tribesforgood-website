"use client";
import AnimatedBox from "@/common/animation/AnimatedBox";
import BulletPoint from "@/components/BulletPoint";
import ButtonBox from "@/components/ButtonBox";
import ApplyNowButton from "@/components/homepage/ApplyNowButton";
import CalButton from "@/components/homepage/CalButton";
import Footer from "@/components/homepage/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const ChangeMakerComponent = ({ optionData, contentData, slug }) => {
  const [selectedOption, setSelectedOption] = useState(
    slug || optionData[0].key,
  );

  useEffect(() => {
    if (slug) {
      setSelectedOption(slug);
    }
  }, [slug]);
  return (
    <div className="overflow-hidden relative flex flex-col  items-center justify-center">
      <Navbar />
      <div className="w-full">
        <div className="relative w-full min-h-[200px] justify-center lg:min-h-[400px]  flex items-center bg-[url('/assets/assets/background.svg')]  bg-cover bg-center">
          {/* <Image width={10} height={10} alt="" src="/assets/assets/background.svg" className="border w-full object-cover" /> */}
          <div className="max-w-md  lg:max-w-3xl py-16 pt-20 flex flex-col gap-2 w-full lg:gap-5 items-center justify-center">
            <AnimatedBox>
              <h1 className="font-extrabold  text-[20px] lg:text-[48px] font-raleway">
                {contentData?.title}
              </h1>
            </AnimatedBox>
            <AnimatedBox>
              <p className="font-mulish  w-full   px-10 text-center text-muted text-[14px] lg:text-[20px]">
                {contentData?.description}
              </p>
            </AnimatedBox>
          </div>
        </div>
      </div>

      <div className="flex px-5 lg:gap-2 gap-1  lg:justify-center justify-start mt-5 overflow-x-auto py-4 pb-6 w-full scroll-hidden ">
        {optionData?.map((button, i) => {
          return (
            <div
              key={i}
              onClick={() => setSelectedOption(button?.key)}
              className={`${
                selectedOption === button?.key
                  ? "bg-primary  font-bold"
                  : " bg-white"
              }  p-2 rounded-full shadow-btn-shadow border text-[#1f2937] text-[12px] lg:text-[20px] px-2 font-raleway  cursor-pointer text-nowrap  w-max`}
            >
              {button?.name}
            </div>
          );
        })}
      </div>

      <ContentComponent data={contentData[selectedOption]} />
      <Footer />
    </div>
  );
};

export default ChangeMakerComponent;

const ContentComponent = ({ data }) => {
  return (
    <AnimatedBox className="w-full">
      <AnimatedBox className="w-full">
        <div className="max-w-6xl px-5 lg:p-0 mx-auto overflow-hidden py-[24px] lg:py-[40px]">
          <div className="flex gap-4 lg:gap-16 flex-col lg:flex-row ">
            <div className="flex lg:hidden flex-col items-center gap-1 lg:gap-4">
              <div className="flex  flex-col gap-1 lg:gap-2">
                <div className="font-raleway font-bold text-[20px] lg:text-[32px]">
                  {data?.sectionOne?.title}
                </div>
                <div className="font-mulish  text-[14px] font-semibold flex items-center justify-center gap-2 text-green lg:text-[20px]">
                  <Image
                    src="/assets/assets/timer.svg"
                    width={10}
                    height={10}
                    alt=""
                    className="w-[20px]"
                  />
                  {data?.sectionOne?.time}
                </div>
              </div>
              <div className="text-[14px] font-mulish text-[#1f2937] lg:text-[20px]">
                {data?.sectionOne?.goal}
              </div>
            </div>
            <Image
              src={data?.sectionOne?.image}
              width={420} // set to your actual image width
              height={420} // set to your actual image height
              alt=""
              className="lg:w-[420px] mx-auto lg:h-[420px] max-w-sm rounded-lg lg:rounded-xl object-cover lg:max-w-none w-full"
            />
            <div className="flex flex-col justify-between ">
              <div className="flex flex-col gap-1 lg:gap-6">
                <div className=" hidden lg:flex flex-col gap-1 lg:gap-4">
                  <div className="flex  flex-col gap-1 lg:gap-2">
                    <div className="font-raleway font-bold text-[20px] lg:text-[32px]">
                      {data?.sectionOne?.title}
                    </div>
                    <div className="font-mulish  text-[14px] font-semibold flex items-center  gap-2 text-green lg:text-[20px]">
                      <Image
                        src="/assets/assets/timer.svg"
                        width={10}
                        height={10}
                        alt=""
                        className="w-[20px]"
                      />
                      {data?.sectionOne?.time}
                    </div>
                  </div>
                  <div className="text-[14px] font-mulish text-[#1f2937] lg:text-[20px]">
                    {data?.sectionOne?.goal}
                  </div>
                </div>
                <div className="lg:text-[20px] text-[14px] text-muted lg:leading-[30px]">
                  {data?.sectionOne?.description}
                </div>
                {/* Challenge Note above buttons */}
                {data?.sectionTwo?.challengeNote && (
                  <div className="mt-2 lg:text-[20px] text-[14px] text-muted font-normal">
                    {data.sectionTwo.challengeNote}
                  </div>
                )}
              </div>
              <div className=" mt-4 flex gap-2 lg:gap-4 flex-wrap ">
                <ApplyNowButton />{" "}
                <AnimatedBox className="bg-white border-primary border  cursor-pointer w-max px-4 p-2 hover:opacity-80  font-raleway font-medium text-primary outline-none rounded-md">
                  <a href="https://drive.google.com/file/d/1iCBC5IGvGdHGpO4PmQht-hETW9mLO840/view">
                    Download Brochure
                  </a>
                </AnimatedBox>
              </div>
            </div>
          </div>
        </div>
      </AnimatedBox>

      <AnimatedBox className="w-full">
        <div className="max-w-6xl px-5 lg:p-0 mx-auto overflow-hidden flex flex-col gap-4 lg:gap-6 py-[24px] lg:py-[40px]">
          {data?.sectionTwo?.description?.map((desc, i) => {
            return (
              <div
                key={i}
                className="lg:text-[20px] text-[14px] text-muted lg:leading-[30px]"
              >
                {desc}
              </div>
            );
          })}
        </div>
      </AnimatedBox>
      {/* Section Three: Sports and Gender Belief */}
      <AnimatedBox className="w-full bg-hero-gradient">
        <div className="max-w-6xl px-5 lg:p-0 mx-auto overflow-hidden flex flex-col gap-8 py-[24px] lg:py-[40px]">
          {/* Section Three */}
          <div className="flex flex-col gap-4">
            <div className="font-raleway font-bold text-[20px] lg:text-[32px]">
              {data?.sectionThree?.title}
            </div>
            <div className="flex flex-col gap-2 lg:gap-4">
              {data?.sectionThree?.bullet?.map((bullet, i) => (
                <BulletPoint data={{ description: bullet }} key={i} />
              ))}
            </div>
          </div>
          {/* Project Outcomes for sports-inclusion */}
          {data?.sectionProjectOutcomes && (
            <div className="flex flex-col gap-4 mt-6">
              <div className="font-raleway font-bold text-[20px] lg:text-[32px]">
                {data.sectionProjectOutcomes.title}
              </div>
              <div className="flex flex-col gap-2 lg:gap-4">
                {data.sectionProjectOutcomes.bullet.map((bullet, i) => (
                  <BulletPoint data={{ description: bullet }} key={i} />
                ))}
              </div>
            </div>
          )}
          <ApplyNowButton />
        </div>
      </AnimatedBox>

      {data?.sectionFour && (
        <AnimatedBox className="w-full bg-white">
          <div className="max-w-6xl  px-5 lg:p-0 mx-auto overflow-hidden flex flex-col gap-8 py-[24px] lg:py-[40px]">
            <div className="flex flex-col gap-5 lg:gap-8">
              <div className="font-raleway text-center font-bold text-[20px] lg:text-[32px]">
                {data?.sectionFour?.title}
              </div>
              <div className="flex flex-col gap-4 lg:gap-8">
                {/* Instagram Embed */}
                {data?.sectionFour?.instagram && (
                  <div className="py-12 px-4">
                    {/* Instagram Grid */}
                    <div className="max-w-7xl mx-auto">
                      <div className="flex justify-center">
                        {data.sectionFour.instagram.map(({ url }, i) => {
                          const thumbnail =
                            "/assets/assets/changemakers/Thumbnail.png";

                          return (
                            <div
                              key={i}
                              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 p-1 shadow-lg"
                            >
                              <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block relative overflow-hidden rounded-xl bg-white"
                              >
                                {/* Image Container */}
                                <div className="relative overflow-hidden bg-gray-100 max-w-sm">
                                  <img
                                    src={thumbnail}
                                    alt={`Instagram Reel ${i + 1}`}
                                    className="w-full h-auto object-contain"
                                    loading="lazy"
                                  />

                                  {/* Gradient Overlay */}
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                  {/* Instagram Icon */}
                                  <div className="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                    <svg
                                      className="w-4 h-4 text-pink-600"
                                      fill="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                  </div>

                                  {/* Play Button for Reels */}
                                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                    <div className="bg-white/95 backdrop-blur-sm rounded-full p-4 shadow-lg">
                                      <svg
                                        className="w-6 h-6 text-pink-600 ml-1"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path d="M8 5v14l11-7z" />
                                      </svg>
                                    </div>
                                  </div>
                                </div>

                                {/* Content Footer */}
                                <div className="p-4 bg-white">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-900">
                                      Instagram Reel
                                    </span>
                                    <div className="flex items-center gap-1 text-pink-600">
                                      <span className="text-xs font-medium">
                                        View
                                      </span>
                                      <svg
                                        className="w-3 h-3"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                                        />
                                      </svg>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
                {/* ...existing YouTube embed code... */}
                {data?.sectionFour?.youtubeUrl?.shorts && (
                  <div className="flex lg:flex-row mx-auto w-full justify-center items-center  lg:max-w-none max-w-md flex-col gap-4 lg:gap-8">
                    {data?.sectionFour?.youtubeUrl?.shorts.map(({ url }, i) => {
                      return (
                        <iframe
                          key={i}
                          width="288"
                          height="472"
                          src={url}
                          frameBorder="0"
                          className="w-full max-w-[200px] lg:w-[288px] border border h-[300px] lg:h-[472px] rounded-xl"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      );
                    })}
                  </div>
                )}
                <div className="flex mx-auto justify-center lg:flex-row w-full lg:max-w-none max-w-sm lg:gap-8 flex-col gap-4 ">
                  {data?.sectionFour?.youtubeUrl?.video?.map(({ url }, i) => {
                    return (
                      <iframe
                        key={i}
                        width="574"
                        height="386"
                        src={url}
                        frameBorder="0"
                        className="max-w-[574px] w-full  h-[194px] lg:h-[386px] rounded-xl"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </AnimatedBox>
      )}

      <AnimatedBox className="w-full bg-hero-gradient">
        <div className="max-w-6xl  px-5 lg:p-0 mx-auto overflow-hidden flex flex-col gap-8 py-[24px] lg:py-[40px]">
          <div className="flex flex-col gap-5 lg:gap-8">
            <div className="flex items-center mx-auto lg:flex-row w-full lg:max-w-none max-w-sm gap-8 flex-col gap-4 lg:gap-[60px]">
              {data?.sectionFive?.content?.map((data, i) => {
                return (
                  <div
                    key={i}
                    className="lg:px-6 lg:py-8 p-4 gap-2 flex flex-col border bg-white rounded-lg lg:rounded-2xl"
                  >
                    <div className="font-raleway font-bold text-[20px] lg:text-[32px]">
                      {data?.title}
                    </div>
                    <div className="lg:text-[20px] text-[14px] text-muted lg:leading-[30px]">
                      {data?.description}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex items-center justify-center ">
            <ApplyNowButton />
          </div>
        </div>
      </AnimatedBox>
    </AnimatedBox>
  );
};
