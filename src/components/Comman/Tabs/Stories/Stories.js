import React, { useEffect, useState } from "react";
import * as StoriesAPI from "config/APIs/task/stories";

import * as ProjectAPI from "config/APIs/project";
import StoryCard from "components/Comman/Cards/StoryCard";
import LargeModalsWrapper from "components/Modals/ModalsWrapper/LargeModalsWrapper";

import StoryCreate from "components/Modals/Story/StoriesCreate";
import ChronosButton from "components/Comman/Buttons";
import { ChevronRightIcon, PlusIcon } from "@heroicons/react/solid";
import EmptyStories from "assets/icons/EmptyStories.png";
import { PencilAltIcon } from "@heroicons/react/outline";
import { canUpdateProject } from "helpers/utils/permissions/project";
import { canUpdateEpic } from "helpers/utils/permissions/epic";
import { canUpdateGoal } from "helpers/utils/permissions/goals";
import EditEpic from "components/Modals/Epic/EditEpic";
const Stories = ({
  project,
  goal,
  epic,

  projectType,

  setSelectedStory,
}) => {
  const [stories, setStories] = useState([]);
  const [originalStories, setOriginalStories] = useState([]);
  const [projectStories, setProjectStories] = useState({});
  const [fetching, setFetching] = useState(false);
  const [projectFilters, setProjectFilters] = React.useState([]);

  const [openMobileCreateModal, setOpenMobileCreateModal] = useState(false);
  const [selectedStoryToDelete, setSelectedStoryToDelete] = useState();

  const notificationAlert = React.useRef();
  const [epicToEdit, setEpicToEdit] = React.useState();
  const [epicToDelete, setEpicToDelete] = React.useState();

  const [newStoryModal, setNewStoryModal] = useState(false);

  React.useEffect(() => {
    fetchAllStories();
  }, [epic, goal]);

  const showSuccessNotification = (message) => {
    notificationAlert.current.notificationAlert(
      Notification(message, "success")
    );
  };

  const showErrorNotification = (message) => {
    notificationAlert.current.notificationAlert(
      Notification(message, "danger")
    );
  };

  const fetchAllProjects = async () => {
    let query = {};

    query["is_active"] = true;
    query["type"] = projectType;
    ProjectAPI.findAll(query)
      .then((res) => {
        let projects = res.data.data?.response || []; // TODO: Pagination if needed
        projects = projects.sort((a, b) =>
          a.priority_number > b.priority_number ? 1 : -1
        );
        projects.unshift({ title: "All", id: 0 });

        let temp = [];
        projects.map((item) => {
          let obj = { label: item.title, value: item.id };

          temp.push(obj);
        });
        setProjectFilters(temp);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (!project) {
      fetchAllProjects();
    }
  }, []);

  const fetchAllStories = async (filter) => {
    setFetching(true);
    try {
      let query = {};
      if (epic) {
        query["epic_id"] = epic.id;
      }
      if (project) {
        query["project_id"] = project?.id;
      }
      if (projectType) {
        query["projectType"] = projectType;
      }
      if (goal) {
        query["goal_id"] = goal?.id;
      }
      if (filter && filter?.id !== 0) {
        query["project_id"] = filter?.id;
      }

      const response = await StoriesAPI.getAllStories(query);
      let newStories = (response.data.data.response || response.data.data).map(
        (e) => {
          e.toggle = false;
          return e;
        }
      );
      setOriginalStories(newStories);
      setStories(newStories);
    } catch (err) {
      console.log(err);
    }
    setFetching(false);
  };

  const handleDelete = async () => {
    try {
      await StoriesAPI.deleteStories(selectedStoryToDelete.id);
      showSuccessNotification("Story deleted successfully!");
      fetchAllStories();
      setSelectedStoryToDelete(null);
    } catch (err) {
      console.log("Story delete error", err);
      showErrorNotification("Something went wrong!");
    }
  };

  React.useEffect(() => {
    let segregation = {};
    let noProjectStories = [];
    let sortedStories = [...stories];
    sortedStories = sortedStories.sort((a, b) =>
      a.priority_number > b.priority_number ? 1 : -1
    );
    for (let story of sortedStories) {
      if (story?.project) {
        if (segregation[story.project?.title]) {
          segregation[story.project?.title].push(story);
        } else {
          segregation[story.project?.title] = [story];
        }
      } else {
        noProjectStories.push(story);
      }
    }

    // Not showing "No Project" stories
    segregation = { ...segregation, "No Project": noProjectStories };
    setProjectStories(segregation);
  }, [stories]);

  return (
    <>
      <EditEpic
        project={project}
        goal={goal}
        isOpen={epicToEdit ? true : false}
        closeModal={() => setEpicToEdit(false)}
        onCreate={() => {}}
        onUpdate={() => {}}
        editValues={epicToEdit}
        isEdit={true}
        onDelete={(val) => {
          setEpicToDelete(val);
        }}
      />

      <StoryCreate
        epic={epic}
        projectType={projectType}
        project={project}
        goal={goal}
        isOpen={openMobileCreateModal}
        closeModal={() => setOpenMobileCreateModal(false)}
        onCreate={() => fetchAllStories()}
      />

      {canUpdateProject(project) &&
        (goal ? canUpdateGoal(goal) : true) &&
        (epic ? canUpdateEpic(epic) : true) && (
          <div className="md:absolute top-0 right-0 py-2 mb-3">
            <div>
              <div className="block">
                <ChronosButton
                  primary
                  text="Add new Story"
                  icon={<PlusIcon className="w-4 h-4 ml-1.5" />}
                  onClick={() => setOpenMobileCreateModal(true)}
                />
              </div>
            </div>
          </div>
        )}
      <div className="hidden md:block py-2 mb-3"></div>
      <div className="mb-4 p-5 rounded-[8px] bg-white shadow-md min-h-[200px]">
        {epic && (
          <div className="text-primary-gray-280 mb-2 ml-1 flex gap-1 items-center text-[14px]">
            Epics <ChevronRightIcon className="h-6" />{" "}
            <strong className="text-primary-gray-1000">Stories</strong>
          </div>
        )}
        {epic && (
          <h2 className="pb-2 font-bold capitalize mt-2 flex justify-between">
            {epic?.title}
            {canUpdateProject(project) && canUpdateEpic(epic) && (
              <PencilAltIcon
                onClick={() => setEpicToEdit(epic)}
                className="h-4 w-4 cursor-pointer"
              />
            )}
          </h2>
        )}
        {stories.length > 0 ? (
          <>
            <div className="sm:space-y-0 grid sm:grid-cols-2 gap-8 lg:grid-cols-1 xl:grid-cols-2">
              {stories?.map((story) => (
                <StoryCard
                  story={story}
                  onClick={() => setSelectedStory(story)}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center flex-col pt-6 gap-2">
            <p className="text-gray-500 text-sm">
              You have no stories to show here!
            </p>
            <div className="relative h-[149px] w-[192px] overflow-hidden">
              <img
                src={EmptyStories}
                alt="empty stories"
                className="relative h-full w-full object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Stories;
