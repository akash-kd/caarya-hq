import React, { useEffect, useState } from "react";

// Redux
import { updateTasksList } from "redux/task/index";

// APIs
import TasksList from "components/Comman/Lists/TaskList";
import EmptyState from "components/Comman/EmptyState";
import TaskListLoader from "components/Comman/Loaders/TaskListLoader";
import { useDispatch, useSelector } from "react-redux";
import EmptyTasks from "assets/icons/EmptyTasks.png";
import { X } from "@phosphor-icons/react";
import {
  TASK_STATUS_COMPLETED,
  TASK_STATUS_INPROGRESS,
  TASK_STATUS_NOTSTARTED,
} from "helpers/task";
const categories = [
  {
    name: "Requested to focus",
    value: 2,
  },
  {
    name: "Current focus",
    value: 1,
  },
  {
    name: "Due Today",
    value: 0,
  },
];
function Tasks({
  search,
  selectedProject,
  selectedTab,
  statQuery,
  setStatQuery,
  selectedGoal,
  goalFetching,
  setOpenCreate,
}) {
  const dispatch = useDispatch();

  const allTasks = useSelector((state) => state.tasks);
  const [tempTask, setTempTask] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    setFetching(allTasks?.fetching);
    if (!allTasks?.fetching) {
      getTasks();
    }
  }, [allTasks, selectedTab, selectedGoal, goalFetching]);

  const getTasks = () => {
    let t = [];

    switch (selectedTab) {
      case "dashboard":
        t = allTasks?.dueToday?.tasks;
        break;
      case "owner":
        t = allTasks?.owner?.tasks;
        break;
      case "collaborator":
        t = allTasks?.collaborator?.tasks;
        break;
      case "icebox":
        t = allTasks?.icebox?.tasks;
        break;
      default:
    }

    setTempTask(t);
  };

  const getTasksToShow = () => {
    let t = [];
    t =
      selectedProject?.value !== null
        ? tempTask?.filter((i) => i?.project_id === selectedProject?.value)
        : tempTask;

    if (search?.searchText !== "") {
      t = t?.filter((i) =>
        i?.title?.toLowerCase()?.includes(search?.searchText?.toLowerCase())
      );
    }

    switch (statQuery?.filter) {
      case 1:
        t = t?.filter((a) => a?.status == TASK_STATUS_INPROGRESS);
        break;
      case 3:
        t = t?.filter((a) => a?.status == TASK_STATUS_COMPLETED);
        break;
      case 4:
        t = t?.filter(
          (a) =>
            a?.status == TASK_STATUS_NOTSTARTED ||
            a?.status == TASK_STATUS_INPROGRESS
        );
        break;
      case 5:
        t = t?.filter((a) => a?.status == TASK_STATUS_NOTSTARTED);
        break;
      default:
    }

    if (selectedGoal && selectedTab !== "icebox")
      t = t?.filter((i) => i?.goal?.id == selectedGoal?.id);

    return t;
  };

  return (
    <>
      {/* <div className="hidden lg:flex flex-row items-stretch max-w-sm ml-auto relative -top-10 cursor-pointer">
        <div className="flex flex-row items-center justify-start space-x-3 pl-4 h-[38px] theme-input rounded-[4px] ">
          <MagnifyingGlass size={20} className="text-primary-gray-1000 h-5" />

          <input
            placeholder="Find your task!"
            value={search?.searchText}
            name="search"
            className="text-xs font-lato bg-transparent placeholder:text-primary-gray-250 w-11/12 focus:outline-none border-0 border-primary-gray-250"
            onChange={(e) => {
              e.target.value = e.target.value.trimStart();
              setSearch({
                ...search,
                searchText: e.target.value,
                isSearch: e.target.value !== "",
              });
            }}
          ></input>
        </div>
        <div className="h-full w-1/2">
          <DropdownInput
            srOnly
            dark
            list={filterList}
            value={selectedProject?.value}
            setValue={(val) => {
              setSelectedProject(filterList?.find((i) => i?.value == val));
            }}
          />
        </div>
      </div> */}
      <div className="w-full relative">
        <div className="md:p-8 relative bg-white p-5 rounded-[8px]">
          <div
            id="scrollingDiv"
            className={`max-h-60vh overflow-y-auto ${
              !fetching ? "block" : "hidden"
            }`}
          >
            <div className="w-full h-full hidden lg:flex flex-row items-center space-x-3 mb-2">
              <h1 className="text-xs font-lato font-normal text-primary-gray-300 flex flex-row items-center">
                Showing:{" "}
                <p className="font-bold ml-0.5">
                  {` ${
                    selectedTab == "dashboard"
                      ? getTasksToShow()?.length +
                        (allTasks?.requestedFocus?.tasks?.length || 0) +
                        (allTasks?.inFocus?.tasks?.length || 0)
                      : getTasksToShow()?.length
                  } `}
                  {selectedTab !== "completed"
                    ? statQuery?.filter == 5
                      ? "Not started "
                      : statQuery?.filter == 1
                      ? "In progress "
                      : statQuery?.filter == 3
                      ? "Completed "
                      : statQuery?.filter == 4
                      ? "All "
                      : ""
                    : ""}
                  {selectedTab == "owner"
                    ? "tasks you own"
                    : selectedTab == "creator"
                    ? "tasks you created"
                    : selectedTab == "collaborator"
                    ? "tasks you are collaborating in"
                    : selectedTab == "requestedFocus"
                    ? "tasks requested for you to focus on"
                    : selectedTab == "icebox"
                    ? "tasks without a goal"
                    : "tasks"}
                  {selectedGoal && selectedTab !== "icebox"
                    ? ` for ${selectedGoal?.title}`
                    : ""}
                </p>
              </h1>
              {statQuery?.filter && (
                <X
                  className="w-3 h-3 cursor-pointer text-primary-gray-1000"
                  onClick={() => {
                    let q = { ...statQuery };
                    delete q?.filter;
                    setStatQuery(q);
                  }}
                />
              )}
            </div>
            {selectedTab == "dashboard" ? (
              <>
                {getTasksToShow()?.length > 0 ? (
                  <TasksList
                    grid="lg:grid-cols-1 xl:grid-cols-2"
                    selectedTab={selectedTab}
                    onUpdate={(id, val, field) => {
                      let temp = [];
                      temp = allTasks[selectedTab]?.tasks;

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

                      dispatch(updateTasksList({ list: t, tab: selectedTab }));
                      if (selectedGoal) {
                        temp = tempTask;

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
                        setTempTask(t);
                      }
                    }}
                    afterDelete={(id) => {
                      let temp = [];
                      temp = allTasks[selectedTab]?.tasks;
                      let t = temp?.filter((i) => i?.id !== id);

                      dispatch(updateTasksList({ list: t, tab: selectedTab }));
                      if (selectedGoal) {
                        temp = tempTask;

                        let t = temp?.filter((i) => i?.id !== id);
                        setTempTask(t);
                      }
                    }}
                    tasks={getTasksToShow()}
                  />
                ) : (
                  <div className="flex flex-row items-center justify-center min-h-40vh">
                    <EmptyState
                      image={EmptyTasks}
                      text="Oops! Looks like your plate is empty!"
                      ctaText="Add Task +"
                      cta={() => {
                        setOpenCreate(true);
                      }}
                    />
                  </div>
                )}

                {allTasks?.inFocus?.tasks?.length > 0 && (
                  <>
                    <h1
                      className={`text-xl font-lato font-bold text-primary-gray-1000 mb-4 mt-8`}
                    >
                      Current focus
                    </h1>

                    <TasksList
                      grid="lg:grid-cols-1 xl:grid-cols-2"
                      tasks={allTasks?.inFocus?.tasks}
                      selectedTab={selectedTab}
                      onUpdate={(id, val, field) => {
                        let temp = [];
                        temp = allTasks?.inFocus?.tasks;
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

                        dispatch(updateTasksList({ list: t, tab: "inFocus" }));
                      }}
                      afterDelete={(id) => {
                        let temp = [];
                        temp = allTasks?.inFocus?.tasks;

                        let t = temp?.filter((i) => i?.id !== id);

                        dispatch(updateTasksList({ list: t, tab: "inFocus" }));
                      }}
                    />
                  </>
                )}
                {allTasks?.requestedFocus?.tasks?.length > 0 && (
                  <>
                    <h1
                      className={`text-xl font-lato font-bold text-primary-gray-1000 mb-4 mt-8`}
                    >
                      Requested to focus
                    </h1>

                    <TasksList
                      grid="lg:grid-cols-1 xl:grid-cols-2"
                      tasks={allTasks?.requestedFocus?.tasks}
                      selectedTab={selectedTab}
                      onUpdate={(id, val, field) => {
                        let temp = [];
                        temp = allTasks?.requestedFocus?.tasks;
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

                        dispatch(
                          updateTasksList({ list: t, tab: "requestedFocus" })
                        );
                      }}
                      afterDelete={(id) => {
                        let temp = [];
                        temp = allTasks?.requestedFocus?.tasks;

                        let t = temp?.filter((i) => i?.id !== id);

                        dispatch(
                          updateTasksList({ list: t, tab: "requestedFocus" })
                        );
                      }}
                    />
                  </>
                )}
              </>
            ) : (
              <>
                {getTasksToShow()?.length > 0 ? (
                  <TasksList
                    grid="lg:grid-cols-1 xl:grid-cols-2"
                    selectedTab={selectedTab}
                    onUpdate={(id, val, field) => {
                      let temp = [];
                      temp = allTasks[selectedTab]?.tasks;

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

                      dispatch(updateTasksList({ list: t, tab: selectedTab }));
                      if (selectedGoal) {
                        temp = tempTask;

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
                        setTempTask(t);
                      }
                    }}
                    afterDelete={(id) => {
                      let temp = [];
                      temp = allTasks[selectedTab]?.tasks;
                      let t = temp?.filter((i) => i?.id !== id);

                      dispatch(updateTasksList({ list: t, tab: selectedTab }));
                      if (selectedGoal) {
                        temp = tempTask;

                        let t = temp?.filter((i) => i?.id !== id);
                        setTempTask(t);
                      }
                    }}
                    tasks={getTasksToShow()}
                  />
                ) : (
                  <div className="flex flex-row items-center justify-center min-h-40vh">
                    <EmptyState
                      image={EmptyTasks}
                      text="Oops! Looks like your plate is empty!"
                      ctaText="Add Task +"
                      cta={() => {
                        setOpenCreate(true);
                      }}
                    />
                  </div>
                )}
              </>
            )}
          </div>

          {fetching && <TaskListLoader />}
        </div>
      </div>
    </>
  );
}

export default Tasks;
