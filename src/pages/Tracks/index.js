import { Plus } from "@phosphor-icons/react";
import BreadCrumb from "components/Comman/BreadCrumb";
import ChronosButton from "components/Comman/Buttons";
import CreateEditTrack from "components/Tracks/Modal/CreateEditTrack";
import TrackList from "components/Tracks/TrackList";
import { TRACK_CATEGORY } from "helpers/constants/tracks";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTracks } from "redux/tracks";

function Tracks() {
  const dispatch = useDispatch();
  const trackList = useSelector((state) => state?.tracks?.list);
  const [selectedCategory, setSelectedCategory] = useState("Caarya");
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);
  const [createNew, setCreateNew] = useState(false);

  const tabsRef = useRef([]);

  useEffect(() => {
    function setTabPosition() {
      const currentTab = tabsRef.current[activeTabIndex];
      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
      setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
    }

    setTabPosition();
    window.addEventListener("resize", setTabPosition);

    return () => window.removeEventListener("resize", setTabPosition);
  }, [activeTabIndex]);

  return (
    <>
      <CreateEditTrack
        isOpen={createNew}
        closeModal={() => setCreateNew(false)}
        trackCategory={selectedCategory}
        onCreate={() => {
          dispatch(fetchAllTracks());
        }}
      />
      <div className="relative">
        <BreadCrumb page1="Tracks" />
        <div className="relative grid grid-cols-4 border-b border-primary-gray-200 pt-2 pb-4">
          {TRACK_CATEGORY?.map((category, index) => {
            return (
              <div
                key={index}
                id={`selected-${category.value}`}
                ref={(el) => (tabsRef.current[index] = el)}
                onClick={() => {
                  setSelectedCategory(category?.value);
                  setActiveTabIndex(index);
                }}
                className="p-1 space-y-2 flex flex-col items-center"
              >
                <img src={category?.image} alt="" className="w-8 h-8" />
                <p
                  className={`font-lato text-2xs ${
                    selectedCategory == category?.value
                      ? "text-primary-gray-800 font-bold"
                      : "text-primary-gray-400 font-light"
                  }`}
                >
                  {category?.label}
                </p>
              </div>
            );
          })}
          <div
            style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
            className="bg-primary-yellow-700 rounded-full h-1 w-full absolute bottom-2 transition-all duration-300"
          />
        </div>
        <TrackList
          trackCategory={selectedCategory}
          list={trackList?.filter((t) => t?.category == selectedCategory)}
        />

        <div className="w-full flex flex-row items-center justify-end fixed bottom-20 right-4 ">
          <ChronosButton
            primary
            yellow
            float
            text="New Track"
            underline
            icon={<Plus size={12} />}
            iconReverse
            onClick={() => {
              setCreateNew(true);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Tracks;
