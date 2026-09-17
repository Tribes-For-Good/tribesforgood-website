"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
const data = [
  {
    image: "/assets/assets/socials/instagram.svg",
    url: "https://www.instagram.com/tribesforgood/",
  },
  {
    image: "/assets/assets/socials/linkedin.svg",
    url: "https://www.linkedin.com/company/tribesforgood/",
  },
  {
    image: "/assets/assets/socials/twitter.svg",
    url: "https://x.com/TribesforGood",
  },
  {
    image: "/assets/assets/socials/facebook.svg",
    url: "https://www.facebook.com/Tribesforgood/",
  },
  {
    image: "/assets/assets/socials/youtube.svg",
    url: "https://www.youtube.com/@tribesforgood",
  },
];

const Footer = () => {
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);
  const [showProgramDropdown, setShowProgramDropdown] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  // const handleSubmit = async () => {
  //   console.log("dfadfas")
  //   try {
  //     const response = await fetch('http://localhost:5000/proxy', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ email }),
  //     });

  //     console.log(response)

  //     if (response.ok) {
  //       alert('Subscribed successfully!');
  //       setEmail(''); // Clear email input
  //     } else {
  //       // const data = await response.json();
  //       // alert(data.error || 'Subscription failed.');
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     // alert('An error occurred. Please try again.');
  //   }
  // };

  const verifyEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email !== "" && !emailRegex.test(email)) {
      setError("Please enter a valid email");
      return; // Don't proceed if the email is invalid
    } else {
      setError("");
    }
  };

  const handleSubmit = () => {
    verifyEmail();
    // If email is valid, open the link in a new tab
    const url = `https://tribesforgood.substack.com/subscribe?just_signed_up=true&skip_redirect_check=true&utm_medium=web&utm_source=embed&freeSignupEmail=${encodeURIComponent(
      email,
    )}`;

    window.open(url, "_blank");
    setEmail("");
  };

  return (
    <div className="bg-white pt-5 w-full  overflow-hidden">
      <div className="max-w-6xl  px-5 mx-auto  flex gap-5 pb-10 lg:py-16 lg:gap-10 items-center justify-between flex-col lg:flex-row">
        {" "}
        <div className="flex flex-col gap-3 lg:gap-5 items-center lg:items-start max-w-lg ">
          <div className="flex  gap-1">
            {data.map((img, i) => {
              return (
                <Link key={i} target="_blank" href={img?.url}>
                  <Image
                    src={img?.image}
                    width={10}
                    height={10}
                    alt=""
                    className="w-[34px] h-[34px]"
                  />
                </Link>
              );
            })}
          </div>
          <div className="text-[20px] lg:text-[24px] font-mulish text-center leading-[31px] lg:text-left">
            At <strong>TribesforGOOD</strong> we create powerful alliances to
            address pressing challenges.
          </div>
          <Link
            href="/contact"
            className="bg-primary font-raleway font-medium text-[16px] px-4 p-1 rounded-md outline-none hover:opacity-80 lg:text-[24px]"
          >
            Contact Us
          </Link>
        </div>
        <div className="w-full flex flex-col items-center lg:items-start">
          <nav className="hidden mb-5 h-full font-mulish lg:flex ">
            <Link href="/" className="text-[18px] p-3 px-6">
              Home
            </Link>
            <div
              onMouseOver={() => setShowProgramDropdown(true)}
              onMouseOut={() => setShowProgramDropdown(false)}
              className="relative p-3 px-6 text-center "
            >
              <div className=" text-[18px] flex gap-1 items-center justify-center">
                Programs
                <Image
                  src="/assets/assets/down-arrow.svg"
                  width={10}
                  height={10}
                  className="w-[20px]"
                  alt=""
                />
              </div>
              {showProgramDropdown && (
                <div className="absolute top-12 text-muted text-[18px] z-50 shadow-custom bg-white text-left divide-y flex flex-col  left-0 w-full ">
                  <Link
                    href="/#high-school"
                    className="px-4 p-2 hover:text-primary cursor-pointer"
                  >
                    High School
                  </Link>
                  <Link
                    href="/professionals"
                    className="px-4 p-2 hover:text-primary cursor-pointer"
                  >
                    Professionals
                  </Link>
                  <Link
                    href="/impact-travel"
                    className="px-4 p-2 hover:text-primary cursor-pointer"
                  >
                    Impact travel
                  </Link>
                  <Link
                    href="/school-programs"
                    className="px-4 p-2 hover:text-primary text-nowrap cursor-pointer"
                  >
                    School programs
                  </Link>
                </div>
              )}
            </div>
            <div
              onMouseEnter={() => setShowAboutDropdown(true)}
              onMouseLeave={() => setShowAboutDropdown(false)}
              className="relative px-6 p-3 text-center "
            >
              <div className=" text-[18px] text-nowrap flex gap-1 items-center justify-center">
                About Us
                <Image
                  src="/assets/assets/down-arrow.svg"
                  width={10}
                  height={10}
                  className="w-[20px]"
                  alt=""
                />
              </div>
              {showAboutDropdown && (
                <div className="absolute top-12 text-muted text-[18px] shadow-custom bg-white text-left divide-y flex flex-col  left-0 w-full ">
                  <Link
                    href="/about"
                    className="px-4 p-2 hover:text-primary cursor-pointer"
                  >
                    About Us
                  </Link>
                  <Link
                    href="/careers"
                    className="px-4 p-2 hover:text-primary cursor-pointer"
                  >
                    Careers
                  </Link>
                </div>
              )}
            </div>
            <Link
              href="/featured-projects"
              className="text-[18px] text-nowrap p-3 px-6"
            >
              Featured Projects
            </Link>
            <Link href="/blogs" className="text-[18px] p-3 px-6">
              Blogs
            </Link>
          </nav>

          <div className="w-full flex flex-col max-w-xl mx-auto lg:m-0  items-start  lg:px-8">
            <div className="text-primary my-3 font-raleway text-[16px] lg:text-[24px] font-bold">
              Subscribe to our newsletter
            </div>
            <div className="flex mb-auto w-full flex-col lg:flex-row items-center max-w-xl gap-3">
              <div className="w-full ">
                <div className="relative">
                  <input
                    value={email}
                    onBlur={() => verifyEmail()}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    id="email"
                    placeholder=" "
                    className={`${
                      error
                        ? "border-red-600 focus:border-red-500"
                        : "border-[#6B737A] focus:border-[#6B7280] peer"
                    } block w-full px-2.5 pb-2.5 pt-4 text-sm  bg-transparent rounded-lg lg:rounded-xl border  appearance-none focus:outline-none focus:ring-0 `}
                  />

                  <label
                    htmlFor="email"
                    className={`absolute ${
                      error ? "text-red-500" : ""
                    } text-sm text-[#6B7280] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:text-[#6B7280] peer-focus:scale-75 peer-focus:-translate-y-4 left-2`}
                  >
                    Email
                  </label>
                </div>
                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
              </div>
              <button
                onClick={handleSubmit}
                className="bg-primary  font-raleway font-medium text-[16px] px-4 p-1 rounded-md outline-none hover:opacity-80 lg:text-[24px]"
              >
                Subscribe
              </button>
            </div>
            {/* <iframe
              src="https://tribesforgood.substack.com/embed"
              width="480"
              height="250"
              className="!bg-transparent w-full "
              // frameBorder="0"
              // scrolling="no"
            ></iframe> */}
          </div>
        </div>
      </div>
      <div className="font-mulish bg-hero-gradient lg:text-[16px] font-semibold text-center p-4 lg:p-6 text-[14px]">
        Copyright ©{new Date().getFullYear()}{" "}
        <a href="#" className="underline underline-offset-2" target="_blank">
          TribesForGood
        </a>
        . All Rights Reserved 
        <Link
          href="/privacy"
          className="text-primary underline underline-offset-2"
          target="_blank"
        >
          Privacy Policy
        </Link>
        . Made With 
        <a href="https://kuvaka.io" className="underline underline-offset-2" target="_blank">
          Kuvaka Tech
        </a>
      </div>
    </div>
  );
};

export default Footer;
