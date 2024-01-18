import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { showToast } from "redux/toaster";
import * as TaskAPI from "config/APIs/task/task";
import { UserCircleIcon } from "@heroicons/react/solid";
import { useHistory } from "react-router-dom";
import StatusDropDown from "./StatusDropDown";
import moment from "moment";
import PriorityDropdown from "./PriorityDropdown";
import TaskPageLaptop from "../Modals/TaskPageLaptop";

function TaskCard({
  task,
  tasksPage = false,
  setShowAddModal,
  onUpdate,
  showAssignedBy,
  showAssignedTo,
  projectView,
}) {
  let isMountedP = useRef(false);
  let isMountedS = useRef(false);
  const user = useSelector((state) => state.user.user);

  const history = useHistory();
  const [priorityValue, setPriorityValue] = useState(task?.priority);
  const [status, setStatus] = useState(task?.status);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setStatus(task?.status);
  }, [task?.status]);

  useEffect(() => {
    setPriorityValue(task?.priority);
  }, [task?.priority]);

  const updateTask = async (field, val) => {
    let newData = { ...task };
    newData[field] = val;
    try {
      let body = {
        task: newData,
      };
      const response = await TaskAPI.updateTasks(task?.id, body);
      if (onUpdate) {
        onUpdate(task?.id, val, field);
      }
    } catch (err) {
      switch (err.response?.status) {
        case 401:
          showToast({ message: "Unauthorized!", type: "error" });
          break;
        default:
          showToast({ message: "Something went wrong!", type: "error" });
      }
    }
  };

  return (
    <>
      <TaskPageLaptop
        isOpen={edit}
        closeModal={() => setEdit(false)}
        id={task?.id}
      />
      <div
        key={task?.id}
        onClick={(e) => {
          if (
            e.target.className.includes("StatusDropdown") ||
            e.target.className.includes("PriorityDropdown") ||
            e.target.className.includes("PriorityDropdownItem") ||
            e.target.className.includes("StatusDropdownItem") ||
            e.target.className.includes("collaborators")
          )
            return;
          // if (window.innerWidth < 1024)
          //   history.push({
          //     pathname: `/tasks/${task?.id}`,
          //     state: {
          //       task: task,
          //     },
          //   });
          // else setEdit(true);
        }}
        className={`p-2 relative px-2.5 flex flex-col w-full bg-white rounded-[3px] min-w-[250px] lg:max-w-[full] border font-lato`}
      >
        <div
          onClick={(e) => {
            if (
              e.target.className.includes("StatusDropdown") ||
              e.target.className.includes("PriorityDropdown") ||
              e.target.className.includes("PriorityDropdownItem") ||
              e.target.className.includes("StatusDropdownItem") ||
              e.target.className.includes("collaborators")
            )
              return;
            if (window.innerWidth < 1024)
              history.push({
                pathname: `/tasks/${task?.id}`,
                state: {
                  task: task,
                },
              });
            else setEdit(true);
          }}
          className="flex items-center justify-between w-full"
        >
          <p className="text-sm line-clamp-2 leading-4 font-lato text-primary-gray-1000 cursor-pointer break-words font-bold max-w-[80%]">
            {task.title}
          </p>
          <PriorityDropdown
            disabled={task?.owner?.id === user?.id}
            priorityValue={priorityValue}
            setPriorityValue={(val) => {
              setPriorityValue(val);
              updateTask("priority", val);
            }}
          />
        </div>
        <div className="flex justify-end mt-1">
          <StatusDropDown
            disabled={task?.owner?.id !== user?.id}
            status={status}
            setStatus={(val) => {
              setStatus(val);
              updateTask("status", val);
            }}
            index={0}
          />
        </div>
        <p
          onClick={(e) => {
            if (
              e.target.className.includes("StatusDropdown") ||
              e.target.className.includes("PriorityDropdown") ||
              e.target.className.includes("PriorityDropdownItem") ||
              e.target.className.includes("StatusDropdownItem") ||
              e.target.className.includes("collaborators")
            )
              return;
            if (window.innerWidth < 1024)
              history.push({
                pathname: `/tasks/${task?.id}`,
                state: {
                  task: task,
                },
              });
            else setEdit(true);
          }}
          className="font-lato text-xs flex items-center gap-1 text-primary-gray-500 mt-0"
        >
          Owned by: {task?.owner?.first_name}
        </p>
        <p
          onClick={(e) => {
            if (
              e.target.className.includes("StatusDropdown") ||
              e.target.className.includes("PriorityDropdown") ||
              e.target.className.includes("PriorityDropdownItem") ||
              e.target.className.includes("StatusDropdownItem") ||
              e.target.className.includes("collaborators")
            )
              return;
            if (window.innerWidth < 1024)
              history.push({
                pathname: `/tasks/${task?.id}`,
                state: {
                  task: task,
                },
              });
            else setEdit(true);
          }}
          className="font-lato text-xs flex items-center gap-1 mt-1 text-primary-gray-500"
        >
          Due Date: <span>{moment(task?.date).format("DD.MM.YYYY")}</span>
        </p>

        <div className="text-primary-gray-280 flex flex-row items-center justify-between mt-3">
          <div className="flex items-center gap-3">
            {/* <div
              id="collaborators"
              onClick={() => {
                if (task?.owner_id == user?.id) {
                  setShowAddModal(true);
                }
              }}
              className="flex flex-row items-center -space-x-3"
            >
              {task?.students?.length > 0 ? (
                task?.students?.map((item) => {
                  return (
                    <>
                      {item?.image?.url ? (
                        <img
                          src={item?.image?.url}
                          alt="member"
                          className="w-6 h-6 bg-gray-300 text-gray-500 rounded-full flex-shrink-0 shadow-lg"
                        />
                      ) : (
                        <UserCircleIcon className="w-6 h-6 bg-gray-300 text-gray-500 rounded-full flex-shrink-0 shadow-lg" />
                      )}
                    </>
                  );
                })
              ) : (
                <div
                  id="collaborators"
                  className="text-xs font-bold underline cursor-pointer text-primary-gray-1000 font-lato"
                >
                  No Collaborators
                </div>
              )}
            </div> */}

            <div
              onClick={(e) => {
                if (
                  e.target.className.includes("StatusDropdown") ||
                  e.target.className.includes("PriorityDropdown") ||
                  e.target.className.includes("PriorityDropdownItem") ||
                  e.target.className.includes("StatusDropdownItem") ||
                  e.target.className.includes("collaborators")
                )
                  return;
                if (window.innerWidth < 1024)
                  history.push({
                    pathname: `/tasks/${task?.id}`,
                    state: {
                      task: task,
                    },
                  });
                else setEdit(true);
              }}
              className="flex flex-row items-center justify-between space-x-2 text-primary-gray-350 inter font-normal text-2xs"
            >
              <div className="flex flex-row items-center space-x-0.5">
                <img
                  src="/assets/images/icons/comments.svg"
                  alt=""
                  className="w-2 h-3"
                />
                <p className="">{task?.commentsCount || 0}</p>
              </div>
              <div className="flex flex-row items-center space-x-0.5">
                <img
                  src="/assets/images/icons/files.svg"
                  alt=""
                  className="w-2 h-3"
                />
                <p className="">{task?.filesCount || 0}</p>
              </div>
            </div>
          </div>
          {!projectView && task?.project?.title && (
            <div
              className="text-xs text-primary-gray-1000 border rounded-full font-lato border-primary-gray-1000 px-1.5 py-0.5 max-w-[70px]"
              title={
                task?.project?.title?.includes("iceBox")
                  ? `${task?.project?.creator?.first_name}'s Icebox`
                  : task?.project?.title
              }
            >
              <p className="text-xs line-clamp-1 break-words">
                {task?.project?.title?.includes("iceBox")
                  ? `${task?.project?.creator?.first_name}'s Icebox`
                  : task?.project?.title}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default TaskCard;
