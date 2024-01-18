import { QuestionMarkCircleIcon } from "@heroicons/react/solid";

import PriorityDropdown from "./PriorityDropdown";

function TaskLoaderCard({}) {
  return (
    <>
      <div className="p-3 px-2.5 flex flex-col w-full bg-white rounded-[3px] min-w-[250px] lg:max-w-[full] border">
        <div className="flex flex-row items-start justify-between space-x-2 relative">
          <div className="flex flex-col items-start w-10/12">
            {/* <div className="text-primary-gray-1000 cursor-pointer break-words h-2 w-2/4 bg-gray-200 rounded" /> */}
            <p className="text-xs inter cursor-pointer theme-gray-200 h-3 bg-gray-200 w-3/4 rounded"></p>
          </div>

          <div className="flex items-center">
            {/* <QuestionMarkCircleIcon className="w-3 h-3 bg-gray-300 text-gray-500 rounded-full flex-shrink-0 shadow-lg" />
            <div className="text-primary-gray-1000 cursor-pointer break-words h-2 w-[30px] bg-gray-200 rounded" /> */}
            <PriorityDropdown disabled={true} setPriorityValue={() => {}} />
          </div>
        </div>
        <div className="flex flex-col items-starts gap-2">
          <div className="flex flex-row items-center justify-start">
            <p className="text-primary-gray-250 font-lato text-2xs mr-1">
              Owned by:{" "}
            </p>
            <QuestionMarkCircleIcon className="w-3 h-3 bg-gray-300 text-gray-500 rounded-full flex-shrink-0 shadow-lg" />
            <p className="text-xs ml-1 inter cursor-pointer theme-gray-200 h-2 bg-gray-200 w-10 rounded-sm"></p>
          </div>
          <div className="flex flex-row items-center justify-start">
            <p className="text-primary-gray-250 font-lato text-2xs mr-1">
              Due Date:{" "}
            </p>
            <p className="text-xs inter cursor-pointer theme-gray-200 h-2 bg-gray-200 w-10 rounded-sm"></p>
          </div>
        </div>
        <div className="text-primary-gray-280 flex flex-row items-center justify-between mt-4">
          <div className="flex gap-1 md:gap-3 items-center">
            <p className="text-xs inter cursor-pointer theme-gray-200 h-2 bg-gray-200 w-16 rounded-sm"></p>

            <div className="flex flex-row items-center justify-center space-x-2 text-primary-gray-350 inter font-normal text-2xs">
              <div className="flex flex-row items-center space-x-0.5">
                <img
                  src="/assets/images/icons/comments.svg"
                  alt=""
                  className="w-2 h-3"
                />
                <p className="">{0}</p>
              </div>
              <div className="flex flex-row items-center space-x-0.5">
                <img
                  src="/assets/images/icons/files.svg"
                  alt=""
                  className="w-2 h-3"
                />
                <p className="">{0}</p>
              </div>
            </div>
          </div>
          <p className="text-xs inter cursor-pointer theme-gray-200 h-3 bg-gray-200 w-16 rounded-full"></p>
        </div>
      </div>
    </>
  );
}

export default TaskLoaderCard;
