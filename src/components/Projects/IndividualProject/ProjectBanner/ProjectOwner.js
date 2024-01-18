import { QuestionMarkCircleIcon, UserCircleIcon } from "@heroicons/react/solid";
import { ReactComponent as EpicIcon } from "assets/icons/Epic.svg";
import { ReactComponent as StoryIcon } from "assets/icons/Story.svg";
import { ReactComponent as TaskIcon } from "assets/icons/Task.svg";
import { ReactComponent as BugIcon } from "assets/icons/Bug.svg";
import moment from "moment";

function ProjectOwner({ project }) {
  return (
    <div className="mb-5 font-lato h-full">
      {/* <div className="h-6" /> */}
      <div className="p-5 bg-white rounded-xl relative h-full flex flex-col justify-between max-h-25vh lg:max-h-[auto] overflow-y-hidden">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 h-full overflow-y-auto">
          {project?.owner && (
            <div className="flex flex-row items-center space-x-3">
              {project?.owner?.image?.url ? (
                <img
                  src={project?.owner?.image?.url}
                  alt="member"
                  className="w-6 h-6 bg-gray-300 text-gray-500 rounded-full flex-shrink-0 shadow-lg object-cover"
                />
              ) : (
                <UserCircleIcon className="w-6 h-6 bg-gray-300 text-gray-500 rounded-full flex-shrink-0 shadow-lg" />
              )}
              <div className="flex flex-col items-start">
                <h1 className="font-bold text-xs">
                  {project?.owner?.first_name}
                </h1>
                <h1 className="text-2xs opacity-50">Project Owner</h1>
              </div>
            </div>
          )}
          {project?.members?.length > 0 &&
            project?.members?.map((item) => {
              return (
                <div className="flex flex-row items-center space-x-3">
                  {item?.image?.url ? (
                    <img
                      src={item?.image?.url}
                      alt="member"
                      className="w-6 h-6 bg-gray-300 text-gray-500 rounded-full flex-shrink-0 shadow-lg object-cover"
                    />
                  ) : (
                    <UserCircleIcon className="w-6 h-6 bg-gray-300 text-gray-500 rounded-full flex-shrink-0 shadow-lg" />
                  )}
                  <div className="flex flex-col items-start">
                    <h1 className="font-bold text-xs">{item?.first_name}</h1>
                    <h1 className="text-2xs opacity-70 capitalize">
                      {item?.designation?.role?.role_name ||
                        item?.userProjects?.type}
                    </h1>
                  </div>
                </div>
              );
            })}
        </div>
        {/* <div>
          <div className="flex justify-between items-start">
            <div>
              {project?.owner ? (
                <>
                  {project?.owner?.image?.url ? (
                    <img
                      src={project?.owner?.image?.url}
                      alt="member"
                      className="w-11 h-11 bg-gray-300 text-gray-500 rounded-full flex-shrink-0 shadow-lg object-cover"
                    />
                  ) : (
                    <UserCircleIcon className="w-11 h-11 bg-gray-300 text-gray-500 rounded-full flex-shrink-0 shadow-lg" />
                  )}
                </>
              ) : (
                <div className="flex -space-x-4">
                  <QuestionMarkCircleIcon className="w-11 h-11 bg-gray-300 text-gray-300 rounded-full flex-shrink-0 shadow-lg" />
                </div>
              )}
            </div>
            <div className="flex flex-col items-end">
              <div className="flex flex-row items-center -space-x-3">
                {project?.members?.length > 0 &&
                  project?.members?.map((item) => {
                    return (
                      <>
                        {item?.image?.url ? (
                          <img
                            src={item?.image?.url}
                            alt="member"
                            className="w-6 h-6 bg-gray-300 text-gray-500 rounded-full flex-shrink-0 shadow-lg object-cover"
                          />
                        ) : (
                          <UserCircleIcon className="w-6 h-6 bg-gray-300 text-gray-500 rounded-full flex-shrink-0 shadow-lg" />
                        )}
                      </>
                    );
                  })}
              </div>
              <div className="text-xs underline mt-1">
                <a href="#">View Team</a>
              </div>
            </div>
          </div>
          <h3 className="text-md font-lato text-gray-900 font-bold lg:text-xl">
            Project Owner
          </h3>
          <p className="text-xs">
            Created-{moment(project?.createdAt).format("Do MMM, YYYY")}
          </p>
        </div>

        <div className="mt-5 flex flex-col gap-y-2">
          <div className="flex gap-3 items-center text-green-500 font-semibold text-[11px] md:text-[13px]">
            <div className="w-9 h-7 min-w-[34px] bg-green-50 flex items-center justify-center rounded-md">
              <EpicIcon className="h-4 w-4 fill-green-500" />
            </div>
            Epics are large overarching initiatives
          </div>
          <div className="flex gap-3 items-center xl:justify-between text-yellow-700 font-semibold text-[11px] md:text-[13px]">
            <div className="w-9 h-7 min-w-[34px] bg-yellow-50 flex items-center justify-center rounded-md">
              <StoryIcon className="h-4 w-4 fill-yellow-700" />
            </div>
            <p className="w-100">
              Stories are something the team can commit to finish within a one
              or two-week sprint
            </p>
          </div>
          <div className="flex gap-3 items-center text-blue-500 font-semibold text-[11px] md:text-[13px]">
            <div className="w-9 h-7 min-w-[34px] bg-blue-50 flex items-center justify-center rounded-md">
              <TaskIcon className="h-4 w-4 fill-blue-500" />
            </div>
            Tasks are the actions that make up stories
          </div>
          <div className="flex gap-3 items-center text-red-500 font-semibold text-[11px] md:text-[13px]">
            <div className="w-9 h-7 min-w-[34px] bg-red-50 flex items-center justify-center rounded-md">
              <BugIcon className="h-4 w-4 fill-red-500" />
            </div>
            Bugs are tasks to fix things
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default ProjectOwner;
