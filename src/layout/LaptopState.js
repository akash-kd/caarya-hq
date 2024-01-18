import React from "react";

function LaptopState() {
  return (
    <div className="hidden w-screen h-screen md:flex flex-row items-center justify-center space-x-20 p-14 2xl:p-20">
      <div className="w-1/2 max-w-lg flex flex-col items-start space-y-6">
        <h1 className="text-primary-gray-1000 font-poppins font-medium text-4xl">
          Mobile-Only Zone
        </h1>
        <p className="text-primary-gray-1000 font-inter text-base">
          Sorry desktop users, but this app is for mobile devices only.
        </p>
        <p className="text-primary-gray-1000 font-inter text-base">
          Don't worry, you can still join in on the fun by switching to a phone
          or tablet.
        </p>
      </div>

      <img
        src="/assets/images/empty/laptop.svg"
        alt=""
        className="w-1/2 max-w-lg h-auto"
      />
    </div>
  );
}

export default LaptopState;
