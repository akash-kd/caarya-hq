import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import * as ProjectAPI from "config/APIs/project";
import ProjectBanner from "components/Projects/IndividualProject/ProjectBanner";
import ProjectTaskManagement from "components/Projects/IndividualProject/ProjectTaskManagement";
import DetailedView from "components/Projects/IndividualProject/ProjectTaskManagement/DetailedView";

function Project({
  projectId,
  setIsAllProjectVisible,
  isAllProjectVisible,
  selectedTab,
  setSelectedTab,
}) {
  const params = useParams();
  const { id } = params;
  const [project, setProject] = useState();
  const [fetching, setFetching] = useState(false);
  const [viewAllTask, setViewAllTask] = useState(false);

  const fetchProject = async () => {
    setFetching(true);
    try {
      const response = await ProjectAPI.findOne({
        projectId: id || projectId,
      });
      const { project: fetchedProject } = response.data.data;

      setProject(fetchedProject);
    } catch (err) {
      console.log("Fetch project error", err);
    }
    setFetching(false);
  };

  useEffect(() => {
    fetchProject();
  }, [id, projectId]);

  return (
    <>
      <div className="max-h-95vh pt-2.5 px-0 md:px-2.5">
        <ProjectBanner
          project={project}
          setProject={setProject}
          setViewAllTask={setViewAllTask}
          setIsAllProjectVisible={setIsAllProjectVisible}
          isAllProjectVisible={isAllProjectVisible}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        <div className="lg:pt-5">
          {selectedTab === "" ? (
            <ProjectTaskManagement
              project={project}
              viewAllTask={viewAllTask}
              setViewAllTask={setViewAllTask}
            />
          ) : (
            <DetailedView
              project={project}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Project;
