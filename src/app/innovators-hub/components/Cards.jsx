"use client";
import { motion } from "framer-motion";
import AnimatedBox from "@/common/animation/AnimatedBox";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

const data = [
  {
    title: "Climate x Finance",
    id: "climatexfinance",
    description:
      "Explore how tools like insurance models, welfare schemes, and climate-linked relief can protect vulnerable communities. Apply big economic thinking to real climate problems.",
    image: "/assets/assets/innovators-hub/climatexfinance.png",
  },
  {
    title: "Tech x Education",
    id: "techxeducation",
    description:
      "What happens when you use tech like chatbots, AI tools, or mobile-first learning platforms to increase adoption rates? Here you can prototype simple but scalable solutions, make learning accessible, contextual, and fun—redefining learning beyond the classroom walls.",
    image: "/assets/assets/innovators-hub/techxeducation.png",
  },
  {
    title: "Art x Design x Sustainability",
    id: "artxdesignxsustainability",
    description:
      "Reimagining the design of a craft item to developing a pitch.The goal? Expand into new markets while also using design as a tool for creative expression and sustainability.",
    image: "/assets/assets/innovators-hub/artxdesign.png",
  },

  {
    title: "Health & Innovation",
    id: "health-innovation",
    description:
      "With over 50% of India’s population under 25 and rising health consciousness, young minds are uniquely positioned to drive change whether it is advocacy campaigns or designing low-cost health kits to make healthcare affordable.",
    image: "/assets/assets/innovators-hub/healthxinnovation.png",
  },
  {
    title: "Sports x Inclusion",
    id: "sports-x-inclusion",
    description:
      "What if sports could be the game-changer for safer, fairer, and healthier futures? This theme is all about turning fields, courts, and playgrounds into platforms for equity and opportunity.",
    image: "/assets/assets/innovators-hub/sportsxinclusion.png",
  },
];

const Cards = () => {
  return (
    <section
      id="high-school"
      className=" py-10 lg:py-16 bg-primary text-center"
    >
      <h2 className="  text-[#1F2937] mx-auto text-[24px] lg:text-[32px] px-20 font-bold mb-2">
        Empowering Changemakers
      </h2>
      <p className="text-[16px] max-w-7xl mx-auto hidden lg:block px-5 lg:text-[20px] text-[#1F2937]  mb-10">
        Our community sparks transformation in 6500+ lives through bold
        initiatives. Explore 10+ areas like Inclusive Finance, Sustainability,
        Health & Innovation, Design Thinking, Sports & Inclusion, and beyond.
      </p>
      <p className="text-[16px] lg:hidden px-5 lg:text-[24px] text-[#1F2937]  mb-10">
        Our community sparks transformation in 6500+ lives through bold
        initiatives. Explore 10+ areas like Inclusive Finance, Sustainability,
        Health & Innovation, Design Thinking, Sports & Inclusion, and beyond.
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
            {/* <motion.div
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
            </motion.div> */}

            {/* Description animation */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-muted font-mulish text-[12px] lg:text-[16px] text-left  mb-4 flex-grow"
            >
              {description}
            </motion.p>
          </div>
        </div>
      </section>
    </AnimatedBox>
  );
};

export default Cards;
