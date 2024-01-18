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
import { TaskStatus, TShirtSizes } from "helpers/task";
import DropdownInputForObject from "components/Comman/Inputs/DropdownInputForObject";
import SimpleRadioBoxesForObject from "components/Comman/Inputs/SimpleRadioBoxeForObject";
import ChronosButton from "components/Comman/Buttons";
import { getProjectName, ProjectTypes } from "helpers/projects";
import Toggle from "components/Comman/Inputs/Toggle";
import EmptyState from "components/Comman/EmptyState";
import { updateAddTask } from "redux/task";

const defaultValue = {
  title: "",
  dueDate: null,
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
  const dispatch = useDispatch();
  const selectedGoal = useSelector((state) => state?.tasks?.addTask);
  const [newTaskData, setNewTaskData] = useState({});
  const [typeList, setTypeList] = useState();
  const [fieldErrors, setFieldErrors] = useState({});
  const [creating, setCreating] = useState(false);
  const [iU, setIU] = useState({ important: "", urgent: "" });

  const [projectAll, setProjectAll] = useState(false);
  const [projectType, setProjectType] = useState("all");
  const [showStep, setShowStep] = useState(1);
  const user = useSelector((state) => state.user.user);
  const projects = useSelector((state) => state.user.projectsList);
  const squad = useSelector((state) => state.user.squadList);

  const setParams = () => {
    switch (iU?.important) {
      case "Important":
        switch (iU?.urgent) {
          case "Urgent":
            setNewTaskData({
              ...newTaskData,
              priority: 1,
              status: "InProgress",
              dueDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
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
              dueDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
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
      let obj = { ...myTask };
      if (myTask) {
        obj = { ...obj, ownerId: user?.id, owner: user };
      }
      if (project) {
        obj = { ...obj, projectId: project?.id, project: project };
      }
      if (goal) {
        obj = { ...obj, goalId: goal?.id, goal: goal };
      }
      if (story) {
        obj = { ...obj, story_id: story?.id, story: story };
      }
      if (selectedGoal && selectedGoal?.goalId !== null) {
        obj = { ...obj, ...selectedGoal };
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
      if (iU?.dueDate) {
        handleDateChange(iU?.dueDate);
      }
    }
    return () => {
      isMounted = false;
    };
  }, [iU?.dueDate]);

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
    setNewTaskData({ ...newTaskData, dueDate: date, dateValue: val });
  };

  const showSuccessNotification = (message) => {
    dispatch(showToast({ message }));
  };

  const showErrorNotification = (message) => {
    dispatch(showToast({ message, type: "error" }));
  };

  const handleCreate = async () => {
    if (!newTaskData.dueDate) {
      // let dueDate = { msg: "Please enter a dueDate!" };
      // setFieldErrors({ dueDate: { ...dueDate } });
      newTaskData.dueDate = new Date();
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
      moment(newTask?.dueDate).format("ll") ==
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
      closeModal();
      onCreate();
      setNewTaskData(defaultValue);
      setShowStep(1);
      let t = response?.data?.data;
      t["project"] = projects?.find((i) => i?.id == newTask?.projectId);
      dispatch(updateAddTask({ goal: null, refresh: true }));

      setNewTaskData(defaultValue);

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
          showErrorNotification("Validation Failed!");
      }
    }
    setCreating(false);
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
      <div className="modals-component md:max-w-xl lg:h-screen lg:pt-20 mx-auto w-full transform transition-all ease-in-out duration-150">
        <div className="flex flex-row items-end justify-between px-5 pt-5 rounded-t-20px">
          <h5
            className="font-lato font-bold text-sm text-primary-gray-1000 flex flex-col items-start"
            id="exampleModalLiveLabel"
          >
            Add New Task
          </h5>
          <p className="font-lato font-normal text-primary-gray-1000 text-sm">
            {showStep}/4
          </p>

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
              <p className="font-lato text-left font-normal text-2xs text-primary-gray-450">
                Type:{" "}
                <span className="text-primary-gray-1000">
                  {typeList?.find((a) => a?.id === newTaskData?.type_id)
                    ?.name || "NA"}
                </span>
              </p>

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
            {showStep === 4 && (
              <div className="space-y-2 w-1/2 items-end">
                {newTaskData?.dueDate && (
                  <p className="font-lato text-right font-normal text-xs text-primary-gray-450">
                    Due: {moment(newTaskData?.dueDate).format("ll")}
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
            )}
          </div>
        )}

        <div className="mt-3.5 flex w-full flex-col items-start space-y-5 h-auto transition-all ease-in-out duration-150">
          <div className="flex flex-col items-start w-full px-5">
            <label
              htmlFor="Title"
              className="text-2xs text-primary-gray-450 leading-3 mb-2.5 font-lato font-normal"
            >
              Title
            </label>
            <TextareaAutosize
              minRows={1}
              autoFocus={true}
              placeholder="What would you like to do?"
              style={{ fontSize: "16px" }}
              className="font-lato font-normal focus:outline-none focus:ring-transparent border-t-0 border-r-0 border-l-0 py-1.5 px-0 text-primary-gray-450 w-full border-b bg-transparent border-primary-gray-450 focus:border-primary-gray-450 placeholder:text-primary-gray-200"
              invalid={fieldErrors.title}
              value={newTaskData.title}
              onChange={(e) => {
                setNewTaskData({ ...newTaskData, title: e.target.value });
              }}
            />
            {fieldErrors?.title?.msg && (
              <p className="text-caarya-red-lighter text-2xs flex flex-row items-center mt-1 ml-0.5">
                {fieldErrors?.title?.msg}
              </p>
            )}
          </div>

          {showStep === 2 && (
            <>
              {/* <div className="flex w-full px-5 flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-5 md:space-x-5">
                <div className="w-full md:w-10/12">
                  {typeList ? (
                    <DropdownInputForObject
                      label="Type (optional)"
                      field="type_id"
                      details={newTaskData}
                      setDetails={setNewTaskData}
                      list={typeList?.map((item) => ({
                        value: item?.id,
                        label: item?.name,
                      }))}
                    />
                  ) : (
                    <DropdownInputForObject
                      label="Type (optional)"
                      field="type_id"
                      details={newTaskData}
                      setDetails={setNewTaskData}
                      list={[]?.map(() => ({
                        value: "",
                        label: "",
                      }))}
                    />
                  )}
                </div>
              </div>
              <div className="flex w-full px-5 flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-5 md:space-x-5">
                <div className="w-full md:w-10/12">
                  {projects ? (
                    <DropdownInputForObject
                      label="Project (optional)"
                      field="projectId"
                      details={newTaskData}
                      setDetails={setNewTaskData}
                      list={projects?.map((item) => ({
                        value: item?.id,
                        label: getProjectName(item),
                      }))}
                    />
                  ) : (
                    <DropdownInputForObject
                      label="Project (optional)"
                      field="projectId"
                      details={newTaskData}
                      setDetails={setNewTaskData}
                      list={[]?.map(() => ({
                        value: "",
                        label: "",
                      }))}
                    />
                  )}
                </div>
              </div> */}
              <div className="w-full px-5 py-2.5 font-lato">
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
                                        : "bg-white font-normal"
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

          {showStep === 3 && (
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
              <div className="px-5">
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
              <div className="px-5">
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

          {showStep === 4 && (
            <div className="w-full space-y-5 px-5">
              {!myTask && (
                <div className="flex flex-col items-start w-full">
                  <label
                    htmlFor="Owners"
                    className="text-2xs text-primary-gray-450 leading-3 mb-2.5 font-lato font-normal"
                  >
                    <b>Assign to</b> member
                  </label>
                  <div className="w-full">
                    <DropdownInputForObject
                      srOnly
                      field="ownerId"
                      details={newTaskData}
                      setDetails={setNewTaskData}
                      list={squad?.map((item) => ({
                        value: item?.id,
                        label: item?.first_name,
                      }))}
                    />
                  </div>
                  {/* <div className="flex flex-row flex-wrap items-center -ml-1">
                  {selectedStudents?.map((item) => {
                    return (
                      <div className="m-1 py-1 px-1.5 rounded-full flex flex-row items-center bg-primary-gray-60">
                        <img
                          src={
                            item?.image?.url || "/assets/images/defaultUser.svg"
                          }
                          alt="owner"
                          className="w-3 h-3 object-cover rounded-full"
                        />
                        <p className="font-lato mx-1.5 font-normal text-primary-gray-1000 text-2xs">
                          {item?.first_name}
                        </p>
                        <XIcon
                          onClick={() => {
                            let temp = selectedStudents || [];
                            temp = temp.filter((i) => i?.id !== item?.id);
                            setSelectedStudents(temp);
                          }}
                          className="w-3 h-3 text-primary-yellow-dark cursor-pointer"
                        />
                      </div>
                    );
                  })}

                  {selectedStudents?.length === 0 && (
                    <div
                      onClick={() => {
                        setMembersModal(true);
                      }}
                      className="m-1 py-1 bg-primary-gray-60 px-1.5 rounded-full flex flex-row items-center"
                    >
                      <img
                        src="/assets/images/defaultUser.svg"
                        alt="member"
                        className="w-3 h-3 object-cover rounded-full"
                      />
                      <p className="font-lato font-normal mx-1 text-primary-gray-1000 text-2xs">
                        Add Owner
                      </p>
                    </div>
                  )}
                  <PlusIcon
                    onClick={() => {
                      setMembersModal(true);
                    }}
                    className="w-3 h-3 ml-1.5 text-primary-yellow-dark cursor-pointer"
                  />
                </div> */}
                </div>
              )}
              <SimpleRadioBoxesForObject
                labelComponent={
                  <>
                    Select a <b>Tshirt</b> size
                  </>
                }
                maxItems={5}
                field="tShirtSize"
                details={newTaskData}
                setDetails={setNewTaskData}
                list={TShirtSizes.map((item) => ({
                  value: item,
                  label: item,
                }))}
              />

              {iU?.urgent === "Not Urgent" && (
                <SimpleRadioBoxesForObject
                  labelComponent={
                    <>
                      When do you want to be <b>reminded</b>?
                    </>
                  }
                  maxItems={4}
                  minItems={3}
                  field="dueDate"
                  details={iU}
                  setDetails={setIU}
                  list={["Today", "In 2 days", "In a week"].map((item) => ({
                    value: item,
                    label: item,
                  }))}
                />
              )}
            </div>
          )}
        </div>
        <div className="mt-8 flex w-full flex-row items-center justify-between px-5 pb-5">
          {showStep === 1 ? (
            <ChronosButton
              text="Quick Add +"
              secondary
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
          ) : (
            <ChevronLeftIcon
              onClick={() => {
                setShowStep(showStep - 1);
              }}
              className=" text-primary-yellow-darkest h-8 poppins font-normal text-sm cursor-pointer transform transition ease-in-out duration-150 hover:scale-105"
            />
          )}

          {showStep === 1 ? (
            <ChronosButton
              text="Add details"
              primary
              icon={<ChevronRightIcon className="w-4 h-4" />}
              onClick={() => {
                if (newTaskData?.title == "") {
                  setFieldErrors({
                    title: { msg: "Please enter the title!" },
                  });
                  return;
                }
                setShowStep(showStep + 1);
              }}
            />
          ) : showStep === 4 ? (
            <>
              <ChronosButton
                loader={creating}
                text="Add Task"
                primary
                icon={<ChevronRightIcon className="w-4 h-4" />}
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
                if (showStep == 3) {
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
