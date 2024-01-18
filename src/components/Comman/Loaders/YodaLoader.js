import React from "react";

function YodaLoader({ text }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-2.5">
      <img
        src="/assets/images/yoda.png"
        alt=""
        className="w-1/2 yoda-animation"
      />
      <p className="text-sm font-lato text-primary-gray-900 font-bold w-9/12 text-center">
        {text}
      </p>
    </div>
  );
}

export default YodaLoader;
