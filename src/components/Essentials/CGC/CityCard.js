import React from "react";

const CityCard = ({ source, city }) => {
  return (
    <div className="lg:max-w-[480px] relative mx-auto rounded-2xl w-full">
      <img
        src={source}
        alt=""
        className="w-full object-fit h-full absolute rounded-2xl px-2"
      />
      <div className="flex relative flex-col px-8 py-3 z-50 justify-end items-center md:items-start lg:justify-center">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#D9D9D9] mt-6 md:mt-20 mb-6" />
        <h3 className="font-poppins text-center md:text-left text-2xs md:leading-6 leading-4 tracking-[0.8px] md:tracking-[1.6px] md:text-base font-light text-white">
          Caarya Growth Centre
        </h3>
        <h1 className="font-poppins truncate text-center md:leading-[60px] leading-9 tracking-[3.6px] md:tracking-[10px] md:text-left text-2xl md:text-[40px] font-medium uppercase text-white">
          {city}
        </h1>
      </div>
    </div>
  );
};

export default CityCard;
