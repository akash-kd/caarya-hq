import React from "react";
import { ChevronRightIcon } from "@heroicons/react/solid";

import { ReactComponent as SquadLogo } from "../../../assets/icons/selectedSquad.svg";
function SquadCardLoader() {
  return (
    <div className="relative group mb-8">
      <div
        className={`absolute -top-3 left-4 flex items-center gap-1 p-1 px-2 rounded-full text-xs z-10 border border-transparent bg-[#DEE1E6] text-primary-gray-1000"`}
      >
        <SquadLogo className={`h-3 w-3  fill-primary-gray-1000`} />
        Squad Member
      </div>
      <div
        className={`pb-2.5 pt-4 border-b border-primary-gray-50 px-5 rounded-lg bg-white shadow-md relative cursor-pointer`}
      >
        <div className="flex flex-row items-center relative ">
          <div
            className={`flex flex-row items-center space-x-1 text-xs text-primary-indigo-650 cursor-pointer absolute top-0 -right-1`}
          >
            <ChevronRightIcon className="w-5 h-5" />
          </div>

          <div className="h-12 w-12 rounded-full shadow flex flex-row items-center justify-center relative">
            <img
              className="h-11 w-11  rounded-full object-cover"
              src={"/assets/images/defaultUser.svg"}
              alt=""
            />
            <div
              className={`bg-active w-2 h-2 rounded-full absolute top-0 right-0`}
            ></div>
          </div>

          <div className={`cursor-pointer w-10/12 ml-4 space-y-1.5 mt-1.5`}>
            <h3 className="h-3 rounded bg-primary-gray-200 animate-pulse w-10/12"></h3>
            <h3 className="h-2 rounded bg-primary-gray-200 animate-pulse w-1/2"></h3>
            <h3 className="h-2 rounded bg-primary-gray-200 animate-pulse w-1/2"></h3>
            <div className="flex flex-row mt-2 font-lato items-center space-x-5 text-xs inter text-primary-gray-600 z-10">
              <div className="flex flex-row items-center font-semibold">
                <img
                  src="/assets/images/icons/taskIndigo.svg"
                  className="w-4 h-4 mr-0.5 mt-0.5"
                  alt=""
                />
                0 tasks
              </div>
              <div className="flex flex-row items-center font-semibold">
                <img
                  src="/assets/images/icons/rocketIndigo.svg"
                  className="w-4 h-4 mr-0.5 mt-0.5"
                  alt=""
                />
                0 rojects
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SquadCardLoader;
