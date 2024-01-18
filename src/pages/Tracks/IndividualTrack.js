import { Plus } from "@phosphor-icons/react";
import BreadCrumb from "components/Comman/BreadCrumb";
import ChronosButton from "components/Comman/Buttons";
import TrackGoalList from "components/Tracks/IndividualTrack/TrackGoalList";
import { destroyATrack, findOneTrack } from "config/APIs/tracks";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useParams } from "react-router-dom";
import { filterByDate } from "helpers/utils/common/filter";
import GoalCreateEdit from "components/Modals/Goal/GoalCreate/GoalCreateEdit";
import { defaultTracks } from "helpers/constants/tracks";
import { TrackIcon } from "components/Tracks/TrackCard";
import CreateEditTrack from "components/Tracks/Modal/CreateEditTrack";
import { MdEditNote, MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { fetchAllTracks } from "redux/tracks";
import { showToast } from "redux/toaster";
import DeleteTrackModal from "components/Tracks/Modal/DeleteTrack";
import { BsThreeDotsVertical } from "react-icons/bs";

function IndividualTrack() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const user = useSelector((state) => state?.user?.user);
  const [createNew, setCreateNew] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("ME");
  const history = useHistory();
  const dispatch = useDispatch();

  const handleFilterChange = (param) => {
    setSelectedFilter(param);
  };

  const getCollaborator = () => {
    let user1 = data?.members?.filter((m) => m?.id !== user?.id);
    return user1?.length > 0 ? user1[0] : null;
  };
  const getTrack = async () => {
    try {
      const response = await findOneTrack(id);

      setData(response?.data?.data);
    } catch (err) {
      console.log("Error", err);
    }
  };
  const isDefaultTrack = useMemo(
    () => defaultTracks?.map((a) => a?.title)?.includes(data?.title),
    [data]
  );
  const handleDelete = async () => {
    setDeleting(true);
    try {
      await destroyATrack(id);
      setDeleting(false);
      dispatch(showToast({ message: "Track deleted successfully!" }));
      history.goBack();
    } catch (err) {
      console.log("Error", err);
      setDeleting(false);
      dispatch(
        showToast({ message: err.response?.data?.message, tye: "error" })
      );
    }
  };

  useEffect(() => {
    getTrack();
  }, []);

  const getGoals = (time) => {
    let temp = filterByDate(data?.goals, "dueDate", time);
    return temp;
  };
  return (
    <>
      <GoalCreateEdit
        isOpen={createNew}
        closeModal={() => setCreateNew(false)}
        onCreate={() => getTrack()}
        track={data}
      />
      <CreateEditTrack
        isOpen={showEdit}
        closeModal={() => setShowEdit(false)}
        trackCategory={data?.category}
        editValues={data}
      />
      <DeleteTrackModal
        loader={deleting}
        isOpen={deleteModal}
        closeModal={() => setDeleteModal(false)}
        onAccept={() => {
          handleDelete();
          setDeleteModal(false);
        }}
      />
      <div className="relative">
        <BreadCrumb
          page1={data?.category + " Track"}
          page2={data?.title}
          back
        />
        <div className="py-6 px-4 flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center gap-4 relative pb-5 border-b ">
              <div className="flex gap-4 items-center ">
                <TrackIcon item={data} />
                <div className="flex flex-col items-start">
                  <h1 className="text-primary-gray-800 font-poppins tracking-wide text-md leading-6 font-medium">
                    {data?.title}
                  </h1>
                  {!isDefaultTrack && (
                    <p className="text-primary-gray-300 font-lato text-xs font-light">
                      Shared with <u>You</u> &{" "}
                      <u>{getCollaborator()?.first_name}</u>
                    </p>
                  )}
                </div>
              </div>
              {!isDefaultTrack && (
                <div
                  onClick={() => setShowMenu(true)}
                  className="bg-primary-gray-200 w-7 h-7 rounded-full flex flex-row items-center justify-center  "
                >
                  <BsThreeDotsVertical />
                </div>
              )}

              {showMenu && (
                <div className="flex flex-col absolute top-8 right-4 bg-white shadow-2xl rounded-xl w-40 text-primary-gray-300">
                  <div
                    onClick={() => {
                      setShowEdit(true);
                      setShowMenu(false);
                    }}
                    className="p-3 px-4 flex gap-4 items-center border-b hover:bg-primary-blue-100 "
                  >
                    <MdOutlineEdit />
                    <p className=" font-bold text-xs">Edit</p>
                  </div>
                  <div
                    onClick={() => {
                      setDeleteModal(true);
                      setShowMenu(false);
                    }}
                    className="p-3 px-4 flex gap-4 items-center hover:bg-primary-blue-100  "
                  >
                    <MdOutlineDelete />
                    <p className=" font-bold text-xs">Delete</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-1 items-center">
              <div
                onClick={() => handleFilterChange("ME")}
                className={`min-w-max px-4 py-2 rounded-full font-semibold  text-xs  font-lato ${
                  selectedFilter === "ME"
                    ? " border border-primary-yellow-medium bg-primary-yellow-30  text-primary-yellow-darker"
                    : " text-primary-neutral-400 "
                } `}
              >
                Assigned to Me
              </div>
              <div
                onClick={() => handleFilterChange("OTHERS")}
                className={`min-w-max px-4 py-2 rounded-full font-semibold  text-xs  font-lato ${
                  selectedFilter === "OTHERS"
                    ? " border border-primary-yellow-medium bg-primary-yellow-30  text-primary-yellow-darker"
                    : " text-primary-neutral-400 "
                } `}
              >
                Assigned to Others
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <TrackGoalList
              heading="Recommended to Focus"
              assigned={selectedFilter}
              isRecommended={true}
              list={getGoals("today")}
              onUpdate={() => {
                getTrack();
              }}
            />
            <TrackGoalList
              heading="For This Week"
              assigned={selectedFilter}
              list={getGoals("week")}
              onUpdate={() => {
                getTrack();
              }}
            />
            <TrackGoalList
              heading="For Later"
              assigned={selectedFilter}
              list={getGoals("later")}
              onUpdate={() => {
                getTrack();
              }}
            />
          </div>
        </div>
        <div className="w-full flex flex-row items-center justify-end fixed bottom-20 right-4 ">
          <ChronosButton
            primary
            yellow
            float
            underline
            text="New Goal"
            onClick={() => setCreateNew(true)}
            icon={<Plus size={16} className="mr-2" />}
            iconReverse
          />
        </div>
      </div>
    </>
  );
}

export default IndividualTrack;
