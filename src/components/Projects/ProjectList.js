import { ChevronRightIcon } from "@heroicons/react/solid";
import { useSelector } from "react-redux";
import { AiOutlineArrowRight } from "react-icons/ai";

/**
 * Displays the Project List Component
 * @param {Function} setSelectedProject
 * @param {Object} selectedProject - Object containing selected Project Details
 * @returns
 */

function ProjectsList({
  selectedProject,
  setIsAllProjectVisible,
  selectedTab,
  setSelectedTab,
}) {
  const projects = useSelector((state) => state.user.projectsList);

  return (
    <div className={`project-container-box-expanded -mb-16`}>
      <div className={`show-projects`}>
        <div className="flex flex-row justify-between items-center mb-3 md:mb-6 space-x-6 w-[90%] lg:w-[98%] mx-auto">
          <div className="font-lato flex flex-col lg:flex-row lg:items-center justify-between text-sm gap-1 w-full">
            <div className="flex items-center">
              <span className="text-gray-400 cursor-pointer hover:underline">
                Projects
              </span>
              {projects?.find((p) => p?.id == selectedProject)?.title && (
                <p
                  onClick={() => {
                    if (selectedTab !== "") setSelectedTab("");
                  }}
                  className={`flex gap-1 hover:underline underline-offset-2 ${
                    selectedTab == ""
                      ? "text-primary-gray-1000"
                      : "text-gray-400"
                  }`}
                >
                  {projects?.find((p) => p?.id == selectedProject)?.title && (
                    <>
                      <ChevronRightIcon className=" w-5 ml-1" />
                    </>
                  )}
                  <p className="font-semibold max-w-[120px] cursor-pointer sm:max-w-[200px] whitespace-nowrap overflow-ellipsis overflow-hidden">
                    {projects?.find((p) => p?.id == selectedProject)?.title}
                  </p>
                </p>
              )}

              {selectedTab !== "" && (
                <p className="flex gap-1 text-primary-gray-1000">
                  <ChevronRightIcon className="w-5 ml-1" />

                  <p className="font-semibold max-w-[120px] sm:max-w-[200px] whitespace-nowrap overflow-ellipsis overflow-hidden">
                    Documents
                  </p>
                </p>
              )}
            </div>
            <p
              className="cursor-pointer text-primary-gray-1000 text-sm font-lato underline flex items-center gap-1 justify-end"
              onClick={() => {
                setIsAllProjectVisible(true);
              }}
            >
              View all projects <AiOutlineArrowRight />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectsList;
