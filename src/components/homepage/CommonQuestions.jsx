"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import AnimatedBox from "@/common/animation/AnimatedBox";

const faqData = [
  {
    question: "How do I select a program if I like multiple themes?",
    answer:
      "We offer a 15-minute discovery call to guide you through selecting the best program for your needs.",
  },
  {
    question: "How long are the courses for?",
    answer:
      "The duration of each course varies. Please check the course details for exact information.",
  },
  {
    question: "Can the program be managed alongside school hours?",
    answer:
      "Yes, our program is designed to be flexible and manageable alongside school hours.",
  },
  {
    question:
      "How much time should I allocate for homework or pre-reads outside of class?",
    answer:
      "We recommend allocating at least 1-2 hours for homework or pre-reads outside of class.",
  },
  {
    question: "Are offline fieldwork sessions available?",
    answer:
      "Yes, offline fieldwork sessions are available in select locations.",
  },
  {
    question: "Will I receive a certificate?",
    answer:
      "Yes, upon completion of the program, you will receive a certificate.",
  },
];

const CommonQuestions = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <AnimatedBox className="bg-white lg:bg-hero-gradient px-5 py-10 lg:py-16">
      <h2 className="text-[#1F2937] text-center text-[24px] lg:text-[32px] px-12 font-bold mb-[20px] lg:mb-[60px]">
        The most common questions
      </h2>

      <div className="flex justify-between   max-w-7xl mx-auto flex-col gap-8 lg:gap-16  lg:flex-row">
        <div className=" lg:w-[380px] w-full">
          <Image
            alt=""
            width={10}
            height={10}
            className=" w-full mx-auto h-[460px]"
            src="/assets/assets/faq/hero.svg"
          />
        </div>
        <div className="flex-1 gap-4 flex  flex-col">
          {faqData.map((item, index) => (
            <FAQItem
              key={index}
              index={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </AnimatedBox>
  );
};

export default CommonQuestions;

const FAQItem = ({ question, answer, isOpen, index, onClick }) => (
  <AnimatedBox
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ delay: index * 0.2 }}
    className={`border rounded-lg ${!isOpen ? "bg-[#F5F5F5]" : "bg-white"} 
       lg:rounded-xl overflow-hidden text-[14px] lg:text-base cursor-pointer transition-colors duration-500`}
  >
    <div
      onClick={onClick}
      className="flex justify-between w-full  text-left p-4 text-gray-800 gap-3  font-semibold font-mulish"
    >
      <div className="pr-4 flex-1">{question}</div>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className=" w-6 h-6"
      >
        <Image
          alt=""
          width={20}
          height={20}
          className=" w-full h-full "
          src="/assets/assets/down-arrow.svg"
        />
      </motion.div>
    </div>
    <motion.div
      initial={{ height: 0 }}
      animate={{ height: isOpen ? "auto" : 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="overflow-hidden "
    >
      <div className="px-4 text-muted  pb-4  flex">
        {answer}
        <div></div>
      </div>
    </motion.div>
  </AnimatedBox>
);
