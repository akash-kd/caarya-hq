import { X } from "@phosphor-icons/react";
import { RiShareBoxLine } from "react-icons/ri";
import Drawer from "@mui/material/Drawer";

export const ProjectDetails = ({
  isVisible,
  project,
  setIsVisible,
  setSelectedTab,
}) => {
  return (
    <Drawer
      anchor={window.innerWidth < 1024 ? "bottom" : "right"}
      PaperProps={{
        style: {
          borderRadius: window.innerWidth < 1024 ? "20px 20px 0px 0px" : "0px",
          maxHeight: "100vh",
          height: "100%",
          width: window.innerWidth < 1024 ? "100%" : "560px",
        },
      }}
      open={isVisible}
      onClose={() => {
        setIsVisible(false);
      }}
      transitionDuration={250}
    >
      <div className="bg-white  h-screen">
        <div className="flex justify-between items-center px-5 py-3">
          <h1 className="text-xl font-semibold text-[#2D3748]">
            Project Detailed View
          </h1>
          <button
            className="text-gray-700"
            onClick={() => {
              setIsVisible(false);
            }}
          >
            <X />
          </button>
        </div>

        <div className="px-5 py-3">
          <div className="bg-primary-yellow-lightest shadow-xl rounded-xl px-4 py-3">
            <h1 className="text-2xl font-karla text-gray-900 font-semibold lg:text-[21px] flex items-center gap-3">
              {project?.image?.url ? (
                <img
                  src={project?.image?.url}
                  alt={project?.title}
                  className="h-[50px] w-[50px] rounded-full"
                />
              ) : (
                <div className="h-[50px] max-h-[50px] w-[50px] min-w-[50px] rounded-full bg-primary-gray-300"></div>
              )}
              <span>{project?.title}</span>
            </h1>
            <p className="mt-3 text-sm text-gray-500">{project?.description}</p>
          </div>

          <div className="mt-8">
            <h1 className="text-lg font-semibold text-[#2D3748]">
              Team Members
            </h1>
            <div className="flex gap-2 items-center w-full flex-wrap">
              {project?.members?.length > 0 &&
                project?.members?.map((item) => {
                  return (
                    <div className="inline-block h-min px-2 py-1 rounded-md shadow-md">
                      <div className="flex flex-col items-start">
                        <h1 className="font-semibold text-base text-gray-500 flex items-center gap-2">
                          {item?.image?.url ? (
                            <img
                              src={item?.image?.url}
                              alt={item?.title}
                              className="h-[32px] w-[32px] rounded-full"
                            />
                          ) : (
                            <div className="h-[32px] max-h-[32px] w-[32px] min-w-[32px] rounded-full bg-gray-200"></div>
                          )}
                          <div className="flex flex-col">
                            <span>{item?.first_name}</span>
                            <span className="text-xs text-gray-400 font-light">
                              {item?.designation?.designation_name}
                            </span>
                          </div>
                        </h1>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="mt-8">
            <h1 className="text-lg font-semibold text-[#2D3748]">
              Documentation Links
            </h1>

            <div className="flex gap-3 w-full flex-col mt-2">
              <div className="border border-[#E2E9F3] rounded-md">
                <div
                  className="flex items-center justify-between px-3 py-2 cursor-pointer"
                  onClick={() => {
                    setSelectedTab("FRD");
                    setIsVisible(false);
                  }}
                >
                  <h1 className="text-sm font-semibold text-gray-500">FRD</h1>
                  <button className="text-gray-500">
                    <RiShareBoxLine />
                  </button>
                </div>
              </div>
              <div className="border border-[#E2E9F3] rounded-md">
                <div
                  className="flex items-center justify-between px-3 py-2 cursor-pointer"
                  onClick={() => {
                    setSelectedTab("BRD");
                    setIsVisible(false);
                  }}
                >
                  <h1 className="text-sm font-semibold text-gray-500">BRD</h1>
                  <button className="text-gray-500">
                    <RiShareBoxLine />
                  </button>
                </div>
              </div>
              <div className="border border-[#E2E9F3] rounded-md">
                <div
                  className="flex items-center justify-between px-3 py-2 cursor-pointer"
                  onClick={() => {
                    setSelectedTab("Epics & Stories");
                    setIsVisible(false);
                  }}
                >
                  <h1 className="text-sm font-semibold text-gray-500">
                    Epics & Stories
                  </h1>
                  <button className="text-gray-500">
                    <RiShareBoxLine />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export const AllProjects = ({
  isVisible,
  projects,
  setIsVisible,
  selectedProject,
  setSelectedProject,
}) => {
  return (
    <Drawer
      anchor={window.innerWidth < 1024 ? "bottom" : "right"}
      PaperProps={{
        style: {
          borderRadius: window.innerWidth < 1024 ? "20px 20px 0px 0px" : "0px",
          maxHeight: "100vh",
          height: "100%",
          width: window.innerWidth < 1024 ? "100%" : "560px",
        },
      }}
      open={isVisible}
      onClose={() => {
        setIsVisible(false);
      }}
      transitionDuration={250}
    >
      <div className="bg-white h-screen">
        <div className="flex justify-between items-center px-8 py-3">
          <h1 className="text-xl font-semibold text-[#2D3748]">All Projects</h1>
          <button
            className="text-gray-700"
            onClick={() => {
              setIsVisible(false);
            }}
          >
            <X />
          </button>
        </div>

        <div className="px-8 py-3">
          <div className="flex flex-col gap-3">
            {projects?.length > 0 &&
              projects?.map((item) => {
                return (
                  <div
                    className={`border shadow-sm rounded-md px-4 py-3 cursor-pointer ${
                      selectedProject?.id === item?.id
                        ? "bg-primary-yellow-lightest border-transparent shadow-xl"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedProject(item);
                      setIsVisible(false);
                    }}
                  >
                    <h1 className="font-karla text-gray-900 lg:text-[21px] flex items-center gap-3">
                      {item?.image?.url ? (
                        <img
                          src={item?.image?.url}
                          alt={item?.title}
                          className="h-[44px] w-[44px] rounded-full"
                        />
                      ) : (
                        <div className="h-[44px] max-h-[44px] w-[44px] min-w-[44px] rounded-full bg-gray-200"></div>
                      )}
                      <span className="text-lg">{item?.title}</span>
                    </h1>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </Drawer>
  );
};
