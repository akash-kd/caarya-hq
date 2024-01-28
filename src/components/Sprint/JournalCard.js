import React from "react";

const JournalCard = ({ journals }) => {
  return (
    <div className="bg-white rounded py-2 px-4 w-full">
      <div className="flex items-center gap-2">
        <div>
          <h1 className="line-clamp-2 font-semibold text-sm">
            Some random goal title here. Maximum 2 lines, to truncate otherwise
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
            Any additional comments that might have been added appear here in 2
            lines, additional get truncarted
          </p>
        </div>

        <img
          src="/assets/images/emojis/happy.png"
          alt=""
          className="w-16 h-16"
        />
      </div>
    </div>
  );
};

export default JournalCard;
