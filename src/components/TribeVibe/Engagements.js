import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";
import React from "react";

function Engagements() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-primary-red-medium font-satoshi text-sm font-medium leading-5 tracking-[0.28px]">
          Community Engagements For You
        </h1>
        <p className="text-primary-neutral-800 font-lato text-xs font-light leading-5 tracking-[0.6px]">
          Section description here
        </p>
      </div>
      <DayWiseEngagement
        day="Monday"
        list={[
          {
            image: "/assets/images/demo/1.png",
            title: "Motivation Ted Talks",
            description: "Small Event Description.....",
            time: "00:00am",
          },
        ]}
      />
      <DayWiseEngagement
        day="Tuesday"
        list={[
          {
            image: "/assets/images/demo/2.png",
            title: "Fuck Up Nights",
            description: "Small Event Description.....",
            time: "00:00am",
          },
        ]}
      />{" "}
      <DayWiseEngagement
        day="Wednesday"
        list={[
          {
            image: "/assets/images/demo/3.png",
            title: "Training Theater",
            description: "Small Event Description.....",
            time: "00:00am",
          },
        ]}
      />{" "}
      <DayWiseEngagement
        day="Thursday"
        list={[
          {
            image: "/assets/images/demo/4.png",
            title: "Game Nights",
            description: "Small Event Description.....",
            time: "00:00am",
          },
        ]}
      />{" "}
      <DayWiseEngagement
        day="Friday"
        list={[
          {
            image: "/assets/images/demo/5.png",
            title: "Sprint Retros",
            description: "Small Event Description.....",
            time: "00:00am",
          },
        ]}
      />
    </div>
  );
}

export default Engagements;

const DayWiseEngagement = ({ day, list }) => {
  return (
    <div className="p-2 flex flex-col space-y-2">
      <p className="text-primary-neutral-800 font-satoshi text-xs font-bold leading-5 tracking-[0.96px] capitalize">
        On {day}s
      </p>
      <div className="grid gap-4">
        {list?.map((item) => {
          return (
            <div
              style={{
                boxShadow:
                  "0px 4px 6px -4px rgba(0, 0, 0, 0.10), 0px 10px 15px -3px rgba(0, 0, 0, 0.10), 0px 0px 16px 0px rgba(0, 0, 0, 0.05)",
              }}
              className="rounded-2xl bg-white"
            >
              <img src={item?.image} alt="" className="rounded-t-2xl w-full" />
              <div className="py-4 px-3 flex flex-col space-y-2">
                <h1 className="text-black font-lato text-base font-semibold leading-6 tracking-[0.32px]">
                  {item?.title}
                </h1>
                <p className="text-primary-neutral-800 font-lato text-xs font-light leading-5 tracking-[0.6px]">
                  {item?.description}
                </p>
                <p className="text-primary-red-medium font-lato text-xs font-semibold leading-5 tracking-[0.6px]">
                  {item?.time}
                </p>
                <div className="border-t border-primary-neutral-200 py-4 px-1 flex flex-row items-stretch justify-between">
                  <div className="flex flex-col space-y-1">
                    <p className="text-primary-neutral-800 font-lato text-3xs font-bold leading-3">
                      This Month
                    </p>
                    <div className="grid grid-cols-5 gap-2">
                      {[1, 2, 3, 4, 5]?.map((i) => {
                        return (
                          <div className="">
                            {i == 1 ? (
                              <XCircleIcon className="w-2.5 h-2.5 text-[#9C9A96]" />
                            ) : i == 2 ? (
                              <CheckCircleIcon className="w-2.5 h-2.5 text-[#2BB656]" />
                            ) : i == 3 ? (
                              <div className="w-2.5 h-2.5 rounded-full border border-[#FF7E6E]" />
                            ) : (
                              <div className="w-2.5 h-2.5 rounded-full bg-primary-neutral-[#FAFAFA]" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="text-primary-red-medium font-lato text-sm font-bold leading-5 tracking-[0.7px] flex flex-row items-center space-x-2">
                    <p>Attend This Week</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M6 7.33331H4.66667V8.66665H6V7.33331ZM8.66667 7.33331H7.33333V8.66665H8.66667V7.33331ZM11.3333 7.33331H10V8.66665H11.3333V7.33331ZM12.6667 2.66665H12V1.33331H10.6667V2.66665H5.33333V1.33331H4V2.66665H3.33333C2.59333 2.66665 2.00667 3.26665 2.00667 3.99998L2 13.3333C2 13.6869 2.14048 14.0261 2.39052 14.2761C2.64057 14.5262 2.97971 14.6666 3.33333 14.6666H12.6667C13.4 14.6666 14 14.0666 14 13.3333V3.99998C14 3.26665 13.4 2.66665 12.6667 2.66665ZM12.6667 13.3333H3.33333V5.99998H12.6667V13.3333Z"
                        fill="#ED4C41"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
