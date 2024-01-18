import Project from "pages/Project/IndividualProject";
import { useEffect, useState } from "react";
import ProjectsList from "./ProjectList";
import { useSelector } from "react-redux";
import EmptyState from "components/Comman/EmptyState";
import YodaLoader from "components/Comman/Loaders/YodaLoader";

function ProjectsPageLaptop() {
  const projects = useSelector((state) => state.user.projectsList);
  const fetching = useSelector((state) => state.user.fetching);
  const [selectedProject, setSelectedProject] = useState();
  const [selectedProjectToEdit, setSelectedProjectToEdit] = useState();
  const [isAllProjectVisible, setIsAllProjectVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState("");

  useEffect(() => {
    setSelectedProject(projects?.length > 0 ? projects[0]?.id : null);
    setSelectedProjectToEdit(projects?.length > 0 ? projects[0]?.id : null);
  }, []);

  return (
    <>
      <ProjectsList
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        selectedProject={selectedProject}
        setIsAllProjectVisible={setIsAllProjectVisible}
      />

      {selectedProjectToEdit && (
        <div className="w-full max-h-95vh">
          <Project
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            projectId={selectedProjectToEdit}
            isAllProjectVisible={isAllProjectVisible}
            setIsAllProjectVisible={setIsAllProjectVisible}
          />
        </div>
      )}

      {!fetching ? (
        projects?.length === 0 && (
          <div
            className={`${
              !fetching && projects?.length == 0 ? "h-50vh" : "h-50vh"
            } h-50vh flex flex-row items-center justify-center`}
          >
            <EmptyState
              image="/assets/images/empty/goal.png"
              text={
                <span className="text-primary-yellow-dark text-center">
                  You are not a part of any projects.
                  <br />
                  Contact admin for more information.
                </span>
              }
            />
          </div>
        )
      ) : fetching ? (
        <div
          className={`${
            !fetching && projects?.length == 0 ? "h-50vh" : "h-50vh"
          } h-50vh flex flex-row items-center justify-center`}
        >
          <YodaLoader text="Fetching your projects!" />
        </div>
      ) : null}
    </>
  );
}

export default ProjectsPageLaptop;
