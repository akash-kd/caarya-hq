import { useState } from "react";
import EditBanner from "./EditBanner";
import ViewBanner from "./ViewBanner";
import { AllProjects, ProjectDetails } from "./Sidebar";
import { useSelector } from "react-redux";

function ProjectBanner({
  project,
  setProject,
  setViewAllTask,
  isAllProjectVisible,
  setIsAllProjectVisible,
  setSelectedTab,
  selectedTab,
}) {
  const [isEditable, setEditable] = useState(false);
  const [isProjectDetailsVisible, setIsProjectDetailsVisible] = useState(false);
  const projects = useSelector((state) => state.user.projectsList);

  return (
    <div className="px-5 lg:px-0">
      {isEditable ? (
        <EditBanner
          project={project}
          setProject={setProject}
          isEditable={isEditable}
          setEditable={(val) => {
            setEditable(val);
          }}
        />
      ) : (
        <div className="mt-2.5">
          <ViewBanner
            project={project}
            isEditable={isEditable}
            setEditable={(val) => {
              setEditable(val);
            }}
            setIsVisible={setIsProjectDetailsVisible}
            setViewAllTask={setViewAllTask}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
          {/* <ProjectOwner project={project} /> */}
        </div>
      )}

      <ProjectDetails
        project={project}
        isVisible={isProjectDetailsVisible}
        setIsVisible={setIsProjectDetailsVisible}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />

      <AllProjects
        projects={projects}
        isVisible={isAllProjectVisible}
        setIsVisible={setIsAllProjectVisible}
        setSelectedProject={setProject}
        selectedProject={project}
      />
    </div>
  );
}

export default ProjectBanner;
