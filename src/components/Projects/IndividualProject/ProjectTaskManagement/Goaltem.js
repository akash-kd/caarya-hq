import { ReactComponent as GoalIcon } from "assets/icons/Goal.svg";
import { PencilAltIcon } from "@heroicons/react/outline";

function GoalItem({
  goal,
  isActive,
  onClick,
  onEdit,
  popup,
  isLast,
  isMyGoal = true,
}) {
  const className = `relative cursor-pointer border rounded-lg pt-4 pb-3 px-3 flex items-start justify-between text-xs ${
    !popup ? "mb-8" : isLast ? "" : "mb-5"
  } ${
    isActive
      ? "border-primary-gray-1000 font-bold shadow-lg bg-primary-yellow-lightest"
      : "bg-white"
  }`;
  return (
    <div className={className}>
      <div
        className={`absolute -top-3 flex items-center gap-1 p-1 px-2 rounded-full text-xs ${
          !isActive
            ? "bg-[#dededf] text-primary-gray-300"
            : "bg-primary-gray-1000 text-white"
        }`}
      >
        Goals
        <GoalIcon
          className={`h-3 ${
            !isActive ? "fill-primary-gray-300" : "fill-white"
          }`}
        />{" "}
      </div>
      <h5
        onClick={onClick}
        className={`w-[85%] ${
          isActive ? "text-primary-gray-1000" : "text-primary-gray-300"
        }`}
      >
        {goal?.title}
      </h5>
      {isMyGoal && (
        <PencilAltIcon
          className={`h-4 relative -top-1 ${
            isActive ? "text-primary-gray-1000" : "text-primary-gray-300"
          }`}
          onClick={() => {
            onEdit(goal);
          }}
        />
      )}
    </div>
  );
}

export default GoalItem;

function GoalItemLoader() {
  return (
    <div className="relative cursor-pointer border rounded-lg pt-4 pb-3 px-3 flex items-start justify-between text-xs bg-white mb-5">
      <div
        className={`absolute -top-3 flex items-center gap-1 p-1 px-2 rounded-full text-xs bg-[#dededf] text-primary-gray-1000`}
      >
        <GoalIcon className={`h-3 fill-primary-gray-1000`} /> Goals
      </div>
      <h5 className="w-[85%] h-4 rounded bg-primary-[#dededf] animate-pulse"></h5>
    </div>
  );
}

export { GoalItemLoader };
