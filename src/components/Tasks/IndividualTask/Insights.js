import { ReactComponent as GoalIcon } from "assets/icons/Goal.svg";
import { CheckCircleIcon } from "@heroicons/react/solid";
import EditTask from "components/Modals/EditTask";
import moment from "moment";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "redux/toaster";
import * as TaskAPI from "config/APIs/task/task";
import * as GoalsAPI from "config/APIs/task/goal";

import {
  CaretDown,
  Eye,
  PlusCircle,
  TShirt,
  WarningCircle,
} from "@phosphor-icons/react";
import { TShirtSizes } from "helpers/task";
import { getPriorityColor } from "../Card/PriorityDropdown";
import GoalCreate from "components/Modals/Goal/GoalCreate";

function Insights({ onUpdate, details, setDetails, setTab, fetchTask }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [missing, setMissing] = useState([]);
  const [showEditModal, setShowEditModal] = useState({
    isOpen: false,
    type: "",
  });
  const [showGoalsList, setShowGoalsList] = useState(false);
  const [showGoalCreateModal, setShowGoalCreateModal] = useState(false);
  const [goals, setGoals] = useState([]);
  const goalsRef = useRef(null);

  const handleClickOutside = (event) => {
    if (goalsRef.current && !goalsRef.current.contains(event.target)) {
      setShowGoalsList(false);
    }
  };

  useEffect(() => {
    fetchGoals();
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await GoalsAPI.getAllGoals({
        project_id: details?.project?.id,
      });
      let goals = response.data.data?.response;
      setGoals(goals);
    } catch (err) {
      console.log("Fetch goals error", err);
    }
  };

  useEffect(() => {
    let temp = [];

    if (
      details?.tShirtSize == null ||
      details?.tShirtSize == "" ||
      details?.tShirtSize == "R"
    ) {
      temp.push({ name: "Missing T-shirt size", type: "tShirtSize" });
    }
    if (details?.priority == null || details?.priority == 6) {
      temp.push({ name: "Missing Priority", type: "priority" });
    }
    if (moment(details?.dueDate).unix() < moment().unix()) {
      temp.push({ name: "Past due date", type: "dueDate" });
    }
    if (details?.goal == null || details?.goal == "") {
      temp.push({ name: "Missing Goal", type: "goal" });
    }

    setMissing(temp);
  }, [details]);

  const handleUpdate = async ({ inFocus, priority, goal, tShirtSize }) => {
    const update = { ...details };
    if (inFocus) {
      update["in_focus"] = 1;
    }

    if (priority) {
      update["priority"] = priority;
    }
    if (goal) {
      update["goal_id"] = goal?.id;
    }
    if (tShirtSize) {
      update["tShirtSize"] = tShirtSize;
    }

    delete update.type;
    delete update.goal;
    let body = {
      task: update,
    };
    try {
      const response = await TaskAPI.updateTasks(details.id, body);
      const { task } = response.data.data;
      dispatch(showToast({ message: "Task added to focus!", type: "success" }));

      onUpdate();
    } catch (err) {
      switch (err.response?.status) {
        case 401:
          dispatch(showToast({ message: "Unauthorized!", type: "error" }));
          break;
        default:
          dispatch(
            showToast({ message: "Something went wrong!", type: "error" })
          );
      }
    }
  };

  const updatePriority = (priority) => {
    if (user?.id !== details?.creatorId) {
      dispatch(
        showToast({
          message: "Can only be changed by manager!",
          type: "error",
        })
      );
      return;
    }
    setDetails({
      ...details,
      priority,
    });
    handleUpdate({ priority });
  };

  const updateGoal = (goal) => {
    if (user?.id !== details?.creatorId) {
      dispatch(
        showToast({
          message: "Can only be changed by manager!",
          type: "error",
        })
      );
      return;
    }
    setDetails({
      ...details,
      goal,
    });
    handleUpdate({ goal });
  };

  const updateTShirtSize = (tShirtSize) => {
    if (user?.id !== details?.creatorId) {
      dispatch(
        showToast({
          message: "Can only be changed by manager!",
          type: "error",
        })
      );
      return;
    }
    setDetails({
      ...details,
      tShirtSize: tShirtSize,
    });
    handleUpdate({ tShirtSize });
  };

  return (
    <div className="lg:px-2.5">
      <EditTask
        isOpen={showEditModal?.isOpen}
        closeModal={() => setShowEditModal({ isOpen: false, type: "" })}
        task={details}
        details={details}
        setDetails={setDetails}
        type={showEditModal?.type}
        onUpdate={() => {
          onUpdate();
          setShowEditModal({ isOpen: false, type: "" });
        }}
      />
      <GoalCreate
        project={details?.project}
        isOpen={showGoalCreateModal}
        closeModal={() => setShowGoalCreateModal(false)}
        onCreate={() => fetchTask()}
      />
      <div className={`px-5 py-2.5 mt-6 rounded-10px space-y-5`}>
        <div className="flex flex-col space-y-5 font-bold">
          {moment().diff(moment(details?.dueDate), "days", false) > 0 && (
            <div className="font-lato text-xs lg:text-sm text-center flex flex-row items-center space-x-2.5 text-secondary-red-400">
              <WarningCircle className=" w-4 h-4" />
              <p>
                This task has been due since
                {` ${moment().diff(
                  moment(details?.dueDate),
                  "days",
                  false
                )} day${
                  moment().diff(moment(details?.dueDate), "days", false) > 1
                    ? "s"
                    : ""
                }`}
              </p>
            </div>
          )}
          {moment().diff(moment(details?.dueDate), "days", false) == 0 && (
            <div className="font-lato text-xs lg:text-sm text-center flex flex-row items-center space-x-2.5 text-secondary-green-550">
              <img src="/assets/images/logos/live.svg" className=" w-6 h-6" />
              <p>This task is due today </p>
            </div>
          )}
          {moment().diff(moment(details?.dueDate), "days", false) < 0 &&
            moment().diff(moment(details?.dueDate), "days", false) > -8 && (
              <div className="font-lato text-xs lg:text-sm text-center flex flex-row items-center space-x-2.5 text-secondary-orange-550">
                <p>💪🏻 This task is due this week </p>
              </div>
            )}
        </div>
        {/* <div className="flex flex-col space-y-5">
          <div className="font-lato text-xs lg:text-sm text-center flex flex-col items-start space-y-1.5 text-primary-gray-1000">
            <p
              onClick={() => {
                handleUpdate({ inFocus: true });
              }}
              className="flex items-center space-x-2.5 text-secondary-green-300 cursor-pointer hover:underline font-lato"
            >
              <Eye className="w-4 h-4 mr-3" />{" "}
              {details?.in_focus == 1
                ? "You are already focusing on this"
                : "Be the first one to do it ->"}{" "}
            </p>
          </div>
        </div> */}
      </div>

      <div
        className={`${
          missing?.length == 0 ? "bg-secondary-green-50" : "bg-secondary-red-50"
        } px-5 py-2.5 mt-6 rounded-10px`}
      >
        <div className="grid grid-cols-1 gap-x-2.5 gap-y-5" ref={goalsRef}>
          {missing?.length > 0 ? (
            <>
              {missing?.map((i) => {
                return (
                  <div
                    className={`flex flex-col space-y-3`}
                    key={missing?.type}
                  >
                    <h1 className="font-bold text-xs font-lato">{i?.name}</h1>
                    <div className={`w-full flex flex-row`}>
                      {i?.type == "priority" ? (
                        <div className="w-full flex items-center justify-around">
                          {[1, 2, 3, 4, 5, 6].map((i) => {
                            return (
                              <div
                                className={`flex items-center gap-[2px]  priority-dark-${i}`}
                                onClick={() => {
                                  updatePriority(i);
                                }}
                              >
                                <img
                                  src="/assets/svg/icon/fire.svg"
                                  className="h-3"
                                />
                                P{i}
                              </div>
                            );
                          })}
                        </div>
                      ) : i?.type == "dueDate" ? (
                        <div
                          className={`bg-secondary-red-100 text-secondary-red-550 text-xs font-lato font-normal py-1 px-2 rounded-full`}
                        >
                          {moment(details?.dueDate).format("LL")}
                        </div>
                      ) : i?.type == "tShirtSize" ? (
                        <div
                          className={`w-full flex justify-around text-xs lg:text-sm font-lato font-normal py-1 px-2 rounded-full`}
                        >
                          {TShirtSizes.map((i) => {
                            return (
                              <div
                                className="relative cursor-pointer"
                                key={i}
                                onClick={() => {
                                  updateTShirtSize(i);
                                }}
                              >
                                <TShirt className="w-8 h-8" />
                                <span className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-3xs">
                                  {i}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      ) : i?.type == "goal" ? (
                        <div className="w-full flex justify-center items-center flex-col">
                          <img
                            src="/assets/images/missingGoal.png"
                            className="w-40"
                          />
                          <div className="relative cursor-pointer border rounded-lg pt-4 pb-3 px-3 flex items-start justify-between text-xs bg-white mb-5 w-full">
                            <div
                              className={`absolute -top-3 flex items-center gap-1 p-1 px-2 rounded-full text-xs bg-primary-gray-1000 text-white`}
                            >
                              <GoalIcon className={`h-3 fill-white`} /> Link a
                              goal
                            </div>
                            <div
                              className="w-full text-gray-300 flex items-center justify-between"
                              onClick={() => {
                                setShowGoalsList(true);
                              }}
                            >
                              Choose a goal to add this task to
                              <CaretDown className="w-4 h-4 text-primary-gray-1000" />
                            </div>
                            {showGoalsList && (
                              <div className="absolute top-12 left-0 w-full p-3 px-5 bg-white rounded-lg shadow-lg">
                                <div
                                  className="flex items-center font-semibold gap-2 py-2 text-sm"
                                  onClick={() => {
                                    setShowGoalCreateModal(true);
                                  }}
                                >
                                  <PlusCircle className="w-5 h-5" /> Add a new
                                  goal
                                </div>
                                {goals?.map((goal) => {
                                  return (
                                    <div
                                      className="flex flex-col py-2 text-xs"
                                      key={goal?.id}
                                      onClick={() => {
                                        updateGoal(goal);
                                      }}
                                    >
                                      {goal?.title}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="col-span-2 font-lato text-xs lg:text-sm text-center flex flex-row items-center space-x-2.5 text-primary-gray-1000">
              <p>All task details are already updated </p>
              <CheckCircleIcon className="text-primary-green-medium w-4 h-4" />
            </div>
          )}
        </div>
      </div>
      <div className={`py-2.5 px-5 mt-6 rounded-10px space-y-5`}>
        <div className="flex flex-col space-y-5">
          {user?.id == details?.creator?.id &&
            user?.id == details?.owner?.id && (
              <div className="font-lato text-xs lg:text-sm text-center flex flex-col items-start space-y-1.5 text-primary-gray-1000">
                <p>
                  You <b>created</b> this task and you <b>own</b> it
                </p>
                <p
                  onClick={() => {
                    setTab("details");
                  }}
                  className="text-secondary-green-550 cursor-pointer hover:underline font-lato"
                >
                  Are you sure you don't want to delegate it?
                </p>
              </div>
            )}
          {user?.id == details?.owner?.id && (
            <div className="font-lato text-xs lg:text-sm text-center flex flex-col items-start space-y-1.5 text-primary-gray-1000">
              <p>
                You <b>own</b> this task
              </p>
              {/* {details?.students?.length > 0 ? (
                <p className="text-2xs lg:text-xs text-left">
                  You currently have {details?.length} collaborators on this
                  task
                </p>
              ) : (
                <p
                  onClick={() => {
                    setTab("details");
                  }}
                  className="text-secondary-green-550 cursor-pointer hover:underline font-lato"
                >
                  Add a collaborator -&gt;
                </p>
              )} */}
              {/* <p className="text-secondary-orange-550 cursor-pointer hover:underline font-lato">
              Contribute more ->
            </p> */}
            </div>
          )}
          {/* {details?.students?.map((i) => i?.id)?.includes(user?.id) && (
            <div className="font-lato text-xs lg:text-sm text-center flex flex-col items-start space-y-1.5 text-primary-gray-1000">
              <p>
                You are a <b>collaborator</b> on this task
              </p>
              <p className="text-2xs lg:text-xs text-left">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
              </p>
              <p className="text-secondary-orange-550 cursor-pointer hover:underline font-lato">
              Contribute more ->
            </p>
            </div>
          )} */}
          {details?.tShirtSize && details?.tShirtSize !== "R" && (
            <div className="font-lato text-xs lg:text-sm text-center flex flex-col items-start space-y-1.5 text-primary-gray-1000">
              <p>
                The T-shirt size of this task is <b>{details?.tShirtSize}</b>
              </p>
              <p className="text-2xs lg:text-xs text-left">
                This means that the task will take{" "}
                {details?.tShirtSize == "XS"
                  ? "less than a day"
                  : details?.tShirtSize == "S"
                  ? "a day"
                  : details?.tShirtSize == "M"
                  ? "3 days"
                  : details?.tShirtSize == "L"
                  ? "1 week"
                  : "2 weeks"}{" "}
                to complete
              </p>
              {/* <p className="text-secondary-orange-550 cursor-pointer hover:underline font-lato">
              Contribute more ->
            </p> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Insights;
