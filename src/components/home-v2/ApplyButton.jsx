"use client";
import useFormStore from "@/store/useFormStore";

// embedded=true gives the form without Google's surrounding page chrome
export const APPLY_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdsd6fZUeQn5DW__-3y7uGoDsnTmVjlyaZ5YPNQABghGBKX5Q/viewform?embedded=true";

/** Opens the application form in an overlay instead of navigating away. */
const ApplyButton = ({ className = "btn", children = "Apply Now", beforeOpen }) => {
  const { setFormUrl, setOpenForm } = useFormStore();

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        beforeOpen?.(); // e.g. close the campaign popup first
        setFormUrl(APPLY_URL);
        setOpenForm(true);
      }}
    >
      {children}
    </button>
  );
};

export default ApplyButton;
