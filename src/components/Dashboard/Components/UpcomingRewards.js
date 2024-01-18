import { MegaphoneSimple } from "@phosphor-icons/react";

const Reward = ({ title, message }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="rounded-full flex items-center justify-center bg-[#FFFAE4] w-10 h-10 md:w-16 md:h-16">
        <img
          src={"/assets/svg/icon/rewards.svg"}
          className="w-3 h-3 text-center md:w-5 md:h-5"
        />
      </div>
      <p className="text-center text-xs md:text-sm text-primary-yellow-darkest font-bold mt-1.5">
        {title}
      </p>
      <p className="my-1 text-center text-gray-400 text-2xs md:text-xs">
        {message}
      </p>
    </div>
  );
};

export default function UpcomingRewards({}) {
  return (
    <div className="px-4 md:px-6 py-2 md:mb-4 justify-between bg-white rounded-[10px] shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-sm font-bold md:text-base text-primary-yellow-darkest">
            Upcoming Rewards
          </div>
          <MegaphoneSimple size={25} className="ml-2" />
        </div>
        <div className="font-bold underline cursor-pointer text-primary-yellow-darkest text-2xs">
          View All Rewards
        </div>
      </div>
      <div className="flex justify-center mt-4 gap-x-3 md:gap-x-8">
        <Reward title="Goal Master" message="25 more tasks to go!" />
        <Reward
          title="Goal Master 2.0"
          message="Yes, almost there. 1 week to go!"
        />
        <Reward title="Goal Master" message="25 more tasks to go!" />
      </div>
    </div>
  );
}
