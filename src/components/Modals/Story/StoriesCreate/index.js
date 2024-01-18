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
import ChronosButton from "components/Comman/Buttons";
import Toggle from "components/Comman/Inputs/Toggle";
import EmptyState from "components/Comman/EmptyState";
import * as StoriesAPI from "config/APIs/task/stories";

import * as EpicsAPI from "config/APIs/task/epics";

import DropdownInputForMultipleSelect from "components/Comman/Inputs/DropdownForMultipleSelect";
import DateSelect from "components/Comman/Inputs/Date";
const defaultValue = {
  title: "",
  date: null,
  status: null,
};

function StoryCreate({
  closeModal,
  isOpen,
  onCreate,
  onUpdate,
  editValues,
  goal,
  project,
  epic,
}) {
  const dispatch = useDispatch();
  const [newTaskData, setNewTaskData] = useState(defaultValue);

  const [fieldErrors, setFieldErrors] = useState({});
  const [creating, setCreating] = useState(false);

  const [showStep, setShowStep] = useState(1);
  const projects = useSelector((state) => state.user.projectsList);
  const squad = useSelector((state) => state.user.squadList);

  const [focusTitle, setFocusTitle] = useState(isOpen);
  const [epics, setEpics] = useState([]);

  const [profiles, setProfiles] = useState([]);
  const [selectedProfiles, setSelectedProfiles] = useState([]);

  // Assigning Goal
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setNewTaskData((state) => ({ ...state, goal, goal_id: goal?.id }));
    }
    return () => {
      isMounted = false;
    };
  }, [goal]);
  // Assigning Epic
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setNewTaskData((state) => ({ ...state, epic, epic_id: epic?.id }));
    }
    return () => {
      isMounted = false;
    };
  }, [epic]);
  // Assigning Project
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setNewTaskData((state) => ({ ...state, project_id: project?.id }));
    }
    return () => {
      isMounted = false;
    };
  }, [project]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (editValues) {
        const { students, ...task } = editValues;
        // setSelectedProfiles(students || []);
        setNewTaskData({ ...task, members: students?.map((i) => i?.id) });
      }
    }
    return () => {
      isMounted = false;
    };
  }, [editValues]);
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setProfiles(squad);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const showSuccessNotification = (message) => {
    dispatch(showToast({ message }));
  };

  const showErrorNotification = (message) => {
    dispatch(showToast({ message, type: "error" }));
  };
  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if (project && isOpen) {
        fetchAllEpics();
      }
    }

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  const handleCreate = async () => {
    setCreating(true);
    const { type, goal, epic, ...newTask } = newTaskData;
    newTask["type_id"] = type?.id;
    newTask["goal_id"] = goal?.id;
    newTask["epic_id"] = epic?.id;

    try {
      let body = { stories: newTask };

      const response = await StoriesAPI.createStories(body);

      closeModal();
      onCreate?.({
        ...(response.data?.data?.task || newTask),
        students: selectedProfiles,
      });
      setNewTaskData(defaultValue);
      setSelectedProfiles([]);
      showSuccessNotification("Story created successfully!");
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
          showErrorNotification(err.response?.data?.message);
          break;
        default:
          showErrorNotification("Validation Failed!");
      }
    }
    setCreating(false);
  };

  const fetchAllEpics = async () => {
    try {
      let query = {};

      if (project) {
        query["project_id"] = project?.id;
      }
      if (goal) {
        query["goal_id"] = goal?.id;
      }
      const response = await EpicsAPI.getAllEpics(query);
      const fetchedepics = response.data.data?.response || []; // TODO: Pagination if needed
      setEpics(fetchedepics);
    } catch (err) {
      console.log("fetchAllEpics error", err);
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
      <div className="modals-component md:max-w-xl lg:h-screen lg:pt-20 mx-auto w-full transform transition-all ease-in-out duration-150">
        <div className="flex flex-row items-end justify-between px-5 pt-5 rounded-t-20px">
          <h5
            className="font-lato font-bold text-sm text-primary-gray-1000 flex flex-col items-start"
            id="exampleModalLiveLabel"
          >
            Add New Story
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
              <p className="font-lato text-left font-normal text-2xs text-primary-gray-450">
                Epic:{" "}
                <span className="text-primary-gray-1000">
                  {epics?.find((a) => a?.id === newTaskData?.epic?.id)?.title ||
                    "NA"}
                </span>
              </p>

              {newTaskData?.project_id && (
                <p className="font-lato font-normal text-sm text-primary-gray-1000 flex flex-row items-center">
                  <img
                    src={
                      newTaskData?.project_id
                        ? projects?.find(
                            (a) => a?.id === newTaskData?.project_id
                          )?.image?.url || "/assets/images/icons/rocket.png"
                        : "/assets/images/icons/rocket.png"
                    }
                    alt=""
                    className="h-5 w-5 rounded mr-1.5"
                  />
                  {
                    projects?.find((a) => a?.id === newTaskData?.project_id)
                      ?.title
                  }
                </p>
              )}
            </div>
            {showStep === 4 && (
              <div className="space-y-2 w-1/2 items-end">
                {newTaskData?.due_date && (
                  <p className="font-lato text-right font-normal text-xs text-primary-gray-450">
                    Due: {moment(newTaskData?.due_date).format("ll")}
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
              <div className="w-full px-5 py-2.5 font-lato">
                <Disclosure defaultOpen>
                  {({ open }) => (
                    <>
                      <div className="w-full flex flex-row items-center justify-between">
                        <div className="flex flex-row items-center justify-between">
                          <p className="font-lato font-normal text-xs text-primary-gray-1000">
                            Choose an <b>Epic</b>
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
                        {newTaskData?.goal_id && (
                          <div className="w-full flex flex-row">
                            <div className="flex flex-row items-center justify-between rounded-md p-1.5 bg-primary-yellow-lightest">
                              <div className="flex flex-row items-center justify-between mr-2.5">
                                <img
                                  src={
                                    epics?.find(
                                      (p) => p?.id === newTaskData?.goal_id
                                    )?.image?.url ||
                                    "/assets/images/icons/rocket.png"
                                  }
                                  alt=""
                                  className="h-5 w-5 mr-1.5"
                                />
                                <p className="text-primary-gray-1000 inter text-sm">
                                  {
                                    epics?.find(
                                      (p) => p?.id === newTaskData?.goal_id
                                    )?.title
                                  }
                                </p>
                              </div>
                              <XIcon
                                onClick={() => {
                                  setNewTaskData({
                                    ...newTaskData,
                                    epic_id: null,
                                    epic: null,
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
                            {epics?.map((p) => {
                              return (
                                <div
                                  onClick={() => {
                                    setNewTaskData({
                                      ...newTaskData,
                                      epic_id: p?.id,
                                      epic: p,
                                    });
                                  }}
                                  className={`flex flex-col items-center rounded-10px relative p-2.5 w-full  ${
                                    epics?.find(
                                      (p) => p?.id === newTaskData?.epic_id
                                    )?.id === p?.id
                                      ? "bg-primary-yellow-lightest font-bold"
                                      : "bg-white font-normal"
                                  }`}
                                >
                                  <CheckCircleIcon
                                    className={`h-5 w-5 absolute top-3 right-3 components-cards-task-checkcircle ${
                                      epics?.find(
                                        (p) => p?.id === newTaskData?.epic_id
                                      )?.id === p?.id
                                        ? "visible"
                                        : "invisible"
                                    }`}
                                  />
                                  <PlusCircleIcon
                                    className={` text-primary-gray-350 h-5 w-5 absolute top-3 right-3 ${
                                      epics?.find(
                                        (p) => p?.id === newTaskData?.epic_id
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
                                    {p?.title}
                                  </p>
                                </div>
                              );
                            })}
                            {epics?.length == 0 && (
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
              <div className="flex flex-col items-start w-full">
                <label
                  htmlFor="Owners"
                  className="text-2xs text-primary-gray-450 leading-3 mb-2.5 font-lato font-normal"
                >
                  <b>Assign to</b> members
                </label>
                <div className="w-full">
                  <DropdownInputForMultipleSelect
                    label="Collaborators"
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
                    selectedValues={newTaskData?.members?.map((i) => i?.id)}
                    setDetails={(val) => {
                      let s = [...newTaskData.members];
                      if (s?.find((i) => i?.id == val)) {
                        s = s?.filter((i) => i?.id !== val);
                      } else {
                        s.push(profiles?.find((i) => i?.id == val));
                      }

                      setNewTaskData({ ...newTaskData, members: s });
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col items-start w-full">
                <label
                  htmlFor="Owners"
                  className="text-2xs text-primary-gray-450 leading-3 mb-2.5 font-lato font-normal"
                >
                  Start Date
                </label>
                <div className="w-full">
                  <DateSelect
                    details={newTaskData}
                    setDetails={setNewTaskData}
                    date={newTaskData?.start_date}
                    setDate={(val) => {
                      setNewTaskData({ ...newTaskData, start_date: val });
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col items-start w-full">
                <label
                  htmlFor="Owners"
                  className="text-2xs text-primary-gray-450 leading-3 mb-2.5 font-lato font-normal"
                >
                  Start Date
                </label>
                <div className="w-full">
                  <DateSelect
                    details={newTaskData}
                    setDetails={setNewTaskData}
                    date={newTaskData?.end_date}
                    setDate={(val) => {
                      setNewTaskData({ ...newTaskData, end_date: val });
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
                text="Add Story"
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

export default StoryCreate;
