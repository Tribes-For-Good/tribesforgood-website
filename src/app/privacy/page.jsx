"use client";
import AnimatedBox from "@/common/animation/AnimatedBox";
import Navbar from "@/components/Navbar";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Footer from "@/components/homepage/Footer";

const contentData = {
  title: "Privacy policy",
  description:
    "This privacy policy governs your use of the software application TribesforGOOD. The application is created with the sole aim of providing our clients an experience that will enable them to send enquiries and manage their bookings & for the visitors to keep on getting updated about our upcoming programs!",

  questions: [
    {
      title: "What information does the application obtain and how is it used?",
      subSection: [
        {
          title: "USER PROVIDED INFORMATION",
          description: [
            {
              text: "The Application obtains the information you provide when you register and share details with us.",
            },
            {
              text: "When you register with us and use the Application, you generally provide",
              bullet: [
                "(a) your name, email id, address, age, user name, password and other registration information as may be required;",
                "(b) information you provide us when you contact us for help; and;",
                "(c) information you enter into our system when using the Application, such as contact information and project management information.",
              ],
            },
            {
              text: "We may also use the information you provided us to contact your from time to time to provide you with important information, required notices and marketing promotions.",
            },
          ],
        },
        {
          title: "AUTOMATICALLY COLLECTED INFORMATION",
          description: [
            {
              text: "In addition, the Application may collect certain information automatically, including, but not limited to, the type of mobile device you use, your mobile devices unique device ID, the IP address of your mobile device, your mobile operating system, the type of mobile Internet browsers you use, and information about the way you use the Application.",
            },
          ],
        },
      ],
    },
    {
      title:
        "Does the application collects precise real time location information of the device?",
      answer: {
        description:
          "This Application does not collect precise information about the location of your mobile device. Do third parties see and/or have access to information obtained by the Application? Only aggregated, anonymized data is periodically transmitted to external services to help us improve the Application and our service. We will share your information with third parties only in the ways that are described in this privacy statement. We may disclose User Provided and Automatically Collected Information:",
        bullet: [
          "as required by law, such as to comply with a subpoena, or similar legal process;",
          "when we believe in good faith that disclosure is necessary to protect our rights, protect your safety or the safety of others, investigate fraud, or respond to a government request;",
          "with our trusted service providers who work on our behalf, do not have an independent use of the information we disclose to them, and have agreed to adhere to the rules set forth in this privacy statement.",
        ],
      },
    },
    {
      title: "What are my opt-out rights?",
      answer: {
        description:
          "You can stop all collection of information by the Application easily, by sending an email to us. You can request to opt-out via email, at mandeep@tribesforgood.com",
      },

      subSection: [
        {
          title: "DATA RETENTION POLICY, MANAGING YOUR INFORMATION",
          description: [
            {
              text: "We will retain User Provided data for as long as you use the Application and for a reasonable time thereafter. We will retain Automatically Collected information for up to 24 MONTHS and thereafter may store it in aggregate. If you’d like us to delete User Provided Data that you have provided via the Application, please contact us at mandeep@tribesforgood.com and we will respond in a reasonable time. Please note that some or all of the User Provided Data may be required in order for the Application to function properly.",
            },
          ],
        },
        {
          title: "CHILDREN",
          description: [
            {
              text: "We do not use the Application to knowingly solicit data from or market to children under the age of 13. If a parent or guardian becomes aware that his or her child has provided us with information without their consent, he or she should contact us at mandeep@tribesforgood.com We will delete such information from our files within a reasonable time. We hold no responsibility to such data submitted.",
            },
          ],
        },
        {
          title: "SECURITY",
          description: [
            {
              text: "We are concerned about safeguarding the confidentiality of your information. We provide physical, electronic, and procedural safeguards to protect information we process and maintain. For example, we limit access to this information to authorized employees and contractors who need to know that information in order to operate, develop or improve our Application. Please be aware that, although we endeavour to provide reasonable security for information we process and maintain, no security system can prevent all potential security breaches.",
            },
          ],
        },
        {
          title: "CHANGES",
          description: [
            {
              text: "This Privacy Policy may be updated from time to time for any reason. You are advised to visit this Privacy Policy regularly for any changes, as continued use is deemed approval of all changes.",
            },
          ],
        },
        {
          title: "YOUR CONSENT",
          description: [
            {
              text: "By using the Application, you are consenting to our processing of your information as set forth in this Privacy Policy now and as amended by us. “Processing,” means using cookies on a computer/hand held device or using or touching information in any way, including, but not limited to, collecting, storing, deleting, using, combining and disclosing information, all of which activities will take place in the INDIA. If you reside outside the INDIA your information will be transferred, processed and stored there under INDIA privacy standards.",
            },
          ],
        },
        {
          title: "CONTACT US",
          description: [
            {
              text: "If you have any questions regarding privacy while using the Application, or have questions about our practices, please contact us via email at mandeep@tribesforgood.com",
            },
          ],
        },
      ],
    },
  ],
};

