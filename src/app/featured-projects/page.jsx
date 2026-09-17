import AnimatedBox from "@/common/animation/AnimatedBox";
import Footer from "@/components/homepage/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import React from "react";

export const metadata = {
  title:
    "TribesforGood Projects: Climate Action, Gender Equality, & Community Impact",
  description:
    "Young Changemakers addressing key global issues like climate change, education for all, and gender equality. Join our mission to create lasting community impact.",
  keywords: [
    "TribesforGood projects",
    "Climate action initiatives",
    "Gender equality programs",
    "Community impact projects",
    "Young changemakers",
    "Education for all initiatives",
    "Social impact projects",
    "Sustainability programs",
    "Empowering communities",
    "Global issues solutions",
    "Youth-led projects",
    "Climate change awareness",
    "Education accessibility",
    "Social justice projects",
    "Volunteer-driven impact",
    "Social entrepreneurship",
    "Sustainable development goals",
    "Community development programs",
    "Inclusive growth initiatives",
    "Impact-driven changemakers",
  ],
  openGraph: {
    title:
      "TribesforGood Projects: Climate Action, Gender Equality, & Community Impact",
    description:
      "Young Changemakers addressing key global issues like climate change, education for all, and gender equality. Join our mission to create lasting community impact.",
    images: [
      {
        url: "/assets/assets/feature.png", // Path to your image in the public/assets/assets folder
        width: 1200,
        height: 630,
        alt: "Careers at TribesforGood: Join the Movement for Positive Change",
      },
    ],
  },
};

