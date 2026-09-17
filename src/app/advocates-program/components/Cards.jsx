"use client";
import { motion } from "framer-motion";
import AnimatedBox from "@/common/animation/AnimatedBox";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

const data = [
   {
    id: "climate-change-waste-management",
    image: "/assets/assets/advocates-program/climate-change-waste-management.png",
  },
  {
    id: "anti-bulying-inclusion",
    image: "/assets/assets/advocates-program/anti-bulying-inclusion.png",
  },
  {
    id: "tech-for-good",
    image: "/assets/assets/advocates-program/tech-for-good.png",
  },
  {
    id: "animal-welfare",
    image: "/assets/assets/advocates-program/animal-welfare.png",
  },
  {
    id: "sports-for-all",
    image: "/assets/assets/advocates-program/sports-for-all.png",
  },
];

const Cards = () => {
  return (
    <section
      id="high-school"
      className=" py-10 lg:py-16 bg-primary text-center"
    >
      <h2 className="  text-[#1F2937] mx-auto text-[24px] lg:text-[32px] px-20 font-bold mb-2">
        What Makes This Program Special?
      </h2>
      <p className="text-[16px] lg:text-[20px] max-w-7xl mx-auto px-5 text-[#1F2937]  mb-10">
        Each session is live, engaging, and led by mentors with 5+ years of experience in social impact and students can work on topics that cater to their interests:
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

const Card = ({ index, image, id }) => {
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
              alt={id}
              width={400}
              height={200}
              className="w-full rounded-md object-cover"
             // className="w-full h-80 rounded-md object-cover object-[50%_10%]"
            />
          </motion.div>

        </div>
      </section>
    </AnimatedBox>
  );
};

export default Cards;
