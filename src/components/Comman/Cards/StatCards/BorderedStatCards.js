//Icons
import { ChevronRightIcon } from "@heroicons/react/solid";

const BorderedStatCard = ({ item, onClick, selected }) => {
  return (
    <div key={item.id} className="relative overflow-hidden font-lato">
      <div
        onClick={onClick}
        className={`${
          item?.id === selected?.id
            ? "issues-border-card-selected text-white"
            : "issues-border-card text-primary-indigo-650"
        } w-10/12 mx-auto cursor-pointer`}
      >
        <div className="py-2 px-4">
          <div className="flex items-center justify-center gap-4">
            <div className="flex flex-row items-center w-max">
              <p className="text-sm 2xl:text-[18px] font-normal inter mr-2">
                {item.stat || 0}
              </p>
              <p className="ml-2 capitalize  text-[18px] font-normal inter line-clamp-2">
                {item.name}
              </p>
            </div>

            <div className="">
              <ChevronRightIcon className="h-6 w-6 card-hover-arrow" />{" "}
              <span className="sr-only"> {item.name} stats</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BorderedStatCard;
