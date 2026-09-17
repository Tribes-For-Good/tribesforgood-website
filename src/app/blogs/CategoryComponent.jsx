"use client";
import React from "react";
import { toTitleCase } from "./util";
import { useRouter } from "next/navigation";

const CategoryComponent = ({ categories,currentPage }) => {
  const router = useRouter();
  const handleRedirect = (button) => {
    router.push(`/blogs/categories/${button?.slug}/1`);
  };
  return (
    <div className="flex w-full  ">
      <div className="flex max-w-7xl px-5  mx-auto  lg:gap-2 gap-1 overflow-x-auto scroll-hidden justify-start mt-5  py-4 pb-6 w-full  ">
        {categories?.map((button, i) => {
          return (
            <div
              key={i}
              onClick={() => handleRedirect(button)}
              className={`${currentPage===button?.slug?"bg-primary":"bg-white"}  p-2 rounded-full shadow-btn-shadow border text-[#1f2937] text-[12px] hover:font-medium  hover:bg-primary lg:text-[20px] px-2 font-raleway  cursor-pointer text-nowrap  w-max`}
            >
              {toTitleCase(button?.name)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryComponent;
