import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { PlusIcon } from "@heroicons/react/outline";
import * as StoryAPI from "config/APIs/task/stories";
import { showToast } from "redux/toaster";
import EmptyState from "components/Comman/EmptyState";
import LargeModalsWrapper from "components/Modals/ModalsWrapper/LargeModalsWrapper";

import StoryCreate from "components/Modals/Story/StoriesCreate";
import ConfirmModal from "components/Modals/Common/ConfirmModal";
import EditStory from "components/Modals/Story/EditStory";

function StoriesList({
  selectedEpic,
  project,
  selectedGoal,
  selectedStory,
  setSelectedStory,
}) {
  const [stories, setStories] = useState([]);
  const [selectedStoryToEdit, setSelectedStoryToEdit] = useState();
  const [selectedStoryToDelete, setSelectedStoryToDelete] = useState();
  const [fetching, setFetching] = useState(false);
  const [openMobileCreateModal, setOpenMobileCreateModal] = useState(false);
  const dispatch = useDispatch();

  const showSuccessNotification = (message) => {
    dispatch(showToast({ message }));
  };

  const showErrorNotification = (message) => {
    dispatch(showToast({ message, type: "error" }));
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      fetchStories();
    }

    return () => {
      isMounted = false;
    };
  }, [selectedEpic, selectedGoal]);

  const fetchStories = async () => {
    setFetching(true);
    try {
      let query = { project_id: project?.id };
      if (selectedGoal) {
        query = { goal_id: selectedGoal?.id };
      }
      if (selectedEpic) {
        query = { epic_id: selectedEpic?.id };
      }
      const response = await StoryAPI.getAllStories(query);
      let newstories = (response.data.data?.response || []).map((e) => {
        e.toggle = false;
        return e;
      });

      let list = [];
      newstories.map((item) => {
        list.push(item);
      });
      setStories(list);
      setFetching(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      await StoryAPI.deleteStories(selectedStoryToDelete?.id);
      showSuccessNotification("Story deleted successfully!");
      fetchStories();

      setSelectedStoryToDelete(null);
    } catch (err) {
      console.log("Story delete error", err);
      showErrorNotification("Something went wrong!");
    }
  };

  return (
    <>
      <ConfirmModal
        isOpen={selectedStoryToDelete ? true : false}
        closeModal={() => setSelectedStoryToDelete(null)}
        onAccept={() => handleDelete()}
        text={
          <>
            Are you sure you want to delete the following Story :{" "}
            {selectedStoryToDelete?.title}
          </>
        }
      />

      <EditStory
        epic={selectedEpic}
        project={project}
        goal={selectedGoal || null}
        isOpen={selectedStoryToEdit ? true : false}
        closeModal={() => setSelectedStoryToEdit()}
        onUpdate={() => fetchStories()}
        editValues={selectedStoryToEdit}
        isEdit={true}
        onDelete={(val) => {
          setSelectedStoryToDelete(val);
        }}
      />

      <StoryCreate
        epic={selectedEpic}
        project={project}
        goal={selectedGoal || null}
        isOpen={openMobileCreateModal}
        closeModal={() => setOpenMobileCreateModal(false)}
        onCreate={() => fetchStories()}
      />

      <div className="bg-white rounded-xl">
        <div className="flex flex-row items-center justify-between border-b w-full px-5 py-2">
          <h1 className="font-lato text-xs lg:text-sm text-primary-gray-500 font-medium">
            Stories {selectedEpic && `for ${selectedEpic?.title}`}
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
          {stories.length > 0 &&
            stories?.map((story, index) => {
              return (
                <>
                  <div
                    className={`py-2 px-5 flex flex-row items-center h-16 justify-between relative ${
                      index + 1 !== stories.length ? "border-b" : ""
                    } border-gray-200 ${
                      story.id === selectedStory?.id
                        ? "rounded-lg bg-primary-yellow-lightest"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedStory(story);
                    }}
                  >
                    <div className="w-full">
                      <div className="flex flex-row items-center justify-between">
                        <div className="w-9/12">
                          <p className="text-xs lg:text-sm font-lato line-clamp-2 text-primary-gray-300 font-medium cursor-pointer break-all">
                            {story.title}
                          </p>
                          <p className="text-2xs lg:text-xs font-lato text-primary-gray-300 max-w-max cursor-pointer">
                            {story?.description}
                          </p>
                          <p
                            onClick={() => {
                              setSelectedStoryToEdit(story);
                            }}
                            className="text-2xs lg:text-xs text-primary-gray-300 font-lato max-w-max cursor-pointer hover:underline"
                          >
                            Edit
                          </p>
                        </div>
                        {story?.id !== 0 && (
                          <div
                            className={`w-8 h-8 flex flex-row items-center justify-center rounded-full `}
                          >
                            {story?.creator?.image?.url ? (
                              <img
                                className="h-8 w-8 rounded-full"
                                src={
                                  story?.creator?.image &&
                                  story?.creator?.image.url
                                }
                                alt=""
                              />
                            ) : (
                              <div
                                className="h-8 w-8 rounded-full flex flex-row items-center justify-center"
                                style={{
                                  background: story.bgColor,
                                }}
                              >
                                <p className="m-0 text-base text-white">
                                  {story?.creator?.first_name.charAt(0)}
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

          {stories.length === 0 && (
            <EmptyState text="No Stories for this project!" />
          )}
        </div>
      </div>
    </>
  );
}

export default StoriesList;
