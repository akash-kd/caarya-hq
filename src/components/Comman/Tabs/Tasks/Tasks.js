import React, { Fragment, useEffect, useState } from "react";
import TasksList from "components/Comman/Lists/TaskList";

// Import sortBy from "utils/sortFunction";
// Import { TaskStatus } from "variables/task";
// Import SearchBar from "../../Inputs/SearchBar";
import * as TaskAPI from "config/APIs/task/task";
// Import ModalsWrapper from "components/Modals/ModalsWrapper/index";

import { useHistory, useParams } from "react-router";
import TaskCreate from "components/Modals/Task/TaskCreate";
import ChronosButton from "components/Comman/Buttons";
import { ChevronRightIcon, PlusIcon } from "@heroicons/react/solid";
import EmptyTasks from "assets/icons/EmptyTasks.png";
import { PencilAltIcon } from "@heroicons/react/outline";
import { ReactComponent as StoryIcon } from "assets/icons/Story.svg";
import { canUpdateProject } from "helpers/utils/permissions/project";
import { canUpdateGoal } from "helpers/utils/permissions/goals";
import { canUpdateEpic } from "helpers/utils/permissions/epic";
import { canUpdateStory } from "helpers/utils/permissions/story";
import EditStory from "components/Modals/Story/EditStory";
import { BsSliders } from "react-icons/bs";
import SearchBox from "components/Comman/Inputs/SearchBox";
import DropdownInput from "components/Comman/Inputs/DropdownInput";
import { FaTimes } from "react-icons/fa";
import { Menu, Transition } from "@headlessui/react";
import { classNames } from "helpers/utils/classNames";

