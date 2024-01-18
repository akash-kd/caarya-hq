import React, { useEffect, useState } from "react";

// Redux
import {
  fetchAllTasks,
  updateAddTask,
  updateTasksList,
} from "redux/task/index";

// APIs
import * as TaskAPI from "config/APIs/task/task";
import TasksList from "components/Comman/Lists/TaskList";
import EmptyState from "components/Comman/EmptyState";
import TaskListLoader from "components/Comman/Loaders/TaskListLoader";
import { useDispatch, useSelector } from "react-redux";
import EmptyTasks from "assets/icons/EmptyTasks.png";

function Tasks({
  search,
  selectedProject,
  selectedTab,
  selectedGoal,
  goalFetching,
  setOpenCreate,
}) {
  const dispatch = useDispatch();

  const allTasks = useSelector((state) => state.tasks);

  const [tempTask, setTempTask] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const [fetching, setFetching] = useState(true);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      if (selectedGoal) {
        getTasksForGoals();
      } else if (!goalFetching && !selectedGoal) {
        dispatch(updateAddTask({ refresh: false }));
        setFetching(false);
      } else {
        // let assignedAs = selectedTab == "creator" ? "owner" : selectedTab;
        // if (
        //   allTasks[assignedAs]?.tasks?.length === 0 ||
        //   allTasks[assignedAs]?.tasks?.totalPage == null
        // )
        //   dispatch(fetchAllTasks(assignedAs, -1));
        // let t = allTasks[assignedAs]?.tasks;
        // setFetching(allTasks[assignedAs]?.fetching);
        // setTempTask(t);
      }

      const element = document.getElementById("scrollingDiv");
      element?.scroll({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [selectedTab, selectedGoal, goalFetching]);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        if (selectedGoal && allTasks?.refreshList) {
          getTasksForGoals();
        }
      }, 200);
    }
  }, [allTasks]);

  // useEffect(() => {
  //   if (!selectedGoal) {
  //     let t = [];
  //     let assignedAs = selectedTab == "creator" ? "owner" : selectedTab;

  //     t = allTasks[assignedAs]?.tasks;
  //     setFetching(allTasks[assignedAs]?.fetching);
  //     if (allTasks[assignedAs]?.page + 1 >= allTasks[assignedAs]?.totalPage) {
  //       setShowLoader(false);
  //     } else {
  //       if (t?.length < 3) {
  //         load();
  //       }
  //       setShowLoader(true);
  //     }

  //     setTempTask(t);

  //     if (
  //       t?.length === 0 &&
  //       allTasks[assignedAs]?.page + 1 < allTasks[assignedAs]?.totalPage
  //     ) {
  //       dispatch(fetchAllTasks(assignedAs, allTasks[assignedAs]?.page));
  //     }
  //   }
  // }, [allTasks]);

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
    console.log("hi", element);
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
    if (isInViewport()) {
      if (!loading) {
        setLoading(true);
        console.log("loading to true");
      }
    } else {
      console.log("loading to false");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedGoal) {
      let assignedAs = selectedTab == "creator" ? "owner" : selectedTab;
      if (loading) {
        // dispatch(fetchAllTasks(assignedAs, allTasks[assignedAs]?.page));
      }
    }
  }, [loading]);

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

    if (selectedGoal) t = t?.filter((i) => i?.goal?.id == selectedGoal?.id);

    return t;
  };

  return (
    <>
      <div className="w-full relative">
        <div className="md:mx-7.5 relative bg-white p-5 rounded-[8px]">
          <div
            onScroll={scrolling}
            id="scrollingDiv"
            className={`max-h-60vh overflow-y-auto ${
              !fetching ? "block" : "hidden"
            }`}
          >
            {tempTask.length > 0 && (
              <TasksList
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
            )}

            {/* {showLoader && !fetching && !search?.isSearch && !selectedGoal && (
              <div id="loadMore" className="w-full max-h-60vh text-center">
                <TaskListLoader />
              </div>
            )} */}
          </div>
          {!fetching &&
            (tempTask.length === 0 ||
              (
                selectedProject?.value !== null &&
                tempTask?.find(
                  (i) => i?.project?.type === selectedProject?.value
                )
              )?.length == 0) && (
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
          {console.log(":::", selectedGoal, goalFetching, fetching)}{" "}
          {fetching && tempTask.length === 0 && <TaskListLoader />}
        </div>
      </div>
    </>
  );
}

export default Tasks;
