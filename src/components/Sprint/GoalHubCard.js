import {
  Calendar,
  Clock,
  Crosshair,
  Dot,
  DotsThreeOutlineVertical,
  Fire,
  List,
  Notebook,
  Siren,
  TShirt,
  Timer,
  Warning,
} from "@phosphor-icons/react";
import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { getTotalTime } from "helpers/utils/common/clock";
import { goalFocusTime } from "helpers/constants/goals";
import StatusDropDown from "components/Tasks/Card/StatusDropDown";
import { getGoalPriority, getImpUrgent } from "helpers/utils/goal";
import { deleteGoal, updateGoal } from "config/APIs/task/goal";
import { TRACK_CATEGORY, deafultTracks } from "helpers/constants/tracks";
import ConfirmModal from "components/Modals/Common/ConfirmModal";

function GoalHubCard({ item, onUpdate, showFocus, plannerMode, type }) {
  const user = useSelector((state) => state?.user?.user);
  const [focusTime, setFocusTime] = useState();
  const [status, setStatus] = useState();
  const [important, setImportant] = useState(false);
  const [urgent, setUrgent] = useState(false);
  const [deletee, setDeletee] = useState(false);

  useEffect(() => {
    setStatus(item?.status);

    setImportant(getImpUrgent(item?.priority)?.important);
    setUrgent(getImpUrgent(item?.priority)?.urgent);
    setFocusTime(item?.focusIn);
  }, [item]);

  const handleUpdate = async ({ status, imp, ur, focus }) => {
    try {
      let body = {};
      if (status) body["status"] = status;
      if (focus) body["focusIn"] = focus;
      if (imp || ur) body["priority"] = getGoalPriority(imp, ur);

      await updateGoal(item?.id, body);
      onUpdate();
    } catch (err) {
      console.log("Error", err);
      console.log(err?.response);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteGoal({ goalId: item?.id });
      onUpdate();
    } catch (err) {
      console.log("Error", err);
      console.log(err?.response);
    }
  };

  return (
    <div
      className="rounded-lg bg-opacity-5"
      style={{
        backgroundColor:
          TRACK_CATEGORY?.find((a) => a?.label == item?.track?.category)
            ?.color || "#fff",
      }}
    >
      <ConfirmModal
        isOpen={deletee}
        closeModal={() => setDeletee(false)}
        text={<>Are you sure you want to delete {item?.title}?</>}
        onAccept={() => {
          handleDelete();
          setDeletee(false);
        }}
      />
      {plannerMode ? (
        <div className="border border-primary-gray-200 rounded-tl-[48px] rounded-b-lg rounded-tr-lg bg-white shadow-md p-4 space-y-3">
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
              <div className="flex flex-row items-center space-x-1 text-primary-gray-300 text-3xs font-lato">
                <p className="font-light">No Track</p>
              </div>
            )}
            <div className="flex flex-row items-center space-x-2">
              <div className="py-1 flex flex-row items-center space-x-2 rounded text-primary-gray-280 text-2xs font-lato font-light">
                <Calendar size={16} />
                <p className="font-semibold">
                  {moment(item?.dueDate).format("ll")}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start space-y-2 px-2">
            <h1 className="text-primary-gray-600 font-lato text-sm font-semibold">
              {item?.title}
            </h1>
          </div>
          <div className="px-4 py-2 grid grid-cols-2 gap-8">
            <div
              onClick={() => {
                handleUpdate({ imp: !important, ur: urgent });
                setImportant(!important);
              }}
              className={`font-lato text-xs font-semibold rounded border ${
                important
                  ? "border-primary-yellow-medium bg-primary-yellow-30 text-primary-gray-800"
                  : "border-primary-gray-200  text-gray-400"
              } px-4 py-2 flex flex-row items-center space-x-2 justify-center`}
            >
              <Warning size={16} color={important ? "#FF8800" : "#9C9A96"} />
              <p>Important</p>
            </div>
            <div
              onClick={() => {
                handleUpdate({ ur: !urgent, imp: important });
                setUrgent(!urgent);
              }}
              className={`font-lato text-xs font-semibold rounded border ${
                urgent
                  ? "border-primary-error-500 bg-primary-error-30 text-primary-gray-800"
                  : "border-primary-gray-200  text-gray-400"
              }  px-4 py-2 flex flex-row items-center space-x-2 justify-center`}
            >
              <Siren size={16} color={urgent ? "#E72113" : "#9C9A96"} />
              <p>Urgent</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="border relative border-primary-gray-200 rounded-tl-lg rounded-b-lg rounded-tr-lg bg-white shadow-md p-4">
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
              <div>
                {" "}
                {item?.sessions?.length > 0 && (
                  <div className="flex pt-2.5 flex-row items-center space-x-2 px-2">
                    <div className="px-2 py-1 flex flex-row items-center space-x-2 rounded border border-primary-gray-200 text-primary-gray-600 text-2xs font-lato font-light">
                      <Timer size={16} color="#816FE9" />
                      <p>
                        Total:{" "}
                        <span className="font-medium">
                          {getTotalTime(item?.sessions)}
                        </span>
                      </p>
                    </div>{" "}
                  </div>
                )}
              </div>
            )}
            <div className="flex flex-row items-center space-x-2">
              {/* <div className="px-1 py-1 rounded border border-primary-gray-200 text-primary-gray-350 text-3xs font-lato font-semibold">
            {GoalStatus?.find((g) => g?.value == item?.status)?.label}
          </div> */}
              <StatusDropDown
                status={status}
                setStatus={(val) => {
                  handleUpdate({ status: val });
                  setStatus(val);
                }}
              />
              {type ? (
                <div className="py-1 flex flex-row items-center space-x-2 rounded text-primary-gray-280 text-xs font-lato font-light">
                  <TShirt size={16} />
                  <p>{item?.metaData?.hours} h</p>
                </div>
              ) : (
                <>
                  {item?.priority && (
                    <div className="flex flex-row items-center space-x-1 px-1 py-1 rounded border border-primary-yellow-medium text-primary-yellow-medium text-3xs font-lato font-semibold">
                      <Fire size={12} />
                      <p className="">P{item?.priority || "?"}</p>
                    </div>
                  )}
                  <Menu as="div" className="relative block text-left -mb-2">
                    <Menu.Button className="">
                      <DotsThreeOutlineVertical size={16} weight="fill" />
                    </Menu.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items
                        style={{ borderRadius: "20px 0px 20px 20px" }}
                        className={`origin-top-right absolute right-0 w-24 z-10 shadow-lg bg-white ring-1 ring-primary-gray-1000 ring-opacity-5 focus:outline-none `}
                      >
                        <div className="py-1 max-h-64 overflow-y-auto relative z-50">
                          {[1].map((item) => {
                            return (
                              <Menu.Item>
                                {({ active }) => (
                                  <div
                                    onClick={() => setDeletee(true)}
                                    className="text-red-500 font-lato font-normal block px-4 py-2 text-2xs cursor-pointer"
                                  >
                                    Delete
                                  </div>
                                )}
                              </Menu.Item>
                            );
                          })}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col items-start space-y-2 px-2">
            <h1 className="text-primary-gray-300 mt-2.5 font-lato text-xs font-semibold">
              {item?.title}
            </h1>
            <p className="text-primary-gray-300 font-lato text-xs font-light">
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

          {/* {item?.sessions?.length > 0 && (
            <div className="flex pt-2.5 flex-row items-center space-x-2 px-2">
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
          )} */}

          {showFocus && user?.id == item?.ownerId && (
            <div className="px-2 py-2 flex flex-row items-stretch justify-between">
              <div className="flex flex-row items-center space-x-2">
                <Crosshair size={16} color="#FF7E6E" />
                <p className="text-primary-gray-600 font-lato text-xs font-semibold">
                  Focusing in:
                </p>
              </div>
              <div className="flex flex-row items-stretch space-x-2 justify-end">
                {goalFocusTime?.map((item) => {
                  return (
                    <div
                      onClick={() => {
                        handleUpdate({ focus: item?.label });
                        setFocusTime(item?.label);
                      }}
                      style={{
                        borderColor:
                          focusTime == item?.label
                            ? item?.borderColor
                            : "#F3F2F2",
                        color:
                          focusTime == item?.label ? item?.color : "#9C9A96",
                        backgroundColor:
                          focusTime == item?.label ? item?.bgColor : "#FAFAFA",
                      }}
                      className={`p-1 rounded border  flex flex-row items-center justify-center`}
                    >
                      {React.cloneElement(item?.svg, {})}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {type == "clockedIn" && (
            <div className="flex flex-row items-center justify-between space-x-4">
              <div className="bg-secondary-indigo-30 py-3 px-5 flex flex-row items-center space-x-2 text-primary-indigo-500 font-lato text-xs font-semibold">
                <Clock size={16} />
                <p>Clocked In</p>
              </div>
              <div className="flex flex-col items-start">
                <h1 className="text-primary-neutral-500 font-lato font-semibold text-2xs">
                  Session:
                </h1>
                <p className="text-primary-gray-800 font-lato text-xs font-light"></p>
              </div>
            </div>
          )}
          {type == "inFocus" && (
            <div className="px-2 py-2 flex flex-row items-stretch space-x-4">
              <div className="flex flex-row items-center space-x-2">
                <Crosshair size={16} color="#FBA804" />
                <p className="text-primary-neutral-500 font-lato text-xs font-semibold">
                  Focusing in:
                </p>
              </div>
              <div
                style={{
                  color: goalFocusTime?.find((i) => i?.label == item?.focusIn)
                    ?.color,
                }}
                className="flex flex-row items-center space-x-2"
              >
                {React.cloneElement(
                  goalFocusTime?.find((i) => i?.label == item?.focusIn)?.svg,
                  {}
                )}
                <p className="text-primary-neutral-500 font-lato text-xs font-semibold">
                  {item?.focusIn}
                </p>
              </div>
            </div>
          )}

          {type && type !== "clockedIn" && (
            <div className="flex flex-row items-center space-x-2 px-2 justify-between">
              <div className="py-1 flex flex-row items-center space-x-2 rounded text-primary-gray-280 text-xs font-lato font-light">
                <Calendar size={16} />
                <p>{moment(item?.dueDate).format("ll")}</p>
              </div>
              {!type && (
                <div className="py-1 flex flex-row items-center space-x-2 rounded text-primary-gray-280 text-xs font-lato font-light">
                  <TShirt size={16} />
                  <p>{item?.metaData?.hours} h</p>
                </div>
              )}
              {type == "inFocus" ? (
                <div className="text-secondary-indigo-500 font-lato text-xs font-semibold underline cursor-pointer">
                  Request to de-prioritize
                </div>
              ) : (
                <div className="text-secondary-indigo-500 font-lato text-xs font-semibold underline cursor-pointer">
                  Request to Focus
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default GoalHubCard;
