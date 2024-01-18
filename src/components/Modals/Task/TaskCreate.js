import Drawer from "@mui/material/Drawer";
import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  XIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  CheckCircleIcon,
} from "@heroicons/react/solid";
import { PlusCircleIcon } from "@heroicons/react/outline";
import { Disclosure } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import * as TaskAPI from "config/APIs/task/task";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { showToast } from "redux/toaster";
import SimpleRadioBoxesForObject from "components/Comman/Inputs/SimpleRadioBoxeForObject";
import ChronosButton from "components/Comman/Buttons";
import { getProjectName, ProjectTypes } from "helpers/projects";
import * as GoalAPI from "config/APIs/task/goal";
import EmptyState from "components/Comman/EmptyState";
import { updateTasks, updateAddTask } from "redux/task";
import SimpleTextArea from "components/Comman/Inputs/SimpleTextArea";
import DropdownInput from "components/Comman/Inputs/DropdownInput";
import DateSelect from "components/Comman/Inputs/Date";
import { ArrowRight, Plus, TShirt, Target, X } from "@phosphor-icons/react";
import WideModalsWrapper from "../ModalsWrapper/WideModalWrapper";
import { TShirtSizes, TShirtSizesValues } from "helpers/task";

const defaultValue = {
  title: "",
  date: null,
  status: null,
};

