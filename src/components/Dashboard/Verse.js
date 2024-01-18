import { ArrowRight } from "@phosphor-icons/react";
import React from "react";

const list = [
  { name: "Team Roster ", key: "ftpCount" },
  { name: "Events Calendar", key: "applicantInFTP" },
  { name: "Let's talk about us", key: "newApplicantCount" },
  { name: "Chronicles ", key: "eventCount" },
  { name: "For your learning", key: "sourcingDriveCount" },
  { name: "Let's make us better", key: "researchDoneCount" },
];

function Verse() {
  return (
    <div className="bg-primary-gray-50 px-4 w-full pt-4 pb-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 h-70vh lg:h-auto overflow-y-auto">
      {list?.map((item) => {
        return (
          <div className="relative shadow cursor-pointer hover:border hover:border-primary-red-lighter hover:bg-opacity-50 hover:bg-primary-red-30 bg-white p-4 rounded-2xl w-full h-40 flex flex-col justify-between space-y-4">
            <h1 className="z-20 text-primary-red-light font-karla text-5xl font-medium">
              {item?.name}
            </h1>
            <p
              className={`flex flex-row justify-end text-5xl font-medium font-karla`}
            >
              <ArrowRight size={14} />
            </p>
            <div className="absolute bottom-0 left-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="76"
                height="76"
                viewBox="0 0 76 76"
                fill="none"
              >
                <g filter="url(#filter0_i_2335_28541)">
                  <path
                    d="M30 0L46.2635 29.7365L76 46L46.2635 62.2635L30 92L13.7365 62.2635L-16 46L13.7365 29.7365L30 0Z"
                    fill="#FAFAFA"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_i_2335_28541"
                    x="-16"
                    y="0"
                    width="92"
                    height="94"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="BackgroundImageFix"
                      result="shape"
                    />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="2" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite
                      in2="hardAlpha"
                      operator="arithmetic"
                      k2="-1"
                      k3="1"
                    />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="shape"
                      result="effect1_innerShadow_2335_28541"
                    />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Verse;
