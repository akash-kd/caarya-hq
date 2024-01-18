import React, { useEffect, useState } from "react";
import {
  PROJECT_CATEGORY_AGILE_SCRUM,
  PROJECT_CATEGORY_KANBAN,
  PROJECT_TYPE_PERSONAL,
} from "helpers/projects";
import { AiOutlineClose } from "react-icons/ai";

import ProjectTabs from "./Tabs";
import GoalsList from "./GoalsList";

const FilterItem = ({ type, message, handleClick }) => {
  return (
    <div className="relative p-2 px-3 bg-white border border-gray-300 rounded-lg text-xs font-lato">
      <AiOutlineClose
        onClick={handleClick}
        className="w-5 h-5 absolute -top-3 -right-3 text-white bg-gray-200 rounded-full p-1"
      />
      <strong>{type}: </strong> {message}
    </div>
  );
};

function ProjectTaskManagemnet({
  permissions,
  project,
  viewAllTask,
  setViewAllTask,
}) {
  const [selectedGoal, setSelectedGoal] = useState();
  const [selectedEpic, setSelectedEpic] = useState();
  const [selectedStory, setSelectedStory] = useState();
  const [selectedTab, setSelectedTab] = useState("Epics");
  const [taskView, setTaskView] = useState("Cards");
  const [hideGoals, setHideGoals] = useState(false);
  const [tabs, setTabs] = useState([
    { label: "Epics", value: "Epics" },
    { label: "Stories", value: "Stories" },
    { label: "To-Do", value: "To-Do" },
    // { label: "Bugs", value: "Bugs" },
  ]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if (project?.type !== PROJECT_TYPE_PERSONAL) {
        switch (project?.category) {
          case PROJECT_CATEGORY_AGILE_SCRUM:
            if (window.innerWidth < 768) {
              setTabs([
                { label: "To-Do", value: "To-Do" },
                { label: "Epics", value: "Epics" },
                { label: "Stories", value: "Stories" },
                // { label: "Bugs", value: "Bugs" },
              ]);
              setSelectedTab("To-Do");
              setTaskView("Cards");
            } else {
              setTabs([
                { label: "Epics", value: "Epics" },
                { label: "Stories", value: "Stories" },
                { label: "To-Do", value: "To-Do" },
                // { label: "Bugs", value: "Bugs" },
              ]);
              setSelectedTab("Epics");
              setTaskView("Cards");
            }
            break;
          case PROJECT_CATEGORY_KANBAN:
            setTabs([
              { label: "To-Do", value: "To-Do" },
              // { label: "Bugs", value: "Bugs" },
            ]);
            setSelectedTab("To-Do");
            setTaskView("Cards");
          default:
            return;
        }
      }
      setViewAllTask(false);
    }

    return () => {
      isMounted = false;
    };
  }, [project?.id]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (selectedStory && selectedTab !== "To-Do") {
        setSelectedTab("To-Do");
      }
      setViewAllTask(false);
    }

    return () => {
      isMounted = false;
    };
  }, [selectedStory, project?.id]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (selectedEpic && selectedTab !== "Stories") {
        setSelectedTab("Stories");
      }
      setViewAllTask(false);
    }

    return () => {
      isMounted = false;
    };
  }, [selectedEpic, project?.id]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (selectedTab == "Epics") {
        setSelectedEpic(null);
      }
      if (selectedTab == "Stories") {
        setSelectedStory(null);
      }
      setViewAllTask(false);
    }
    return () => {
      isMounted = false;
    };
  }, [selectedTab]);

  useEffect(() => {
    let isMounted = true;
    if (viewAllTask) {
      setSelectedTab("To-Do");
      let el = document.getElementById("project-tabs");
      el.scrollIntoView({ behavior: "smooth" });
    }
    return () => {
      isMounted = false;
    };
  }, [viewAllTask]);
  return (
    <>
      <div className="lg:mb-8 flex gap-4 flex-wrap px-5 lg:px-0">
        {/* {selectedGoal && (
          <FilterItem
            type="Goals"
            message={selectedGoal?.title}
            handleClick={() => {
              setSelectedGoal(null);
            }}
          />
        )} */}
        {selectedEpic && (
          <FilterItem
            type="Epic"
            message={selectedEpic?.title}
            handleClick={() => {
              setSelectedEpic(null);
            }}
          />
        )}
        {selectedStory && (
          <FilterItem
            type="Stories"
            message={selectedStory?.title}
            handleClick={() => {
              setSelectedStory(null);
            }}
          />
        )}
      </div>

      <div className="w-full flex flex-col lg:flex-row items-start justify-between space-y-2.5 lg:space-y-0 lg:space-x-5 xl:mt-5">
        {taskView == "Cards" && (
          <div className="w-full xl:w-1/3 min-w-[315px] ">
            <div className="px-5 lg:px-0">
              <GoalsList
                selectedGoal={selectedGoal}
                setSelectedGoal={(val) => setSelectedGoal(val)}
                project={project}
                setHideGoals={(val) => {
                  setHideGoals(val);
                }}
              />
            </div>
          </div>
        )}
        <div
          className={`${taskView == "Cards" ? "w-full xl:w-2/3" : "w-full"}`}
        >
          <div id="project-tabs" className="px-5 lg:px-0">
            <ProjectTabs
              emptyMessage={
                selectedTab == "Epics"
                  ? "Select a Goal to view it's details"
                  : selectedTab == "Stories"
                  ? "Select a Epic to view it's Stories"
                  : selectedTab == "To-Do"
                  ? "Select a Story to view it's To-Do"
                  : ""
              }
              selectedTab={selectedTab}
              setSelectedTab={(val) => {
                setSelectedTab(val);
              }}
              tabs={tabs}
              hideGoals={hideGoals}
              project={project}
              permissions={permissions}
              goal={selectedGoal}
              setSelectedGoal={setSelectedGoal}
              // Epic={selectedEpic?.id === 0 ? null : selectedEpic}
              epic={selectedEpic}
              story={selectedStory?.id === 0 ? null : selectedStory}
              setSelectedEpic={(val) => {
                setSelectedEpic(val);
                // SetSelectedTab("Stories");
              }}
              setSelectedStory={(val) => {
                setSelectedStory(val);
                setSelectedTab("To-Do");
              }}
              setTasksView={(val) => {
                // SetTaskView(val);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectTaskManagemnet;
