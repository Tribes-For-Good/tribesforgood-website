import Image from "next/image";
import React from "react";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/9920257626?text=Hi%2C%20I%20would%20like%20enquire%20about%20TribesForGood"
      target="_blank"
      className="fixed bottom-5  right-5  bg-green-500 z-50 text-white rounded-full bg-white hover:bg-green-600 transition duration-300"
    >
      <Image
        src="/assets/whatsapp.svg"
        width={30}
        height={30}
        className="lg:w-[40px] w-[40px] h-[40px]  lg:h-[40px]"
        alt=""
      />
    </a>
  );
};

export default WhatsAppButton;
