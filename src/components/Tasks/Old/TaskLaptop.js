import React, { useEffect, useState } from "react";

// Redux
import {
  fetchAllTasks,
  updateAddTask,
  updateTasksList,
} from "redux/task/index";

// APIs
import * as TaskAPI from "config/APIs/task/task";
import TaskListLoader from "components/Comman/Loaders/TaskListLoader";
import { useDispatch, useSelector } from "react-redux";
import StatusBoard from "./BoardView";
import DropdownInput from "components/Comman/Inputs/DropdownInput";
import TasksList from "components/Comman/Lists/TaskList";
import moment from "moment";
import {
  TASK_STATUS_COMPLETED,
  TASK_STATUS_INPROGRESS,
  TASK_STATUS_NOTSTARTED,
} from "helpers/task";
import EmptyTasks from "assets/icons/EmptyTasks.png";
import { SearchIcon, XIcon } from "@heroicons/react/solid";
import EmptyState from "components/Comman/EmptyState";

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

function TasksLaptop({
  search,
  selectedProject,
  selectedTab,
  setSearch,
  setSelectedProject,
  filterList,
  statQuery,
  setStatQuery,
  selectedGoal,
  goalFetching,
  setOpenCreate,
}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const allTasks = useSelector((state) => state.tasks);
  const [tempTask, setTempTask] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  const [view, setView] = useState("Cards");
  const [viewOriginal, setViewOriginal] = useState("Cards");
  const [fetching, setFetching] = useState(true);
  const [query, setQuery] = useState({});

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      if (selectedGoal) {
        getTasksForGoals();
      } else if (!goalFetching && !selectedGoal) {
        dispatch(updateAddTask({ refresh: false }));
        setFetching(false);
      } else {
        // let assignedAs = selectedTab == "creator" ? "owner" : selectedTab;
        // let t = allTasks[assignedAs]?.tasks || [];
        // setFetching(allTasks[assignedAs]?.fetching);
        // setTempTask(t);
        // const element = document.getElementById("scrollingDiv");
        // element?.scroll({
        //   top: 0,
        //   behavior: "smooth",
        // });
      }
    }
  }, [selectedTab, selectedGoal, goalFetching]);

  useEffect(() => {
    const element = document.getElementById("scrollingDiv");
    element?.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, [selectedTab, view, goalFetching]);

  function scrolling() {
    if (document.getElementById("scrollingDiv"))
      document.getElementById("scrollingDiv").addEventListener("scroll", load);

    return () => {
      if (document.getElementById("scrollingDiv"))
        document
          .getElementById("scrollingDiv")
          .removeEventListener("scroll", load);
    };
  }

  function isInViewport() {
    const element = document.getElementById("loadMore");
    if (element !== null) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      );
    }
  }

  const load = () => {
    if (isInViewport() && !loading) {
      setLoading(true);
      return;
    }
    setLoading(false);
  };

  // if a goal is selected then fetch tasks for that goal
  useEffect(() => {
    let assignedAs = selectedTab == "creator" ? "owner" : selectedTab;

    if (loading) {
      dispatch(fetchAllTasks(assignedAs, 1));
    }
  }, [loading]);

  // this will fetch tasks for the selected tab
  useEffect(() => {
    if (window.innerWidth >= 1024) {
      if (selectedGoal) {
        setTimeout(() => {
          if (selectedGoal && allTasks?.refreshList) {
            getTasksForGoals();
          }
        }, 200);
      } else {
        // let t = [];
        // let assignedAs = selectedTab == "creator" ? "owner" : selectedTab;
        // t = allTasks[assignedAs]?.tasks;
        // setFetching(allTasks[assignedAs]?.fetching);
        // if (allTasks[assignedAs]?.page + 1 == allTasks[assignedAs]?.totalPage) {
        //   setShowLoader(false);
        // }
        // setTempTask(t);
        // if (
        //   t?.length === 0 &&
        //   allTasks[assignedAs]?.page + 1 < allTasks[assignedAs]?.totalPage &&
        //   allTasks[assignedAs]?.fetching == false
        // ) {
        //   dispatch(
        //     fetchAllTasks(
        //       assignedAs,
        //       allTasks[assignedAs]?.page,
        //       selectedGoal?.id
        //     )
        //   );
        // }
      }
    }
  }, [allTasks]);

  const getTasksToShow = () => {
    let t = [];
    let assignedAs = selectedTab == "creator" ? "owner" : selectedTab;
    t =
      selectedProject?.value !== null
        ? allTasks[assignedAs]?.tasks?.filter(
            (i) => i?.project_id === selectedProject?.value
          )
        : allTasks[assignedAs]?.tasks;

    if (query?.time) {
      switch (query?.time) {
        case "today":
          t = t?.filter((i) => moment(i?.date).unix() <= moment().unix());
          break;
        case "week":
          t = t?.filter(
            (i) =>
              moment(i?.date).unix() <= moment().add(7, "days").unix() &&
              moment(i?.date).unix() > moment().unix()
          );
          break;
        case "later":
          t = t?.filter(
            (i) => moment(i?.date).unix() > moment().add(7, "days").unix()
          );
          break;
        default:
      }
    }

    if (statQuery?.filter) {
      switch (statQuery?.filter) {
        case 5:
          t = t?.filter((i) => i?.status === TASK_STATUS_NOTSTARTED);
          console.log(t);
          break;
        case 1:
          t = t?.filter((i) => i?.status === TASK_STATUS_INPROGRESS);
          break;
        case 3:
          t = t?.filter(
            (i) =>
              t?.status === TASK_STATUS_COMPLETED &&
              moment(i?.date).unix() >= moment().add(-7, "days").unix() &&
              moment(i?.date).unix() < moment().unix()
          );
          setViewOriginal(view);
          setView("Cards");

          break;
        default:
      }
    }
    if (assignedAs == "completed") {
      let q = { ...statQuery };
      delete q?.filter;
      setStatQuery(q);
    }
    if (search?.searchText !== "") {
      t = t?.filter((i) =>
        i?.title?.toLowerCase()?.includes(search?.searchText?.toLowerCase())
      );
    }

    return t;
  };

  const getTasksForGoals = async () => {
    dispatch(updateAddTask({ refresh: false }));
    setFetching(true);

    try {
      let q = {
        assignedAs: selectedTab == "creator" ? "owner" : selectedTab,
      };

      q["goal_id"] = selectedGoal?.id;

      const response = await TaskAPI.getAllTasks(q);

      if (response.status === 200) {
        let data = response.data.data?.response;
        setTempTask(data);
      }
    } catch (err) {
      console.log("task fetching error", err);
    }
    setFetching(false);
  };
  useEffect(() => {
    let t = [...getTasksToShow()];
    setTempTask(t);
  }, [
    selectedTab,
    statQuery?.filter,
    query?.time,
    selectedProject?.value,
    search?.searchText,
  ]);

  return (
    <>
      <div className="flex flex-row items-center justify-start space-x-3 pl-4 h-10 theme-input rounded-[4px] max-w-sm ml-auto relative -top-10">
        <SearchIcon className="text-primary-gray-1000 h-5" />

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

      <div className="col-span-2 grid grid-cols-12 gap-5">
        <div className="col-span-5"></div>
      </div>

      {view == "Cards" ? (
        <div className="relative p-5 md:p-8 bg-white rounded-[8px]">
          <div
            onScroll={scrolling}
            id="scrollingDiv"
            className={`max-h-62vh overflow-y-auto ${
              !fetching ? "block" : "hidden"
            }`}
          >
            <div className="w-full h-full flex flex-row items-center space-x-3 mb-2">
              <h1 className="text-xs font-lato font-normal text-primary-gray-300 flex flex-row items-center">
                Showing:{" "}
                <p className="font-bold ml-0.5">
                  {` ${
                    selectedTab == "owner"
                      ? tempTask?.filter(
                          (task) =>
                            !selectedGoal ||
                            (selectedGoal && selectedGoal?.id == task?.goal?.id)
                        )?.length
                      : selectedTab == "creator"
                      ? tempTask?.filter(
                          (task) =>
                            (!selectedGoal && task?.owner?.id == user?.id) ||
                            (selectedGoal &&
                              task?.owner?.id == user?.id &&
                              selectedGoal?.id == task?.goal?.id)
                        ).length
                      : tempTask?.filter(
                          (task) =>
                            !selectedGoal ||
                            (selectedGoal && selectedGoal?.id == task?.goal?.id)
                        )?.length
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
                    ? "tasks you own"
                    : selectedTab == "collaborator"
                    ? "tasks you are collaborating in"
                    : selectedTab == "requestedFocus"
                    ? "tasks requested for you to focus on"
                    : "completed tasks"}
                  {selectedGoal ? ` for ${selectedGoal?.title}` : ""}
                </p>
              </h1>
              {statQuery?.filter && (
                <XIcon
                  className="w-3 h-3 cursor-pointer text-primary-gray-1000"
                  onClick={() => {
                    let q = { ...statQuery };
                    delete q?.filter;
                    setStatQuery(q);
                  }}
                />
              )}
            </div>
            {!fetching ? (
              selectedTab == "owner" ? (
                tempTask?.length > 0 ? (
                  categories?.map((category, i) => {
                    if (
                      (!selectedGoal &&
                        tempTask?.filter(
                          (task) => task?.in_focus == category?.value
                        ).length > 0) ||
                      (selectedGoal &&
                        tempTask?.filter(
                          (task) =>
                            task?.in_focus == category?.value &&
                            selectedGoal?.id == task?.goal?.id
                        ).length > 0)
                    )
                      return (
                        <>
                          <h1
                            className={`text-xl font-lato font-bold text-primary-gray-1000 mb-4 ${
                              i == 0 ? "mt-0" : "mt-8"
                            }`}
                          >
                            {category?.name}
                          </h1>
                          {tempTask?.filter(
                            (task) =>
                              (!selectedGoal &&
                                task?.in_focus == category?.value) ||
                              (selectedGoal &&
                                task?.in_focus == category?.value &&
                                selectedGoal?.id == task?.goal?.id)
                          ).length > 0 ? (
                            <TasksList
                              grid="lg:grid-cols-1 xl:grid-cols-2"
                              tasks={tempTask?.filter((task) => {
                                return (
                                  (!selectedGoal &&
                                    task?.in_focus == category?.value) ||
                                  (selectedGoal &&
                                    task?.in_focus == category?.value &&
                                    selectedGoal?.id == task?.goal?.id)
                                );
                              })}
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

                                dispatch(
                                  updateTasksList({ list: t, tab: selectedTab })
                                );
                              }}
                              afterDelete={(id) => {
                                let temp = [];
                                temp = allTasks[selectedTab]?.tasks;

                                let t = temp?.filter((i) => i?.id !== id);

                                dispatch(
                                  updateTasksList({ list: t, tab: selectedTab })
                                );
                              }}
                            />
                          ) : (
                            <div className="flex justify-center items-center flex-col py-10 gap-2">
                              <p className="text-gray-500 text-sm">
                                You have no tasks in this category
                              </p>
                              <div className="relative h-[149px] w-[192px] overflow-hidden">
                                <img
                                  src={EmptyTasks}
                                  alt="empty epics"
                                  className="relative h-full w-full object-contain"
                                />
                              </div>
                            </div>
                          )}
                        </>
                      );
                  })
                ) : (
                  <EmptyState
                    text="You have no tasks in this category"
                    image={EmptyTasks}
                    ctaText="Add Task +"
                    cta={() => {
                      setOpenCreate(true);
                    }}
                  />
                )
              ) : (
                <>
                  {tempTask?.length > 0 ? (
                    <TasksList
                      grid="lg:grid-cols-1 xl:grid-cols-2"
                      tasks={tempTask?.filter((task) => {
                        console.log(task?.owner?.id == user?.id);
                        if (selectedGoal) {
                          if (selectedTab == "creator")
                            return (
                              task?.owner?.id == user?.id &&
                              selectedGoal?.id == task?.goal?.id
                            );
                          else return selectedGoal?.id == task?.goal?.id;
                        } else {
                          if (selectedTab == "creator")
                            return task?.owner?.id == user?.id;
                          else return task;
                        }
                      })}
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

                        dispatch(
                          updateTasksList({ list: t, tab: selectedTab })
                        );
                      }}
                      afterDelete={(id) => {
                        let temp = [];
                        temp = allTasks[selectedTab]?.tasks;

                        let t = temp?.filter((i) => i?.id !== id);

                        dispatch(
                          updateTasksList({ list: t, tab: selectedTab })
                        );
                      }}
                      ctaText="Add Task +"
                      cta={() => {
                        setOpenCreate(true);
                      }}
                    />
                  ) : (
                    <EmptyState
                      text="You have no tasks in this category"
                      image={EmptyTasks}
                    />
                  )}
                </>
              )
            ) : null}
            {showLoader && !fetching && !search?.isSearch && (
              <div id="loadMore" className="w-full h-10"></div>
            )}
            {showLoader &&
              fetching &&
              !search?.isSearch &&
              selectedProject?.value == null && (
                <div className="w-full">
                  <TaskListLoader />
                </div>
              )}
          </div>

          {fetching && <TaskListLoader />}
        </div>
      ) : (
        <div className="w-full relative">
          <div className="relative">
            <div
              onScroll={scrolling}
              id="scrollingDiv"
              className={`max-h-58vh overflow-y-auto ${
                !fetching ? "block" : "hidden"
              }`}
            >
              {tempTask.length > 0 && (
                <StatusBoard
                  selectedTab={selectedTab}
                  onUpdate={(id, val, field) => {
                    console.log(id);
                    let temp = [];
                    switch (selectedTab) {
                      case "owner":
                        temp = allTasks?.owner?.tasks;
                        break;
                      case "creator":
                        temp = allTasks?.creator?.tasks;
                        break;
                      case "collaborator":
                        temp = allTasks?.collaborator?.tasks;
                        break;
                      case "completed":
                        temp = allTasks?.completed?.tasks;
                        break;
                      default:
                    }
                    let t = [];
                    temp.map((item) => {
                      if (item.id == id) {
                        let i = { ...item };
                        if (field) {
                          i[field] = val;
                        } else {
                          i.students = [...val];
                        }
                        t.push(i);
                      } else {
                        t.push(item);
                      }
                    });

                    dispatch(updateTasksList({ list: t, tab: selectedTab }));
                  }}
                  afterDelete={(id) => {
                    let temp = [];
                    switch (selectedTab) {
                      case "owner":
                        temp = allTasks?.owner?.tasks;
                        break;
                      case "creator":
                        temp = allTasks?.creator?.tasks;
                        break;
                      case "collaborator":
                        temp = allTasks?.collaborator?.tasks;
                        break;
                      case "completed":
                        temp = allTasks?.completed?.tasks;
                        break;
                      default:
                    }

                    let t = temp?.filter((i) => i?.id !== id);

                    dispatch(updateTasksList({ list: t, tab: selectedTab }));
                  }}
                  data={tempTask}
                  fetching={
                    showLoader &&
                    !fetching &&
                    !search?.isSearch &&
                    selectedProject?.value == null
                  }
                />
              )}
            </div>

            {!fetching &&
              (tempTask.length == 0 ||
                (selectedProject?.value !== null &&
                  !tempTask?.find(
                    (i) => i?.project?.type === selectedProject?.value
                  ))) && (
                <div className="flex justify-center items-center flex-col py-10 gap-2">
                  <p className="text-gray-500 text-sm">
                    You have no tasks in this category
                  </p>
                  <div className="relative h-[149px] w-[192px] overflow-hidden">
                    <img
                      src={EmptyTasks}
                      alt="empty epics"
                      className="relative h-full w-full object-contain"
                    />
                  </div>
                </div>
              )}

            {fetching && (
              <div className="h-full grid grid-cols-3 gap-x-4">
                {["Not Started", "In Progress", "Completed"]?.map((i) => {
                  return (
                    <div className="px-5 py-2 m-2 bg-primary-yellow-lightest rounded-[40px]">
                      <div className="text-center text-xl font-lato font-normal py-2 text-primary-gray-1000">
                        {i}
                      </div>

                      <div className="px-4 py-2.5">
                        <div className="flex flex-row items-center space-x-2">
                          <img
                            alt=""
                            src={"/assets/svg/icon/rocket.svg"}
                            className="rounded-full h-5 w-5"
                          />
                          <div className="w-1/2 h-4 bg-primary-yellow-lighter animate-pulse rounded"></div>
                        </div>
                      </div>
                      <TaskListLoader listViewOnly />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default TasksLaptop;
