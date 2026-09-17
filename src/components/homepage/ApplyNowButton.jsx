"use client";
import AnimatedBox from "@/common/animation/AnimatedBox";
import useFormStore from "@/store/useFormStore";
import React, { useContext } from "react";
import FormModal from "../modal/FormModal";

const ApplyNowButton = ({
  url = "https://docs.google.com/forms/u/3/d/e/1FAIpQLSdsd6fZUeQn5DW__-3y7uGoDsnTmVjlyaZ5YPNQABghGBKX5Q/viewform",
}) => {
  const { openForm, setOpenForm, setFormUrl } = useFormStore();
  return (
    <>
      <AnimatedBox className="bg-primary  cursor-pointer w-max px-4 p-2 hover:opacity-80 text-black font-raleway font-medium border-none outline-none rounded-md">
        <button
          onClick={() => {
            setFormUrl(url);
            setOpenForm(true);
          }}
        >
          Apply now
        </button>
      </AnimatedBox>
      {openForm && <FormModal />}
    </>
  );
};

export default ApplyNowButton;
