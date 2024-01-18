import { useHistory } from "react-router-dom";

import { randomColor } from "helpers/utils/randomColor";

function ProjectList({ projects }) {
  const history = useHistory();
  return (
    <>
      {projects.length > 0 &&
        projects.map((project) => {
          return (
            <div
              key={project?.id}
              className="pt-3 pb-4 px-3 flex flex-row items-center justify-between relative border-b border-gray-200 cursor-pointer"
              onClick={() => {
                // history.push({
                //   pathname: `/squadUser/${project?.id}`,
                //   state: { user: project },
                // });
              }}
            >
              <div className="grid xs:grid-cols-6 w-full">
                <div className="flex flex-row items-center col-span-6">
                  <div
                    className={`w-12 h-12 flex flex-row items-center justify-center rounded-full `}
                  >
                    {project?.image?.url ? (
                      <img
                        src={project?.image?.url}
                        className="rounded-full h-12 w-12"
                        alt=""
                      />
                    ) : (
                      <div
                        style={{ background: randomColor(Math.random()) }}
                        className="flex flex-row items-center justify-center h-11 w-11 flex-shrink-0 mx-auto rounded-full object-cover"
                      >
                        <p className="m-0 text-xl text-white">
                          {project?.title?.charAt(0).toUpperCase()}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="text-md inter theme-gray-300 font-semibold cursor-pointer break-all">
                      {project.title}
                    </p>

                    <p className="text-xs inter max-w-max cursor-pointer theme-gray-300">
                      {project?.description}
                    </p>
                    {/* <p className="text-xs font-light theme-gray-300 max-w-max cursor-pointer">
                      {project?.designation?.rank?.rank_name}
                    </p> */}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}

export default ProjectList;
