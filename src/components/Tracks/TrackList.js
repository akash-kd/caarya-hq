import { SlidersHorizontal } from "@phosphor-icons/react";
import { TRACK_CATEGORY } from "helpers/constants/tracks";
import TrackCard from "./TrackCard";
import { useState } from "react";
import CreateEditTrack from "./Modal/CreateEditTrack";
import { MdSort } from "react-icons/md";

const filters = [
  { label: "Recently Created", value: "recentCreated" },
  { label: "Most Visited", value: "mostVisited" },
  { label: "Name", value: "name" },
  { label: "Most Goals", value: "mostGoals" },
];

function TrackList({ trackCategory, list }) {
  const [edit, setEdit] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");
  return (
    <>
      <CreateEditTrack
        isOpen={edit ? true : false}
        closeModal={() => setEdit()}
        trackCategory={edit?.category}
        editValues={edit}
      />
      <div className="p-4 space-y-5">
        <div className="flex flex-row items-center space-x-3 py-2">
          <img
            src={TRACK_CATEGORY?.find((t) => t?.value == trackCategory)?.image}
            alt=""
            className="w-5 h-5"
          />
          <p className="font-poppins font-medium text-primary-gray-300 tracking-wide leading-6 ">
            {TRACK_CATEGORY?.find((t) => t?.value == trackCategory)?.label}{" "}
            Tracks
          </p>
        </div>
        <div className="flex flex-row items-stretch space-x-2">
          <div className="min-w-max p-2 space-x-2 flex flex-row items-center text-primary-gray-400 text-sm font-lato font-semibold">
            <MdSort /> <p>Sort by:</p>
          </div>
          <div className="overflow-x-auto flex flex-row items-center space-x-2">
            {filters?.map((item) => {
              return (
                <div
                  onClick={() => setSelectedFilter(item.value)}
                  className={`min-w-max px-4 py-1.5 rounded-full border text-xs  font-lato ${
                    selectedFilter === item.value
                      ? " border-primary-yellow-medium font-semibold text-primary-gray-300"
                      : "border-primary-gray-80 text-primary-gray-400  font-light"
                  } `}
                >
                  {item?.label}
                </div>
              );
            })}
          </div>
        </div>
        <div className="pb-10">
          <div className="flex flex-col gap-[2px] bg-primary-gray-25 ">
            {list?.map((item) => {
              return <TrackCard item={item} onEdit={() => setEdit(item)} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default TrackList;
