"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import Navbar from "@/components/Navbar";
import Footer from "@/components/homepage/Footer";

import "@/components/home-v2/home-v2.css";
import AnnounceBar from "@/components/home-v2/AnnounceBar";
import Hero from "@/components/home-v2/Hero";
import StickyCta from "@/components/home-v2/StickyCta";

// Below-the-fold sections load on demand, matching how the old home page worked.
const WithTFG = dynamic(() => import("@/components/home-v2/WithTFG"));
const Stats = dynamic(() => import("@/components/home-v2/Stats"));
const Campaigns = dynamic(() => import("@/components/home-v2/Campaigns"));
const Programmes = dynamic(() => import("@/components/home-v2/Programmes"));
const Changemakers = dynamic(() => import("@/components/home-v2/Changemakers"));
const Schools = dynamic(() => import("@/components/home-v2/Schools"));
const Difference = dynamic(() => import("@/components/home-v2/Difference"));
const Cohorts = dynamic(() => import("@/components/home-v2/Cohorts"));
const Faq = dynamic(() => import("@/components/home-v2/Faq"));

// Existing lead-capture modal: collects email / phone / school, then serves the PDF.
const EmailModal = dynamic(() => import("@/components/modal/EmailModal"));
// Application form, opened as an overlay by every Apply Now button.
const FormModal = dynamic(() => import("@/components/modal/FormModal"));

const Home = () => {
  const [brochureOpen, setBrochureOpen] = useState(false);

  // Marks the body while the home page is mounted, so the sticky CTA bar can
  // push the global WhatsApp button up out of its way.
  useEffect(() => {
    document.body.classList.add("tfg2-home");
    return () => document.body.classList.remove("tfg2-home");
  }, []);

  return (
    <>
      {/* Navbar is position:fixed, so this wrapper is padded to sit clear of it. */}
      <div className="tfg2 tfg2-top">
        <AnnounceBar />
      </div>

      <Navbar />

      {/* Everything inside .tfg2 is styled by home-v2.css and cannot affect other pages. */}
      <div className="tfg2 tfg2-main">
        <Hero />
        <WithTFG />
        <Stats />
        <Campaigns />
        <Programmes />
        <Changemakers />
        <Schools />
        <Difference />
        <Cohorts />
        <Faq />
        <StickyCta onDownloadBrochure={() => setBrochureOpen(true)} />
      </div>

      <Footer />

      <FormModal />

      {brochureOpen && (
        <EmailModal open={brochureOpen} setOpen={setBrochureOpen} downloadType="brochure" />
      )}
    </>
  );
};

export default Home;