const contentData = {
  title: "Featured Projects",
  description:
    "We are Asia’s first & largest School of Changemakers transforming students into social impact leaders. With a tribe of 3500+, we are always buzzing with changemakers and their impactful projects. ",

  section: [
    {
      section: "Law and Journalism",

      subSection: [
        {
          individual: [
            {
              name: "Sia Chakravartula",
              grade: "Grade 10",
              school: "The International School, Bangalore",
              batch: "TFG Batch 2024",
              projectTitle: "Voice for Justice",
            },
          ],
          bulletTitle1: "Her Project:",
          about:
            "Sia has always been passionate about exploring the world around her. With a love for reading, music, and documentaries, she also has a keen interest in understanding complex social issues and potential solutions.",
          projectDetails: [
            "Troubled by the normalisation of racism against Indians on social media, Sia took the problem head-on to dissect the issue and propose solutions.",
            "She analysed the online platform X for posts and comments highlighting discrimination against Indians.",
            "Upon her research, she also found a peculiar similarity on the discrimination against Indian & Chinese people.",
          ],
          nextSteps: [
            "Sia suggests better moderation on social media platforms to draw a better line between free speech and hate speech.",
            "Racism bots that are up-to-date with modern discriminative speech.",
            "Educational campaigns in high school classes across countries to prevent racism in the future from an impressionable generation.",
          ],
          image: "/assets/assets/projects/law.svg",
        },
      ],
    },
    {
      section: "Social Entrepreneurship",
      subSection: [
        {
          individual: [
            {
              name: "Aarna Gunwani",
              grade: "Grade 11",
              school: "Singapore International School",
              batch: "TFG Batch 2024",
              projectTitle:
                "Small Business x Gender - Expanding Social Enterprises",
            },
          ],
          bulletTitle1: "Her Project:",
          about:
            "Aarna is a firm believer in unity as a key driver of growth. When asked why social impact? She said 'I take pride in using my skills to support the development of others. It makes me feel part of something larger than myself, and that feeling gives me purpose.'",
          projectDetails: [
            "Aarna worked relentlessly to provide young individuals with the skills necessary to start and expand small businesses, specifically through candle-making workshops to generate revenue during the festival season in India.",
            "She also worked with 3 NGOs helping them develop skills that could turn into a potential earning opportunity.",
          ],
          nextSteps: [
            "In the future, Aarna envisions collaborating with like-minded changemakers and organizations to scale her initiatives, fostering unity and driving collective growth in underserved communities.",
            "Her ultimate goal is to inspire individuals to embrace their potential and create a ripple effect of positive change.",
          ],
          image: "/assets/assets/projects/social1.svg",
        },
        {
          individual: [
            {
              name: "Anaya Taneja",
              grade: "Grade 11",
              school: "Sun City School, Gurgaon",
              batch: "TFG Batch 2024",
              projectTitle: "Expanding - Festohar",
            },
          ],
          bulletTitle1: "Her Project:",
          about:
            "Anaya, a passionate young leader, is driven by a dual vision: empowering small businesses—the backbone of her community—and uplifting women from underserved communities through social entrepreneurship.",
          projectDetails: [
            "Anaya expanded Festohar, a student-led initiative that skills underprivileged women to create and sell eco-friendly festival products, promoting financial independence.",
            "She also supported local business owners, like Seema at her local ironing stall and Shamshad the tailor in her community amongst others, by setting up their email accounts, correcting online locations, and introducing tools like Google and WhatsApp Business to help them grow digitally.",
          ],
          nextSteps: [
            "She has reached 50+ students through workshops on online marketing for small businesses.",
            "Anaya plans to scale her efforts, creating more opportunities for growth and sustainability within her community.",
          ],
          image: "/assets/assets/projects/social2.svg",
        },
        {
          individual: [
            {
              name: "Abhir Kewalramani",
              grade: "Grade 12",
              school: "Dubai College",
              projectTitle: "Chessin2Minutes!",
            },
          ],
          bulletTitle1: "His Project:",
          about:
            "What started as a personal project - teaching chess to children and grandparents during the pandemic amplified into chess workshops with 3 NGOs, reaching 200 young women and students.",
          projectDetails: [
            "Abhir created an innovative curriculum that would make chess easy by incorporating relatable examples from Cricket and Bollywood.",
            "He hosted chess tournaments first in April & due to a positive turnout again in - August of 2024.  The winning teams got their own chessboards!",
            "Aside from the campaign’s quantitative value, Abhir  emphasized the cognitive skills as well as wellbeing benefits associated with Chess.",
          ],
          nextSteps: [
            "Abhir has partnered with the SMCA (South Mumbai Chess Academy) to offer free training for students as part of the project.",
          ],
          image: "/assets/assets/projects/social3.svg",
        },
      ],
    },
    {
      section: "Finance Innovative Funds",
      subSection: [
        {
          individual: [
            {
              name: "Aadi Juthani",
              grade: "Grade 12",
              school: "Dhirubhai Ambani Int School, Mumbai",
              batch: "TFG Batch 2024",
              projectTitle: "Social Stock Exchange for Non-profits",
            },
          ],
          bulletTitle1: "His Project:",
          about:
            "Aadi Juthani is on a mission to bridge India’s financial divide. A consistent contributor to social work, Aadi stays closely connected with multiple NGOs, recognizing the struggles faced by families, women in rural areas, and organizations lacking stable funding.",
          projectDetails: [
            "Aadi delved into the world of impact investing, researching the Social Stock Exchange (SSE). He even wrote a meticulously researched article highlighting the SSE's success stories and future potential, providing parents (the target audience) with a clear picture of the SSE's benefits, risks, and investment process.",
            "He also pitched the idea of The SSE to NGO Chaitanya Kul's Founder, highlighting the benefits of the SSE that would reach potential investors and aid NGO growth.",
          ],
          nextSteps: [
            "Aadi envisions a world where societal value is measured not by material assets but by the difference individuals make. He continues to work toward this vision, leveraging his skills and consistency to inspire lasting change.",
          ],
          image: "/assets/assets/projects/finance.svg",
        },
      ],
    },
    {
      section: "Human Trafficking",
      subSection: [
        {
          individual: [
            {
              name: "Vedika Agarwal",
              grade: "Grade 12",
              school: "Indus International School",
              projectTitle: "PuneGen Z & Human Trafficking",
            },
            {
              name: "Abhishek Iyer",
              grade: "Grade 11",
              school: "DAV Public School, Pune",
              batch: "TFG Batch 2023 - 2024",
              projectTitle: "Gen Z & Human Trafficking",
            },
          ],
          bulletTitle1: "Their Project:",
          about:
            "Vedika and Abhishek identified a critical opportunity to support victims of domestic abuse through their everyday visits to public spaces like grocery stores and markets. This realization led to the creation of the Bad Apples Campaign.",
          projectDetails: [
            "Through the campaign, the team created a prop setup and strategically left apples labeled with helpline numbers and a QR code leading to a fundraising page to support the work at Kshamata NGO.",
            "They successfully raised an impressive sum of 30,000 INR",
            "They also skillfully rallied the support of multiple individuals and sparked fruitful discussions on domestic violence.",
          ],
          nextSteps: [
            "Vedika and Abhishek plan to deepen the impact of the Bad Apples Campaign by integrating discreet support tools, like QR codes linking to helplines and resources, in everyday public spaces across different cities in India.",
          ],
          image: "/assets/assets/projects/human.svg",
        },
      ],
    },
    {
      section: "Education & Tech",
      subSection: [
        {
          individual: [
            {
              name: "Amogh Raghavendra",
              grade: "Grade 10",
              school: "National Academy for Learning, Bangalore",
              batch: "TFG Batch 2023 - 2024",
              projectTitle: "STEM Influencer",
            },
          ],
          bulletTitle1: "His Project:",
          about:
            "Amogh has demonstrated a proactive approach by actively engaging in offline events, contributing significantly to the learning experiences of both students and non-profits.",
          projectDetails: [
            "Through his involvement with ACCESS and Tan90, Amogh has added immense value, fostering meaningful connections and enhancing educational initiatives.",
            "His dedication to social impact has created lasting value for the communities he’s engaged with.",
          ],
          nextSteps: [
            "Amogh is eager to continue his work, expanding his efforts to create further social impact. With a strong foundation in community engagement, he aims to keep driving change and contributing to the growth of underserved communities.",
          ],
          image: "/assets/assets/projects/education.svg",
        },
      ],
    },
    {
      section: "Stem Education",
      subSection: [
        {
          individual: [
            {
              name: "Ruchita Nair",
              school: "Dartmouth ‘28",
              batch: "TFG Batch 2022 - 2024",
              projectTitle: "Women for STEM India",
            },
          ],
          bulletTitle1: "Her Project:",
          about:
            "Ruchita is a prime example of when a young mind meets passion, purpose and opportunities.",
          projectDetails: [
            `Ruchita’s social impact journey began at TribesforGood in 2022, where she developed her leadership skills and focused on STEM education for girls. She launched "Children for Children," an online platform helping students overcome barriers and embrace creativity through English language skills.`,
            'Her campaign at TFG fuelled the fire of "Women for STEM India," a global movement she founded with members from over five countries.',
          ],
          nextSteps: [
            "Ruchita hosts a podcast where she spotlights leaders in STEM, inspiring young minds to pursue innovation and discovery. This December, she will rejoin TribesforGood as an intern, aiming to design initiatives that spark curiosity and foster greater participation in STEM fields among underrepresented groups.",
          ],
          image: "/assets/assets/projects/stem.svg",
        },
      ],
    },
    {
      section: "Mental Health Advocate",
      subSection: [
        {
          individual: [
            {
              name: "Zehn Kashyap",
              school: "Dartmouth ‘28",
              batch: "TFG Batch 2022 - 2024",
              projectTitle: "Advocate for differentness",
            },
          ],
          bulletTitle1: "Her Project:",
          about:
            "Zehn is  a vivacious, smart, and resolute advocate for differentness. Driven by her passion to promote diversity, inclusion, and mental health, she has channeled her energy into creating meaningful change.",
          projectDetails: [],
          nextSteps: [
            "Through Project 25 she has addressed critical issues like mental health advocacy and the impact of cyberbullying.",
            "Zehn has also conducted hands-on awareness workshops educating young children on topics such as cyberbullying and LGBTQIA+ inclusion.",
          ],
          image: "/assets/assets/projects/mental.svg",
        },
      ],
    },
    {
      section: "Supportive Healthcare",
      subSection: [
        {
          individual: [
            {
              name: "Krish Kadamb",
              school: "Supportive Healthcare - UAE",
              batch: "TFG Batch 2024",
              projectTitle: "Designing Teen Friendly Health Clinic",
            },
          ],
          bulletTitle1: "His Project:",
          about:
            "Krish is a changemaker dedicated to improving adolescent healthcare experiences.",
          projectDetails: [
            "Krish redesigned a handbook for hospital staff, including doctors and nurses, to bridge the communication gap with adolescent patients.",
            "His initiative ensures that young patients feel welcomed, understood, and supported during their healthcare journey.",
          ],
          nextSteps: [
            "Krish aims to continue fostering empathetic and inclusive healthcare environments, leveraging innovative approaches to enhance patient-staff interactions.",
          ],
          image: "/assets/assets/projects/supportive.svg",
        },
      ],
    },
    {
      section: "Financial Inclusion",
      subSection: [
        {
          individual: [
            {
              name: "Celine Pinto",
              school: "Financial Inclusion -China",
              batch: "TFG Batch 2024",
              projectTitle: "Inclusive Finance",
            },
          ],
          bulletTitle1: "Her Project:",
          about:
            "Celine is a passionate advocate for financial inclusion and women empowerment",
          projectDetails: [
            "Celine found that women often found it difficult to approach banks, whether it be complex processes, or financial terms that can create frustration and apprehension.",
            "To solve this, she created a Bank Blueprint that was distributed amongst underprivileged women to make banking inclusive & accessible",
          ],
          nextSteps: [
            "Celine aims to advocate for financial literacy, to ensure that women feel empowered to confidently engage with financial institutions.",
          ],
          image: "/assets/assets/projects/financial.svg",
        },
      ],
    },
    {
      section: "Equity and Inclusion",
      subSection: [
        {
          individual: [
            {
              name: "Ayaan Agarwal",
              school: "Equity & Inclusion -Singapore",
              batch: "TFG Batch 2024",
              projectTitle: "Grassroots Change Amplifier",
            },
          ],
          bulletTitle1: "His Project:",
          about:
            "Ayaan is a dedicated changemaker focused on improving the lives of migrant workers through direct action and community support",
          projectDetails: [
            "Ayaan organized a donation drive, collecting clothes, shoes, games, and more for migrant workers in Singapore. He even provided them with immediate relief and contributed to a larger movement advocating for migrant workers’ rights and well-being.",
          ],
          nextSteps: [
            "Ayaan continues to champion the cause of migrant workers, working towards long-term solutions and amplifying the importance of community advocacy for vulnerable populations.",
          ],
          image: "/assets/assets/projects/equity.svg",
        },
      ],
    },
    {
      section: "Gender and Health",
      subSection: [
        {
          individual: [
            {
              name: "Ananya Singh",
              school: "Gender Advocate -Indonesia",
              batch: "TFG Batch 2024",
              projectTitle: "Keeping Girls in Schools",
            },
          ],
          bulletTitle1: "Her Project:",
          about:
            "Ananya is an advocate for girls' education and menstrual health, breaking barriers and empowering young women!",
          projectDetails: [
            "Ananya launched the #keepgirlsinschool campaign to address the educational gap due to lack of menstrual-hygiene awareness in Indonesia. She connected female students to health experts and involved men in the discussion breaking taboos.",
            "She also hosted bracelet making workshops for women to reflect their personal perceptions and experiences related to menstruation in a bracelet.",
          ],
          nextSteps: [
            "Ananya aims to continue advocating for menstrual health education, working towards breaking taboos and ensuring that all girls have the resources to stay in school and thrive.",
          ],
          image: "/assets/assets/projects/gender.svg",
        },
      ],
    },
  ],
};

