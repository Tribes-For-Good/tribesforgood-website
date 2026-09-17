import AnimatedBox from "@/common/animation/AnimatedBox"
import BulletPoint from "@/components/BulletPoint"
import ApplyNowButton from "@/components/homepage/ApplyNowButton"
import Footer from "@/components/homepage/Footer"
import Navbar from "@/components/Navbar"
import Image from "next/image"
import React from "react"

const contentData = {
  sectionTwo: [
    {
      title: "",
      subHeading: "",
      description1: (
        <>
          In a world shaped by climate change, inequality, and digital noise, we
          need leaders who not only think critically but{" "}
          <span className="font-bold">
            <i>feel</i>
          </span>{" "}
          deeply. Leaders who care about people and the planet.
        </>
      ),
      list: [
        {
          title: "Consider this:",
          bullet: [
            <>
              <span className="font-bold">1 in 3 children</span> are bullied
              globally (UNICEF, 2019)
            </>,
            <>
              <span className="font-bold">71% of students</span> who learn about
              animal rights show increased empathy towards people (American
              Society for the Prevention of Cruelty to Animals, Report 2023)
            </>,
            <>
              <span className="font-bold">Sports</span> can be a powerful tool
              for self-esteem and inclusion
            </>,
            <>
              Only <span className="font-bold">38% of Indian households</span>{" "}
              are digitally literate, creating unequal opportunities for young
              minds
            </>,
          ],
          description1: (
            <>
              These issues aren&apos;t just statistics—they&apos;re the{" "}
              <span className="font-bold">
                <i>lived realities of young people.</i>
              </span>
            </>
          ),
          description2:
            "What if we empowered kids not just to learn about these problems, but to become part of the solution?",
        },
        {
          title: "The Program",
          bullet: [
            "This 10 day, immersive online experience empowers children in Grades 5–7 to explore real-world challenges through creativity, connection, and compassion.",
          ],
          description1: "",
          description2: "",
        },
      ],
    },
  ],
}

const MiddleSection = () => {
  return (
    <div className="overflow-hidden relative flex flex-col  items-center justify-center">
      <div className="w-full pt-[20px] lg:pt-[40px] bg-hero-gradient overflow-hidden">
        {contentData?.sectionTwo?.map((section, i) => {
          return <ContentComponent key={i} data={section} index={i} />
        })}
      </div>
    </div>
  )
}

export default MiddleSection

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
          {data.description1 && (
            <AnimatedBox className="text-left  lg:leading-[30px] lg:text-center">
              {data.description1}
            </AnimatedBox>
          )}
        </div>
        {data?.list?.map((item, i) => (
          <AnimatedBox
            key={i}
            className="flex w-full mt-8 flex-col gap-2 lg:gap-6"
          >
            <div className="font-mulish text-center font-semibold lg:text-[24px] lg:leading-[36px]">
              {item?.title}
            </div>
            <div className="flex w-full flex-col lg:gap-4 gap-4">
              {item?.title === "The Program" ? (
                <p className="flex-1 font-mulish font-medium text-muted text-[14px] lg:text-[20px] lg:leading-[30px]">
                  {item?.bullet?.join(" ")}
                </p>
              ) : (
                item?.bullet?.map((bullet, j) => (
                  <BulletPoint key={j} data={{ description: bullet }} />
                ))
              )}
            </div>
            <div className="mt-4 text-center gap-y-2">
              <p className="flex-1 font-mulish font-medium text-muted text-[14px] lg:text-[20px] lg:leading-[30px]">
                {item?.description1}
              </p>
              <p className="flex-1 mt-2 font-mulish font-medium text-muted text-[14px] lg:text-[20px] lg:leading-[30px]">
                {item?.description2}
              </p>
            </div>
          </AnimatedBox>
        ))}
      </div>
    </AnimatedBox>
  )
}