// AUTOMATICALLY COLLECTED INFORMATION In addition, the Application may collect certain information automatically, including, but not limited to, the type of mobile device you use, your mobile devices unique device ID, the IP address of your mobile device, your mobile operating system, the type of mobile Internet browsers you use, and information about the way you use the Application.
const Privacy = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className="overflow-hidden border relative flex flex-col  items-center justify-center">
      <Navbar />
      <div className="w-full">
        <div className="realtive w-full min-h-[100px] md:min-h-[250px]  md:mt-8 justify-center lg:min-h-[350px] lg:mt-16  flex items-center bg-[url('/assets/assets/background.svg')]  bg-cover bg-center">
          {/* <Image width={10} height={10} alt="" src="/assets/assets/background.svg" className="border w-full object-cover" /> */}
          <div className="max-w-md  lg:max-w-3xl py-16 pt-20 flex flex-col gap-2 w-full lg:gap-5 items-center justify-center">
            <AnimatedBox>
              <h1 className="font-extrabold  text-[20px] lg:text-[48px] font-raleway">
                {contentData?.title}
              </h1>
            </AnimatedBox>
          </div>
        </div>
      </div>
      <AnimatedBox className="text-muted max-w-6xl mx-auto font-mulish text-[14px] lg:text-[24px] text-wide p-5 text-center ">
        {contentData?.description}
      </AnimatedBox>
      <AnimatedBox className="max-w-6xl p-5 my-[20px] lg:my-[40px] w-full gap-3 lg:gap-6 flex flex-col  mx-auto">
        {contentData?.questions?.map((question, index) => {
          return (
            <PrivacyCard
              key={index}
              isOpen={index === openIndex}
              item={question}
              onClick={() => handleToggle(index)}
              index={index}
            />
          );
        })}
      </AnimatedBox>
      <Footer />
    </div>
  );
};

export default Privacy;

const PrivacyCard = ({ isOpen, index, onClick, item }) => (
  <AnimatedBox
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ delay: index * 0.2 }}
    className={`border rounded-lg ${!isOpen ? "bg-[#F5F5F5]" : "bg-white"} 
       lg:rounded-xl overflow-hidden text-[14px] lg:text-base cursor-pointer w-full transition-colors duration-500`}
  >
    <div
      onClick={onClick}
      className="flex justify-between w-full  text-left p-4 text-gray-800 gap-3  font-semibold font-mulish"
    >
      <div className="pr-4 flex-1 lg:text-2xl text-sm text-[#1F2937] font-mulish">
        {item?.title}
      </div>
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
      <div className="px-4 text-muted text-sm lg:text-base  pb-4  flex">
        <div className="flex  flex-col  gap-2 lg:gap-4">
          {item?.answer && (
            <div>
              {item?.answer?.description && (
                <div className="">{item?.answer?.description}</div>
              )}
              {item?.answer?.bullet && (
                <ul className="list-outside mx-8 flex flex-col gap-1 my-1">
                  {item?.answer?.bullet?.map((curr, i) => {
                    return (
                      <li key={i} className="list-outside list-disc">
                        {curr}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          )}
          {item?.subSection && (
            <div className="flex flex-col gap-3 lg:gap-4">
              {item?.subSection?.map((curr, i) => {
                return (
                  <div key={i} className="flex flex-col gap-2">
                    <div className="text-[#1F2937] font-medium">{curr?.title}</div>
                    <div>
                      {curr?.description?.map((description, i) => {
                        return (
                          <div key={i}>
                            <div>{description?.text}</div>
                            {description?.bullet && (
                              <div>
                                {description?.bullet?.map((curr, i) => {
                                  return <div key={i}>{curr}</div>;
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  </AnimatedBox>
);
