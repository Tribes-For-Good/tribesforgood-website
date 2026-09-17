"use client";
import { motion } from "framer-motion";
import AnimatedBox from "@/common/animation/AnimatedBox";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

const data = [
  {
    title: "Tech for Good",
    id: "tech-for-good",
    duration: "4 - 6 Weeks",
    description:
      "Use technology as a force for good—tackling challenges in education, STEM, and nonprofit impact. The initiative explores applications of AI for social change, promotes cybersecurity awareness, and upskills diverse stakeholders, while also addressing the gender gap in STEM. Beyond the basics, it sparks curiosity in advanced fields like astrophysics and robotics and building inclusive futures with technology.",
    image: "/assets/assets/changemakers/1.png",
  },
  {
    title: "Finance & Economics",
    id: "finance-economics",
    duration: "4 - 6 Weeks",
    description:
      "Explore projects at the intersection of finance, mindset shifts, design thinking, and social impact. Our School of Changemakers champions inclusive finance—simplifying personal and digital finance for everyday impact, creating awareness around emerging concepts like the Social Stock Exchange and microfinance, and unpacking the realities of the Gig Economy.",
    image: "/assets/assets/changemakers/2.png",
  },
  {
    title: "Public Health",
    id: "public-health",
    duration: "4 - 6 Weeks",
    description:
      "In India, millions are affected each year by community challenges—ranging from health crises like dengue and malaria to inadequate infrastructure and environmental degradation. Our campaign empowers individuals to tackle these issues head-on, designing wellness kits that promote healthy living and driving efforts toward affordable healthcare.",
    image: "/assets/assets/changemakers/3.png",
  },
  {
    title: "Sports x Inclusion",
    id: "sports-inclusion",
    duration: "4 - 6 Weeks",
    description:
      "Sports should empower, not exclude and our campaigns make that vision real. By tackling hunger, inequality, and stigma, we transform sports into a force for health, equity, and community ensuring every child, especially girls, have the confidence and opportunity to play, grow, and thrive.",
    image: "/assets/assets/changemakers/4.png",
  },
  {
    title: "Journalism & Law",
    id: "journalism-law",
    duration: "4 - 6 Weeks",
    description:
      "This project empowers budding journalists to utilize their investigative skills and storytelling prowess to tackle critical social impact issues at the intersection of journalism, law, and finance. We address pressing problems like the gender pay gap, equipping the public with knowledge and inspiring action towards a more equitable and just society.",
    image: "/assets/assets/changemakers/5.png",
  },
  {
    title: "Climate & Sustainability",
    id: "climate-and-sustainability",
    duration: "4 - 6 Weeks",
    description:
      "From sustainable solutions for urban heat levels, solar power, and product packaging to saving the bees, ocean conservation, night sky and waste pickers, Our School of Changemakers is combating climate change at every level. Living eco-conscious is our way.",
    image: "/assets/assets/changemakers/6.png",
  },
];

const ChangeMakers = () => {
  return (
    <section
      id="high-school"
      className=" py-10 lg:py-16 bg-primary text-center"
    >
      <h2 className="  text-[#1F2937] mx-auto text-[24px] lg:text-[32px] px-20 font-bold mb-2">
        Our School of Changemakers
      </h2>
      <p className="text-[16px] max-w-7xl mx-auto hidden lg:block px-5 lg:text-[20px] text-[#1F2937]  mb-10">
        Our tribe has created a ripple effect of change among 10,000+ individuals
        with their impactful projects. Choose from 10+ themes including
        Inclusive Finance, Journalism, Health Equity, Design Thinking, Social
        Entrepreneurship, Business & more.
      </p>
      <p className="text-[16px] lg:hidden px-5 lg:text-[24px] text-[#1F2937]  mb-10">
        Choose from 10+ themes including Inclusive Finance, Journalism, Health
        Equity, Design Thinking, Social Entrepreneurship, Business & more.
      </p>

      {/* Grid layout for cards */}
      <div className="flex flex-wrap max-w-7xl   mx-auto justify-center w-full gap-5 lg:gap-10  px-4">
        {data.map((card, index) => (
          <Card key={index} index={index} {...card} />
        ))}
      </div>
    </section>
  );
};

const Card = ({ title, index, duration, description, image, id }) => {
  const router = useRouter();
  const handleRedirect = (key) => {
    // Replace with your desired key
    router.push(`/changemakers/${key}`);
  };
  return (
    <AnimatedBox className={`${index === 0 ? "hidden lg:block" : ""}`}>
      {/* Card layout with consistent height and flex positioning */}
      <section className="h-full">
        <div className="flex flex-col  justify-between bg-white rounded-lg shadow-md overflow-hidden  max-w-sm h-full mx-auto ">
          {/* Image with animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="p-3"
          >
            <Image
              src={image}
              alt={title}
              width={400}
              height={200}
              className="w-full h-72 rounded-md object-cover object-[50%_10%]"
            />
          </motion.div>

          {/* Content area with flex positioning to push button to the bottom */}
          <div className="flex flex-col items-start justify-between p-4 flex-grow">
            {/* Title animation */}
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl text-[16px] font-raleway lg:text-[24px] text-[#1F2937] font-semibold mb-2"
            >
              {title}
            </motion.h3>

            {/* Duration animation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-green font-mulish flex gap-2 items-center font-medium text-sm mb-2"
            >
              <Image
                src="/assets/assets/timer.svg"
                width={10}
                height={10}
                alt=""
                className="w-[20px]"
              />
              {duration}
            </motion.div>

            {/* Description animation */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-muted font-mulish text-[12px] lg:text-[16px] text-left  mb-4 flex-grow"
            >
              {description}
            </motion.p>

            {/* Button animation */}
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-auto font-raleway bg-gold text-[#1F2937] w-max py-2 px-4 rounded-md font-medium text-[16px] lg:text-[18px] hover:bg-gold"
              onClick={() => handleRedirect(id)}
            >
              View more
            </motion.button>
          </div>
        </div>
      </section>
    </AnimatedBox>
  );
};

export default ChangeMakers;
