"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import Navbar from "@/components/Navbar";
import Footer from "@/components/homepage/Footer";

import "@/components/home-v2/home-v2.css";
import AnnounceBar from "@/components/home-v2/AnnounceBar";
import Hero, { FACTS } from "@/components/home-v2/Hero";
import StickyCta from "@/components/home-v2/StickyCta";

// By 2030 ticker: reuses the homepage's global facts, swapping out the one
// India-specific claim (urban heat vs rural India) for a Gulf-relevant stat.
// Source for the replacement: ILO/ORF Middle East reporting on UAE heat-stress
// job/working-hour losses projected for 2030 - flagged for client fact-check.
const DUBAI_FACTS = [
  <>By 2030, the UAE will lose <b>more working hours to extreme heat</b> than anywhere else in the Gulf.</>,
  FACTS[1],
  FACTS[2],
  FACTS[3],
  FACTS[4],
];

// Below-the-fold sections load on demand, matching how the old home page worked.
const WithTFG = dynamic(() => import("@/components/home-v2/WithTFG"));
const Stats = dynamic(() => import("@/components/home-v2/Stats"));
const Campaigns = dynamic(() => import("@/components/home-v2/Campaigns"));
const Programmes = dynamic(() => import("@/components/home-v2/Programmes"));
const ChangemakersDubai = dynamic(() => import("@/components/home-v2/ChangemakersDubai"));
const SchoolsDubai = dynamic(() => import("@/components/home-v2/SchoolsDubai"));
const Difference = dynamic(() => import("@/components/home-v2/Difference"));
const Cohorts = dynamic(() => import("@/components/home-v2/Cohorts"));
const Faq = dynamic(() => import("@/components/home-v2/Faq"));

// Existing lead-capture modal: collects email / phone / school, then serves the PDF.
const EmailModal = dynamic(() => import("@/components/modal/EmailModal"));
// Application form, opened as an overlay by every Apply Now button.
const FormModal = dynamic(() => import("@/components/modal/FormModal"));

const DubaiHome = () => {
  const [brochureOpen, setBrochureOpen] = useState(false);

  // Marks the body while this page is mounted, so the sticky CTA bar can
  // push the global WhatsApp button up out of its way (shared class with the home page).
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
        <Hero facts={DUBAI_FACTS} />
        <WithTFG />
        <Stats />
        <Campaigns />
        <Programmes
          price1="AED 1,350"
          priceNote1="everything included"
          price2="AED 1,700"
          priceNote2="everything included"
          scaleLabel="internationally"
        />
        <ChangemakersDubai />
        <SchoolsDubai />
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

export default DubaiHome;
