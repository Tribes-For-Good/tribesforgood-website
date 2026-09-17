"use client";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import components
const Data = dynamic(() => import("./components/Data"));
const HeroSectionNewPage = dynamic(() => import("./components/Hero"));
const MiddleSection = dynamic(() => import("./components/MiddleSection"));
const Cards = dynamic(() => import("./components/Cards"));
const Footer = dynamic(() => import("@/components/homepage/Footer"));
const Outcome = dynamic(() => import("./components/Outcome"));
const Email_Modal = dynamic(() => import("./components/Email_Modal"));

const AdvocatesProgram = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Navbar />
      <div className="lg:h-screen flex flex-col items-center justify-between w-full">
        <HeroSectionNewPage open={open} setOpen={setOpen} />
        <Data />
      </div>
      <MiddleSection />
      <Cards />
      <Outcome setOpen={setOpen} />
      <Footer />
      {open && <Email_Modal open={open} setOpen={setOpen} />}
    </div>
  );
};

export default AdvocatesProgram;
