import Drawer from "@mui/material/Drawer";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { XIcon } from "@heroicons/react/solid";
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
import DropdownInputForMultipleSelect from "components/Comman/Inputs/DropdownForMultipleSelect";
import DateSelect from "components/Comman/Inputs/Date";

const defaultValue = {
  title: "",
  date: null,
  status: null,
};

function GoalCreate({ closeModal, isOpen, onCreate, project, goal }) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const selectedGoal = useSelector((state) => state?.tasks?.addTask);
  const [newTaskData, setNewTaskData] = useState({});

  const [fieldErrors, setFieldErrors] = useState({});
  const [creating, setCreating] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [selectedProfiles, setSelectedProfiles] = useState([]);

  const [projectAll, setProjectAll] = useState(false);
  const [projectType, setProjectType] = useState("all");
  const [showStep, setShowStep] = useState(1);
  const projects = useSelector((state) => state.user.projectsList);
  const squad = useSelector((state) => state.user.squadList);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      let obj = {};

      if (project) {
        obj = { ...obj, projectId: project?.id, project: project };
      }

      setNewTaskData(obj);
      setProfiles(
        [
          {
            id: user?.id,
            first_name: user?.first_name,
            image: user?.image,
            is_active: user?.is_active,
          },
        ].concat(squad)
      );
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

  const handleCreate = async (quickAdd) => {
    if (!newTaskData.dueDate) {
      // let date = { msg: "Please enter a date!" };
      // setFieldErrors({ date: { ...date } });
      newTaskData.dueDate = new Date();
    }
    if (newTaskData?.title == "") {
      setFieldErrors({ title: { msg: "Please enter the title!" } });
      return;
    }

    setCreating(true);

    let obj = { ...newTaskData };
    if (quickAdd) {
      obj["owners"] = [user];
    }
    const { owners, collaborators, ...newTask } = obj;

    if (!obj?.status) {
      newTask["status"] = "NotStarted";
    }

    try {
      let body = {
        ...newTask,
        ownerId: owners?.length > 0 ? owners[0]?.id : null,
        collaborators: collaborators?.map((c) => c?.id),
      };

      const response = await GoalAPI.createGoal(body);

      closeModal();
      onCreate(obj);
      setNewTaskData(defaultValue);
      setShowStep(1);
      setNewTaskData(defaultValue);

      showSuccessNotification("Goal created successfully!");
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
          height: "100%",
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
      <div className="modals-component md:max-w-xl lg:h-screen pt-6 mx-auto w-full transform transition-all ease-in-out duration-150">
        <div className="flex flex-row items-end justify-between px-5 rounded-t-20px">
          <h5 className="font-lato font-bold text-xl text-primary-gray-1000 flex flex-col items-start">
            Add New Goal
          </h5>

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
        <div className="flex flex-row items-stretch justify-between px-5 mt-2.5">
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
        </div>
        <div className="mt-3.5 flex w-full flex-col items-start space-y-5 h-auto transition-all ease-in-out duration-150">
          <div className="flex flex-col items-start w-full px-5">
            <TextareaAutosize
              maxRows={1}
              autoFocus={true}
              placeholder="Add Goal Title Here"
              style={{ fontSize: "16px" }}
              className="font-lato font-normal pl-3 pb-2 focus:outline-none focus:ring-transparent shadow-sm rounded-md border-t-0 border-r-0 border-l-0 py-1.5 px-0 text-primary-gray-450 w-full border-b bg-transparent border-[#e2e8f0] focus:border-[#e2e8f0] placeholder:text-gray-300"
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

          <div className="flex flex-col items-start w-full px-5">
            <TextareaAutosize
              minRows={3}
              autoFocus={true}
              placeholder="Add Description Here"
              style={{ fontSize: "16px" }}
              className="font-lato font-normal pl-3 pb-2 focus:outline-none focus:ring-transparent rounded-md py-1.5 px-0 text-primary-gray-450 w-full border-b bg-transparent border-[#e2e8f0] focus:border-[#e2e8f0] placeholder:text-gray-300"
              invalid={fieldErrors.description}
              value={newTaskData.description}
              onChange={(e) => {
                setNewTaskData({ ...newTaskData, description: e.target.value });
              }}
            />
            {fieldErrors?.description?.msg && (
              <p className="text-caarya-red-lighter text-2xs flex flex-row items-center mt-1 ml-0.5">
                {fieldErrors?.description?.msg}
              </p>
            )}
          </div>

          <div className="w-full px-5">
            <p className="text-sm">Associated Project</p>
            <div className="mt-1 mb-3 w-1/2">
              {newTaskData?.projectId && (
                <div className="w-full flex flex-row">
                  <div className="flex flex-row items-center justify-between rounded-md p-1.5 bg-primary-yellow-lightest">
                    <div className="flex flex-row items-center justify-between mr-2.5">
                      <img
                        src={
                          projects?.find(
                            (p) => p?.id === newTaskData?.projectId
                          )?.image?.url || "/assets/images/icons/rocket.png"
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
            </div>
            <DropdownInputForMultipleSelect
              label="Project Name"
              srOnly
              list={projects?.map((i) => ({
                label: i?.title,
                value: i?.id,
                image: i?.image || {
                  url: "/assets/images/icons/rocket.png",
                },
              }))}
              setDetails={(val) => {
                console.log(val);
                setNewTaskData({ ...newTaskData, projectId: val });
              }}
            />
          </div>

          <div className="w-full space-y-5 px-5">
            <div className="flex items-center gap-8">
              <div className="flex flex-col items-start w-full">
                <p className="text-sm">Owner</p>
                <div className="w-full">
                  <DropdownInputForMultipleSelect
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
                    selectedValues={newTaskData?.owners?.map((i) => i?.id)}
                    setDetails={(val) => {
                      let s = newTaskData.owners ? [...newTaskData.owners] : [];
                      if (s?.find((i) => i?.id == val)) {
                        s = s?.filter((i) => i?.id !== val);
                      } else {
                        s.push(profiles?.find((i) => i?.id == val));
                      }

                      setNewTaskData({ ...newTaskData, owners: s });
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col items-start w-full">
                <p className="text-sm">Add Collaborators</p>
                <div className="w-full">
                  <DropdownInputForMultipleSelect
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
                    selectedValues={newTaskData?.collaborators?.map(
                      (i) => i?.id
                    )}
                    setDetails={(val) => {
                      let s = newTaskData.collaborators
                        ? [...newTaskData.collaborators]
                        : [];
                      if (s?.find((i) => i?.id == val)) {
                        s = s?.filter((i) => i?.id !== val);
                      } else {
                        s.push(profiles?.find((i) => i?.id == val));
                      }

                      setNewTaskData({ ...newTaskData, collaborators: s });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start w-full">
              <p className="text-sm mb-2">Due Date</p>
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
            <div className="flex flex-col items-start w-full">
              <p className="text-sm mb-2">Choose Priority</p>
              <div className="flex">
                {[...Array(6)].map((e, i) => {
                  return (
                    <div
                      key={i}
                      className="flex flex-col items-center justify-center h-8 rounded-full mr-4 cursor-pointer"
                      onClick={() => {
                        setNewTaskData({ ...newTaskData, priority: i + 1 });
                      }}
                    >
                      <p
                        className={`text-xs flex items-center priority-dark-${
                          i + 1
                        } `}
                      >
                        {newTaskData?.priority == i + 1 && (
                          <img
                            src="/assets/svg/icon/fire.svg"
                            className="h-3"
                          />
                        )}
                        P{i + 1}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-auto flex w-full flex-row items-center justify-center px-8 pb-5 fixed bottom-0">
          <div>
            <ChronosButton
              loader={creating}
              text="Save Goal"
              primary
              onClick={() => {
                handleCreate();
              }}
            />
          </div>
        </div>
      </div>
    </Drawer>
  );
}

export default GoalCreate;
