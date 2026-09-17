"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [showProgramDropdown, setShowProgramDropdown] = useState(false)

  const [showAboutDropdown, setShowAboutDropdown] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  // Disable scrolling when the sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden")
    } else {
      document.body.classList.remove("overflow-hidden")
    }
  }, [isOpen])

  return (
    <header className="w-full shadow-custom bg-white fixed top-0 z-50">
      <div className="container  mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link href="/">
            <Image
              src="/assets/assets/tfg-logo.svg"
              className="w-[50px] lg:w-[76px]"
              width={76}
              height={36}
              alt=""
              priority
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden h-full font-mulish lg:flex ">
          <Link
            href="/"
            className="text-[18px] p-3 px-8 hover:text-primary cursor-pointer"
          >
            Home
          </Link>
          <Link
            href="/dubai"
            className="text-[18px] p-3 px-8 hover:text-primary cursor-pointer"
          >
            TFG Dubai
          </Link>
          <div
            onMouseOver={() => setShowProgramDropdown(true)}
            onMouseOut={() => setShowProgramDropdown(false)}
            className="relative p-3 px-8 text-center "
          >
            <div
              href="/programs"
              className=" text-[18px] flex gap-1 items-center justify-center"
            >
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
              <div className="absolute top-12 text-muted text-[18px] shadow-custom bg-white text-left divide-y flex flex-col  left-0 w-full ">
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
                <Link
                  href="/innovators-hub"
                  className="px-4 p-2 hover:text-primary text-nowrap cursor-pointer"
                >
                  Innovators Hub
                </Link>
              </div>
            )}
          </div>
          <div
            onMouseEnter={() => setShowAboutDropdown(true)}
            onMouseLeave={() => setShowAboutDropdown(false)}
            className="relative px-8 p-3 text-center "
          >
            <div
              href="/about"
              className=" text-[18px] flex gap-1 items-center justify-center"
            >
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
            className="text-[18px] p-3 px-8 hover:text-primary cursor-pointer"
          >
            Featured Projects
          </Link>
          <Link
            href="/blogs"
            className="text-[18px] p-3 px-8 hover:text-primary cursor-pointer"
          >
            Blogs
          </Link>
        </nav>

        {/* Right-side Buttons */}
        <div className="hidden lg:flex space-x-4">
          <Link
            href="/contact"
            className="px-4 py-2 font-raleway font-medium text-[20px] bg-primary text-black rounded-md"
          >
            Contact Us
          </Link>
        </div>

        {/* Hamburger Icon */}
        <div className="lg:hidden">
          <Image
            onClick={toggleMenu}
            src="/assets/assets/hamburger.svg"
            className="w-[24px]  cursor-pointer"
            width={24}
            height={24}
            alt=""
          />
        </div>
      </div>

      {/* Mobile Sidebar and Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              onClick={toggleMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
            />

            {/* Sidebar */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween" }}
              className="fixed top-0 left-0 w-full max-w-xs h-full overflow-y-auto bg-white shadow-lg p-4 z-50"
            >
              <div className="flex justify-between items-center mb-8">
                <Link href="/" className="text-xl font-bold">
                  <Image
                    src="/assets/assets/tfg-logo.svg"
                    className="w-[50px] lg:w-[76px]"
                    width={76}
                    height={36}
                    alt=""
                    priority
                  />
                </Link>
                <Image
                  onClick={toggleMenu}
                  src="/assets/assets/cross.svg"
                  className="w-[24px]  cursor-pointer"
                  width={10}
                  height={10}
                  alt=""
                />
              </div>
              <nav className="flex flex-col  space-y-4">
                <Link
                  href="/"
                  className="text-[18px] hover:text-primary cursor-pointer"
                >
                  Home
                </Link>
                <Link
                  href="/dubai"
                  className="text-[18px] hover:text-primary cursor-pointer"
                >
                  TFG Dubai
                </Link>
                <div className="  ">
                  <div
                    onClick={() => setShowProgramDropdown(!showProgramDropdown)}
                    className="text-[18px] flex gap-1 items-center"
                  >
                    Programs
                    <Image
                      src="/assets/assets/down-arrow.svg"
                      width={10}
                      height={10}
                      alt=""
                      className="w-[20px]"
                    />
                  </div>
                  {showProgramDropdown && (
                    <div className=" mt-1 text-muted text-[18px] shadow-custom bg-white  text-left divide-y flex flex-col  left-0 w-full ">
                      <Link
                        href="/#high-school"
                        onClick={() => {
                          setShowProgramDropdown(false)
                          setIsOpen(false)
                        }}
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
                        href="/"
                        className="px-4 p-2 hover:text-primary cursor-pointer"
                      >
                        School programs
                      </Link>
                      <Link
                        href="/innovators-hub"
                        className="px-4 p-2 hover:text-primary cursor-pointer"
                      >
                        Innovators Hub
                      </Link>
                    </div>
                  )}
                </div>
                <div>
                  <div
                    onClick={() => setShowAboutDropdown(!showAboutDropdown)}
                    className=" text-[18px] flex gap-1 items-center "
                  >
                    About Us
                    <Image
                      src="/assets/assets/down-arrow.svg"
                      width={10}
                      height={10}
                      alt=""
                      className="w-[20px]"
                    />
                  </div>
                  {showAboutDropdown && (
                    <div className="mt-1 top-12 text-muted text-[18px] shadow-custom bg-white text-left divide-y flex flex-col  left-0 w-full ">
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
                  className="text-[18px] hover:text-primary cursor-pointer"
                >
                  Featured Projects
                </Link>
                <Link
                  href="/blogs"
                  className="text-[18px] hover:text-primary cursor-pointer"
                >
                  Blogs
                </Link>
              </nav>

              <div className="mt-8 space-y-4">
                <div className="">
                  <Link
                    href="/contact"
                    className="px-4 py-2 font-raleway font-medium text-[16px] bg-primary text-black rounded-md"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
