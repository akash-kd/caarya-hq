import { ChevronRightIcon } from "@heroicons/react/solid";
import React from "react";

function TimeSheet() {
  return (
    <div className="flex flex-col space-y-4">
      <div className="p-2 flex flex-row items-center justify-between">
        <div className="flexflex-col">
          <h1 className="text-primary-red-medium font-lato text-xl font-semibold">
            Sprint 3
          </h1>
          <p className="text-primay-neutral-400 font-lato text-3xs font-bold leading-[8px]">
            22/01/23 - 28/01/23
          </p>
        </div>
        <p className="text-primary-red-medium flex flex-row items-center space-x-2 font-lato text-xs font-semibold underline">
          View All <ChevronRightIcon className="w-5 h-5" />
        </p>
      </div>
    </div>
  );
}

export default TimeSheet;
