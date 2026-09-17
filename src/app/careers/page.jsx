import AnimatedBox from "@/common/animation/AnimatedBox";
import ApplyNowButton from "@/components/homepage/ApplyNowButton";
import Footer from "@/components/homepage/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import BulletPoint from "../../components/BulletPoint";
import ButtonBox from "@/components/ButtonBox";

export const metadata = {
  title: "Careers at TribesforGood: Join the Movement for Positive Change",
  description:
    "Be part of TribesforGood! Explore careers that make a difference in education, sustainability, and empowerment. Help shape a better future with meaningful work.",
  keywords: [
    "Careers at TribesforGood",
    "Jobs in social impact",
    "Work in sustainability",
    "Social impact careers",
    "Nonprofit job opportunities",
    "Empowerment initiatives",
    "Education sector jobs",
    "Sustainable development careers",
    "Climate action jobs",
    "Gender equality careers",
    "Community development jobs",
    "Jobs with purpose",
    "Meaningful work opportunities",
    "Social entrepreneurship roles",
    "Volunteer coordinator jobs",
    "Careers in education impact",
    "Global changemaker careers",
    "Work in environmental sustainability",
    "Youth empowerment roles",
    "TribesforGood job openings",
  ],
  openGraph: {
    title: "Careers at TribesforGood: Join the Movement for Positive Change",
    description:
      "Be part of TribesforGood! Explore careers that make a difference in education, sustainability, and empowerment. Help shape a better future with meaningful work.",
    images: [
      {
        url: "/assets/assets/og/careers.png", // Path to your image in the public/assets/assets folder
        width: 1200,
        height: 630,
        alt: "Careers at TribesforGood: Join the Movement for Positive Change",
      },
    ],
  },
};

const contentData = {
  title: "Careers",
  description:
    "We are looking for passionate individuals and educators who believe in new age learning and are ready to challenge the status quo. ",
  sectionOne: {
    imageUrl: "/assets/assets/careers/hero.svg",
    title: "Join our team!",
    description: [
      "We are a dynamic team of individuals focused on amplifying impact in our society.",
      "We are always on the lookout for young energetic individuals with a burning passion to change the world around them! Together, we will tackle global challenges, empowering the next generation to become changemakers.",
    ],
    button: "Apply Now",
    buttonUrl:
      "https://docs.google.com/forms/u/3/d/e/1FAIpQLSdsd6fZUeQn5DW__-3y7uGoDsnTmVjlyaZ5YPNQABghGBKX5Q/viewform",
  },
  sectionTwo: {
    title:
      "Check out our current openings to discover a role that may align with you:",
    subSection: [
      {
        title: "TribesforGOOD Fellowship",
        description:
          "Embark on a three-month commitment with the TribesforGOOD Fellowship for an immersive experience at the crossroads of social impact and education. Our mission is to activate social consciousness amongst Gen Z. As a fellow, you’ll dive into the of education and social change, driven by a belief in the transformative power of alternative learning. With a voracious appetite for knowledge and a passion for making a difference, you’ll find your place in a hybrid organization.",
        duration: "3 months",
        stipend: "INR 17,500 per month",
        question: [
          {
            title: "Why join TribesforGOOD Fellowship?",
            description:
              "TFG Students and trainers both get the opportunity to explore how their own identities are connected to society and get to sharpen their role as citizens gaining essential societal skills like Empathy, Resilience, tolerance and so on.",
            bullet: [
              {
                title: "Hunger to Change Education: ",
                description:
                  "A strong desire to revolutionize traditional education methods.",
              },
              {
                title: "Love for Teenagers: ",
                description:
                  "Enjoy working with teenagers and mentoring them across socio economic strata.",
              },
              {
                title: "Empathy: ",
                description:
                  "Ability to understand and connect with the needs of students. Inspire them to connect with the larger issues at a national and global level.",
              },
              {
                title: "Problem-Solving Skills: ",
                description:
                  "Capacity to navigate challenges and find innovative solutions.",
              },
              {
                title: "Action oriented work - Implementation: ",
                description:
                  "At TribesforGOOD, we already have partnerships in place which gives you time to work on the core work that you like be it client servicing, mentoring, working on curriculum development or teaching!",
              },
              {
                title: "Exposure: ",
                description:
                  "Engage with urban and rural youth across spectrum",
              },
            ],
          },
        ],
        buttonDescription:
          "Please upload your portfolio, along with a cover letter and resume",
        buttonName: "Apply now",
        buttonUrl:
          "https://docs.google.com/forms/u/1/d/e/1FAIpQLSfhFAw8iIJCfCiz6NXFYwSgpfkZx633mzl2zALunpX72ru8gA/viewform",
      },
      {
        title: "Part Time - Mentors/ Trainers",

        question: [
          {
            title: "What We’re Looking For",
            description: "We are seeking experienced professionals who:",
            bullet: [
              {
                description:
                  "Are committed to activating social consciousness and building capacity for change.",
              },
              {
                description:
                  "Have a strong grasp of Design Thinking principles and their applications to real-world social impact projects.",
              },
              {
                description:
                  "Are passionate educators or trainers with the ability to motivate, guide, and mentor learners from diverse backgrounds.",
              },
            ],
          },
          {
            title: "Role Details",
            bullet: [
              {
                title: "Duration: ",
                description: "Flexible, ranging from 1 to 3 months.",
              },
              {
                title: "Time Commitment: ",
                description:
                  "Approximately 3-5 hours per week, allowing you to balance this role with your current commitments.",
              },
              {
                title: "Modality: ",
                description:
                  "Fully online, enabling you to mentor participants from anywhere.",
              },
              {
                title: "Industry Experience Required: ",
                description:
                  "Minimum of 3 years in relevant fields (social impact, education, climate, etc.).",
              },
              {
                title: "Teaching/Training Experience: ",
                description:
                  "At least 2 years in a professional or academic setting.",
              },
            ],
          },
        ],
        buttonName: "Apply now",
        buttonUrl:
          "https://docs.google.com/forms/d/e/1FAIpQLSfm3wNNvlrBGjWoM8ggsiRk203m84q4h4VWDrUmHe68ohWI9Q/viewform",
      },
    ],
  },
  sectionThree: {
    title: "Why should you work with us?",
    iconUrl: "/assets/assets/icon/bullet.svg",
    bulletPoints: [
      {
        title: "Shape Future Leaders: ",
        description:
          "You’ll work directly with students to help them explore cutting-edge topics like Financial Inclusion, STEM, Gender, Social Entrepreneurship, Design Thinking, Animal Welfare, or Journalism.",
      },
      {
        title: "Create Real Impact: ",
        description:
          "Be part of a live project that creates tangible social change and directly benefits communities at the base of the pyramid, while also helping students become micro-influencers in their own communities.",
      },
      {
        title: "Work Flexibly: ",
        description:
          "Be a part of a hybrid workforce that allows you to explore your other interests and passions. We work in IST and you will be expected to be available from 2pm IST -7pm IST.",
      },
    ],
  },
};