const Tasks = ({
  isDisabled,
  taskType,
  goal,
  story,
  project,
  epic,
  permissions,
  department,
  hideGoals,
  setTasksView,
  projectView,
}) => {
  console.log(epic, story, project);
  const { id: taskId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [originalTasks, setOriginalTasks] = useState([]);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openMobileCreateModal, setOpenMobileCreateModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState();
  const [viewType, setViewType] = useState("Cards");
  const [selectedStoryToEdit, setSelectedStoryToEdit] = useState();
  const [selectedStoryToDelete, setSelectedStoryToDelete] = useState();
  const [search, setSearch] = useState({
    searchText: "",
    isSearch: false,
  });
  const [filter, setFilter] = useState("All");
  const [fetching, setFetching] = useState(false);
  const [taskToDelete, setTaskToDelete] = React.useState();

  const fetchTasks = async ({ page }) => {
    setFetching(true);
    try {
      let query = {
        // page: page,
        // size: 10,
      };
      if (taskType) {
        query["categories"] = JSON.stringify([taskType]);
      }
      if (project) {
        query["project_id"] = project?.id;
      }
      if (story) {
        query["story_id"] = story?.id;
      }
      if (department) {
        query["department_id"] = department?.id;
      }

      if (goal && goal?.id !== 0) {
        query["goal_id"] = goal?.id;
      }
      const response = await TaskAPI.getAllTasks(query);
      const fetchedSubTasks =
        response.data.data.tasks || response.data.data.response;
      // SetTotalItems(response.data.data.totalItems);
      // SetTotalPages(response.data.data.totalPages);
      // SetCurrentPage(response.data.data.currentPage);

      console.log("FetchedSubTasks", fetchedSubTasks);
      setOriginalTasks(fetchedSubTasks);
      setTasks(fetchedSubTasks);
      console.log("Tasks", tasks);
    } catch (err) {
      console.log("Subtask fetch error", err);
    }
    setFetching(false);
  };

  useEffect(() => {
    fetchTasks({ page: 0 });
  }, [story, goal]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted && hideGoals) {
      setViewType("Board");
      setTasksView("Board");
    }
    console.log("hi", hideGoals);

    return () => {
      isMounted = false;
    };
  }, [hideGoals]);

  const handleDeleteTask = async () => {
    try {
      await TaskAPI.deleteTasks(taskToDelete.id);
      setOriginalTasks((state) =>
        state.filter((e) => e.id !== taskToDelete.id)
      );
      setTaskToDelete(null);
    } catch (err) {
      console.log("Task delete error", err);
    }
  };

  return (
    <>
      <EditStory
        epic={epic}
        project={project}
        goal={goal || null}
        isOpen={selectedStoryToEdit ? true : false}
        closeModal={() => setSelectedStoryToEdit()}
        onUpdate={() => {}}
        editValues={selectedStoryToEdit}
        isEdit={true}
        onDelete={(val) => {
          setSelectedStoryToDelete(val);
        }}
      />

      <TaskCreate
        goal={goal}
        story={story}
        project={project}
        isOpen={openMobileCreateModal}
        closeModal={() => setOpenMobileCreateModal(false)}
        onCreate={() => fetchTasks({ page: 0 })}
      />
      <div className="flex flex-col lg:flex-row items-center justify-between space-y-2.5 lg:space-y-0 lg:space-x-2.5 mb-2.5">
        <div className="w-full lg:w-2/5">
          <SearchBox
            placeholder="Start typing to find..."
            search={search}
            setSearch={setSearch}
          />
        </div>
        <div className="flex flex-row items-center space-x-2.5">
          <div className="">
            <div className="block">
              <div className="flex flex-row items-center justify-between">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex justify-center items-center gap-2 w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                      Filter Tasks
                      <BsSliders className="w-4 h-4 ml-1.5" />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute z-30 right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {[
                          {
                            label: "All",
                            value: "All",
                          },
                          {
                            label: "Not Started",
                            value: "NotStarted",
                          },
                          {
                            label: "In Progress",
                            value: "InProgress",
                          },
                          {
                            label: "In Review",
                            value: "InReview",
                          },
                          {
                            label: "Completed",
                            value: "Completed",
                          },
                        ].map((i) => (
                          <Menu.Item>
                            {({ active }) => (
                              <div
                                className={classNames(
                                  filter === i?.value
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm cursor-pointer"
                                )}
                                onClick={() => {
                                  setFilter(i?.value);
                                }}
                              >
                                {i?.label}
                              </div>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>{" "}
          {(project ? canUpdateProject(project) : true) &&
            (goal ? canUpdateGoal(goal) : true) &&
            (epic ? canUpdateEpic(epic) : true) &&
            (story ? canUpdateStory(story) : true) && (
              <div className="">
                <div className="block">
                  <div className="flex flex-row items-center justify-between">
                    <ChronosButton
                      primary
                      text="Add New Task"
                      icon={<PlusIcon className="w-4 h-4 ml-1.5" />}
                      onClick={() => setOpenMobileCreateModal(true)}
                    />
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
      <div className="text-xs text-gray-400 my-3">
        Showing{" "}
        {(filter !== "All"
          ? tasks.filter((i) => i.status == filter).length
          : tasks?.length) || 0}{" "}
        tasks{" "}
        {filter !== "All" ? (
          <div className="inline-flex items-center">
            <span>
              in <strong>{filter}</strong> status
            </span>
            <FaTimes
              className="inline-block ml-2 text-sm cursor-pointer"
              onClick={() => setFilter("All")}
            />
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="mb-4 p-5 rounded-xl shadow-md bg-white ">
        {epic && story && (
          <div className="text-primary-gray-280 mb-2 ml-1 flex gap-1 items-center text-[14px]">
            Epics <ChevronRightIcon className="h-6" /> Stories{" "}
            <ChevronRightIcon className="h-6" />{" "}
            <strong className="text-primary-gray-1000">Tasks</strong>
          </div>
        )}
        {epic && story && (
          <div className="border relative border-gray-200 py-2 px-4 rounded-lg mb-6 bg-white">
            <h4 className="font-bold text-orange-500 text-xs">
              Epic : {epic?.title}
            </h4>
            <div className="bg-orange-500 px-2 py-[1px] inline-flex items-center text-white text-[11px] rounded-xl mt-2">
              <StoryIcon className="h-3 mr-1 white-opaque fill-white" />
              <span>Story</span>
            </div>
            <p className="text-xs text-gray-600 py-2">{story?.title}</p>
            {canUpdateProject(project) && canUpdateEpic(epic) && (
              <PencilAltIcon
                onClick={() => setSelectedStoryToEdit(story)}
                className="h-4 w-4 cursor-pointer absolute top-2 right-2"
              />
            )}
          </div>
        )}
        {tasks.length > 0 ? (
          <TasksList
            projectView={projectView}
            grid={
              project?.category == "Kanban"
                ? "lg:grid-cols-1 xl:grid-cols-2"
                : "lg:grid-cols-1 xl:grid-cols-2"
            }
            onUpdate={(id, val, field) => {
              let temp = tasks;
              let t = [];
              temp.map((item) => {
                if (item.id == id) {
                  if (field) {
                    item[field] = val;
                  } else {
                    item.students = [...val];
                  }
                  t.push(item);
                } else {
                  t.push(item);
                }
              });
              setTasks(t);
            }}
            afterDelete={(id) => {
              let temp = tasks;
              let t = [];
              temp.map((item) => {
                if (item.id == id) {
                } else {
                  t.push(item);
                }
              });
              setTasks(t);
            }}
            tasks={
              filter !== "All" ? tasks.filter((i) => i.status == filter) : tasks
            }
          />
        ) : (
          <div className="mt-8 mb-24 mx-auto text-center">
            <img
              src="/assets/images/empty/noTask.png"
              className="h-[200px] mx-auto"
            />
            <p className="text-base font-karla text-primary-yellow-dark mt-4">
              You have no tasks to show here{" "}
              {goal ? " for the selected goal" : ""}!
            </p>
            <div className="mx-auto flex justify-center mt-4">
              <ChronosButton
                primary
                text="Add New Task"
                icon={<PlusIcon className="w-4 h-4 ml-1.5" />}
                onClick={() => setOpenMobileCreateModal(true)}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Tasks;
