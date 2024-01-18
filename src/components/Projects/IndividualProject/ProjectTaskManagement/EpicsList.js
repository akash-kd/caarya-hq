import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { PlusIcon } from "@heroicons/react/outline";
import * as EpicsAPI from "config/APIs/task/epics";
import { showToast } from "redux/toaster";
import EmptyState from "components/Comman/EmptyState";
import EditEpic from "components/Modals/Epic/EditEpic";
import ConfirmModal from "components/Modals/Common/ConfirmModal";
import EpicCreateEdit from "components/Modals/Epic/EpicsCreate";
// Import ConfirmModal from "components/ConfirmModal";

function EpicsList({
  permissions,
  setSelectedEpic,
  selectedEpic,
  project,
  selectedGoal,
}) {
  const dispatch = useDispatch();

  const [epics, setEpics] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openMobileCreateModal, setOpenMobileCreateModal] = useState(false);
  const [selectedEpicToEdit, setSelectedEpicToEdit] = useState();
  const [selectedEpicToDelete, setSelectedEpicToDelete] = useState();

  const showSuccessNotification = (message) => {
    dispatch(showToast({ message }));
  };

  const showErrorNotification = (message) => {
    dispatch(showToast({ message, type: "error" }));
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      console.log("mounted", selectedGoal);

      fetchEpics();
    }

    return () => {
      isMounted = false;
    };
  }, [selectedGoal]);

  const fetchEpics = async () => {
    setFetching(true);
    try {
      let query = { project_id: project?.id };
      if (selectedGoal) {
        query = { goal_id: selectedGoal?.id };
      }
      const response = await EpicsAPI.getAllEpics(query);
      let newEpics = (response.data.data?.response || []).map((e) => {
        e.toggle = false;
        return e;
      });

      let list = [];
      newEpics.map((item) => {
        list.push(item);
      });
      setEpics(list);
      setFetching(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      await EpicsAPI.deleteEpics(selectedEpicToDelete?.id);
      showSuccessNotification("Epic deleted successfully!");
      fetchEpics();

      setSelectedEpicToDelete(null);
    } catch (err) {
      console.log("Epic delete error", err);
      showErrorNotification("Something went wrong!");
    }
  };

  return (
    <>
      <ConfirmModal
        isOpen={selectedEpicToDelete ? true : false}
        closeModal={() => setSelectedEpicToDelete(null)}
        onAccept={() => handleDelete()}
        text={
          <>
            Are you sure you want to delete the following Epic :{" "}
            {selectedEpicToDelete?.title}
          </>
        }
      />

      <EditEpic
        project={project}
        goal={selectedGoal}
        isOpen={selectedEpicToEdit ? true : false}
        closeModal={() => setSelectedEpicToEdit(false)}
        onCreate={() => fetchEpics()}
        onUpdate={() => fetchEpics()}
        editValues={selectedEpicToEdit}
        isEdit={true}
        onDelete={(val) => {
          setSelectedEpicToDelete(val);
        }}
      />

      <EpicCreateEdit
        project={project}
        goal={selectedGoal}
        isOpen={openMobileCreateModal}
        closeModal={() => setOpenMobileCreateModal(false)}
        onCreate={() => fetchEpics()}
      />

      <div className="bg-white rounded-xl">
        <div className="flex flex-row items-center justify-between border-b w-full px-5 py-2">
          <h1 className="font-lato text-xs lg:text-sm text-primary-gray-500 font-medium">
            Epics {selectedGoal && `for ${selectedGoal?.title}`}
          </h1>
          <div className="flex flex-row items-center space-x-2">
            <PlusIcon
              className="w-4 h-4 text-gray-400 cursor-pointer block md:hidden"
              onClick={() => {
                setOpenMobileCreateModal(true);
              }}
            />
          </div>
        </div>
        <div className="min-h-25vh max-h-30vh  md:max-h-60vh overflow-y-auto">
          {epics?.length > 0 &&
            epics?.map((epic, index) => {
              return (
                <>
                  <div
                    className={`py-2 px-5 flex flex-row items-center h-16 justify-between relative ${
                      index + 1 !== epics.length ? "border-b" : ""
                    } border-gray-200 ${
                      epic.id === selectedEpic?.id
                        ? "rounded-lg bg-primary-yellow-lightest"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedEpic(epic);
                    }}
                  >
                    <div className="w-full">
                      <div className="flex flex-row items-center justify-between">
                        <div className="">
                          <p className="text-xs lg:text-sm font-lato text-primary-gray-300 font-medium cursor-pointer break-all">
                            {epic.title}
                          </p>
                          <p className="text-2xs lg:text-xs font-lato max-w-max text-primary-gray-300 cursor-pointer">
                            {epic?.description}
                          </p>
                          <p
                            onClick={() => {
                              setSelectedEpicToEdit(epic);
                            }}
                            className="text-2xs lg:text-xs text-primary-gray-300 font-lato max-w-max cursor-pointer hover:underline"
                          >
                            Edit
                          </p>
                        </div>
                        {epic?.id !== 0 && (
                          <div
                            className={`w-8 h-8 flex flex-row items-center justify-center rounded-full `}
                          >
                            {epic?.creator?.image?.url ? (
                              <img
                                className="h-8 w-8 rounded-full"
                                src={
                                  epic?.creator?.image &&
                                  epic?.creator?.image.url
                                }
                                alt=""
                              />
                            ) : (
                              <div
                                className="h-8 w-8 rounded-full flex flex-row items-center justify-center"
                                style={{
                                  background: epic.bgColor,
                                }}
                              >
                                <p className="m-0 text-base text-white">
                                  {epic?.creator?.first_name.charAt(0)}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              );
            })}

          {epics.length === 0 && (
            <EmptyState text="No Epics for this project!" />
          )}
        </div>
      </div>
    </>
  );
}

export default EpicsList;
