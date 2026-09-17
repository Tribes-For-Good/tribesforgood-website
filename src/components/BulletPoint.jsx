import Image from "next/image";
import React from "react";

const BulletPoint = ({ data }) => {
  return (
    <div className="flex font-mulish gap-2 lg:gap-4 w-full items-center">
      <div>
        <Image
          src="/assets/assets/icon/bullet.svg"
          width={10}
          height={10}
          className="lg:w-[24px]  rounded-2xl lg:rounded-lg lg:h-[24px] w-[20px] h-[20px]"
          alt=""
        />
      </div>
      <div className="flex-1 font-medium text-muted text-[14px] lg:text-[20px] lg:leading-[30px]">
        <span className="font-bold text-[#1F2937] ">{data?.title}</span>
        {data?.description}
      </div>
    </div>
  );
};

export default BulletPoint;
