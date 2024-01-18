import { useState, useEffect } from "react";
// Redux
import { useSelector } from "react-redux";

import EmptyState from "components/Comman/EmptyState";
import ProjectList from "components/Comman/Lists/ProjectLists";
import { ProjectTypes } from "helpers/projects";
import { AdjustmentsIcon } from "@heroicons/react/outline";
import IconFilter from "components/Comman/Inputs/IconFilter";
import SearchBox from "components/Comman/Inputs/SearchBox";

function ProjectsPageMobile() {
  const userProjects = useSelector((state) => state.user.projects);
  const [showing, setShowing] = useState("");
  const [selectedProjectType, setSelectedProjectType] = useState({
    label: "All Projects",
    value: null,
  });
  const [search, setSearch] = useState({
    searchText: "",
    isSearch: false,
  });

  useEffect(() => {
    // if (!selectedProjectType?.value) {
    //   let temp = [];
    //   Object.keys(userProjects)?.map((key) => {
    //     temp = temp.concat(userProjects[key]);
    //   });
    //   let str = `${temp?.length} projects`;
    //   setShowing(str);
    // } else {
    //   setShowing(
    //     `${
    //       userProjects[selectedProjectType?.value]?.length || 0
    //     } ${selectedProjectType?.label.replace("Projects", "")} project${
    //       userProjects[selectedProjectType?.value]?.length > 1 ? "s" : ""
    //     } `
    //   );
    // }
    setShowing(selectedProjectType?.label);
  }, [selectedProjectType, userProjects]);

  return (
    <>
      <div className="px-7.5 pt-2.5">
        <SearchBox
          placeholder="Looking for a project?"
          search={search}
          setSearch={setSearch}
        />
      </div>

      <div className="z-20 w-full py-2 pl-8 pr-6 flex flex-row items-center justify-between">
        <h1 className="text-xs font-lato font-normal w-full text-primary-gray-900 flex flex-row items-center">
          Showing <p className="font-bold ml-1">{showing}</p>
        </h1>
        <IconFilter
          icon={AdjustmentsIcon}
          list={[...ProjectTypes]
            ?.concat([
              {
                label: "All Projects",
                value: null,
              },
            ])
            .reverse()}
          iconCss="text-primary-gray-1000 h-4 w-5 transform rotate-90"
          onClick={(val) => {
            setSelectedProjectType(val);
          }}
          selected={selectedProjectType}
        />
      </div>

      <div className="max-h-70vh overflow-x-hidden">
        <div className="w-full px-8 pb-0 space-y-5 min-h-60vh max-h-60vh overflow-y-auto">
          {Object.keys(userProjects).length > 0 &&
            Object.keys(userProjects).map((type) => {
              if (
                (selectedProjectType?.value !== null &&
                  selectedProjectType?.value === type) ||
                selectedProjectType?.value == null
              ) {
                if (
                  userProjects[type].filter((e) =>
                    e?.title
                      .toLowerCase()
                      .includes(search?.searchText.toLowerCase())
                  )?.length > 0 ||
                  userProjects[type]?.length > 0
                )
                  return (
                    <ProjectList
                      category={
                        ProjectTypes.find((e) => e.value == type)?.label
                      }
                      projects={
                        search?.isSearch
                          ? userProjects[type].filter((e) =>
                              e?.title
                                .toLowerCase()
                                .includes(search?.searchText.toLowerCase())
                            )
                          : userProjects[type]
                      }
                    />
                  );
              }
            })}
          {Object.keys(userProjects).length == 0 && (
            <EmptyState text="You don't have any projects yet!" />
          )}
        </div>
      </div>
    </>
  );
}

export default ProjectsPageMobile;
