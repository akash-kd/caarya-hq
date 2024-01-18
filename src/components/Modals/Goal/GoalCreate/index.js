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
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { showToast } from "redux/toaster";
import { TaskStatus } from "helpers/task";
import ChronosButton from "components/Comman/Buttons";
import { getProjectName, ProjectTypes } from "helpers/projects";
import EmptyState from "components/Comman/EmptyState";
import * as GoalAPI from "config/APIs/task/goal";
import DateSelect from "components/Comman/Inputs/Date";
import DropdownInputForObject from "components/Comman/Inputs/DropdownInputForObject";

const defaultValue = {
  title: "",
  date: null,
  status: null,
};

function GoalCreate({ closeModal, isOpen, onCreate, project, goal, ownerId }) {
  const dispatch = useDispatch();
  const [newTaskData, setNewTaskData] = useState({});

  const [fieldErrors, setFieldErrors] = useState({});
  const [creating, setCreating] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [selectedProfiles, setSelectedProfiles] = useState([]);

  const [projectAll, setProjectAll] = useState(false);
  const [projectType, setProjectType] = useState("all");
  const [showStep, setShowStep] = useState(1);
  const projects = useSelector((state) => state.projects.list);
  const squad = useSelector((state) => state.user.squadList);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      let obj = {};

      if (project) {
        obj = { ...obj, projectId: project?.id, project: project };
      }
      if (ownerId) obj = { ...obj, ownerId: ownerId };

      setNewTaskData(obj);
      console.log(obj);
    }
    return () => {
      isMounted = false;
    };
  }, [isOpen, project, goal]);

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

    const { ...newTask } = newTaskData;

    if (!newTaskData?.status) {
      newTask["status"] = "NotStarted";
    }

    try {
      let body = {
        ...newTaskData,
      };

      const response = await GoalAPI.createGoal(body);

      closeModal();
      onCreate();
      setNewTaskData(defaultValue);
      setShowStep(1);
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
            Add New Goal
          </h5>
          <p className="font-lato font-normal text-primary-gray-1000 text-sm">
            {showStep}/3
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
              <p className="text-alert text-2xs flex flex-row items-center mt-1 ml-0.5">
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
                        <div className=" min-h-70vh max-h-70vh overflow-y-auto mt-1">
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
            <div className="w-full space-y-5 px-5">
              {!ownerId && (
                <div className="flex flex-col items-start w-full">
                  <label
                    htmlFor="Owners"
                    className="text-2xs text-primary-gray-450 leading-3 mb-2.5 font-lato font-normal"
                  >
                    <b>Assign to</b> owner
                  </label>
                  <div className="w-full">
                    <DropdownInputForObject
                      label="Owner"
                      field="ownerId"
                      srOnly
                      list={profiles
                        ?.filter?.((e) => e?.is_active)
                        ?.map((i) => ({
                          label: i?.first_name,
                          value: i?.id,
                          image: i?.image || {
                            url: "/assets/images/defaultUser.svg",
                          },
                        }))}
                      details={newTaskData}
                      setDetails={setNewTaskData}
                    />
                  </div>
                </div>
              )}
              <div className="flex flex-col items-start w-full">
                <label
                  htmlFor="Owners"
                  className="text-2xs text-primary-gray-450 leading-3 mb-2.5 font-lato font-normal"
                >
                  Due Date
                </label>
                <div className="w-full">
                  <DateSelect
                    details={newTaskData}
                    setDetails={setNewTaskData}
                    date={newTaskData?.dueDate}
                    setDate={(val) => {
                      setNewTaskData({ ...newTaskData, dueDate: val });
                    }}
                  />
                </div>
              </div>
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
          ) : showStep === 3 ? (
            <>
              <ChronosButton
                loader={creating}
                text="Add Goal"
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
                setShowStep(showStep + 1);
              }}
            />
          )}
        </div>
      </div>
    </Drawer>
  );
}

export default GoalCreate;
