import AnimatedBox from "@/common/animation/AnimatedBox";
import BulletPoint from "@/components/BulletPoint";
import ApplyNowButton from "@/components/homepage/ApplyNowButton";
import Footer from "@/components/homepage/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import React from "react";

export const metadata = {
  title: "Impact Travel Programs: Travel through India and create social good",
  description:
    "Experience India like never before with our Impact Travel programs. Whether virtually or in person, create social change through travel with purpose. Join us today for a meaningful journey that combines education, social impact, and travel with purpose.",
  keywords: [
    "times of travel",
    "tourism from india",
    "trip to india",
    "travel india",
    "visit india",
    "travel experience",
    "world tour travel packages",
    "trip in india",
    "travel story",
    "educational tourist",
    "travel india travel",
    "travel and experience",
    "a travel experience",
    "india tour & travel",
    "ind travel and tours",
    "Volunteer programs abroad",
    "Travel for social good",
    "Gap year volunteer programs",
    "Volunteer travel opportunities",
    "Volunteer tourism",
    "Global volunteering",
    "Social impact travel",
    "Sustainable travel",
    "International volunteer programs",
  ],

  openGraph: {
    title:
      "Impact Travel Programs: Travel through India and create social good",
    description:
      "Experience India like never before with our Impact Travel programs. Whether virtually or in person, create social change through travel with purpose. Join us today for a meaningful journey that combines education, social impact, and travel with purpose.",
    images: [
      {
        url: "/assets/assets/og/impact.png", // Path to your image in the public/assets/assets folder
        width: 1200,
        height: 630,
        alt: "Careers at TribesforGood: Join the Movement for Positive Change",
      },
    ],
  },
};

const contentData = {
  title: "Impact Travel",
  description: "Travel with purpose",

  sectionOne: {
    imageUrl: "/assets/assets/impact/hero.svg",
    description:
      "At TribesforGOOD, we believe travel is not just about the destination, but about the connections we make and the change we create along the way. Our School of Changemakers offers Gen Z and Millennials a chance to immerse themselves in diverse cultures while making a positive social impact",
  },

  sectionTwo: [
    {
      title: "Virtual Community Service Visits - India",
      subHeading: "Engage. Connect. Empower—from anywhere in the world.",
      description1: [
        "Step into the heart of the Indian community through our immersive virtual visits. You'll have the opportunity to engage with changemakers and the community members they work with. You will expand  your understanding of social issues, support communities and experience the power of connection without leaving your home!",
      ],
      list: {
        title: "Why choose this?",
        bullet: [
          "Develop cross-cultural understanding and foster empathy.",
          "Build skills in virtual collaboration and global citizenship.",
          "Expand your worldview and create real change in underserved communities.",
        ],
      },
    },
    {
      title: "Study tours & Service Learning tours",
      subHeading:
        "Learn by doing. Designed for students eager to gain hands-on experience.",
      description1: [
        "These tours provide an enriching opportunity to connect with underserved communities while learning in a dynamic environment. Whether through virtual service projects or engaging webinars, we offer numerous pathways to enhance your learning journey in an impact driven environment.",
        "Explore new horizons, connect with inspiring people, and create change that matters.",
      ],
      list: {
        title: "What’s special about this program?",
        bullet: [
          "Work in field-based projects that address pressing societal challenges.",
          "Gain real-world experience that enriches your academic and professional journey.",
          "Create long-term impact that fosters community empowerment",
          "Build lasting connections with changemakers, peers, and experts!",
        ],
      },
      description2:
        "Whether you’re a curious explorer, seeking personal growth or looking for a chance to make real impact, join us on this incredible transformative journey and be part of something bigger!",
      buttonName: "Write to us",
      buttonUrl: "",
    },
  ],
};

const ImpactTravel = () => {
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
      <AnimatedBox className="w-full   py-[20px] lg:py-[40px] p-5 overflow-hidden">
        <div className="max-w-6xl lg:gap-16 flex flex-col lg:flex-row items-center bg-white mx-auto">
          <div className="rounded-2xl lg:rounded-lg">
            <Image
              src={contentData?.sectionOne?.imageUrl}
              width={40}
              height={40}
              className="lg:w-[420px]  rounded-2xl lg:rounded-lg lg:h-[428px] w-[288px] h-[354px]"
              alt=""
            />
          </div>
          <div className="flex flex-1 flex-col items-start gap-4 lg:gap-6">
            <div className="text-[#1f2937] lg:flex  hidden font-bold text-[16px] text-[32px] font-raleway">
              {contentData?.sectionOne?.title}
            </div>
            <div>
              <p className="text-muted text-wide text-[14px] lg:text-[20px] lg:leading-[30px] font-mulish">
                {contentData?.sectionOne?.description}
              </p>
            </div>
          </div>
        </div>
      </AnimatedBox>

      <div className="w-full pt-[20px] lg:pt-[40px] bg-hero-gradient overflow-hidden">
        {contentData?.sectionTwo?.map((section, i) => {
          return <ContentComponent key={i} data={section} index={i} />;
        })}
      </div>
      <Footer />
    </div>
  );
};

export default ImpactTravel;

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
        <AnimatedBox className="flex w-full flex-col gap-2 lg:gap-6">
          <div className="font-mulish text-center font-semibold lg:text-[24px] lg:leading-[36px]">
            {data?.list?.title}
          </div>
          <div className="flex w-full  flex-col lg:gap-4 gap-2">
            {data?.list?.bullet?.map((bullet, i) => {
              return <BulletPoint key={i} data={{ description: bullet }} />;
            })}
          </div>
        </AnimatedBox>
        <AnimatedBox className="text-center text-muted text-[14px] lg:text-[20px] font-mulish">
          {data?.description2}
        </AnimatedBox>
        <div className="flex items-center justify-center ">
          <ApplyNowButton />
        </div>
      </div>
    </AnimatedBox>
  );
};
