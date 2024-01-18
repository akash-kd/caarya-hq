import { TshirtValues } from "helpers/goals";
import React, { useMemo } from "react";
import { RiTShirt2Line } from "react-icons/ri";

const Tshirt = ({ hours }) => {
  const activeTshirt = useMemo(
    () => TshirtValues.find((tshirt) => tshirt.value === hours),
    [hours]
  );
  return (
    <div className="  flex items-center space-x-2  text-primary-gray-300 text-xs font-lato font-light">
      <RiTShirt2Line
        style={{ color: activeTshirt?.color ?? "#9C9A96" }}
        className="text-base"
      />
      <p>{hours ?? 0}h</p>
    </div>
  );
};

export default Tshirt;
