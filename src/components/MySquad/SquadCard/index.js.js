import React from "react";
import { ChevronRightIcon } from "@heroicons/react/solid";

import { ReactComponent as SquadLogo } from "../../../assets/icons/selectedSquad.svg";
import { FilePlus, RocketLaunch, Target } from "@phosphor-icons/react";

function SquadCard({
  profile,
  onSelect,
  selected,
  cardView = false,
  isInsideTab = false,
}) {
  return (
    <div className="relative group mb-2">
      <div
        className={`absolute -top-3 left-4 flex items-center gap-1 p-1 px-2 rounded-full text-xs z-10 border border-transparent ${
          selected?.id == profile?.id
            ? "bg-orange-500 text-white"
            : isInsideTab
            ? "bg-white border-orange-500 text-orange-500"
            : "bg-[#DEE1E6] text-primary-gray-1000"
        }`}
      >
        <SquadLogo
          className={`h-3 w-3 ${
            isInsideTab
              ? "fill-orange-500"
              : selected?.id == profile?.id
              ? "fill-white"
              : "fill-primary-gray-1000"
          }`}
        />
        {selected?.id == profile?.id ? "Active Squad" : "Squad Member"}
      </div>
      <div
        onClick={() => {
          onSelect(profile);
        }}
        className={`pb-2.5 pt-4  px-5 rounded-lg  ${
          !cardView && "border-b border-primary-gray-50"
        } ${
          selected?.id == profile?.id
            ? "bg-[#FEF8F1] shadow-md mb-5"
            : !cardView
            ? "bg-white group-hover:bg-[#FEF8F1] mb-5"
            : "bg-white shadow-md"
        }  relative cursor-pointer`}
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
              src={
                (profile?.image && profile?.image?.url) ||
                "/assets/images/defaultUser.svg"
              }
              alt=""
            />
            <div
              className={`${
                profile?.is_active ? "bg-active" : "bg-inactive"
              } w-2 h-2 rounded-full absolute top-0 right-0`}
            ></div>
          </div>

          <div className={`cursor-pointer w-10/12 ml-4`}>
            <h3 className="text-primary-gray-600 inter text-sm font-bold">
              {profile?.first_name}
            </h3>
            <h3 className="text-2xs text-primary-gray-350 inter">
              {profile?.designation?.rank?.rank_name}
            </h3>
            <h3 className="text-2xs text-primary-gray-350 inter">
              {profile?.designation?.role?.role_name}
            </h3>
            <div className="flex flex-row mt-2 font-lato items-center space-x-5 text-xs inter text-primary-gray-600 z-10">
              <div className="flex flex-row items-center font-semibold">
                <FilePlus size={16} className="mr-0.5" />
                {profile?.tasksCount || 0}
              </div>{" "}
              <div className="flex flex-row items-center font-semibold">
                <Target size={16} className="mr-0.5" />
                {profile?.goalsCount || 0}
              </div>
              <div className="flex flex-row items-center font-semibold">
                <RocketLaunch size={16} className="mr-0.5" />
                {profile?.projectsCount || 0}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SquadCard;
