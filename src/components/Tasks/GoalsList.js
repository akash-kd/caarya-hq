import React, { useEffect, useRef, useState } from "react";
import ConfirmModal from "components/Modals/Common/ConfirmModal";
import GoalItem, {
  GoalItemLoader,
} from "../Projects/IndividualProject/ProjectTaskManagement/Goaltem";
import GoalsCreate from "components/Modals/Goal/GoalCreate";
import EditGoal from "components/Modals/Goal/EditGoal";
import * as GoalAPI from "config/APIs/task/goal";
import { useDispatch, useSelector } from "react-redux";
import EmptyState from "components/Comman/EmptyState";
import { showToast } from "redux/toaster";
import { PlusCircle } from "@phosphor-icons/react";
import { canUpdateProject } from "helpers/utils/permissions/project";

function GoalsList({
  goals = [],
  fetchGoals,
  setSelectedGoal,
  selectedGoal,
  fetching,
  setGoals,
}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { id } = user;

  const [mobileCreateModal, setMobileCreateModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState();
  const [activeGoal, setActiveGoal] = useState(0);
  const [goalToEdit, setGoalToEdit] = useState();
  const [selectedGoalToDelete, setSelectedGoalToDelete] = useState();
  const [showAllGoals, setShowAllGoals] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (showAllGoals && ref.current && !ref.current.contains(e.target)) {
        setShowAllGoals(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showAllGoals]);

  const showSuccessNotification = (message) => {
    dispatch(showToast({ message }));
  };

  const showErrorNotification = (message) => {
    dispatch(showToast({ message, type: "error" }));
  };

  const handleDelete = async () => {
    try {
      await GoalAPI.deleteGoal({ goalId: selectedGoalToDelete.id });
      showSuccessNotification("Goal deleted successfully!");
      fetchGoals();
      setSelectedGoalToDelete(null);
    } catch (err) {
      console.log("Goal delete error", err);
      showErrorNotification("Something went wrong!");
    }
  };

  return (
    <>
      <ConfirmModal
        isOpen={selectedGoalToDelete ? true : false}
        closeModal={() => setSelectedGoalToDelete(null)}
        text={
          <>
            Are you sure you want to delete the following goal: $
            {selectedGoalToDelete?.title}
          </>
        }
        onAccept={() => handleDelete()}
      />

      <EditGoal
        editValues={goalToEdit}
        isEdit={true}
        projectType={selectedProject?.type}
        project={selectedProject}
        isOpen={goalToEdit ? true : false}
        closeModal={() => setGoalToEdit(null)}
        onUpdate={() => fetchGoals()}
        onDelete={(val) => {
          console.log(val);
          setSelectedGoalToDelete(val);
        }}
      />

      <GoalsCreate
        projectType={selectedProject?.type}
        project={selectedProject}
        isOpen={mobileCreateModal}
        closeModal={() => setMobileCreateModal(false)}
        onCreate={(val) => {
          // fetchGoals();
          if (JSON.stringify(val?.owners)?.includes(user?.id)) {
            setGoals([...goals, val]);
          }
        }}
      />
      <div className="hidden lg:block">
        <div className="min-h-25vh max-h-30vh md:max-h-60vh overflow-y-auto pt-3 block font-lato">
          {goals?.length > 0 && (
            <button
              onClick={() => {
                setMobileCreateModal(true);
              }}
              className="flex items-center gap-1 p-1.5 text-sm justify-end w-full flex-row text-black"
            >
              <PlusCircle size={16} />
              Add Goal
            </button>
          )}
          {!fetching
            ? goals.length > 0
              ? goals.map((item, index) => {
                  return (
                    <GoalItem
                      goal={item}
                      isActive={activeGoal === index}
                      onClick={() => {
                        setActiveGoal(index);
                        setSelectedGoal(item);
                        setSelectedProject(item);
                      }}
                      onEdit={(val) => {
                        setGoalToEdit(val);
                      }}
                      isMyGoal={
                        item?.owners?.find((owner) => owner.id === id)
                          ? true
                          : false
                      }
                    />
                  );
                })
              : goals.length === 0 && (
                  <EmptyState
                    image="/assets/images/empty/goal.png"
                    text={"No goals found for your tasks!"}
                    cta={() => setMobileCreateModal(true)}
                    ctaText="Add Goal"
                  />
                )
            : [1, 2, 3, 4]?.map((item) => {
                return <GoalItemLoader />;
              })}
        </div>
      </div>
      <div className="py-3 block lg:hidden">
        {goals?.length > 0 && (
          <div className="flex justify-end mb-3 font-bold underline text-xs text-[14px] cursor-pointer">
            <div onClick={() => setShowAllGoals(true)}>
              {selectedGoal ? "Select another goal" : "Select a goal"}
            </div>
          </div>
        )}
        {selectedGoal && (
          <GoalItem
            goal={selectedGoal}
            isActive={true}
            onEdit={(val) => {
              setGoalToEdit(val);
            }}
            isMyGoal={
              selectedGoal?.owners?.find((owner) => owner.id === id)
                ? true
                : false
            }
          />
        )}
      </div>
      {showAllGoals && (
        <div className="fixed bg-[rgba(0,0,0,0.25)] h-full w-full top-0 left-0 z-50 flex items-center justify-center">
          <div
            className="block lg:hidden bg-white w-[90%] mx-auto px-3 rounded-lg"
            ref={ref}
          >
            {goals?.length > 0 && (
              <button
                onClick={() => {
                  setMobileCreateModal(true);
                }}
                className="flex items-center gap-1 mt-1 p-1.5 text-sm justify-end w-full flex-row text-black"
              >
                <PlusCircle size={16} />
                Add Goal
              </button>
            )}
            <div className="h-50vh py-6 overflow-y-scroll">
              {goals.length > 0 &&
                goals.map((item, index) => {
                  return (
                    <GoalItem
                      goal={item}
                      isActive={activeGoal === index}
                      onClick={() => {
                        setActiveGoal(index);
                        setSelectedGoal(item);
                        setShowAllGoals(false);
                      }}
                      popup={true}
                      onEdit={(val) => {
                        setGoalToEdit(val);
                      }}
                      isLast={goals.length - 1 === index}
                    />
                  );
                })}
              {goals.length === 0 && (
                <EmptyState
                  image="/assets/images/empty/goal.png"
                  text={"No goals found for your tasks!"}
                  cta={() => setMobileCreateModal(true)}
                  ctaText="Add Goal"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default GoalsList;
