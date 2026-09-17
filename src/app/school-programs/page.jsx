import AnimatedBox from "@/common/animation/AnimatedBox";
import ButtonBox from "@/components/ButtonBox";
import CalButton from "@/components/homepage/CalButton";
import Footer from "@/components/homepage/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import React from "react";

export const metadata = {
  title:
    "School Programs for Social Impact: Empowering Teens Through Community Service",
  description:
    "Partner with Tribes for Good to offer high school students impactful community service programs, leadership training, and opportunities for youth social responsibility. Empower the next generation of changemakers.",
  keywords: [
    "High school volunteer programs",
    "Youth empowerment",
    "Social impact for teens",
    "High school community service",
    "Student volunteer opportunities",
    "Social responsibility for youth",
    "Leadership programs for teens",
    "Youth social impact",
    "school social impact projects",
    "educational partnerships for social good",
    "school community service programs",
    "youth engagement in social change",
    "schools working with nonprofits",
    "education-driven social responsibility",
    "partnerships for student volunteer programs",
  ],

  openGraph: {
    title:
      "School Programs for Social Impact: Empowering Teens Through Community Service",
    description:
      "Partner with Tribes for Good to offer high school students impactful community service programs, leadership training, and opportunities for youth social responsibility. Empower the next generation of changemakers.",
    images: [
      {
        url: "/assets/assets/og/professional.png", // Path to your image in the public/assets/assets folder
        width: 1200,
        height: 630,
        alt: "Careers at TribesforGood: Join the Movement for Positive Change",
      },
    ],
  },
};

const contentData = {
  title: "School programs",
  description:
    "Immerse your students to build confidence, empower individuals and drive change",
  sectionOne: {
    imageUrl: "/assets/assets/school/hero.svg",
    title: "Students Driving Change",
    description: [
      "We are Asia’s social impact platform for highschoolers, from covering themes of Financial Inclusion, Women Empowerment, STEM Education, Tech For GOOD, we have 10+ themes covering all areas of interests for students. ",
      "We have activated 3500+ changemakers across IB / CBSE / IGCSE Schools in India and abroad and have subsequently impacted 8000+ individuals from economically weaker sections. Our plan is to keep increasing this number!",
    ],
  },
  sectionTwo: {
    description: [
      "If you are looking to immerse your students in an interactive space where they build confidence, empower individuals and take leadership in contributing to the social impact space, then get in touch with us! ",
      "We are always working on new and exciting ways to make the social impact space more accessible and engaging to high school students and want to hear from you! ",
    ],
    buttonName: "Schedule a call",
    buttonUrl: "",
  },
};

const SchoolPrograms = () => {
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

      <div className="w-full  py-[20px] lg:py-[60px] p-5 overflow-hidden">
        <div className="max-w-6xl lg:gap-16 gap-5 flex flex-col lg:flex-row items-center bg-white mx-auto">
          <div className="relative mb-12 lg:w-[390px] lg:h-[428px] w-[288px] h-[354px] rounded-2xl lg:rounded-lg">
            <div className="absolute bg-green z-10 w-[80%] border rounded-md left-0 right-0 top-0 mx-auto h-full"></div>
            <AnimatedBox
              initial={{ y: 0 }}
              whileInView={{ y: 20 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="absolute  z-30 bg-gold w-[90%] rounded-md left-0 right-0 mx-auto h-full"
            ></AnimatedBox>
            <AnimatedBox
              initial={{ y: 0 }}
              whileInView={{ y: 40 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="absolute z-30 rounded-2xl  lg:rounded-lg top-0 "
            >
              <div>
                <Image
                  src={contentData?.sectionOne?.imageUrl}
                  width={40}
                  height={40}
                  alt=""
                  className="lg:w-[390px] border lg:h-[428px] object-cover rounded-md w-[288px] h-[354px]"
                />
                <Image
                  src="/assets/assets/school/circle.svg"
                  width={40}
                  height={40}
                  alt=""
                  className="lg:w-[147px] absolute  right-0 -bottom-16  lg:h-[147px] object-cover rounded-md w-[288px] h-[354px]"
                />
              </div>
            </AnimatedBox>
          </div>
          <div className="flex flex-1 flex-col items-start gap-4 lg:gap-6">
            <div className="text-[#1f2937] font-bold text-[16px] lg:text-[32px] font-raleway">
              {contentData?.sectionOne?.title}
            </div>
            <div className="gap-3 lg:gap-5 flex  flex-col">
              {contentData?.sectionOne?.description.map((desc, i) => {
                return (
                  <p
                    key={i}
                    className="text-muted text-wide text-[14px] lg:text-[20px] lg:leading-[30px] font-mulish"
                  >
                    {desc}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <AnimatedBox className="bg-hero-gradient w-full py-[20px] lg:py-[40px]">
        <div className="max-w-6xl mx-auto  my-5 px-5 ">
          <div className="flex flex-col text-muted text-[14px] lg:text-[20px] font-mulish gap-5">
            <AnimatedBox className="text-left text-wide lg:leading-[30px] lg:text-center">
              {contentData?.sectionTwo?.description[0]}
            </AnimatedBox>
            <AnimatedBox className="text-left text-wide lg:leading-[30px] lg:text-center">
              {contentData?.sectionTwo?.description[1]}
            </AnimatedBox>
          </div>
          <div className="flex justify-start lg:justify-center gap-2 lg:gap-5 my-5 my-5 items-center lg:my-8 ">
            <ButtonBox name="Write to us" url="/contact" />
          </div>
        </div>
      </AnimatedBox>

      <Footer />
    </div>
  );
};

export default SchoolPrograms;

// <div className="rounded-2xl lg:rounded-lg ">
// <AnimatedBox className="relative w-full mb-16  transform lg:-translate-y-5 lg:mb-0">
//   <div className="relative w-[300px] h-[220px] lg:w-[34rem] mx-auto lg:ml-auto lg:h-[400px] ">
//     {/* Background Layers */}
//     <div className="relative top-0 left-1/2 -translate-x-1/2  right-0  h-1/2 bg-green !w-[75%] rounded-lg  -z-20"></div>
//     <AnimatedBox
//       initial={{ y: 0 }}
//       whileInView={{ y: 20 }}
//       transition={{ duration: 0.5, delay: 1 }}
//       className="absolute top-0 left-0 right-0 m-auto w-[90%] h-1/2 bg-yellow-200  rounded-lg transform transform translate-y-0 -z-10"
//     ></AnimatedBox>

//     {/* Main Content */}
//     <AnimatedBox
//       initial={{ y: 0 }}
//       whileInView={{ y: 40 }}
//       transition={{ duration: 0.5, delay: 1 }}
//       className="absolute top-0 left-0 right-0 m-auto translate-y-0 w-full h-full   rounded-lg  overflow-hidden z-0"
//     >
//       <Image
//         alt=""
//         height={10}
//         width={10}
//         className="w-full h-full object-cover"
//         src="/assets/assets/program/image.svg"
//       />
//     </AnimatedBox>
//   </div>
// </AnimatedBox>
// </div>
