import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { showToast } from "redux/toaster";
import * as TaskAPI from "config/APIs/task/task";
import { useHistory } from "react-router-dom";
import ConfirmModal from "components/Modals/Common/ConfirmModal";
import Settings from "./SettingsDropDown";
import StatusDropDown from "./StatusDropDown";

function Card({ task, setShowAddModal, afterDelete, onUpdate, index }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [deleteModal, setDeleteModal] = useState(false);

  const deleteTask = async () => {
    try {
      const response = await TaskAPI.deleteTasks(task?.id);
      if (response.data) {
        dispatch(showToast({ message: "Task Deleted!" }));
        afterDelete(task?.id);
      }
    } catch (err) {
      console.log("Delete task error", err);
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

  const updateTask = async (val, field) => {
    let newData = task;
    newData[field] = val;
    try {
      let body = {
        ...newData,
      };

      const response = await TaskAPI.updateTasks(task?.id, body);
      onUpdate(task?.id, val, "status");
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
      <ConfirmModal
        isOpen={deleteModal}
        closeModal={() => setDeleteModal(false)}
        onAccept={() => {
          deleteTask();
          setDeleteModal(false);
        }}
        text={<>Are you sure you want to delete the Task?</>}
      />
      <div
        key={task?.id}
        className="p-5 flex flex-col w-full bg-white font-lato"
        style={{ borderRadius: "20px" }}
      >
        <div className="flex flex-row items-start justify-between relative">
          <div className="flex flex-col items-start w-11/12">
            <p
              onClick={() =>
                history.push({
                  pathname: `/tasks/${task?.id}`,
                  state: {
                    task: task,
                  },
                })
              }
              className="text-xs font-lato text-primary-gray-1000 cursor-pointer break-words font-bold"
            >
              {task.title}
            </p>
            <p className="text-2xs mt-1 font-lato max-w-max cursor-pointer text-primary-gray-250 font-normal">
              {task?.project?.title}
            </p>
          </div>
          <div className="absolute -top-2 right-0">
            <Settings
              onEdit={() => {
                history.push({
                  pathname: `/tasks/${task?.id}`,
                  state: {
                    task: task,
                    tab: "details",
                  },
                });
              }}
              onComments={() => {
                history.push({
                  pathname: `/tasks/${task?.id}`,
                  state: {
                    task: task,
                  },
                });
              }}
              onDelete={() => {
                setDeleteModal(true);
              }}
            />
          </div>
        </div>
        <div className="mt-2.5 border-t border-primary-gray-250 pt-3 flex flex-row items-center justify-between">
          {/* <div
            onClick={() => {
              setShowAddModal(task);
            }}
            className="flex flex-row items-center justify-end -space-x-3 col-span-2"
          >
            {task?.students?.length > 0 &&
              task?.students?.map((item) => {
                return (
                  <>
                    {item?.image?.url ? (
                      <img
                        src={item?.image?.url}
                        alt="member"
                        className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 text-gray-300 rounded-full flex-shrink-0 shadow-lg"
                      />
                    ) : (
                      <UserCircleIcon className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 text-gray-500 rounded-full flex-shrink-0 shadow-lg" />
                    )}
                  </>
                );
              })}
            {task?.students?.length == 0 && (
              <QuestionMarkCircleIcon className="w-6 h-6 sm:w-10 sm:h-10 bg-gray-300 text-gray-500 rounded-full flex-shrink-0 shadow-lg" />
            )}
          </div> */}
          <StatusDropDown
            task={task}
            onUpdate={(val) => updateTask(val, "status")}
            index={index}
          />
        </div>
      </div>
    </>
  );
}

export default Card;
