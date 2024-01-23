import React from "react";
import GoalHubCard from "./GoalHubCard";

function SprintList({ list, onUpdate, showFocus }) {
  return (
    <div className="rounded-2xl py-4 px-2 bg-primary-neutral-50 flex flex-col space-y-6">
      {list?.map((goal) => {
        return (
          <GoalHubCard showFocus={showFocus} item={goal} onUpdate={onUpdate} />
        );
      })}
    </div>
  );
}

export default SprintList;
