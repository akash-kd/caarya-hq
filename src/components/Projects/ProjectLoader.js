import React from "react";
function ProjectLoader() {
  return (
    <div className="grid grid-cols-2 gap-5">
      <div className=" cursor-pointer bg-white shadow-container rounded-20px">
        <div>
          <div className="relative group py-5 px-5 focus-within:ring-0 animate-pulse">
            <div>
              <span className="bg-primary-orange-dark text-2xs text-white rounded-full inline-flex px-2 py-0.5"></span>
            </div>
            <div className="mt-2 flex flex-col items-start w-full">
              <h3 className="">
                <div className="focus:outline-none w-full">
                  <p className="w-10/12 text-sm line-clamp-2 leading-4 font-lato text-primary-gray-1000 cursor-pointer break-words font-bold">
                    <p className="font-lato text-sm h-2 rounded bg-primary-orange-lighter animate-pulse w-full font-normal text-primary-gray-600"></p>
                  </p>
                </div>
              </h3>
              <p className="font-lato text-sm h-2 mt-1 rounded w-7/12 bg-primary-orange-lighter animate-pulse w-full font-normal text-primary-gray-600"></p>

              <a
                target="_blank"
                className="mt-4 text-xs font-bold text-primary-orange-darkest border-primary-orange-lighter break-all inter border-t pt-2 w-full"
              >
                <p className="font-lato text-sm h-2 rounded w-20 bg-primary-orange-lighter animate-pulse w-full font-normal text-primary-gray-600"></p>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className=" cursor-pointer bg-white shadow-container rounded-20px">
        <div>
          <div className="relative group py-5 px-5 focus-within:ring-0 animate-pulse">
            <div>
              <span className="bg-primary-orange-dark text-2xs text-white rounded-full inline-flex px-2 py-0.5"></span>
            </div>
            <div className="mt-2 flex flex-col items-start w-full">
              <h3 className="">
                <div className="focus:outline-none w-full">
                  <p className="w-10/12 text-sm line-clamp-2 leading-4 font-lato text-primary-gray-1000 cursor-pointer break-words font-bold">
                    <p className="font-lato text-sm h-2 rounded bg-primary-orange-lighter animate-pulse w-full font-normal text-primary-gray-600"></p>
                  </p>
                </div>
              </h3>
              <p className="font-lato text-sm h-2 mt-1 rounded w-7/12 bg-primary-orange-lighter animate-pulse w-full font-normal text-primary-gray-600"></p>

              <a
                target="_blank"
                className="mt-4 text-xs font-bold text-primary-orange-darkest border-primary-orange-lighter break-all inter border-t pt-2 w-full"
              >
                <p className="font-lato text-sm h-2 rounded w-20 bg-primary-orange-lighter animate-pulse w-full font-normal text-primary-gray-600"></p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectLoader;
