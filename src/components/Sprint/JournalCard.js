import React, { useEffect } from "react";

const JournalCard = ({ journal }) => {
  useEffect(() => {
    console.log(journal);
  }, []);
  return (
    <div className="bg-white rounded py-2 px-4 w-full mb-2">
      <div className="flex items-center gap-2">
        <div className="w-full">
          <h1 className="line-clamp-2 font-semibold text-sm">
            {journal?.goal?.title}{" "}
          </h1>
          <div className="flex justify-evenly mt-4 mb-4">
            <div>
              <p className="text-sm text-neutral-500 font-semibold">
                4 / <span className="text-xs">4</span>
              </p>
              <p className="text-xs text-neutral-500">Session no.</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500 font-semibold">40m</p>
              <p className="text-xs text-neutral-500">Session Time</p>
            </div>
          </div>
          <p className="line-clamp-2 text-xs text-neutral-800">
            {journal?.description}
          </p>
        </div>

        <img
          src={`/assets/images/emojis/${journal?.mood?.png}.png`}
          alt=""
          className="w-16 h-16"
        />
      </div>
    </div>
  );
};

export default JournalCard;
