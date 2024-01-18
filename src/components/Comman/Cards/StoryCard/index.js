import {
  PaperAirplaneIcon,
  CollectionIcon,
  FlagIcon,
  PencilAltIcon,
} from "@heroicons/react/outline";
import { GoalStatus } from "helpers/goals";
import { getDayDiff } from "helpers/utils/task/goal";
import { TASK_TYPE_TASKS, TASK_TYPE_BUGS } from "helpers/task";
import { UserCircleIcon } from "@heroicons/react/solid";
import { ReactComponent as StoryIcon } from "assets/icons/Story.svg";

const StoryCard = ({ story, onClick, onEdit }) => {
  console.log("Story", story);
  return (
    <>
      <div
        onClick={() => {
          onClick();
        }}
        className="p-4 bg-primary-yellow-lightest rounded-lg"
      >
        <div>
          <div className="">
            <div className="float-right">
              {onEdit && (
                <div className=" cursor-pointer z-10" onClick={onEdit}>
                  <PencilAltIcon className=" h-5 white-opaque" />
                </div>
              )}
              <p>
                <div className="flex">
                  {story?.students?.map((owner) => (
                    <>
                      {owner?.image?.url ? (
                        <img
                          src={owner?.image?.url}
                          alt="member"
                          className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 text-gray-300 rounded-full flex-shrink-0 shadow-lg"
                        />
                      ) : (
                        <UserCircleIcon className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 text-gray-500 rounded-full flex-shrink-0 shadow-lg" />
                      )}
                    </>
                  ))}
                </div>
              </p>
            </div>
            <div className="flex justify-between font-lato">
              <div className="bg-primary-orange-400 px-2 py-[2px] flex items-center text-white text-[11px] rounded-xl">
                <StoryIcon className="h-3 mr-1 white-opaque fill-white" />
                <span>Stories</span>
              </div>
              <div className="text-primary-orange-400 font-extrabold text-xs cursor-pointer">
                View tasks({story?.tasks?.length || 0})
              </div>
            </div>
          </div>
          <div className="block mt-2">
            <div className="">
              <p className="font-lato text-xs w-full card-title tracking-tight overflow-y-scroll text-gray-800 sm:h-28 mt-1 sm:mt-2 sm:mb-0 inline-block align-middle">
                {story?.title || "No Title"}{" "}
              </p>
            </div>
            {/* <div className="mt-2 text-2xs poppins font-medium flex flex-row flex-wrap text-gray-600 leading-6">
              <div className="flex items-center justify-between  w-full">
                <div className="flex items-center gap-2">
                  Created by{" "}
                  <img
                    // Src={owner?.image?.url}
                    alt="member"
                    className="w-6 h-6 bg-gray-200 text-gray-300 rounded-full flex-shrink-0 shadow-lg"
                  />
                </div>
                <p>17-02-2023</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default StoryCard;
