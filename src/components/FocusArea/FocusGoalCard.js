import { Clock, Dot, Notebook, TShirt, Timer } from "@phosphor-icons/react";

import React, { Fragment, useEffect, useState } from "react";

import { getTotalTime } from "helpers/utils/common/clock";
import { goalFocusTime } from "helpers/constants/goals";
import StatusDropDown from "components/Tasks/Card/StatusDropDown";
import { getGoalPriority } from "helpers/utils/goal";
import { updateGoal } from "config/APIs/task/goal";
import { fetchAllgoals } from "redux/goal";
import { useDispatch } from "react-redux";

function FocusGoalCard({ item, onFocus, focused }) {
  const dispatch = useDispatch();
  const [status, setStatus] = useState();
  useEffect(() => {
    setStatus(item?.status);
  }, [item]);

  const handleUpdate = async ({ status, imp, ur, focus }) => {
    try {
      let body = {};
      if (status) body["status"] = status;
      if (focus) body["focusIn"] = focus;
      if (imp || ur) body["priority"] = getGoalPriority(imp, ur);

      const response = await updateGoal(item?.id, body);

      dispatch(fetchAllgoals());
    } catch (err) {
      console.log("Error", err);
      console.log(err?.response);
    }
  };

  return (
    <>
      <div className="border shadow-md border-primary-gray-200 rounded-lg bg-white p-4 space-y-4">
        <div className="flex flex-row items-center justify-between">
          {item?.track ? (
            <div className="flex flex-row items-center space-x-1 text-primary-gray-300 text-3xs font-lato">
              <Dot
                weight="fill"
                size={10}
                className="text-caarya-red-lighter"
              />
              <p className="font-semibold">{item?.track?.category} / </p>
              <p className="font-light">{item?.track?.title}</p>
            </div>
          ) : (
            <div className="flex flex-row items-center space-x-1 text-primary-gray-300 text-3xs font-lato"></div>
          )}
          <div className="flex flex-row items-center space-x-2">
            <StatusDropDown
              status={status}
              setStatus={(val) => {
                handleUpdate({ status: val });
                setStatus(val);
              }}
            />
            {/* <div className="py-1 flex flex-row items-center space-x-2 rounded text-primary-gray-280 text-xs font-lato font-light">
              <TShirt size={16} />
              <p>{item?.metaData?.hours} h</p>
            </div> */}
          </div>
        </div>
        <div className="flex flex-col items-start space-y-2 px-2">
          <h1 className="text-primary-gray-300 font-lato text-sm font-semibold">
            {item?.title}
          </h1>
          <p className="text-primary-gray-300 font-lato text-sm font-light">
            {item?.description}
          </p>
        </div>
        <div className="flex flex-row items-center space-x-2 px-2">
          {/* {item?.project?.image ? (
            <img
              src={item?.project?.image?.url}
              className="bg-primary-gray-100 rounded w-3 h-3 object-contain"
            />
          ) : (
            <div className="bg-primary-gray-100 rounded w-3 h-3" />
          )} */}
          <p className="text-primary-gray-300 text-2xs font-lato font-light">
            {item?.project?.title}
          </p>
        </div>

        {item?.sessions?.length > 0 && (
          <div className="flex flex-row items-center space-x-2 px-2">
            <div className="px-2 py-1 flex flex-row items-center space-x-2 rounded border border-primary-gray-200 text-primary-gray-600 text-2xs font-lato font-light">
              <Timer size={16} color="#816FE9" />
              <p>
                Total:{" "}
                <span className="font-medium">
                  {getTotalTime(item?.sessions)}
                </span>
              </p>
            </div>{" "}
            <div className="px-2 py-1 flex flex-row items-center space-x-2 rounded border border-primary-gray-200 text-primary-gray-600 text-2xs font-lato font-light">
              <Notebook color="#ABE085" size={16} />
              <p>
                Journal{" "}
                <span className="font-medium">
                  {item?.sessions?.filter((a) => a?.journal?.length > 0)
                    ?.length || 0}
                </span>
              </p>
            </div>
          </div>
        )}

        {focused ? (
          <div className="w-full cursor-pointer rounded flex flex-row justify-center items-center space-x-2 px-5 py-3 border bg-secondary-indigo-30 text-secondary-indigo-500 text-xs font-lato font-semibold">
            <Clock size={16} />
            <p>Clocked In</p>
          </div>
        ) : (
          <div className="flex flex-row items-center space-x-2 p-2 justify-between">
            <div className="flex flex-row items-center space-x-2 text-primary-neutral-500 text-2xs font-lato font-light">
              <div
                style={{
                  borderColor:
                    goalFocusTime?.find((i) => i?.label == item?.focusIn)
                      ?.borderColor || "#F3F2F2",
                  color:
                    goalFocusTime?.find((i) => i?.label == item?.focusIn)
                      ?.color || "#9C9A96",
                  backgroundColor:
                    goalFocusTime?.find((i) => i?.label == item?.focusIn)
                      ?.bgColor || "#FAFAFA",
                }}
                className={`p-1 rounded border  flex flex-row items-center justify-center`}
              >
                {React.cloneElement(
                  goalFocusTime?.find((i) => i?.label == item?.focusIn)?.svg,
                  {}
                )}
              </div>
              <p className="text-primary-neutral-500 font-lato text-2xs font-light">
                {goalFocusTime?.find((i) => i?.label == item?.focusIn)?.time}
              </p>
            </div>
            <div
              onClick={() => {
                onFocus();
              }}
              className="cursor-pointer rounded flex flex-row items-center space-x-2 px-3 py-2 border border-secondary-indigo-500 bg-secondary-indigo-30 text-secondary-indigo-500 text-xs font-lato font-semibold"
            >
              <Clock size={16} />
              <p>Clock in Now</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default FocusGoalCard;
