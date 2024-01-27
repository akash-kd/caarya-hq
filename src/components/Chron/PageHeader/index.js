import React from "react";
import { CaaryaLogo } from "../icons";

function PageHeader({ heading, description }) {
  return (
    <div className="flex flex-col px-4 py-2 ">
      <h1 className="flex mt-4 gap-4 items-center text-primary-red-medium font-satoshi text-[28px] font-bold leading-[42px]">
        <CaaryaLogo /> {heading}
      </h1>
      <p className="text-primary-neutral-800 font-lato text-sm font-light leading-5">
        {description}
      </p>
    </div>
  );
}

export default PageHeader;
