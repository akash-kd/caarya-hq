import { Clock, RocketLaunch } from "@phosphor-icons/react";

export default function Tracker() {
  return (
    <div className="flex justify-between px-4 py-2 mb-4 md:mb-8 bg-white rounded-[10px] shadow-md ">
      <div className="flex items-center my-2">
        <div className="rounded-full bg-[#E2FBD7] h-11 w-11 p-2 flex flex-row items-center justify-center ">
          <RocketLaunch size={20} className="fill-[#34B53A] ml-0.5" />
        </div>
        <div className="ml-2 text-xs font-medium md:font-semibold text-primary-yellow-darkest md:text-base">
          Goal Health
          <p className="text-[#999999] text-[10px] md:text-xs font-normal mt-2">
            2/5 Goals for the day
          </p>
          <div className="relative h-1 mt-2 overflow-hidden rounded-full max-w-base">
            <div className="w-full h-full bg-[#E2FBD7] absolute"></div>
            <div className="h-full bg-[#34B53A] relative w-20"></div>
          </div>
        </div>
      </div>
      <div className="flex items-center ml-4">
        <div className="rounded-full bg-[#CCF8FE] h-11 w-11 p-2 flex flex-row items-center justify-center">
          <Clock size={20} className="fill-[#02A0FC] ml-0.5" />
        </div>
        <div className="ml-2 text-xs font-medium md:font-semibold text-primary-yellow-darkest md:text-base">
          Time Tracker
          <p className="text-[#999999] text-[10px] md:text-xs font-normal mt-2">
            40/180 Mins for the day
          </p>
          <div className="relative h-1 mt-2 overflow-hidden rounded-full max-w-base">
            <div className="w-full h-full bg-[#CCF8FE] absolute"></div>
            <div className="h-full bg-[#02A0FC] relative w-20"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
