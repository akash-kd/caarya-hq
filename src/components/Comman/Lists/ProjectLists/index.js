import { useHistory } from "react-router-dom";

import { randomColor } from "helpers/utils/randomColor";
import { getProjectName } from "helpers/projects";

function ProjectList({ category, projects }) {
  const history = useHistory();
  return (
    <div className="space-y-2.5">
      <h1 className="text-xs ml-3 font-lato font-semibold leading-4 text-primary-gray-900">
        {category}
      </h1>
      <div className="grid grid-cols-2 gap-5">
        {projects.length > 0 &&
          projects.map((project) => {
            return (
              <div
                key={project?.id}
                onClick={() => {
                  history.push(`/project/${project?.id}`);
                }}
                className="flex flex-col items-center space-y-2.5"
              >
                <div
                  className="p-5 aspect-square flex flex-col items-center justify-center rounded-20px w-full bg-white"
                  style={{
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.12)",
                  }}
                >
                  {project?.image?.url ? (
                    <img
                      src={project?.image?.url}
                      className="rounded-md aspect-square object-contain"
                      alt=""
                    />
                  ) : (
                    <div
                      style={{ background: randomColor(Math.random()) }}
                      className="flex flex-row items-center justify-center h-24 w-24 flex-shrink-0 mx-auto rounded-full object-cover"
                    >
                      <p className="m-0 text-xl text-white">
                        {project?.title?.charAt(0).toUpperCase()}
                      </p>
                    </div>
                  )}
                </div>

                <p className="text-xs font-lato break-words text-primary-gray-1000 font-normal cursor-pointer text-center">
                  {getProjectName(project)}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ProjectList;
