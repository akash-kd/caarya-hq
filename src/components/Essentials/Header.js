import React from "react";

function Header({ name, image, description }) {
  return (
    <div className="flex flex-col space-y-16 mt-16 mb-16 items-center">
      <h1 className="font-bold text-primary-red-medium font-satoshi text-[40px] leading-[60px] tracking-[4px] text-center">
        {name}
      </h1>
      <img src={image} alt="" className="w-16 h-16 object-cover" />
      {description && (
        <div className="mt-6 text-black font-lato text-base font-light leading-7 tracking-[0.8px]">
          {description}
        </div>
      )}
    </div>
  );
}

export default Header;