const Careers = () => {
  return (
    <div className="overflow-hidden border relative flex flex-col  items-center justify-center">
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
          <div className="text-[#1f2937] font-bold text-[24px] font-raleway lg:hidden">
            {contentData?.sectionOne?.title}
          </div>
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
            <div className="text-[#1f2937] lg:flex  hidden font-bold text-[32px] font-raleway">
              {contentData?.sectionOne?.title}
            </div>
            <div>
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
            <ApplyNowButton url="https://docs.google.com/forms/d/e/1FAIpQLSdsd6fZUeQn5DW__-3y7uGoDsnTmVjlyaZ5YPNQABghGBKX5Q/viewform" />
          </div>
        </div>
      </AnimatedBox>

      <AnimatedBox className="bg-hero-gradient  w-full pt-[20px] lg:pt-[40px] overflow-hidden">
        <div className=" items-center  flex flex-col justify-center">
          <div className="text-[#1f2937] px-5 font-bold text-[24px] font-raleway ">
            {contentData?.sectionTwo?.title}
          </div>
          <div className="w-full">
            {contentData?.sectionTwo?.subSection?.map((section, i) => {
              return <SectionComponent key={i} i={i} data={section} />;
            })}
          </div>
        </div>
      </AnimatedBox>

      <AnimatedBox className="bg-hero-gradient p-5 w-full py-[20px] lg:py-[40px]">
        <div className="max-w-6xl  mx-auto flex flex-col lg:gap-10 gap-6 items-center justify-center">
          <div className="text-[#1f2937] font-bold text-[24px] font-raleway ">
            {contentData?.sectionThree?.title}
          </div>
          <div className=" flex flex-col gap-8 text-wide">
            {contentData?.sectionThree?.bulletPoints?.map((bullet, i) => {
              return <BulletPoint data={bullet} key={i} />;
            })}
          </div>
        </div>
      </AnimatedBox>
      <Footer />
    </div>
  );
};

export default Careers;

const SectionComponent = ({ data, i }) => {
  return (
    <AnimatedBox
      className={`w-full overflow-hidden py-[24px]  lg:py-[40px]  ${
        i % 2 == 0 ? "" : "bg-white"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 flex flex-col gap-6 ">
        <div className="flex flex-col gap-5 lg:gap-4">
          <div className="flex flex-col lg:gap-4 gap-2">
            <div className="text-[#1F2937] font-mulish font-bold text-[16px] lg:leading-[24px] lg:text-[24px]">
              {i + 1}. {data?.title}
            </div>
            {data?.description && (
              <div className="text-muted font-mulish  text-[14px] lg:leading-[30px] lg:text-[20px]">
                {data?.description}
              </div>
            )}
          </div>
          {data?.duration && (
            <div>
              {data?.duration && (
                <div className="text-muted font-mulish  text-[14px] lg:leading-[30px] lg:text-[20px]">
                  <span className="text-[#1f2937]">Duration - </span>
                  {data?.duration}
                </div>
              )}
              {data?.stipend && (
                <div className="text-muted font-mulish  text-[14px] lg:leading-[30px] lg:text-[20px]">
                  <span className="text-[#1f2937]">Stipend - </span>
                  {data?.stipend}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="gap-6 flex flex-col">
          {data?.question?.map((question, index) => {
            return (
              <div className="flex flex-col gap-4 lg:gap-8" key={index}>
                <div className="flex flex-col gap-2">
                  <div className="text-[#1F2937] font-mulish font-bold text-[16px] lg:leading-[31px] lg:text-[24px]">
                    {question?.title}
                  </div>
                  {question?.description && (
                    <div className="text-muted font-mulish  text-[14px] lg:leading-[30px] lg:text-[20px]">
                      {question?.description}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-4">
                  {question?.bullet?.map((bullet, i) => {
                    return <BulletPoint key={i} data={bullet} />;
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-4">
          {data?.buttonDescription && (
            <div className="font-semibold text-[16px] lg:text-[20px] lg:leading-[30px]">
              {data?.buttonDescription}
            </div>
          )}
          <ButtonBox name="Apply now" url={data?.buttonUrl} />
        </div>
      </div>
    </AnimatedBox>
  );
};
