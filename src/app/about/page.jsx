import AnimatedBox from "@/common/animation/AnimatedBox";
import BulletPoint from "@/components/BulletPoint";
import ButtonBox from "@/components/ButtonBox";
import Footer from "@/components/homepage/Footer";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import useFormStore from "@/store/useFormStore";
import Image from "next/image";
import React from "react";

export const metadata = {
  title:
    "About TribesforGood: Social Impact,  Youth Empowerment, & Sustainable Development",
  description:
    "Discover TribesforGood, a platform for social impact and sustainable development. Learn about our mission to empower youth, promote gender equality, and drive climate action.",
  keywords: [
    "About TribesforGood",
    "Social impact organization",
    "Sustainable development goals",
    "Empowering youth",
    "Gender equality initiatives",
    "Climate action programs",
    "Social entrepreneurship",
    "Community-driven solutions",
    "About us page",
    "Nonprofit organizations in India",
    "Impact-driven programs",
    "Youth leadership development",
    "Volunteer opportunities",
    "Social impact education",
    "Partnerships for change",
    "Corporate social responsibility",
    "Sustainable development practices",
    "Social impact partnerships",
    "Empowering changemakers",
    "Community impact programs",
  ],
  openGraph: {
    title:
      "About TribesforGood: Social Impact, Youth Empowerment, & Sustainable Development",
    description:
      "Discover TribesforGood, a platform for social impact and sustainable development. Learn about our mission to empower youth, promote gender equality, and drive climate action.",
    images: [
      {
        url: "/assets/assets/about.png", // Path to your image in the public/assets/assets folder
        width: 1200,
        height: 630,
        alt: "Careers at TribesforGood: Join the Movement for Positive Change",
      },
    ],
  },
};

const contentData = {
  title: "About Us",
  description:
    "Committed to creating lasting change and brighter futures in communities worldwide",
  sectionOne: {
    image: "/assets/assets/about/hero.svg",
    title: "Our Story",
    description:
      "We are a social impact platform that helps individuals contribute meaningfully to their local communities, working on reducing the inequity around us. We all have been inspired by young activists like Greta Thunberg, Malala Yusufzai to ‘think about injustice’, our future and how small actions can make a difference. Our hyper-awareness of the connected world that we live in encourages us to make a difference in this world, however when it comes to action, moving out of our comfort zone we struggle. We struggle just like many of us as we don’t know where to start!",
    url: "https://www.linkedin.com/in/mandeepjhajj/?originalSubdomain=in",
    button: "Connect with us on Linkedin",
  },
  sectionTwo: {
    bullet: [
      "We usually care about too many things but not one thing deeply.",
      "When we identify what we care about deeply, we do not have complete knowledge about the cause or what organisations in the space are doing",
      "We do not know how we can help meaningfully",
      "Have little time on our hands",
    ],
  },
  sectionThree: {
    description:
      "Founded in 2018 and headquartered in Mumbai, TribesforGOOD is simplifying the journey of a potential changemaker to discover; learn and contribute to their communities meaningfully. We focus on 4 key impact regions:",
    cards: [
      {
        name: "Gender Equality",
      },
      {
        name: "Financial Inclusion",
      },
      {
        name: "Access to Healthcare",
      },
      {
        name: "Environment/ Planet",
      },
    ],
  },
};

const About = () => {
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

      <AnimatedBox className="w-full">
        <div className="max-w-6xl px-5 lg:p-0 mx-auto overflow-hidden py-[24px] lg:py-[40px]">
          <div className="flex gap-4 items-center lg:gap-16 flex-col lg:flex-row ">
            <div className="flex lg:hidden flex-col items-center gap-1 lg:gap-4">
              <div className="flex  flex-col gap-1 lg:gap-2">
                <div className="font-raleway font-bold text-[24px] lg:text-[32px]">
                  {contentData?.sectionOne?.title}
                </div>
              </div>
            </div>
            <Image
              width={10}
              height={10}
              className="lg:w-[420px] mx-auto lg:h-[490px] max-w-xs rounded-lg lg:rounded-xl object-cover lg:max-w-none w-full"
              alt=""
              src={contentData?.sectionOne?.image}
            />
            <div className="flex flex-col gap-4  lg:gap-8 ">
              <div className="flex flex-col gap-1 lg:gap-6">
                <div className=" hidden lg:flex flex-col gap-1 lg:gap-4">
                  <div className="flex  flex-col gap-1 lg:gap-2">
                    <div className="font-raleway font-bold text-[24px] lg:text-[32px]">
                      {contentData?.sectionOne?.title}
                    </div>
                  </div>
                </div>
                <div className="lg:text-[20px] text-[14px] text-muted lg:leading-[30px]">
                  {contentData?.sectionOne?.description}
                </div>
              </div>
              <div className=" mt-4 flex gap-2 lg:gap-4 flex-wrap ">
                <ButtonBox
                  url={contentData?.sectionOne?.url}
                  name={contentData?.sectionOne?.button}
                />
              </div>
            </div>
          </div>
        </div>
      </AnimatedBox>

      <AnimatedBox className="w-full bg-hero-gradient">
        <div className="max-w-6xl  px-5 lg:p-0 mx-auto overflow-hidden flex flex-col gap-8 py-[24px] lg:py-[60px]">
          <div className="flex flex-col gap-6 lg:gap-6 gap-2">
            {contentData?.sectionTwo?.bullet?.map((curr, i) => {
              return <BulletPoint data={{ description: curr }} key={i} />;
            })}
          </div>
        </div>
      </AnimatedBox>

      <AnimatedBox className="w-full bg-white">
        <div className="max-w-6xl  px-5 lg:p-0 mx-auto overflow-hidden flex flex-col gap-8 py-[24px] lg:py-[60px]">
          <div className="text-center lg:leading-[30px] px-10 lg:text-[20px] text-[14px]">
            {contentData?.sectionThree?.description}
          </div>
          <div className="w-full gap-2 items-center flex flex-col lg:flex-row lg:justify-between justify-center">
            {contentData?.sectionThree?.cards?.map((card, i) => {
              return <Card data={card} i={i} key={i} />;
            })}
          </div>
        </div>
      </AnimatedBox>
      <Footer />
      {/* <WhatsAppButton/> */}
    </div>
  );
};

export default About;

const Card = ({ data, i }) => {
  return (
    <AnimatedBox className="w-full ">
      <div
        className={`rounded-lg bg-[#FFFDF1] border transform border-gold max-w-xs w-full flex flex-col items-center justify-center mx-auto lg:w-[240px] lg:h-[200px]  p-5`}
      >
        <div
          className={` w-[50px] h-[50px] mb-5 rounded-full flex flex-col bg-[#F1DD7466]  items-center  justify-center`}
        >
          <div className="w-[40px] text-raleway rounded-full font-extrabold text-[24px] h-[40px] flex bg-gold items-center  justify-center">
            {i + 1}
          </div>
        </div>
        <div className="my-2  font-raleway font-bold text-[16px] lg:text-[24px] text-center">
          {data?.name}
        </div>
      </div>
    </AnimatedBox>
  );
};
