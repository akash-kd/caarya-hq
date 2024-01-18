import { useState, useEffect } from "react";
// Redux
import { useSelector } from "react-redux";

import {
  PROJECT_CATEGORY,
  PROJECT_CATEGORY_CGC,
  PROJECT_TYPES_BY_CATEGORY,
} from "helpers/projects";
import Tabs from "components/Comman/Tabs";
import ProjectByCategory from "./ProjectByCategory";

function ProjectsPageMobile() {
  const list = useSelector((state) => state?.projects?.categorizedList);
  const [selectedTab, setSelectedTab] = useState(PROJECT_CATEGORY_CGC);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedTab]);

  return (
    <>
      {/* <WideModalsWrapper
        isOpen={openIssue}
        closeModal={() => {
          setOpenIssue(false);
        }}
        component={
          <ProjectIssues
            projectId={selectedFilter?.value}
            setFilter={setSelectedIssue}
          />
        }
      />{" "} */}
      <Tabs
        tabs={PROJECT_CATEGORY.map((a) => ({
          label: a?.name,
          value: a?.name,
        }))}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <div className="max-h-85vh overflow-x-hidden">
        <ProjectByCategory
          category={selectedTab}
          list={list?.find((t) => t?.name == selectedTab)?.types}
          types={
            PROJECT_TYPES_BY_CATEGORY?.find((t) => t?.name == selectedTab)
              ?.types
          }
        />
      </div>
    </>
  );
}

export default ProjectsPageMobile;
