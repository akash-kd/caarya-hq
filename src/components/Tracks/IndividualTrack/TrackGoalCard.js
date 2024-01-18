import { Crosshair, Fire, Target } from "@phosphor-icons/react";
import StatusDropDown, {
  getStatusColor,
} from "components/Tasks/Card/StatusDropDown";
import { updateGoal } from "config/APIs/task/goal";
import { goalFocusTime } from "helpers/constants/goals";
import { GoalStatus } from "helpers/goals";
import { getTotalTime } from "helpers/utils/common/clock";
import { getGoalPriority } from "helpers/utils/goal";
import moment from "moment";
import React, { useMemo, useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsJournalText, BsThreeDotsVertical } from "react-icons/bs";
import { MdDateRange, MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { RiFireLine, RiTShirt2Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import Tshirt from "./Tshirt";
import Priority from "./Priority";
import { BiArchiveIn } from "react-icons/bi";

function TrackGoalCard({ item, onUpdate, isRecommended = false, assigned }) {
  const user = useSelector((state) => state?.user?.user);
  const [showEdit, setShowEdit] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  console.log(item);

  const isOthers = assigned === "OTHERS";

  const clockedIn = false;

  const focusTime = useMemo(() => item?.focusIn ?? "", [item]);
  const currentFocus = useMemo(
    () => goalFocusTime.find((focus) => focus.label === focusTime),
    [focusTime]
  );

  const handleUpdate = async ({ status, imp, ur, focus }) => {
    try {
      let body = {};
      if (status) body["status"] = status;
      if (focus) body["focusIn"] = focus;
      if (imp || ur) body["priority"] = getGoalPriority(imp, ur);

      await updateGoal(item?.id, body);

      onUpdate();
    } catch (err) {
      console.log("Error", err?.response);
    }
  };

  return (
    <div className="border border-primary-gray-200 rounded-lg bg-white shadow-md p-4 flex flex-col gap-4 relative">
      <div className="flex flex-row items-center justify-between gap-1 text-3xs tracking-wide">
        <div className="flex gap-1 items-center flex-1 w-full">
          <Target size={12} className="text-caarya-red-lighter" />
          <p className="text-primary-gray-300 font-lato  font-semibold">
            Caarya / <span className="font-light"> With Dheeraj</span>
          </p>
        </div>
        <div className="flex flex-row items-center gap-1">
          {isOthers ? (
            <div
              className={`StatusDropdown ${getStatusColor(
                item?.status
              )} p-1 px-2  rounded font-semibold text-3xs text-primary-gray-800 text-center`}
            >
              <p>{item?.status}</p>
            </div>
          ) : (
            <StatusDropDown
              status={item?.status}
              setStatus={(val) => {
                handleUpdate({ status: val });
              }}
              disabled={item?.status === "NotStarted"}
            />
          )}

          {isOthers && item?.status !== "completed" ? (
            <Tshirt hours={item?.metaData?.hours} />
          ) : (
            <>
              {item?.status !== "completed" && (
                <>
                  {clockedIn ? (
                    <>
                      {item?.metaData?.hours && (
                        <Tshirt hours={item?.metaData?.hours} />
                      )}
                    </>
                  ) : (
                    <>
                      <Priority value={item?.priority} />
                      <div
                        onClick={() => setShowMenu(true)}
                        className="w-7 h-7 grid place-items-center "
                      >
                        <BsThreeDotsVertical className="text-base" />
                      </div>
                    </>
                  )}
                </>
              )}
            </>
          )}

          {showMenu && (
            <div className="flex flex-col absolute top-8 right-4 bg-white shadow-2xl rounded-xl w-40 text-primary-gray-300">
              <div
                onClick={() => {
                  setShowEdit(true);
                  setShowMenu(false);
                }}
                className="p-3 px-4 flex gap-4 items-center border-b hover:bg-primary-blue-100 "
              >
                <MdOutlineEdit />
                <p className=" font-bold text-xs">Edit</p>
              </div>
              <div
                onClick={() => {
                  setDeleteModal(true);
                  setShowMenu(false);
                }}
                className="p-3 px-4 flex gap-4 items-center hover:bg-primary-blue-100  "
              >
                <MdOutlineDelete />
                <p className=" font-bold text-xs">Delete</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col items-start space-y-2">
        <h1
          className={`text-primary-gray-300 font-lato text-xs font-semibold ${
            item?.status === "completed" && " line-through "
          } `}
        >
          {item?.title}
        </h1>
        {item?.description && (
          <p className="text-primary-gray-300 font-lato text-xs font-light">
            {item?.description}
          </p>
        )}
      </div>
      <div className="flex gap-2 items-center">
        {item?.project?.image ? (
          <img
            src={item?.project?.image}
            className="bg-primary-gray-100 rounded w-4 h-4 object-contain"
          />
        ) : (
          <div className="w-4 h-4 rounded bg-gray-100"></div>
        )}

        <p className="text-primary-gray-300 font-lato text-xs font-light">
          {item?.project?.title}
        </p>
      </div>

      {isRecommended && (
        <>
          {item?.status !== "NotStarted" && (
            <div className="flex gap-2 w-full items-center tracking-wide ">
              {item?.sessions?.length > 0 && (
                <div className="px-2 py-1 flex-1 max-w-[50%] flex flex-row items-center space-x-2 rounded border border-primary-neutral-200 text-primary-gray-300 text-xs font-lato font-light">
                  <AiOutlineClockCircle className="text-[#816FE9] text-base" />
                  <p>
                    Total{" "}
                    <span className="font-medium">
                      {getTotalTime(item?.sessions)}
                    </span>
                  </p>
                </div>
              )}
              <div className="px-2 py-1 flex-1 max-w-[50%] flex flex-row items-center space-x-2 rounded border border-primary-neutral-200 text-primary-gray-300 text-xs font-lato font-light">
                <BsJournalText className="text-[#ABE085] text-base" />
                <p>
                  Journals : <span className="font-medium">2</span>
                </p>
              </div>
            </div>
          )}

          {!clockedIn && (
            <>
              {item?.status !== "completed" && (
                <div
                  className={`flex items-center gap-4 ${
                    !isOthers && "justify-between"
                  } `}
                >
                  <div className="flex flex-row items-center space-x-2">
                    <Crosshair size={16} color="#FBA804" />
                    <p className="text-primary-gray-600 font-lato text-xs font-semibold">
                      Focusing in:
                    </p>
                  </div>
                  {isOthers ? (
                    <>
                      {focusTime && (
                        <div className="flex gap-2 items-center">
                          <div
                            style={{ color: currentFocus?.color ?? "9C9A96" }}
                          >
                            {React.cloneElement(currentFocus?.svg, {})}
                          </div>
                          <p className="text-primary-gray-600 font-lato text-xs font-semibold">
                            {focusTime ?? ""}
                          </p>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex flex-row items-stretch space-x-2 justify-end">
                      {goalFocusTime?.map((item) => {
                        return (
                          <div
                            key={item.label}
                            onClick={() => handleUpdate({ focus: item?.label })}
                            style={{
                              borderColor:
                                focusTime == item?.label
                                  ? item?.borderColor
                                  : "#F3F2F2",
                              color:
                                focusTime == item?.label
                                  ? item?.color
                                  : "#9C9A96",
                              backgroundColor:
                                focusTime == item?.label
                                  ? item?.bgColor
                                  : "#FAFAFA",
                            }}
                            className={`p-1 rounded border  flex flex-row items-center justify-center`}
                          >
                            {React.cloneElement(item?.svg, {})}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </>
      )}

      {clockedIn ? (
        <>
          {isOthers ? (
            <div className="flex gap-4 w-full items-center">
              <div className="flex flex-1 gap-2 justify-center items-center w-full p-3 bg-secondary-indigo-30 text-secondary-indigo-500 ">
                <AiOutlineClockCircle className="text-sm" />
                <p className="font-lato text-xs tracking-wide font-semibold ">
                  Clocked In
                </p>
              </div>
              <div className="flex-1 flex-col ">
                <p className="text-2xs font-semibold font-lato ">Session :</p>
                <p className="text-xs font-light">
                  {getTotalTime(item?.sessions)} /{" "}
                  {getTotalTime(item?.sessions)}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex gap-2 justify-center items-center w-full p-3 bg-secondary-indigo-30 text-secondary-indigo-500 ">
              <AiOutlineClockCircle className="text-sm" />
              <p className="font-lato text-xs tracking-wide font-semibold ">
                Clocked In
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="flex justify-between items-center gap-2">
          <div className="  flex items-center space-x-2  text-primary-gray-300 text-xs font-lato font-light">
            <MdDateRange className="text-[#9C9A96] text-base" />
            <p>{moment(item?.dueDate).format("DD-MM-YYYY")}</p>
          </div>
          {isOthers ? (
            <>
              {isRecommended ? (
                <p className="underline underline-offset-2 text-secondary-indigo-500 text-xs font-semibold font-lato ">
                  Request to de-prioritize
                </p>
              ) : (
                <p className="underline underline-offset-2 text-secondary-indigo-500 text-xs font-semibold font-lato ">
                  Request to Focus
                </p>
              )}
            </>
          ) : (
            <>
              {item?.metaData?.hours && (
                <Tshirt hours={item?.metaData?.hours} />
              )}
            </>
          )}
        </div>
      )}

      {item?.status === "completed" && (
        <button className="flex justify-end w-full space-x-2 py-1 text-primary-yellow-700 text-xs font-semibold font-lato ">
          <BiArchiveIn className=" text-base" />
          <p className="underline underline-offset-2 ">Archive Goal</p>
        </button>
      )}
    </div>
  );
}

export default TrackGoalCard;
