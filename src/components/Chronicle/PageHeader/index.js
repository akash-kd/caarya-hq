import React from "react";

function PageHeader({ heading, description }) {
  return (
    <div className="flex flex-col px-4 py-2 ">
      <h1 className="title-gradient flex mt-4 gap-4 items-center font-satoshi text-[28px] font-bold leading-[42px]">
        {/*Icon: Caarya-Logo*/}
        <image src="/assets/svg/chron/logo.svg" /> {heading}
      </h1>
      <p className="text-primary-neutral-800 font-lato text-sm font-light leading-5">
        {description}
      </p>
    </div>
  );
}

export default PageHeader;
