import { PriorityValues } from "helpers/goals";
import React, { useMemo } from "react";
import { RiFireLine } from "react-icons/ri";

const Priority = ({ priority }) => {
  const activePriority = useMemo(
    () => PriorityValues.find((item) => item.value === priority),
    [priority]
  );
  return (
    <div
      style={{ borderColor: activePriority?.color ?? "#E7E6E5" }}
      className="flex flex-row items-center gap-1 p-1 rounded border font-lato font-semibold"
    >
      <RiFireLine
        style={{ color: activePriority?.color ?? "#696763" }}
        className="text-sm"
      />
      <p className="text-primary-gray-800">P{priority || 0}</p>
    </div>
  );
};

export default Priority;
