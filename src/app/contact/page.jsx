"use client";
import AnimatedBox from "@/common/animation/AnimatedBox";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import React, { useState } from "react";
import { db } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";
import { logToSheet } from "@/lib/sheetLog";
import { FaSpinner } from "react-icons/fa";
import dynamic from "next/dynamic";

// Dynamically import heavy components
const Footer = dynamic(() => import("@/components/homepage/Footer"));
const EmailModal = dynamic(() => import("@/components/modal/EmailModal"));

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [mailSent, setMailSent] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message,
  });
  const [loading, setLoading] = useState(false); // Add loading state

  const validateEmail = () => {
    if (
      email === "" ||
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    ) {
      setError({ ...error, email: "Email address is invalid" });
      return false;
    } else {
      setError({ email: "" });
    }
    return true;
  };
  const validatePhone = () => {
    if (phone === "" || !/^[0-9]{10}$/.test(phone)) {
      setError({ ...error, phone: "Phone number is invalid" });
      return false;
    } else {
      setError({ phone: "" });
    }
    return true;
  };
  const validateName = () => {
    if (name === "") {
      setError({ ...error, name: "Name is invalid" });
      return false;
    } else {
      setError({ name: "" });
      return true;
    }
  };

  const validateFields = () => {
    if (!validateName()) {
      return false;
    }
    if (!validateEmail()) {
      return false;
    }
    if (!validatePhone()) {
      return false;
    }
    return true;
  };

  const data = {
    name,
    email,
    phone,
    subject,
    message,
  };
  const handleSubmit = async () => {
    if (validateFields()) {
      setLoading(true); // Start loader
      try {
        // 1. Store in Firestore. A timestamp is added here because the form
        // previously saved no date, making enquiries impossible to order.
        await addDoc(collection(db, "contacts"), {
          ...data,
          timestamp: new Date(),
        });

        // 2. Send email via API route
        await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        // 3. Mirror into the Google Sheet (never blocks the submission)
        logToSheet({ type: "contact", ...data });

        setMailSent(true);
        setName("");
        setEmail("");
        setPhone("");
        setSubject("");
        setMessage("");
      } catch (error) {
        console.error("Error saving contact or sending email:", error);
      } finally {
        setLoading(false); // Stop loader
      }
    }
  };

  return (
    <div className="overflow-hidden relative flex flex-col  items-center justify-center">
      <Navbar />
      {/* <div className="2xl:h-[2350px]  2xl:w-[2350px] md:h-[1400px]  md:w-[1400px] md:-top-[1250px] 2xl:-top-[1850px] lg:h-[1750px]  lg:w-[1750px] xl:h-[2150px]  xl:w-[2150px] xl:-top-[1750px] lg:-top-[1450px] z-10 -top-[1900px] translate-x-auto lg:w-[2400px]  rounded-full absolute bg-gradient1 h-64 w-full">

      </div> */}
      {/* <div className="relative w-full h-[600px] border  overflow-hidden">
        <svg
          className="absolute top-16 left-0 w-full "
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 20"
          preserveAspectRatio="1:1"
        >
          
          <path
            d="M 0 0 Q 50 40 100 0 Z"
            fill="blue" 
          />
        </svg>
      </div> */}

      <div className="w-full">
        <div className="relative w-full min-h-[200px] justify-center lg:min-h-[400px]  flex items-center bg-[url('/assets/assets/background.svg')]  bg-cover bg-center">
          {/* <Image width={10} height={10} alt="" src="/assets/assets/background.svg" className="border w-full object-cover" /> */}
          <div className="max-w-md  lg:max-w-lg py-16 pt-20 flex flex-col gap-2 w-full lg:gap-5 items-center justify-center">
            <AnimatedBox>
              <h1 className="font-extrabold  text-[32px] lg:text-[68px] font-raleway">
                Contact Us
              </h1>
            </AnimatedBox>
            <AnimatedBox>
              <p className="font-mulish  w-full lg:max-w-lg  px-10 text-center text-muted text-[14px] lg:text-[24px]">
                To start your impactful journey with us
              </p>
            </AnimatedBox>
          </div>
        </div>
      </div>

      <div className="lg:p-5 overflow-hidden w-full">
        {mailSent ? (
          <ConfirmationComponent />
        ) : (
          <div className="flex flex-col max-w-xl items-center justify-center gap-10 mx-auto p-5 lg:py-10">
            <div className="font-raleway font-medium lg:text-[32px] text-[20px]">
              Fill in the details below
            </div>
            <div className="w-full flex flex-col gap-5">
              <div className="relative">
                <input
                  value={name}
                  onBlur={validateName}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  id="name"
                  placeholder=" "
                  className={`${
                    error?.name
                      ? "border-red-600 focus:border-red-500"
                      : "border-[#6B737A] focus:border-[#6B7280] peer"
                  } block w-full px-2.5 pb-3 pt-3 text-sm  bg-transparent rounded lg:rounded-md border  appearance-none focus:outline-none focus:ring-0 `}
                />

                <label
                  htmlFor="name"
                  className={`absolute ${
                    error?.name ? "text-red-500" : ""
                  } text-sm text-[#6B7280] duration-300 transform -translate-y-4 scale-75 top-1.5 z-10 origin-[0] bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:text-[#6B7280] peer-focus:scale-75 peer-focus:-translate-y-4 left-2`}
                >
                  Full Name
                </label>
              </div>
              <div className="relative w-full">
                <input
                  value={email}
                  onBlur={validateEmail}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  id="email"
                  placeholder=" "
                  className={`${
                    error?.email
                      ? "border-red-600 focus:border-red-500"
                      : "border-[#6B737A] focus:border-[#6B7280] peer"
                  } block w-full px-2.5 pb-3 pt-3 text-sm  bg-transparent rounded lg:rounded-md border  appearance-none focus:outline-none focus:ring-0 `}
                />

                <label
                  htmlFor="email"
                  className={`absolute ${
                    error?.email ? "text-red-500" : ""
                  } text-sm text-[#6B7280] duration-300 transform -translate-y-4 scale-75 top-1.5 z-10 origin-[0] bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:text-[#6B7280] peer-focus:scale-75 peer-focus:-translate-y-4 left-2`}
                >
                  Email
                </label>
              </div>
              <div className="relative">
                <input
                  onBlur={validatePhone}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="text"
                  id="phone"
                  placeholder=" "
                  className={`${
                    error?.phone
                      ? "border-red-600 focus:border-red-500"
                      : "border-[#6B737A] focus:border-[#6B7280] peer"
                  } block w-full px-2.5 pb-3 pt-3 text-sm  bg-transparent rounded lg:rounded-md border  appearance-none focus:outline-none focus:ring-0 `}
                />

                <label
                  htmlFor="phone"
                  className={`absolute ${
                    error?.phone ? "text-red-500" : ""
                  } text-sm text-[#6B7280] duration-300 transform -translate-y-4 scale-75 top-1.5 z-10 origin-[0] bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:text-[#6B7280] peer-focus:scale-75 peer-focus:-translate-y-4 left-2`}
                >
                  Phone Number
                </label>
              </div>
              <div className="relative">
                <div
                  onClick={() => setShowDropDown(!showDropDown)}
                  className={`${
                    error?.subject
                      ? "border-red-600 focus:border-red-500"
                      : "border-[#6B737A] focus:border-[#6B7280] peer"
                  } block w-full px-4 text-muted pb-3 flex justify-between pt-3 text-sm bg-transparent rounded lg:rounded-md border appearance-none focus:outline-none focus:ring-0 resize-none overflow-hidden`}
                >
                  <div
                    className={`${
                      subject === "" ? "text-muted" : "text-[#1F2937]"
                    }`}
                  >
                    {subject === "" ? "Subject" : subject}
                  </div>
                  <Image
                    src="/assets/assets/contact/arrow.svg"
                    width={10}
                    height={10}
                    alt=""
                    className="w-[24px] h-[24px]"
                  />
                </div>
                {showDropDown && (
                  <div className="my-1 text-[#1F2937] text-[14px] lg:text-[16px] divide-y shadow-custom rounded-md">
                    <div
                      onClick={() => {
                        setSubject("Enquiry - Programs");
                        setShowDropDown(false);
                      }}
                      className="px-4 p-2"
                    >
                      Enquiry - Programs
                    </div>
                    <div
                      onClick={() => {
                        setSubject("Enquiry - Careers");
                        setShowDropDown(false);
                      }}
                      className="px-4 p-2"
                    >
                      Enquiry - Careers
                    </div>
                  </div>
                )}
              </div>
              <div className="relative">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  id="message"
                  placeholder=" "
                  rows={1}
                  className={`${
                    error?.message
                      ? "border-red-600 focus:border-red-500"
                      : "border-[#6B737A] focus:border-[#6B7280] peer"
                  } block w-full px-2.5 pb-3 pt-3 text-sm bg-transparent rounded lg:rounded-md border appearance-none focus:outline-none focus:ring-0 resize-none overflow-hidden`}
                  onInput={(e) => {
                    e.target.style.height = "auto"; // Reset height
                    e.target.style.height = `${e.target.scrollHeight}px`; // Adjust height to content
                  }}
                />

                <label
                  htmlFor="message"
                  className={`absolute ${
                    error?.message ? "text-red-500" : ""
                  } text-sm text-[#6B7280] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:text-[#6B7280] peer-focus:scale-75 peer-focus:-translate-y-4 left-2`}
                >
                  Message
                </label>
              </div>

              <div className="flex items-center gap-3  lg:gap-5 justify-center">
                <AnimatedBox>
                  <div
                    onClick={loading ? undefined : handleSubmit}
                    className={`bg-primary border border-primary cursor-pointer w-max px-4 p-2 hover:opacity-80 text-black font-raleway font-medium border-none outline-none rounded-md flex items-center justify-center min-w-[100px] ${
                      loading ? "opacity-60 pointer-events-none" : ""
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <FaSpinner className="animate-spin" />
                        Submitting...
                      </span>
                    ) : (
                      "Submit"
                    )}
                  </div>
                </AnimatedBox>
                {/* <AnimatedBox className="bg-white border-primary border  cursor-pointer w-max px-4 p-2 hover:opacity-80  font-raleway font-medium text-primary outline-none rounded-md">
                  <a href="https://drive.google.com/uc?export=download&id=1qxEa9ybLvsRRId7TN8Y4Rjh0c6RThSIW">
                    Download Brochure
                  </a>
                </AnimatedBox> */}
              </div>
            </div>
          </div>
        )}

        <AnimatedBox>
          <div className="flex mx-auto w-full  flex-col lg:flex-row">
            <div className="lg:w-1/2 w-full flex items-center justify-center mx-auto bg-hero-gradient">
              <div className="text-[#1f2937] px-10  p-5 max-w-xl mx-auto h-max justify-center font-mulish flex flex-col items-start gap-5 lg:gap-8">
                <div className="text-[#1F2937] mb-3 font-bold text-[24px] text-center  mx-auto lg:text-[40px]">
                  Connect with us
                </div>
                <div className="flex    items-center  lg:gap-16">
                  <div className="flex lg:w-32 w-24   text-muted lg:text-[#1F2937] lg:font-semibold lg:text-[20px] text-[14px] items-center lg:gap-3 gap-1">
                    <Image
                      alt=""
                      width={10}
                      height={10}
                      src="/assets/assets/contact/phone.svg"
                      className="lg:w-[32px] lg:h-[32px] w-[16px] h-[16px]"
                    />{" "}
                    Phone
                  </div>
                  <div className="lg:text-[20px] text-[14px]">
                    +91 9920257626
                  </div>
                </div>
                <div className="flex   items-center lg:gap-16">
                  <div className="flex lg:w-32 w-24    text-muted lg:text-[#1F2937] lg:font-semibold lg:text-[20px] text-[14px] items-center lg:gap-3 gap-1">
                    <Image
                      alt=""
                      width={10}
                      height={10}
                      src="/assets/assets/contact/email.svg"
                      className="lg:w-[32px] lg:h-[32px] w-[16px] h-[16px]"
                    />{" "}
                    Email
                  </div>
                  <div className="lg:text-[20px] text-[14px]">
                    mandeep@tribesforgood.com
                  </div>
                </div>

                <div className="flex  items-start lg:gap-16">
                  <div className="flex lg:w-32 w-24    text-muted lg:text-[#1F2937] lg:font-semibold lg:text-[20px] text-[14px] items-center lg:gap-3 gap-1">
                    <Image
                      alt=""
                      width={10}
                      height={10}
                      src="/assets/assets/contact/pin.svg"
                      className="lg:w-[32px] lg:h-[32px] w-[16px] h-[16px]"
                    />{" "}
                    Address
                  </div>
                  <div className="lg:text-[20px] max-w-md flex-1 text-[14px]">
                    WeWork Express Towers, 2nd Floor, Marine Drive, Express
                    Towers, Nariman Point, Mumbai, Maharashtra 400021
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 w-full mx-auto w-full shadow-md ">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.0728056159405!2d72.81970837587791!3d18.928171282246158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7d121580108d5%3A0x9993c4dab55dce31!2sWeWork%20Express%20Towers!5e0!3m2!1sen!2sin!4v1732149347117!5m2!1sen!2sin"
                // width="600"
                height="450"
                allowFullScreen=""
                loading="lazy"
                className="w-full"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </AnimatedBox>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;

const ConfirmationComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center lg:gap-[32px] gap-[24px] p-5 py-10 lg:py-20">
      <Image
        width={10}
        height={10}
        src="/assets/assets/contact/thumb.svg"
        alt=""
        className="w-[80px] h-[80px] lg:w-[160px] lg:h-[160px]"
      />
      <div>
        <div className="text-[20px]  lg:text-[32px]">
          Thanks for contacting us!{" "}
        </div>
        <div className="text-muted text-[24px] lg:text-[24px]">
          We will get in touch with you shortly.{" "}
        </div>
      </div>
      <div className="text-muted text-left text-[24px] lg:text-[24px]">
        You can also reach us at :{" "}
        <strong className="text-[#1F2937] text-[20px] lg:text-[24px]">
          mandeep@tribesforgood.com
        </strong>
      </div>
    </div>
  );
};
