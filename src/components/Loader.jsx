// components/Loader.js
import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="border-t-4 border-primary border-solid w-16 h-16 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
