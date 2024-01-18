import { UserCircleIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { BsFolderSymlink } from "react-icons/bs";

function ViewBanner({
  project,
  selectedTab,
  setViewAllTask,
  setIsVisible,
  setSelectedTab,
}) {
  const [viewMore, setViewMore] = useState(false);
  useEffect(() => {
    if (window.innerWidth < 768) {
      setViewAllTask(true);
      setViewMore(true);
    } else {
      setViewAllTask(false);
    }
  }, []);
  return (
    <div className="mb-5 h-full">
      <div className="rounded-xl">
        <div className="px-5 py-3 h-full bg-primary-yellow-lightest shadow-lg rounded-xl relative transition-all transform ease-in-out duration-150">
          <div className="flex justify-between gap-3 md:gap-6 flex-col md:flex-row">
            <div className="w-full">
              <h1 className="text-2xl font-karla text-gray-900 font-semibold lg:text-[21px] flex items-center gap-3">
                {project?.image?.url ? (
                  <img
                    src={project?.image?.url}
                    alt={project?.title}
                    className="h-[60px] w-[60px] rounded-full"
                  />
                ) : (
                  <div className="h-[60px] max-h-[60px] w-[60px] min-w-[60px] rounded-full bg-primary-gray-300"></div>
                )}
                <span
                  className="cursor-pointer"
                  onClick={() => setSelectedTab("")}
                >
                  {project?.title}
                </span>
                {selectedTab == "" && (
                  <BsFolderSymlink
                    className="h-6 w-6 ml-2 cursor-pointer"
                    onClick={() => setIsVisible(true)}
                  />
                )}
              </h1>
            </div>
            <div className="flex gap-2 items-center justify-end w-full flex-wrap">
              {project?.members?.length > 0 &&
                project?.members?.map((item) => {
                  return (
                    <div className="bg-primary-yellow-lighter inline-block h-min px-2 py-1 rounded-md">
                      <div className="flex flex-col items-start">
                        <h1 className="font-semibold text-xs">
                          {item?.first_name}
                        </h1>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewBanner;
