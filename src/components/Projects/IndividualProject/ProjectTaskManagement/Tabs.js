import Tabs from "components/Comman/Tabs";
import EpicTable from "components/Comman/Tabs/Epics/Epics";
import StoriesTable from "components/Comman/Tabs/Stories/Stories";
import TaskTable from "components/Comman/Tabs/Tasks/Tasks";

const ProjectTabs = ({
  project,

  goal,
  selectedTab,
  setSelectedTab,
  epic,
  story,
  setSelectedStory,
  setSelectedEpic,
  emptyMessage,
  hideGoals,
  setTasksView,
  tabs,
}) => {
  return (
    <div className="relative">
      <TaskTable
        projectView
        emptyMessage={emptyMessage}
        project={project}
        goal={goal}
        epic={epic}
        story={story}
        hideGoals={hideGoals}
        setTasksView={(val) => {
          setTasksView(val);
        }}
      />
    </div>
  );
};
export default ProjectTabs;
