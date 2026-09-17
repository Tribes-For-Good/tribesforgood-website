import AnimatedBox from "@/common/animation/AnimatedBox";
import BulletPoint from "@/components/BulletPoint";
import ButtonBox from "@/components/ButtonBox";
import ApplyNowButton from "@/components/homepage/ApplyNowButton";
import CalButton from "@/components/homepage/CalButton";
import Footer from "@/components/homepage/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import React from "react";

export const metadata = {
  title:
    "Social Entrepreneurship Programs for Millennials & Professionals | Apply Now",
  description:
    "Curated social impact projects for Millennials & professionals. Learn social entrepreneurship and use your skills to create change. Apply today!",
  keywords: [
    "Entrepreneurship",
    "social entrepreneurship",
    "school program",
    "after school program",
    "Professional development programs",
    "Corporate volunteering",
    "CSR programs",
    "Professional social responsibility",
    "Skills-based volunteering",
    "Corporate social impact",
    "Leadership opportunities for professionals",
    "Professional collaboration",
    "Networking for social impact",
  ],

  openGraph: {
    title:
      "Social Entrepreneurship Programs for Millennials & Professionals | Apply Now",
    description:
      "Curated social impact projects for Millennials & professionals. Learn social entrepreneurship and use your skills to create change. Apply today!",
    images: [
      {
        url: "/assets/assets/og/school.png", // Path to your image in the public/assets/assets folder
        width: 1200,
        height: 630,
        alt: "Careers at TribesforGood: Join the Movement for Positive Change",
      },
    ],
  },
};

const contentData = {
  title: "Young Professionals for Change",
  description:
    "Curated Social Impact projects for Millennials and Professionals",

  sectionOne: {
    imageUrl: "/assets/assets/professionals/hero1.svg",
    content: [
      {
        title: "Topics covered",
        bullet: [
          "Social Entrepreneurship & Sustainability ",
          "Gender & Women Empowerment ",
          "Financial & Digital Literacy  ",
          "Environment & Climate Change ",
          "Menstrual Health & Hygiene ",
        ],
      },
      {
        title: "Areas",
        bullet: [
          "Operations & Program Management",
          "Data Analysis & Research",
          "Marketing & Communication",
          "Fundraising",
          "Law Advocacy & Policy",
        ],
      },
    ],
  },
  sectionTwo: {
    title: "Program Overview",
    description: [
      "This is for individuals, who want to make a difference in their communities but aren’t sure how. The program is a 2-month part-time virtual program where you’ll learn everything you need to know about contributing to Social Change organisations.",
      "The program is an opportunity for professionals with 1+ year experience to build and execute their social impact projects, assist understaffed social impact organisations on critical work like strategy, fundraising, and scaling their impact. This, in turn, helps them build their profile showing initiative & leadership in their crucial College Applications (especially essays). ",
    ],
    button: [
      { name: "Schedule a call", url: "" },
      { name: "Apply now", url: "" },
    ],
  },
  sectionThree: {
    imageUrl: "/assets/assets/professionals/hero2.svg",
    content: [
      {
        title: "What’s included",
        bullet: [
          "25+ contact hours of educational content",
          "Expert program facilitators & mentors ",
          "Coursework and educational content ",
          "Research ",
          "Curated readings",
          "Event participation and Meetups ",
        ],
      },
    ],
  },
  sectionFour: [
    {
      image: "/assets/assets/professionals/admission.svg",
      title: "Admission Dates",
      description: "Accepted on rolling basis",
    },
    {
      image: "/assets/assets/professionals/time.svg",
      title: "Time Commitment",
      description: "2 hours a week for 2 months",
    },
    {
      image: "/assets/assets/professionals/location.svg",
      title: "Location",
      description: "Virtual Classroom",
    },
    {
      image: "/assets/assets/professionals/program.svg",
      title: "Program Fee",
      description: "Rs. 22,000 + gst",
    },
  ],
  sectionFive: {
    title: "Application Process ",
    description:
      "The program is open for individuals between the age of 22 – 30. Please fill in an application form, which will be reviewed by our team and we will get back to you. If successful, we will arrange a video discussion to get to know more about your interests and your passions. ",

    description2: "We look forward to hearing from you! ",
    button: [
      { name: "Schedule a call", url: "" },
      { name: "Apply now", url: "" },
    ],
  },
};

