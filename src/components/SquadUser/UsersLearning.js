import EmptyState from "components/Comman/EmptyState";
import React from "react";

function UsersLearning({ details }) {
  return (
    <div className="w-full px-5 py-4">
      <div className="p-0 lg:p-5 rounded-[40px] lg:bg-primary-yellow-lightest">
        <EmptyState
          image="/assets/images/empty/learning.svg"
          imageMedium
          text={`${details?.first_name} doesn't have any links saved!`}
        />
      </div>
    </div>
  );
}

export default UsersLearning;
