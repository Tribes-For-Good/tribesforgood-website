"use client";

import { useEffect, useState } from "react";
import ApplyButton from "./ApplyButton";

/**
 * Download Brochure does NOT link straight to a PDF. It opens the site's
 * existing EmailModal, which captures email / phone / school into Firebase
 * before delivering the file. Keeping that path is what preserves lead capture.
 */
const StickyCta = ({ onDownloadBrochure }) => {
  const [show, setShow] = useState(false);

  // Appear once the hero has been scrolled past, not on arrival.
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
  <div className={"sticky-cta" + (show ? " show" : "")}>
    <button type="button" className="btn btn-yellow" onClick={onDownloadBrochure}>
      Download Brochure
    </button>
    <ApplyButton />
    </div>
  );
};

export default StickyCta;
