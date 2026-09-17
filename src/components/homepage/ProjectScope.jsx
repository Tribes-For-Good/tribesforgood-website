import Image from "next/image";
import React from "react";
import AnimatedBox from "@/common/animation/AnimatedBox";

const Home = () => {
  const weeksData = [
    {
      week: "Week 1",
      points: [
        "Meet your team members and mentors",
        "Work on the problem statement and answer the big WHY of doing a social impact project",
        "Prep to take this enthusiasm to NGOs with your teammates and make a difference!",
      ],
    },
    {
      week: "Week 2",
      points: [
        "Conduct your #1st virtual awareness workshops with NGOs across India",
        "Get ready to step out in your community and create groundbreaking impact!",
      ],
    },
    {
      week: "Week 3",
      points: [
        "Campaign for your community project, make posters, start a fundraiser, lead advocacy on social media advocacy and more!",
        "Take up mentor sessions with experts in the field",
        "Watch your impact unfold through an impact report writing session",
      ],
    },
    {
      week: "Week 4",
      points: [
        "Conduct your #2nd virtual awareness workshops with NGOs across India",
        "Write a report and present it to experts in the field!",
      ],
    },
  ];

  const ctaData = [
    "Knowledge sessions with mentors",
    "Expert Sessions: NGO leadership team",
    "Mentor Hours / Reflections",
    "Graduation Pitch",
  ];

  return (
    <AnimatedBox className="bg-hero-gradient  py-10 lg:py-16">
      <h2 className="text-[#1F2937] px-5 text-center text-[24px] lg:text-[32px] px-12 font-bold mb-2 lg:mb-5">
        Project Scope
      </h2>
      <p className="font-mulish px-5 max-w-4xl mx-auto text-muted text-center text-[16px] lg:text-[20px]">
        Create innovative, groundbreaking solutions to pressing social and
        environmental challenges through structured & customized programs.
      </p>
      <div className="my-5 max-w-7xl p-5 mx-auto  flex flex-col lg:flex-row h-full flex-grow gap-5 lg:gap-8 items-stretch justify-center flex-wrap lg:my-10">
        {ctaData?.map((cta, i) => {
          return (
            <AnimatedBox
              key={i}
              className="bg-gold w-full lg:w-[271px] tracking-wide px-10 max-w-md h-auto text-center rounded-lg lg:rounded-xl p-5 mx-auto flex items-center justify-center flex-grow"
            >
              <div className=" px-6 text-wide">{cta}</div>
            </AnimatedBox>
          );
        })}
      </div>

      <WeeklyTimeline data={weeksData} />
    </AnimatedBox>
  );
};
{
  /* <AnimatedBox
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ delay: i * 0.2 }}
  key={i}
> */
}

{
  /* </AnimatedBox> */
}
export default Home;

const WeeklyTimeline = ({ data }) => {
  return (
    <AnimatedBox className="grid px-5 lg:grid-cols-7 grid-cols-1 lg:mb-60  lg:gap-0 mx-auto  place-content-center max-w-md lg:max-w-5xl">
      <div className="my-3 lg:my-0 lg:col-span-3  rounded-lg border border-2 border-primary bg-white p-5  items-center   ">
        <h1 className="font-semibold text-[20px] lg:text-[28px] text-primary font-raleway">
          {data[0]?.week}
        </h1>
        <ul className="list-outside pl-5 lg:px-8 text-muted list-disc">
          {data[0]?.points.map((curr, i) => {
            return (
              <li className="my-3 lg:my-4  text-[14px] lg:text-[20px]" key={i}>
                {curr}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="lg:col-span-1 hidden lg:flex translate-y-1/2">
        {" "}
        <Image
          width={10}
          height={10}
          className="w-full h-32  "
          alt=""
          src="/assets/assets/arrow/arrow1.svg"
        />
      </div>
      <div className="my-3 lg:my-0 lg:col-span-3 text-white  p-5 rounded-lg bg-primary  lg:translate-y-1/2">
        <h1 className="font-semibold text-[20px] lg:text-[28px] text-white font-raleway">
          {data[1]?.week}
        </h1>
        <ul className="list-outside px-5 lg:px-8 text-white list-disc">
          {data[1]?.points.map((curr, i) => {
            return (
              <li className="my-3 lg:my-4  text-[14px] lg:text-[20px]" key={i}>
                {curr}
              </li>
            );
          })}
        </ul>
      </div>
      <div className=" hidden lg:flex  h-32 col-span-4 flex items-end relative justify-end ">
        <Image
          width={10}
          height={10}
          className="   w-96"
          alt=""
          src="/assets/assets/arrow/arrow2.svg"
        />
      </div>
      {/* <div className=""></div> */}
      <div className="hidden lg:flex  col-span-3"></div>
      <div className="my-3 lg:my-0 lg:col-span-3  lg:text-white border-primary border-2 p-5 rounded-lg bg-white lg:bg-primary  ">
        <h1 className="font-semibold text-[20px] lg:text-[28px] text-primary lg:text-white font-raleway">
          {data[2]?.week}
        </h1>
        <ul className="list-outside px-5 lg:px-8 text-muted lg:text-white list-disc">
          {data[2]?.points.map((curr, i) => {
            return (
              <li className="my-4  text-[14px] lg:text-[20px]" key={i}>
                {curr}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="hidden lg:flex col-span-1 translate-y-1/2">
        <Image
          width={10}
          height={10}
          className="w-full h-32  "
          alt=""
          src="/assets/assets/arrow/arrow1.svg"
        />
      </div>
      <div className="my-3 lg:my-0 lg:col-span-3 lg:translate-y-1/2 text-white rounded-lg border border-2 border-primary bg-primary lg:bg-white p-5  items-center   ">
        <h1 className="font-semibold text-[20px] lg:text-[28px] lg:text-primary font-raleway">
          {data[3]?.week}
        </h1>
        <ul className="list-outside pl-5 lg:px-8 lg:text-muted list-disc">
          {data[3]?.points.map((curr, i) => {
            return (
              <li className="my-4  text-[14px] lg:text-[20px]" key={i}>
                {curr}
              </li>
            );
          })}
        </ul>
      </div>
    </AnimatedBox>
  );
};

// export default WeeklyTimeline;
