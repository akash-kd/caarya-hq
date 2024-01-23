import React from "react";

function Vibe() {
  return (
    <div className="py-4 px-5 flex flex-row items-stretch space-x-5">
      <div className="w-14 h-14 rounded-full border-[3px] border-[#33d6e1] flex flex-row items-center justify-center">
        <p className="text-primary-neutral-800 font-lato text-xl font-bold">
          0.0
        </p>
      </div>
      <div className="flex flex-col w-9/12">
        <h1 className="text-black font-lato text-base tracking-[0.32px] font-semibold leading-6">
          Your January Vibe Score
        </h1>
        <p className="text-primary-neutral-800 font-lato tracking-[0.8px] text-2xs font-light leading-4">
          Short description of what this is supposed to be & how to increase it
        </p>
      </div>
    </div>
  );
}

export default Vibe;
