import React from "react";

function PageHeader({ heading, description }) {
  return (
    <div className="flex flex-col space-y-2 pb-4">
      <h1 className="text-primary-red-medium font-satoshi text-[28px] font-bold leading-[42px]">
        {heading}
      </h1>
      <p className="text-primary-neutral-800 font-lato text-sm font-light leading-5">
        {description}
      </p>
    </div>
  );
}

export default PageHeader;