function TaskCreateModal({
  closeModal,
  isOpen,
  onCreate,
  myTask,
  project,
  goal,
  story,
}) {
  const userList = useSelector((state) => state.user.squadList);
  const dispatch = useDispatch();
  const selectedGoal = useSelector((state) => state?.tasks?.addTask);
  const taskList = useSelector((state) => state?.tasks?.tasks);
  const [newTaskData, setNewTaskData] = useState(defaultValue);
  const [typeList, setTypeList] = useState();
  const [fieldErrors, setFieldErrors] = useState({});
  const [creating, setCreating] = useState(false);
  const [iU, setIU] = useState({ important: "", urgent: "" });
  const [goals, setGoals] = useState([]);
  const [projectAll, setProjectAll] = useState(false);
  const [openMembersModal, setOpenMembersModal] = useState(false);
  const [projectType, setProjectType] = useState("all");
  const [showStep, setShowStep] = useState(1);
  const user = useSelector((state) => state.user.user);
  const projects = useSelector((state) => state.user.projectsList);
  const squad = useSelector((state) => state.user.squadList);
  const [isHovering, setIsHovering] = useState(false);
  const [showText, setShowText] = useState(false);

  const setParams = () => {
    switch (iU?.important) {
      case "Important":
        switch (iU?.urgent) {
          case "Urgent":
            setNewTaskData({
              ...newTaskData,
              priority: 1,
              status: "InProgress",
              date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
              dateValue: "Tomorrow",
            });

            setNewTaskData({ ...newTaskData, ownerId: user?.id });
            break;
          case "Not Urgent":
            setNewTaskData({
              ...newTaskData,
              priority: 3,
              status: "InProgress",
            });

            setNewTaskData({ ...newTaskData, ownerId: user?.id });
            break;
          default:
            return;
        }
        break;
      case "Not Important":
        switch (iU?.urgent) {
          case "Urgent":
            setNewTaskData({
              ...newTaskData,
              priority: 2,
              status: "InProgress",
              date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
              dateValue: "Tomorrow",
            });
            break;
          case "Not Urgent":
            setNewTaskData({
              ...newTaskData,
              priority: 4,
              status: "NotStarted",
            });
            break;
          default:
            return;
        }
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      let obj = { ...newTaskData };
      if (myTask) {
        obj = { ...obj, ownerId: user?.id, owner: user };
      }
      if (project) {
        obj = { ...obj, projectId: project?.id, project: project };
      }
      if (goal) {
        obj = { ...obj, goalId: goal?.id, goal: goal };
      } else if (selectedGoal && selectedGoal?.goalId !== null) {
        obj = { ...obj, ...selectedGoal };
      }
      if (story) {
        obj = { ...obj, story_id: story?.id, story: story };
      }

      setNewTaskData(obj);
      console.log(obj);
    }
    return () => {
      isMounted = false;
    };
  }, [isOpen, myTask, project, goal, story, selectedGoal]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if (newTaskData?.projectId && isOpen) {
        fetchAllGoals();
      }
    }

    return () => {
      isMounted = false;
    };
  }, [isOpen, newTaskData?.projectId]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (showStep == 3) {
        setParams();
      }
    }
    return () => {
      isMounted = false;
    };
  }, [iU]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (iU?.date) {
        handleDateChange(iU?.date);
      }
    }
    return () => {
      isMounted = false;
    };
  }, [iU?.date]);

  const handleDateChange = (val) => {
    let date = new Date();
    switch (val) {
      case "Tomorrow":
        date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        break;
      case "In 2 days":
        date = new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000);
        break;
      case "In a week":
        date = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);
        break;
      default:
        date = new Date();
    }
    setNewTaskData({ ...newTaskData, date: date, dateValue: val });
  };

  const showSuccessNotification = (message) => {
    dispatch(showToast({ message }));
  };

  const showErrorNotification = (message) => {
    dispatch(showToast({ message, type: "error" }));
  };

  const handleCreate = async () => {
    if (!newTaskData.date) {
      // let date = { msg: "Please enter a date!" };
      // setFieldErrors({ date: { ...date } });
      newTaskData.date = new Date();
    }
    if (newTaskData?.title == "") {
      setFieldErrors({ title: { msg: "Please enter the title!" } });
      return;
    }

    setCreating(true);

    const { type, ...newTask } = newTaskData;

    newTask["type_id"] = type?.id;

    if (!newTaskData?.status) {
      newTask["status"] = "NotStarted";
    }

    if (
      moment(newTask?.date).format("ll") ==
        moment().add(1, "days").format("ll") &&
      (!newTask?.tShirtSize || newTask.tShirtSize == "")
    ) {
      newTask["tShirtSize"] = "S";
    }
    try {
      let body = {
        ...newTask,
      };

      const response = await TaskAPI.createTasks(body);

      let t = response?.data?.data;
      t["project"] = projects?.find((i) => i?.id == newTask?.projectId);
      dispatch(updateAddTask({ goal: null, refresh: true }));
      let allTasks = taskList.concat([newTaskData]);
      dispatch(updateTasks({ tasks: allTasks }));
      setNewTaskData(defaultValue);
      closeModal();
      onCreate();
      setNewTaskData(defaultValue);
      setShowStep(1);
      showSuccessNotification("Task created successfully!");
    } catch (err) {
      console.log("Error", err);
      switch (err.response?.status) {
        case 422:
          let error = {},
            { data } = err.response.data;
          for (let key of Object.keys(data)) {
            if (key.split(".")[0] === "task")
              error[key.split(".")[1]] = data[key];
          }
          setFieldErrors(error);
          break;
        case 401:
          console.log(err?.response);
          showErrorNotification(err.response?.data?.message);
          break;
        default:
          showErrorNotification(err.response?.data?.message);
      }
    }
    setCreating(false);
  };

  const fetchAllGoals = async () => {
    try {
      let query = {};
      if (newTaskData?.projectId) {
        query["projectId"] = newTaskData?.projectId;
      }
      const response = await GoalAPI.getAllGoals(query);
      const fetchedGoals = response.data.data?.response || []; // TODO: Pagination if needed
      setGoals(fetchedGoals);
    } catch (err) {
      console.log("FetchAllGoals error", err);
    }
  };

  return (
    <Drawer
      anchor={window.innerWidth < 1024 ? "bottom" : "right"}
      PaperProps={{
        style: {
          borderRadius: window.innerWidth < 1024 ? "20px 20px 0px 0px" : "0px",
          maxHeight: "100vh",
          width: window.innerWidth < 1024 ? "100%" : "560px",
        },
      }}
      open={isOpen}
      onClose={() => {
        closeModal();
        setNewTaskData(defaultValue);
        setShowStep(1);
      }}
      transitionDuration={250}
    >
      <div className="bg-white md:max-w-xl lg:h-screen lg:pt-[1vh] mx-auto w-full transform transition-all ease-in-out duration-150">
        <div className="flex flex-row items-end justify-between px-5 pt-5 rounded-t-20px">
          <h5
            className="font-lato font-bold text-sm text-primary-gray-1000 flex flex-col items-start"
            id="exampleModalLiveLabel"
          >
            Add New Task
          </h5>
          {/* <p className="font-lato font-normal text-primary-gray-1000 text-sm">
            {showStep}/5
          </p> */}

          <button
            aria-label="Close"
            type="button"
            onClick={() => {
              closeModal();
              setNewTaskData(defaultValue);
              setShowStep(1);
            }}
          >
            <XIcon className="h-6 w-6 text-primary-gray-1000" />
          </button>
        </div>
        {showStep !== 1 && (
          <div className="flex flex-row items-stretch justify-between px-5 mt-2.5">
            <div className="space-y-2 w-1/2">
              {/* <p className="font-lato text-left font-normal text-2xs text-primary-gray-450">
                Type:{" "}
                <span className="text-primary-gray-1000">
                  {typeList?.find((a) => a?.id === newTaskData?.type_id)
                    ?.name || "NA"}
                </span>
              </p> */}

              {newTaskData?.projectId && (
                <p className="font-lato font-normal text-sm text-primary-gray-1000 flex flex-row items-center">
                  <img
                    src={
                      newTaskData?.projectId
                        ? projects?.find(
                            (a) => a?.id === newTaskData?.projectId
                          )?.image?.url || "/assets/images/icons/rocket.png"
                        : "/assets/images/icons/rocket.png"
                    }
                    alt=""
                    className="h-5 w-5 rounded mr-1.5"
                  />
                  {
                    projects?.find((a) => a?.id === newTaskData?.projectId)
                      ?.title
                  }
                </p>
              )}
            </div>
            {/* {showStep === 4 && (
              <div className="space-y-2 w-1/2 items-end">
                {newTaskData?.date && (
                  <p className="font-lato text-right font-normal text-xs text-primary-gray-450">
                    Due: {moment(newTaskData?.date).format("ll")}
                  </p>
                )}
                <div className="w-full flex flex-row items-center justify-end">
                  <div className={`status-dark-${newTaskData?.status}`}>
                    {
                      TaskStatus.find((e) => e?.value === newTaskData?.status)
                        ?.label
                    }
                  </div>
                </div>
              </div>
            )} */}
          </div>
        )}

        <div className="mt-3.5 flex w-full flex-col items-start px-5 space-y-5 h-auto transition-all ease-in-out duration-150">
          <div className="flex flex-col items-start w-full">
            <label
              htmlFor="Title"
              className="text-sm text-primary-gray-1000 leading-3 mb-2.5 font-lato font-normal"
            >
              Title
            </label>
            <TextareaAutosize
              minRows={1}
              autoFocus={true}
              placeholder="What would you like to do?"
              style={{ fontSize: "24px" }}
              className="font-lato font-bold focus:outline-none focus:ring-transparent border-t-0 border-r-0 border-l-0 py-1.5 px-0 text-black w-full border-b bg-transparent border-primary-gray-450 focus:border-primary-gray-450 placeholder:text-primary-gray-200"
              invalid={fieldErrors?.title}
              value={newTaskData?.title}
              onChange={(e) => {
                setNewTaskData({ ...newTaskData, title: e.target.value });
                setFieldErrors();
              }}
            />
            {fieldErrors?.title?.msg && (
              <p className="text-caarya-red-lighter text-2xs flex flex-row items-center mt-1 ml-0.5">
                {fieldErrors?.title?.msg}
              </p>
            )}
          </div>

          {showStep == 1 && (
            <>
              <SimpleTextArea
                label="Task Description"
                field="description"
                details={newTaskData}
                setDetails={setNewTaskData}
              />
              {project && (
                <div className="w-full">
                  <div className="input-label mb-0.5">Associated Project</div>
                  <div className="bg-primary-gray-200 text-xs font-lato w-full px-2 py-1 rounded-[3px]">
                    {project?.title}
                  </div>
                </div>
              )}
              {goal && (
                <div className="w-full">
                  <div className="input-label mb-0.5">Associated Goal</div>
                  <div className="bg-primary-gray-200 text-xs font-lato w-full px-2 py-1 rounded-[3px]">
                    {goal?.title}
                  </div>
                </div>
              )}
              {story && (
                <div className="w-full">
                  <div className="input-label mb-0.5">Associated Story</div>
                  <div className="bg-primary-gray-200 text-xs font-lato w-full px-2 py-1 rounded-[3px]">
                    {story?.title}
                  </div>
                </div>
              )}
              <div className="w-full flex flex-col space-y-5 lg:space-y-0 lg:space-x-2.5 lg:flex-row items-stretch justify-between">
                {!myTask && (
                  <div className="w-full lg:w-1/2">
                    <div className="input-label mb-0.5">Owner</div>
                    <DropdownInput
                      list={[user].concat(userList)?.map((i) => ({
                        label: i?.first_name,
                        value: i?.id,
                        image: i?.image || {
                          url: "/assets/images/defaultUser.svg",
                        },
                      }))}
                      value={newTaskData?.ownerId}
                      setValue={(val) => {
                        setNewTaskData({
                          ...newTaskData,
                          ownerId: val,
                          owner: [user]
                            .concat(userList)
                            ?.find((i) => i?.id == val),
                        });
                      }}
                    />
                  </div>
                )}

                {/* {newTaskData?.ownerId == user?.id && (
                  <div className={myTask ? "w-full" : "w-full lg:w-1/2"}>
                    <div className="input-label mb-0.5">
                      Choose Collaborators
                    </div>
                    <div className="w-full flex flex-row items-center flex-wrap -ml-1">
                      {userList?.map((item) => {
                        return (
                          <div
                            onClick={() => {
                              let s = newTaskData?.students
                                ? [...newTaskData.students]
                                : [];
                              if (s?.find((i) => i?.id == item?.id)) {
                                s = s?.filter((i) => i?.id !== item?.id);
                              } else {
                                s.push(
                                  userList?.find((i) => i?.id == item?.id)
                                );
                              }

                              setNewTaskData({ ...newTaskData, students: s });
                            }}
                            className={`flex flex-row px-1.5 py-0.5 m-1 rounded-full items-center cursor-pointer min-w-max space-x-1.5 text-primary-yellow-darkest ${
                              newTaskData?.students?.find(
                                (u) => u?.id == item?.id
                              )
                                ? "bg-primary-yellow-lighter"
                                : "bg-primary-gray-200"
                            }`}
                          >
                            <img
                              src={
                                item?.image?.url ||
                                "/assets/images/defaultUser.svg"
                              }
                              className="rounded-full h-5 w-5"
                              alt=""
                            />

                            <span className="text-xs font-lato">
                              {item?.first_name}
                            </span>

                            {newTaskData?.students?.find(
                              (u) => u?.id == item?.id
                            ) && <X size={12} />}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )} */}
              </div>
              <div className="w-full lg:w-1/2">
                <div className="input-label mb-0.5">Assign a Due Date</div>
                <DateSelect
                  date={newTaskData?.date}
                  type={"task"}
                  setDate={(val) => {
                    setNewTaskData({ ...newTaskData, date: val });
                  }}
                />
              </div>
              <div className="w-full">
                <div className="input-label mb-0.5">Assign a T-shirt Size</div>
                <div className="flex flex-row items-stretch space-x-3 h-[35px]">
                  {TShirtSizesValues?.map((item) => {
                    return (
                      <div
                        key={item.value}
                        className="flex flex-row items-center group"
                      >
                        <div
                          onMouseOver={() => {
                            setIsHovering(true);
                            setShowText(item?.value);
                          }}
                          onMouseOut={() => {
                            setIsHovering(false);
                          }}
                          className="relative cursor-pointer"
                          key={item?.size}
                          onClick={() => {
                            setNewTaskData({
                              ...newTaskData,
                              tShirtSize: item?.size,
                            });
                          }}
                        >
                          <TShirt
                            className="w-8 h-8"
                            color={
                              newTaskData?.tShirtSize == item?.size
                                ? "#EDD486"
                                : "black"
                            }
                            weight={
                              newTaskData?.tShirtSize == item?.size
                                ? "fill"
                                : "thin"
                            }
                          />
                          <span className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-3xs">
                            {item?.size}
                          </span>
                        </div>
                      </div>
                    );
                  })}

                  <div
                    className={`flex flex-row items-center h-full ${
                      isHovering ? "ml-1 opacity-100" : "opacity-0"
                    }`}
                  >
                    <p className="text-2xs text-black font-lato">{showText}</p>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div className="input-label mb-0.5">Assign a Priority</div>
                <div className="flex flex-row items-stretch space-x-3">
                  {[1, 2, 3, 4, 5, 6]?.map((t) => {
                    return (
                      <div
                        key={t}
                        onClick={() => {
                          setNewTaskData({ ...newTaskData, priority: t });
                        }}
                        className={`${
                          newTaskData?.priority == t
                            ? `priority-dark-${t}`
                            : `priority-dark-${t}`
                        } PriorityDropdownItem text-center cursor-pointer flex items-center justify-center`}
                      >
                        {newTaskData?.priority == t && (
                          <img
                            src="/assets/svg/icon/fire.svg"
                            className="h-3 PriorityDropdownItem mr-0.5"
                          />
                        )}
                        P{t}
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {showStep === 2 && (
            <>
              <div className="w-full  py-2.5 font-lato">
                <Disclosure defaultOpen>
                  {({ open }) => (
                    <>
                      <div className="w-full flex flex-row items-center justify-between">
                        <div className="flex flex-row items-center justify-between">
                          <p className="font-lato font-normal text-xs text-primary-gray-1000">
                            Choose a <b>Project</b>
                          </p>
                          <Disclosure.Button>
                            <ChevronDownIcon
                              className={`h-4 w-4 transform text-primary-gray-1000 ${
                                open ? "-rotate-180" : "rotate-0"
                              }`}
                              aria-hidden="true"
                            />
                          </Disclosure.Button>
                        </div>
                        {/* <div className="flex flex-row items-center justify-end">
                          {open && (
                            <Toggle
                              enabled={projectAll}
                              setEnabled={setProjectAll}
                              label="View All"
                              labelLeft
                            />
                          )}
                        </div> */}
                      </div>
                      <Disclosure.Panel className="w-full mt-5 space-y-5 ">
                        {newTaskData?.projectId && (
                          <div className="w-full flex flex-row">
                            <div className="flex flex-row items-center justify-between rounded-md p-1.5 bg-primary-yellow-lightest">
                              <div className="flex flex-row items-center justify-between mr-2.5">
                                <img
                                  src={
                                    projects?.find(
                                      (p) => p?.id === newTaskData?.projectId
                                    )?.image?.url ||
                                    "/assets/images/icons/rocket.png"
                                  }
                                  alt=""
                                  className="h-5 w-5 mr-1.5"
                                />
                                <p className="text-primary-gray-1000 inter text-sm">
                                  {
                                    projects?.find(
                                      (p) => p?.id === newTaskData?.projectId
                                    )?.title
                                  }
                                </p>
                              </div>
                              <XIcon
                                onClick={() => {
                                  setNewTaskData({
                                    ...newTaskData,
                                    projectId: null,
                                    project: null,
                                  });
                                }}
                                className={`h-3 w-3 transform text-primary-yellow-lighter`}
                                aria-hidden="true"
                              />
                            </div>
                          </div>
                        )}
                        {projectAll && (
                          <div className="overflow-x-auto">
                            <div className="flex flex-row items-center justify-between space-x-5 min-w-max">
                              <div
                                onClick={() => {
                                  setProjectType("all");
                                }}
                                key={"all"}
                                className=""
                              >
                                <div
                                  className={`flex flex-row cursor-pointer text-sm py-1 text-primary-gray-1000 font-lato items-end justify-center text-center ${
                                    projectType == "all"
                                      ? "px-2 rounded-full bg-primary-yellow-lighter font-medium"
                                      : "font-normal"
                                  }`}
                                >
                                  All
                                </div>
                              </div>
                              {ProjectTypes?.map((item) => {
                                return (
                                  <div
                                    onClick={() => {
                                      setProjectType(item?.value);
                                    }}
                                    key={item?.value}
                                    className=""
                                  >
                                    <div
                                      className={`flex flex-row cursor-pointer text-sm py-1 text-primary-gray-1000 font-lato items-end justify-center text-center ${
                                        projectType == item?.value
                                          ? "px-2 rounded-full bg-primary-yellow-lighter font-medium"
                                          : "font-normal"
                                      }`}
                                    >
                                      {item?.label?.replace("Projects", "")}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                        <div className=" min-h-40vh max-h-40vh overflow-y-auto mt-1">
                          <div className="grid grid-cols-2 gap-5">
                            {projects?.map((p) => {
                              if (
                                !projectAll ||
                                projectType == "all" ||
                                (projectType !== "all" &&
                                  p?.type == projectType)
                              )
                                return (
                                  <div
                                    key={p}
                                    onClick={() => {
                                      setNewTaskData({
                                        ...newTaskData,
                                        projectId: p?.id,
                                        project: p,
                                      });
                                    }}
                                    className={`flex flex-col items-center rounded-10px relative p-2.5 w-full  ${
                                      projects?.find(
                                        (p) => p?.id === newTaskData?.projectId
                                      )?.id === p?.id
                                        ? "bg-primary-yellow-lightest font-bold"
                                        : "bg-primary-ash-200 font-normal"
                                    }`}
                                  >
                                    <CheckCircleIcon
                                      className={`h-5 w-5 absolute top-3 right-3 components-cards-task-checkcircle ${
                                        projects?.find(
                                          (p) =>
                                            p?.id === newTaskData?.projectId
                                        )?.id === p?.id
                                          ? "visible"
                                          : "invisible"
                                      }`}
                                    />
                                    <PlusCircleIcon
                                      className={` text-primary-gray-350 h-5 w-5 absolute top-3 right-3 ${
                                        projects?.find(
                                          (p) =>
                                            p?.id === newTaskData?.projectId
                                        )?.id === p?.id
                                          ? "invisible"
                                          : "visible"
                                      }`}
                                    />
                                    <img
                                      className="h-9 w-9 rounded object-cover"
                                      src={
                                        p?.image?.url ||
                                        "/assets/images/icons/rocket.png"
                                      }
                                      alt=""
                                    />
                                    <p className="font-lato text-sm text-center line-clamp-2 text-primary-gray-1000 mt-2.5">
                                      {getProjectName(p)}
                                    </p>
                                  </div>
                                );
                            })}
                            {projects?.filter(
                              (p) =>
                                !projectAll ||
                                projectType == "all" ||
                                (projectType !== "all" &&
                                  p?.type == projectType)
                            )?.length == 0 && (
                              <div className="col-span-2">
                                <EmptyState
                                  text="No projects found!"
                                  image="/assets/images/icons/rocket.png"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
            </>
          )}

          {showStep == 3 && (
            <>
              <div className="w-full py-2.5 font-lato">
                <Disclosure defaultOpen>
                  {({ open }) => (
                    <>
                      <div className="w-full flex flex-row items-center justify-between">
                        <div className="flex flex-row items-center justify-between">
                          <p className="font-lato font-normal text-xs text-primary-gray-1000">
                            Choose a <b>Goal</b>
                          </p>
                          <Disclosure.Button>
                            <ChevronDownIcon
                              className={`h-4 w-4 transform text-primary-gray-1000 ${
                                open ? "-rotate-180" : "rotate-0"
                              }`}
                              aria-hidden="true"
                            />
                          </Disclosure.Button>
                        </div>
                      </div>
                      <Disclosure.Panel className="w-full mt-5 space-y-5 ">
                        {newTaskData?.goalId && (
                          <div className="w-full flex flex-row">
                            <div className="flex flex-row items-center justify-between rounded-md p-1.5 bg-primary-yellow-lightest">
                              <div className="flex flex-row items-center justify-between mr-2.5">
                                <img
                                  src={
                                    goals?.find(
                                      (p) => p?.id === newTaskData?.goalId
                                    )?.image?.url ||
                                    "/assets/images/icons/rocket.png"
                                  }
                                  alt=""
                                  className="h-5 w-5 mr-1.5"
                                />
                                <p className="text-primary-gray-1000 inter text-sm">
                                  {
                                    goals?.find(
                                      (p) => p?.id === newTaskData?.goalId
                                    )?.title
                                  }
                                </p>
                              </div>
                              <XIcon
                                onClick={() => {
                                  setNewTaskData({
                                    ...newTaskData,
                                    goalId: null,
                                    goal: null,
                                  });
                                }}
                                className={`h-3 w-3 transform text-primary-yellow-lighter`}
                                aria-hidden="true"
                              />
                            </div>
                          </div>
                        )}

                        <div className=" min-h-40vh max-h-40vh overflow-y-auto mt-1">
                          <div className="grid grid-cols-2 gap-5">
                            {goals?.map((p) => {
                              return (
                                <div
                                  key={p}
                                  onClick={() => {
                                    setNewTaskData({
                                      ...newTaskData,
                                      goalId: p?.id,
                                      goal: p,
                                    });
                                  }}
                                  className={`flex flex-col items-center rounded-10px relative p-2.5 w-full  ${
                                    goals?.find(
                                      (p) => p?.id === newTaskData?.goalId
                                    )?.id === p?.id
                                      ? "bg-primary-yellow-lightest font-bold"
                                      : "bg-primary-ash-200 font-normal"
                                  }`}
                                >
                                  <CheckCircleIcon
                                    className={`h-5 w-5 absolute top-3 right-3 components-cards-task-checkcircle ${
                                      goals?.find(
                                        (p) => p?.id === newTaskData?.goalId
                                      )?.id === p?.id
                                        ? "visible"
                                        : "invisible"
                                    }`}
                                  />
                                  <PlusCircleIcon
                                    className={` text-primary-gray-350 h-5 w-5 absolute top-3 right-3 ${
                                      goals?.find(
                                        (p) => p?.id === newTaskData?.goalId
                                      )?.id === p?.id
                                        ? "invisible"
                                        : "visible"
                                    }`}
                                  />
                                  <Target className="h-9 w-9 rounded object-cover text-primary-gray-1000 " />
                                  <p className="font-lato text-sm text-center line-clamp-2 text-primary-gray-1000 mt-2.5">
                                    {p?.title}
                                  </p>
                                </div>
                              );
                            })}
                            {goals?.length == 0 && (
                              <div className="col-span-2">
                                <EmptyState
                                  text="No projects found!"
                                  image="/assets/images/icons/rocket.png"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
            </>
          )}

          {showStep === 4 && (
            <div className="w-full space-y-5">
              <div className="w-full px-5 py-2.5 bg-primary-gray-80">
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="w-full flex flex-row items-center justify-between">
                        <p className="font-lato font-normal text-xs text-primary-gray-600">
                          How does{" "}
                          <b>
                            <u>Importance</u>
                          </b>{" "}
                          &{" "}
                          <b>
                            <u>Urgency</u>
                          </b>{" "}
                          work?
                        </p>
                        <ChevronDownIcon
                          className={`h-6 w-6 transform text-primary-gray-600 ${
                            open ? "-rotate-180" : "rotate-0"
                          }`}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="w-full mt-4 gap-6 grid grid-cols-2">
                        <div className="flex flex-col">
                          <h1 className="font-lato text-xs text-primary-gray-450 font-normal text-left mb-0.5">
                            Important & Urgent
                          </h1>
                          <div
                            style={{
                              background: "#DB2B39",
                              boxShadow: "0px 0px 10px 3px rgba(0, 0, 0, 0.07)",
                            }}
                            className="text-white text-2xs font-lato px-2 py-0.5 rounded-full max-w-max mb-1"
                          >
                            Do
                          </div>
                          <p className="font-lato text-2xs text-primary-gray-450 font-normal text-left">
                            Priority:<b> P1</b>
                            <br />
                            Status:<b> In Progress</b>
                            <br />
                            Assigned to:<b> You</b>
                            <br />
                            Due:<b> Tomorrow</b>
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <h1 className="font-lato text-xs text-primary-gray-450 font-normal text-left mb-0.5">
                            Not Important but Urgent
                          </h1>
                          <div
                            style={{
                              background: "#BA7507",
                              boxShadow: "0px 0px 10px 3px rgba(0, 0, 0, 0.07)",
                            }}
                            className="text-white text-2xs font-lato px-2 py-0.5 rounded-full max-w-max mb-1"
                          >
                            Defer
                          </div>
                          <p className="font-lato text-2xs text-primary-gray-450 font-normal text-left">
                            Priority:<b> P2</b>
                            <br />
                            Status:<b> In Progress</b>
                            <br />
                            Assigned To:<b> Your</b>
                            Team
                            <br />
                            Due on:<b> Tomorrow</b>
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <h1 className="font-lato text-xs text-primary-gray-450 font-normal text-left mb-0.5">
                            Important but Not Urgent
                          </h1>
                          <div
                            style={{
                              background: "#C44900",
                              boxShadow: "0px 0px 10px 3px rgba(0, 0, 0, 0.07)",
                            }}
                            className="text-white text-2xs font-lato px-2 py-0.5 rounded-full max-w-max mb-1"
                          >
                            Delegate
                          </div>
                          <p className="font-lato text-2xs text-primary-gray-450 font-normal text-left">
                            Priority:<b> P3</b>
                            <br />
                            Status:<b> In Progress</b>
                            <br />
                            Assigned To:<b> You</b>
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <h1 className="font-lato text-xs text-primary-gray-450 font-normal text-left mb-0.5">
                            Not Important & Not Urgent
                          </h1>
                          <div
                            style={{
                              background: "#373739",
                              boxShadow: "0px 0px 10px 3px rgba(0, 0, 0, 0.07)",
                            }}
                            className="text-white text-2xs font-lato px-2 py-0.5 rounded-full max-w-max mb-1"
                          >
                            Postpone
                          </div>
                          <p className="font-lato text-2xs text-primary-gray-450 font-normal text-left">
                            Priority:<b> P4</b>
                            <br />
                            Status:<b> Not Started</b>
                          </p>
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
              <div>
                <SimpleRadioBoxesForObject
                  labelComponent={<>Is it important?</>}
                  maxItems={2}
                  minItems={2}
                  field="important"
                  details={iU}
                  setDetails={setIU}
                  list={["Important", "Not Important"].map((item) => ({
                    value: item,
                    label: item,
                  }))}
                />
                {fieldErrors?.important?.msg && (
                  <p className="text-caarya-red-lighter text-2xs flex flex-row items-center mt-1 ml-0.5">
                    {fieldErrors?.important?.msg}
                  </p>
                )}
              </div>
              <div>
                <SimpleRadioBoxesForObject
                  labelComponent={<>Is it urgent?</>}
                  maxItems={2}
                  minItems={2}
                  field="urgent"
                  details={iU}
                  setDetails={setIU}
                  list={["Urgent", "Not Urgent"].map((item) => ({
                    value: item,
                    label: item,
                  }))}
                />{" "}
                {fieldErrors?.urgent?.msg && (
                  <p className="text-caarya-red-lighter text-2xs flex flex-row items-center mt-1 ml-0.5">
                    {fieldErrors?.urgent?.msg}
                  </p>
                )}
              </div>
            </div>
          )}

          {showStep === 5 && (
            <div className="w-full space-y-5">
              {!myTask && (
                <div className="flex flex-col items-start w-full">
                  <label
                    htmlFor="Owners"
                    className="text-2xs text-primary-gray-450 leading-3 mb-2.5 font-lato font-normal"
                  >
                    <b>Assign to</b> member
                  </label>
                  <DropdownInput
                    list={[user].concat(userList)?.map((i) => ({
                      label: i?.first_name,
                      value: i?.id,
                      image: i?.image || {
                        url: "/assets/images/defaultUser.svg",
                      },
                    }))}
                    value={newTaskData?.ownerId}
                    setValue={(val) => {
                      setNewTaskData({
                        ...newTaskData,
                        ownerId: val,
                        owner: [user]
                          .concat(userList)
                          ?.find((i) => i?.id == val),
                      });
                    }}
                  />
                </div>
              )}
              {/* <div className="w-full">
                <div className="input-label mb-0.5">Assign a T-shirt Size</div>
                <div className="flex flex-row items-stretch space-x-3 h-[35px]">
                  {TShirtSizes?.map((t) => {
                    return (
                      <div
                        className="relative cursor-pointer"
                        key={t}
                        onClick={() => {
                          setNewTaskData({ ...newTaskData, tShirtSize: t });
                        }}
                      >
                        <TShirt className="w-8 h-8" />
                        <span className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-3xs">
                          {t}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div> */}

              {iU?.urgent === "Not Urgent" && (
                <div className="w-full lg:w-1/2">
                  <div className="input-label mb-0.5">Assign a Due Date</div>
                  <DateSelect
                    date={newTaskData?.date}
                    type={"task"}
                    setDate={(val) => {
                      setNewTaskData({ ...newTaskData, date: val });
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
        <div className="mt-8 flex w-full flex-row items-center justify-between px-5 pb-5">
          {showStep === 1 ? (
            <ChronosButton
              text="Guided Assistance"
              icon={<ArrowRight size={16} className="ml-1" />}
              primary
              purple
              onClick={() => {
                // if (newTaskData?.title == "" || !newTaskData?.title) {
                //   setFieldErrors({
                //     title: { msg: "Please enter the title!" },
                //   });
                //   return;
                // }

                if (project && goal) setShowStep(4);
                else if (project) setShowStep(3);
                else setShowStep(showStep + 1);
              }}
            />
          ) : (
            <ChevronLeftIcon
              onClick={() => {
                setShowStep(showStep - 1);
              }}
              className=" text-primary-ash-500 h-8 poppins font-normal text-sm cursor-pointer transform transition ease-in-out duration-150 hover:scale-105"
            />
          )}

          {showStep === 1 ? (
            <ChronosButton
              loader={creating}
              text="Add Task"
              primary
              icon={<Plus size={16} className="ml-1" />}
              onClick={() => {
                if (newTaskData?.title == "") {
                  setFieldErrors({
                    title: { msg: "Please enter the title!" },
                  });
                  return;
                }
                handleCreate();
              }}
            />
          ) : showStep === 5 ? (
            <>
              <ChronosButton
                loader={creating}
                text="Add Task"
                icon={<Plus size={16} className="ml-1" />}
                primary
                onClick={() => {
                  handleCreate();
                }}
              />
            </>
          ) : (
            <ChronosButton
              text="Continue"
              primary
              icon={<ChevronRightIcon className="w-4 h-4" />}
              onClick={() => {
                if (showStep == 4) {
                  let obj = {};
                  if (!iU?.important) {
                    obj["important"] = {
                      msg: "Please select how important it is!",
                    };
                  }
                  if (!iU?.urgent) {
                    obj["urgent"] = {
                      msg: "Please select how urgent it is!",
                    };
                  }
                  if (Object.keys(obj)?.length > 0) {
                    setFieldErrors(obj);
                    return;
                  }
                }
                setShowStep(showStep + 1);
              }}
            />
          )}
        </div>
      </div>
    </Drawer>
  );
}

export default TaskCreateModal;