const FeaturedProjects = () => {
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

      <div className="w-full">
        {contentData?.section.map((content, i) => {
          return <ContentCard key={i} data={content} index={i} />;
        })}
      </div>
      <Footer />
    </div>
  );
};

export default FeaturedProjects;

const ContentCard = ({ index, data }) => {
  return (
    <AnimatedBox
      className={`${
        index % 2 === 0 ? "bg-white" : "bg-hero-gradient"
      } w-full lg:py-[60px] py-[24px]`}
    >
      <div className="max-w-6xl flex flex-col gap-2 lg:gap-8 px-5 mx-auto">
        <div className="text-primary font-raleway text-center lg:text-left lg:text-[20px] text-[14px] font-bold text-[20px] lg:text-[32px]">
          {data?.section}
        </div>
        <div
          className={`flex flex-col gap-5 lg:gap-10 ${
            index % 2 === 0 ? "flex-col-reverse" : ""
          }`}
        >
          {data?.subSection?.map((sub, i) => {
            return (
              <AnimatedBox
                key={i}
                className={`flex flex-col lg:flex-row  items-start gap-4 lg:gap-16 justify-center w-full ${
                  i % 2 === 0 ? "" : "lg:flex-row-reverse"
                }`}
              >
                <div className="flex lg:w-[420px] mx-auto  flex-col items-center  lg:items-start justify-center ">
                  <Image
                    width={10}
                    height={10}
                    className="lg:w-[420px] lg:h-[420px] max-w-sm rounded-lg lg:rounded-xl object-cover lg:max-w-none w-full"
                    alt=""
                    src={sub?.image}
                  />
                  <div className="flex flex-col my-3 text-wide items-center lg:items-start  justify-center">
                    {sub?.individual?.map((curr, i) => {
                      return (
                        <div
                          key={i}
                          className="flex flex-col my-1 gap-0.5 items-center lg:items-start justify-center"
                        >
                          <div className="text-primary font-bold">
                            {curr?.name}
                          </div>
                          <div>
                            {curr?.grade} - {curr?.school}
                          </div>
                          <div>{curr?.batch}</div>
                          <div className="text-[#1F2937] font-bold pr-3">
                            {curr?.projectTitle}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex-1 flex flex-col gap-3 lg:gap-6 text-muted">
                  <div className="leading-[30px]">{sub?.about}</div>

                  <div>
                    <div className="font-bold text-[#1F2937]">
                      {sub?.bulletTitle1}
                    </div>
                    <ul className="list-outside list-disc px-5 flex flex-col gap-1">
                      {sub?.projectDetails?.map((curr, i) => {
                        return (
                          <li key={i} className="leading-[30px]">
                            {curr}
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="font-bold text-[#1F2937]">
                      What&apos;s next
                    </div>
                    <ul className="list-outside list-disc px-5 flex flex-col gap-1">
                      {sub?.nextSteps?.map((curr, i) => {
                        return (
                          <li key={i} className="list-outside leading-[30px]">
                            {curr}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </AnimatedBox>
            );
          })}
        </div>
      </div>
    </AnimatedBox>
  );
};
