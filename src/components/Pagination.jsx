"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Pagination = ({ totalPosts, postsPerPage, currentPage, baseUrl }) => {
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const router = useRouter();
  const [visibleButtons, setVisibleButtons] = useState(10); // Default to 10 buttons for large screens

  // Dynamically update the number of visible buttons based on screen size
  useEffect(() => {
    const updateButtons = () => {
      setVisibleButtons(window.innerWidth < 768 ? 5 : 10); // Mobile: 5, Large screens: 10
    };

    updateButtons(); // Run on initial render
    window.addEventListener("resize", updateButtons); // Update on window resize
    return () => window.removeEventListener("resize", updateButtons); // Cleanup
  }, []);

  const handlePageChange = (page) => {
    if (page === currentPage || page === "...") return;
    window.location.href = `${baseUrl}?page=${page}`;
  };

  // Generate page numbers (with ellipsis when needed)
  const generatePageNumbers = () => {
    let pageNumbers = [];
    const maxButtons = visibleButtons;
    if (totalPages <= maxButtons) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= Math.floor(maxButtons / 2)) {
        pageNumbers = [
          ...Array.from({ length: maxButtons - 2 }, (_, i) => i + 1),
          "...",
          totalPages,
        ];
      } else if (currentPage >= totalPages - Math.floor(maxButtons / 2)) {
        pageNumbers = [
          1,
          "...",
          ...Array.from(
            { length: maxButtons - 2 },
            (_, i) => totalPages - maxButtons + i + 2
          ),
        ];
      } else {
        pageNumbers = [
          1,
          "...",
          ...Array.from(
            { length: maxButtons - 4 },
            (_, i) => currentPage - Math.floor((maxButtons - 4) / 2) + i
          ),
          "...",
          totalPages,
        ];
      }
    }
    return pageNumbers;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="flex justify-center items-center space-x-2 my-4 mb-5">
      {/* Previous Button */}
      <button
        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-primary text-sm lg:text-base text-white rounded-md disabled:bg-gray-300"
      >
        Prev
      </button>

      {/* Page Number Buttons */}
      {pageNumbers.map((number, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(number)}
          className={`px-4 hover:bg-primary text-sm lg:text-base hover:text-black py-2 rounded-md ${number === currentPage
            ? "bg-primary text-black"
            : "bg-white text-primary"
            } ${number === "..." ? "text-gray-500" : ""}`}
        >
          {number}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() =>
          currentPage < totalPages && handlePageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-primary text-black text-sm lg:text-base rounded-md disabled:bg-gray-300"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
