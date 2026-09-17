import AnimatedBox from "../../../common/animation/AnimatedBox"
import BulletPoint from "../../../components/BulletPoint"
import ApplyNowButton from "../../../components/homepage/ApplyNowButton"
import Image from "next/image"
import React from "react"

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
}

const contentData = {
  title: "Young Professionals for Change",
  description:
    "Curated Social Impact projects for Millennials and Professionals",

  sectionThree: {
    imageUrl: "/assets/assets/innovators-hub/outcome.png",
    content: [
      {
        title: "By the end of the program, students will:",
        bullet: [
          "Investigate real-world issues through storytelling, discussion circles, and activities",
          <>
            Collaborate with{" "}
            <span className="font-bold">
              students from rural nonprofit schools
            </span>
          </>,
          "Build leadership, teamwork & problem-solving skills",
          "Reflect on your personal growth and celebrate your impact!",
        ],
      },
    ],
  },
  sectionFour: [
    {
      image: "/assets/assets/professionals/admission.svg",
      title: "Start Dates",
      description: "10th Dec/15th Dec",
    },
    {
      image: "/assets/assets/professionals/time.svg",
      title: "Duration",
      description: "10 days",
    },
    {
      image: "/assets/assets/professionals/program.svg",
      title: "Fee",
      description: "₹11,999 + 18% GST",
    },
    {
      image: "/assets/assets/professionals/eligibility.svg",
      title: "Eligibility",
      description: "Grade 5-7",
    },
    {
      image: "/assets/assets/professionals/monitor.svg",
      title: "Mode",
      description: "Online via zoom",
    },
  ],
  sectionFive: {
    button: [
      { name: "Application Link", url: "" },
      { name: "Download Brochure", url: "" },
    ],
  },
}

const Outcome = ({ setOpen }) => {
  return (
    <div className="overflow-hidden relative flex flex-col  items-center justify-center">
      <AnimatedBox className="w-full  py-[20px] lg:py-[40px] p-5 overflow-hidden">
        <div className="max-w-6xl gap-4 md:gap-10 lg:gap-16 flex flex-col md:flex-row items-center bg-white mx-auto">
          <div className="rounded-2xl lg:rounded-lg mx-auto">
            <Image
              src={contentData?.sectionThree?.imageUrl}
              width={420}
              height={402}
              className="lg:w-[420px] object-contain rounded-2xl lg:rounded-lg lg:h-[402px] w-[288px] h-[315px]"
              alt="Program Outcome"
            />
          </div>
          <div className="flex flex-1 flex-col w-full items-center mt-8 md:mt-0 md:items-start gap-4 lg:gap-8">
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
                      )
                    })}
                  </div>
                </div>
              )
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
                className={`p-5 py-10 justify-between border rounded-md lg:rounded-lg w-full lg:w-[271px] lg:h-[271px] flex flex-col items-center max-w-sm mx-auto aspect-square ${i % 2 === 0 ? "bg-white" : "bg-[#FFFDF1]"
                  }`}
              >
                <div className="p-5">
                  {curr.title === "Eligibility" ? (
                    <Image
                      width={10}
                      height={10}
                      alt=""
                      className=" w-[80px] h-[80px]"
                      src={curr?.image}
                    />
                  ) : curr.title === "Mode" ? (
                    <Image
                      width={10}
                      height={10}
                      alt=""
                      className=" w-[60px] h-[60px] mt-2"
                      src={curr?.image}
                    />
                  ) : (
                    <Image
                      width={10}
                      height={10}
                      alt=""
                      className=" w-[60px] h-[60px] "
                      src={curr?.image}
                    />
                  )}
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
            )
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
              <span className="font-bold">Limited spots per cohort.</span> Let’s
              raise a generation of kind, courageous, and compassionate leaders{" "}
              <span className="font-bold">
                {" "}
                <i>— one good deed at a time.</i>
              </span>
            </AnimatedBox>
          </div>
          <div className="flex justify-center gap-2 lg:gap-5 items-center">
            <ApplyNowButton url="https://docs.google.com/forms/d/e/1FAIpQLSdsd6fZUeQn5DW__-3y7uGoDsnTmVjlyaZ5YPNQABghGBKX5Q/viewform" />

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
  )
}

export default Outcome
