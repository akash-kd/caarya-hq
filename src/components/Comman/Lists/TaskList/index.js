import React, { useState, useEffect } from "react";
import AddMembers from "components/Modals/AddMembers";

import * as TaskAPI from "config/APIs/task/task";

// Redux
import { updateTasksList } from "redux/task";
import { showToast } from "redux/toaster";
import { useDispatch } from "react-redux";
import TaskCard from "components/Tasks/Card";
import { useLocation } from "react-router-dom";
function Tasks({
  tasks,
  onUpdate,
  afterDelete,
  selectedTab,
  listViewOnly,
  grid = "lg:grid-cols-1 xl:grid-cols-2",
  projectView,
}) {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [creating, setCreating] = useState(false);
  const [showAddModal, setShowAddModal] = useState();

  const addMembers = async (id, profiles) => {
    setCreating(true);

    try {
      let body = {
        students: profiles.map((e) => e.id),
      };

      const response = await TaskAPI.updateTasks(id, body);

      onUpdate(id, profiles);
      dispatch(updateTasksList());
      dispatch(showToast({ message: "Members updated successfully!" }));
    } catch (err) {
      switch (err.response?.status) {
        case 401:
          dispatch(showToast({ message: "Unauthorized!", type: "error" }));
          break;
        default:
          dispatch(
            showToast({ message: err.response?.data?.message, type: "error" })
          );
      }
    }
    setCreating(false);
  };

  useEffect(() => {}, [tasks]);

  return (
    <>
      <AddMembers
        isOpen={showAddModal ? true : null}
        closeModal={() => setShowAddModal()}
        id={showAddModal?.id}
        onUpdate={(id, val) => {
          addMembers(id, val);

          setShowAddModal(null);
        }}
      />
      <div
        className={`space-y-5 mb-0 rounded-[8px] ${
          listViewOnly
            ? ""
            : `sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-5 ${grid}`
        }`}
      >
        {tasks.map((task, index) => {
          return (
            <TaskCard
              projectView={projectView}
              showAssignedBy={selectedTab === "owner"}
              showAssignedTo={selectedTab === "creator"}
              task={task}
              // TasksPage={pathname === "/tasks"}
              setShowAddModal={(val) => {
                setShowAddModal(val);
              }}
              afterDelete={(val) => afterDelete(val)}
              onUpdate={(id, val, field) => {
                onUpdate(id, val, field);
              }}
              index={index}
            />
          );
        })}
      </div>
    </>
  );
}

export default Tasks;
