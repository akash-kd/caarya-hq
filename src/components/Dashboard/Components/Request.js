import React from "react";
import { Clock } from "@phosphor-icons/react";
import { useSelector } from "react-redux";
import EmptyState from "components/Comman/EmptyState";

const RequestItem = ({ item }) => {
  return (
    <div className="mt-8">
      <div className="flex my-2">
        <div className="rounded-full bg-[#FAF4DE] h-10 w-10 p-2 mt-1">
          <Clock size={20} className="fill-[#956E4A] ml-0.5" />
        </div>
        <div className="text-[#301709] ml-4 flex items-start justify-between w-full">
          <div>
            <span className="text-base font-semibold ">{item?.title}</span>
            <p className="text-[#7F7F7F] text-sm font-normal ">
              Requested to Focus
            </p>
          </div>
          <div className="text-[#7F7F7F] mt-1 text-base">4 days</div>
        </div>
      </div>
      <div className="flex justify-end text-sm ">
        <button className="border border-transparent text-white bg-[#956E4A] py-1 px-3 rounded-md mr-2 font-semibold">
          Accept
        </button>
        <button className="border border-gray-200 py-1 px-3 rounded-md text-[#3C4257] mr-2 font-semibold">
          Reject
        </button>
      </div>
      <hr className="mt-4 mr-4 ml-6" />
    </div>
  );
};

export default function Request() {
  const requestedFocus = useSelector((state) => state.goals.inFocus?.goals);
  return (
    <div>
      {requestedFocus?.length > 0 ? (
        requestedFocus?.map((item) => <RequestItem item={item} />)
      ) : (
        <EmptyState
          src="/assets/images/empty/noGoals.png"
          text="You have no requests!"
        />
      )}
    </div>
  );
}
