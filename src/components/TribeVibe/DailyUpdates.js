import SimpleTextArea from "components/Comman/Inputs/SimpleTextArea";
import React, { useState } from "react";

function DailyUpdates() {
  const [details, setDetails] = useState({});
  return (
    <div className="flex flex-col space-y-5">
      <div className="flex flex-col space-y-2">
        <div className="flex flex-row items-center justify-between w-full">
          <h1 className="text-primary-red-medium font-satoshi font-medium leading-5 text-sm">
            Daily Updates
          </h1>
          <div className="flex flex-row items-center space-x-1 text-black font-lato text-sm font-bold leading-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M7.99994 15.3333C6.99804 15.3332 6.01928 15.0322 5.19054 14.4691C4.36181 13.9061 3.72134 13.1071 3.35217 12.1757C2.983 11.2443 2.90216 10.2235 3.12013 9.24555C3.3381 8.26765 3.84482 7.37779 4.57461 6.69133C5.46927 5.84933 7.66661 4.33333 7.33327 1C11.3333 3.66667 13.3333 6.33333 9.33327 10.3333C9.99994 10.3333 10.9999 10.3333 12.6666 8.68667C12.8466 9.202 12.9999 9.756 12.9999 10.3333C12.9999 11.6594 12.4732 12.9312 11.5355 13.8689C10.5978 14.8065 9.32602 15.3333 7.99994 15.3333Z"
                fill="url(#paint0_linear_50_453)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_50_453"
                  x1="8.00015"
                  y1="1"
                  x2="8.00015"
                  y2="15.3333"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#FF7E6E" />
                  <stop offset="1" stop-color="#FFBC00" />
                </linearGradient>
              </defs>
            </svg>
            <p>2</p>
          </div>
        </div>
        <p className="text-primary-neutral-800 font-lato text-xs font-light leading-5">
          Share updates about your daily work here
        </p>
      </div>
      <SimpleTextArea
        details={details}
        setDetails={setDetails}
        srOnly
        placeholder="Add today's update"
      />
    </div>
  );
}

export default DailyUpdates;
