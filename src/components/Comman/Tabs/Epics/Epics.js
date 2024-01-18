import React, { useEffect, useState } from "react";

import * as EpicsAPI from "config/APIs/task/epics";
// Icons
import { PencilAltIcon } from "@heroicons/react/outline";

import ChronosButton from "components/Comman/Buttons";
import { PlusIcon } from "@heroicons/react/solid";
import EmptyEpics from "assets/icons/EmptyEpics.png";
import { canUpdateProject } from "helpers/utils/permissions/project";
import { canUpdateGoal } from "helpers/utils/permissions/goals";
import { canUpdateEpic } from "helpers/utils/permissions/epic";
import EpicCreateEdit from "components/Modals/Epic/EpicsCreate";
import EditEpic from "components/Modals/Epic/EditEpic";

const Epics = ({ project, goal, emptyMessage, epic, setSelectedEpic }) => {
  const [epics, setEpics] = useState([]);
  const [openMobileCreateModal, setOpenMobileCreateModal] = useState(false);

  const [fetching, setFetching] = useState(false);

  const [epicToEdit, setEpicToEdit] = React.useState();
  const [epicToDelete, setEpicToDelete] = React.useState();

  const fetchGoalTasks = async () => {
    try {
      setFetching(true);
      let query = { project_id: project?.id };
      if (goal) {
        query = { goal_id: goal?.id };
      }
      const response = await EpicsAPI.getAllEpics(query);
      setEpics(response.data.data?.tasks || response.data.data.response || []);
      console.log(response);
    } catch (err) {
      console.log("Fetch goal task error", err);
    }
    setFetching(false);
  };

  useEffect(() => {
    fetchGoalTasks();
  }, [goal]);

  const handleDeleteEpic = async () => {
    try {
      await EpicsAPI.deleteEpics(epicToDelete.id);
      setEpics((state) => state.filter((e) => e.id !== epicToDelete.id));
      setEpicToDelete(null);
    } catch (err) {
      console.log("Epic delete error", err);
    }
  };
  const getIndex = (id) => {
    const str = `${id}`;
    if (str.length === 1) {
      return `0${id}`;
    }
    return str;
  };

  return (
    <>
      <EpicCreateEdit
        project={project}
        goal={goal}
        isOpen={openMobileCreateModal}
        closeModal={() => setOpenMobileCreateModal(false)}
        onCreate={() => fetchGoalTasks()}
      />

      <EditEpic
        project={project}
        goal={goal}
        isOpen={epicToEdit ? true : false}
        closeModal={() => setEpicToEdit(false)}
        onCreate={() => fetchGoalTasks()}
        onUpdate={() => fetchGoalTasks()}
        editValues={epicToEdit}
        isEdit={true}
        onDelete={(val) => {
          setEpicToDelete(val);
        }}
      />

      <div className="md:absolute top-0 right-0 py-2 mb-3">
        {canUpdateProject(project) && (goal ? canUpdateGoal(goal) : true) && (
          <div className="flex">
            <ChronosButton
              primary
              text="Add new Epic"
              icon={<PlusIcon className="w-4 h-4 ml-1.5" />}
              onClick={() => setOpenMobileCreateModal(true)}
            />
          </div>
        )}
      </div>
      <div className="hidden md:block py-2 mb-3"></div>
      <div className="p-5 bg-white  rounded-xl mb-4 shadow-md">
        {epics?.length > 0 ? (
          <div className="flow-root bg-white  rounded-xl">
            <ul role="list" className="">
              {epics.map((epic, epicIdx) => (
                <li>
                  <div
                    className={`relative ${
                      epicIdx + 1 === epics?.length ? "" : "pb-4"
                    }`}
                  >
                    <div
                      className="relative"
                      onClick={() => {
                        console.log(epic);
                        setSelectedEpic(epic);
                      }}
                    >
                      <div className="flex md:items-center justify-between bg-secondary-green-100 shadow-sm py-2 px-4 rounded-lg font-lato">
                        <strong
                          className={`text-xs lg:text-base font-lato cursor-pointer text-gray-900 font-extrabold max-w-[95%]`}
                        >
                          EP{getIndex(epicIdx + 1)}: {epic.title}
                        </strong>
                        {canUpdateProject(project) && canUpdateEpic(epic) && (
                          <PencilAltIcon
                            onClick={() => setEpicToEdit(epic)}
                            className="h-4 w-4 cursor-pointer"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="flex justify-center items-center flex-col pt-6">
            <p className="text-gray-500 text-sm">
              You have no epics to show here!
            </p>
            <div className="relative h-[149px] w-[192px] overflow-hidden">
              <img
                src={EmptyEpics}
                alt="empty epics"
                className="relative h-full w-full object-contain top-9"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Epics;