const Professionals = () => {
  return (
    <div className="overflow-hidden relative flex flex-col  items-center justify-center">
      <Navbar />
      <div className="w-full ">
        <div className="relative w-full min-h-[200px] justify-center lg:min-h-[400px]  flex items-center bg-[url('/assets/assets/background.svg')]  bg-cover bg-center">
          {/* <Image width={10} height={10} alt="" src="/assets/assets/background.svg" className="border w-full object-cover" /> */}
          <div className="max-w-md  lg:max-w-3xl py-16 pt-20 flex flex-col gap-2 w-full lg:gap-5 items-center justify-center">
            <AnimatedBox>
              <h1 className="font-extrabold  max-w-xl text-center text-[20px] lg:text-[48px] font-raleway">
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
      <AnimatedBox className="w-full  py-[20px] lg:py-[40px] p-5 overflow-hidden">
        <div className="max-w-6xl  gap-4 md:gap-10 lg:gap-16 flex flex-col md:flex-row items-center bg-white mx-auto">
          <div className="rounded-2xl lg:rounded-lg mx-auto">
            <Image
              src={contentData?.sectionOne?.imageUrl}
              width={40}
              height={40}
              className="lg:w-[420px] object-cover rounded-2xl lg:rounded-lg lg:h-[428px] w-[288px] h-[354px]"
              alt=""
            />
          </div>
          <div className="flex flex-1 flex-col w-full items-start gap-4 lg:gap-8">
            {contentData?.sectionOne?.content?.map((curr, i) => {
              return (
                <div key={i} className="flex flex-col gap-1 lg:gap-4">
                  <div className="font-raleway font-bold lg:text-2xl">
                    {curr?.title}
                  </div>
                  <div className="flex flex-col  gap-1 lg:gap-2">
                    {curr?.bullet.map((curr, i) => {
                      return (
                        <BulletPoint key={i} data={{ description: curr }} />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </AnimatedBox>

      <AnimatedBox className="bg-hero-gradient w-full py-[20px] lg:py-[40px]">
        <div className="max-w-6xl mx-auto  my-5 px-5 ">
          <div className="font-raleway  mb-4 lg:mb-8 text-center font-bold lg:text-[32px]">
            {contentData?.sectionTwo?.title}
          </div>
          <div className="flex flex-col text-muted text-[14px] lg:text-[20px] font-mulish gap-5">
            <AnimatedBox className="text-left  lg:leading-[30px] lg:text-center">
              {contentData?.sectionTwo?.description[0]}
            </AnimatedBox>
            <AnimatedBox className="text-left  lg:leading-[30px] lg:text-center">
              {contentData?.sectionTwo?.description[1]}
            </AnimatedBox>
          </div>
          <div className="flex justify-center gap-2 lg:gap-5 my-5 my-5 items-center lg:my-8 ">
            <ButtonBox name="Write to us" url="/contact" />
            <ApplyNowButton />
          </div>
        </div>
      </AnimatedBox>

      <AnimatedBox className="w-full  py-[20px] lg:py-[40px] p-5 overflow-hidden">
        <div className="max-w-6xl gap-4 md:gap-10 lg:gap-16 flex flex-col md:flex-row items-center bg-white mx-auto">
          <div className="rounded-2xl lg:rounded-lg mx-auto">
            <Image
              src={contentData?.sectionThree?.imageUrl}
              width={40}
              height={40}
              className="lg:w-[420px] object-cover rounded-2xl lg:rounded-lg lg:h-[402px] w-[288px] h-[315px]"
              alt=""
            />
          </div>
          <div className="flex flex-1 flex-col w-full items-start gap-4 lg:gap-8">
            {contentData?.sectionThree?.content?.map((curr, i) => {
              return (
                <div key={i} className="flex  flex-col gap-1 lg:gap-4">
                  <div className="font-raleway font-bold lg:text-2xl">
                    {curr?.title}
                  </div>
                  <div className="flex  flex-col  gap-1 lg:gap-2">
                    {curr?.bullet.map((curr, i) => {
                      return (
                        <BulletPoint key={i} data={{ description: curr }} />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </AnimatedBox>

      <AnimatedBox className="py-[20px] lg:py-[40px] w-full bg-hero-gradient  overflow-hidden">
        <div className=" max-w-6xl mx-auto flex flex-col  items-center justify-center  lg:flex-row gap-4 lg:gap-8 p-5">
          {contentData?.sectionFour?.map((curr, i) => {
            return (
              <div
                key={i}
                className={`p-5 py-10 justify-between border rounded-md lg:rounded-lg w-full lg:w-[271px] lg:h-[271px] flex flex-col items-center justify-center max-w-sm mx-auto  laspect-square border ${
                  i % 2 === 0 ? "bg-white" : "bg-[#FFFDF1]"
                }`}
              >
                <div className="p-5">
                  <Image
                    width={10}
                    height={10}
                    alt=""
                    className=" w-[60px] h-[60px] "
                    src={curr?.image}
                  />
                </div>
                <div className="flex flex-col gap-1 items-center ">
                  <div className="font-bold text-center text-[#1F2937] lg:text-xl">
                    {curr?.title}
                  </div>
                  <div className="text-muted px-5 lg:px-3 text-lg max-w-xs text-center lg:text-base">
                    {curr?.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </AnimatedBox>

      <AnimatedBox className="bg-white w-full py-[20px] lg:py-[40px]">
        <div className="max-w-6xl mx-auto flex flex-col gap-4 lg:gap-8  my-5 px-5 ">
          <div className="font-raleway text-center font-bold lg:text-[32px]">
            {contentData?.sectionFive?.title}
          </div>
          <div className="flex flex-col text-muted text-[14px] lg:text-[20px] font-mulish gap-5">
            <AnimatedBox className="text-left  lg:leading-[30px] lg:text-center">
              {contentData?.sectionFive?.description}
            </AnimatedBox>
          </div>
          <AnimatedBox className="text-left font-semibold text-[14px] lg:text-[20px] font-mulish  lg:leading-[30px] lg:text-center">
            {contentData?.sectionFive?.description2}
          </AnimatedBox>
          <div className="flex justify-center gap-2 lg:gap-5 items-center">
            <ButtonBox name="Write to us" url="/contact" />
            <ApplyNowButton />
          </div>
        </div>
      </AnimatedBox>
      <Footer />
    </div>
  );
};

export default Professionals;
