import React, { useEffect, useRef, useState } from "react";
import { PROJECT_CATEGORY_KANBAN } from "helpers/projects";
import * as GoalAPI from "config/APIs/task/goal";
import { useDispatch } from "react-redux";
import { showToast } from "redux/toaster";
import GoalsCreate from "components/Modals/Goal/GoalCreate";
import EditGoal from "components/Modals/Goal/EditGoal";
import ConfirmModal from "components/Modals/Common/ConfirmModal";
import GoalItem from "./Goaltem";
import EmptyState from "components/Comman/EmptyState";
import { PlusCircle } from "@phosphor-icons/react";
import { canUpdateProject } from "helpers/utils/permissions/project";
import { ReactComponent as GoalIcon } from "assets/icons/Goal.svg";
import ChronosButton from "components/Comman/Buttons";

function GoalsList({ setSelectedGoal, project, selectedGoal, setHideGoals }) {
  const dispatch = useDispatch();
  const [mobileCreateModal, setMobileCreateModal] = useState(false);
  const [goals, setGoals] = useState([]);
  const [fetching, setFetching] = useState(false);
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

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if (project?.id) {
        fetchGoals();
      }
    }

    return () => {
      isMounted = false;
    };
  }, [project]);

  const fetchGoals = async () => {
    setFetching(true);
    try {
      let query = { projectId: project?.id };

      const response = await GoalAPI.getAllGoals(query);
      let newGoals = (response.data.data?.response || []).map((e) => {
        e.toggle = false;
        return e;
      });
      console.log("newGoals", newGoals);

      let list = [];
      newGoals.map((item) => {
        list.push(item);
      });
      setGoals(list);
      setSelectedGoal(list[0]);
      if (project?.category == PROJECT_CATEGORY_KANBAN) {
        if (newGoals.length == 0) {
          setHideGoals(true);
        }
      }
      setFetching(false);
    } catch (err) {
      console.log(err);
    }
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
        onAccept={() => handleDelete()}
        text={
          <>
            Are you sure you want to delete the following goal:{" "}
            {selectedGoalToDelete?.title}
          </>
        }
      />

      <EditGoal
        editValues={goalToEdit}
        isEdit={true}
        projectType={project?.type}
        project={project}
        isOpen={goalToEdit ? true : false}
        closeModal={() => setGoalToEdit(null)}
        onUpdate={() => fetchGoals()}
        onDelete={(val) => {
          console.log(val);
          setSelectedGoalToDelete(val);
        }}
      />

      <GoalsCreate
        projectType={project?.type}
        project={project}
        isOpen={mobileCreateModal}
        closeModal={() => setMobileCreateModal(false)}
        onCreate={(val) => {
          // fetchGoals();
          setGoals([...goals, val]);
        }}
      />
      <div className="hidden lg:block font-lato">
        {canUpdateProject(project) && goals?.length > 0 ? (
          <button className="flex items-center gap-1 pb-1.5 text-base font-semibold justify-start w-full flex-row">
            <ChronosButton
              primary
              text="Add New Goal"
              icon={<GoalIcon className="fill-white h-6 ml-1" />}
              onClick={() => {
                setMobileCreateModal(true);
              }}
            />
          </button>
        ) : (
          <div className="h-8" />
        )}{" "}
        <p className="text-sm mb-4 text-[#999]">
          Tasks displayed besides are associated with selected goals.
        </p>
        <div className="min-h-25vh max-h-30vh md:max-h-60vh overflow-y-auto pt-3 -mt-2 ">
          {goals.length > 0 &&
            goals.map((item, index) => {
              return (
                <GoalItem
                  goal={item}
                  isActive={activeGoal === index}
                  onClick={() => {
                    setActiveGoal(index);
                    setSelectedGoal(item);
                  }}
                  onEdit={(val) => {
                    setGoalToEdit(val);
                  }}
                />
              );
            })}
        </div>
        {goals.length === 0 && (
          <EmptyState
            image="/assets/images/empty/goal.png"
            text={"No goals found for your the project!"}
            cta={() => setMobileCreateModal(true)}
            ctaText="Add Goal"
          />
        )}
      </div>
      <div className="pt-3 md block lg:hidden">
        {goals.length > 0 && (
          <div className="flex justify-end mb-3 font-bold underline text-xs md:text-[14px] cursor-pointer">
            <div onClick={() => setShowAllGoals(true)}>Select another goal</div>
          </div>
        )}
        {selectedGoal && (
          <GoalItem
            goal={selectedGoal}
            isActive={true}
            onEdit={(val) => {
              setGoalToEdit(val);
            }}
          />
        )}
      </div>
      {showAllGoals && (
        <div className="fixed bg-[rgba(0,0,0,0.25)] h-full w-full top-0 left-0 z-50 flex items-center justify-center">
          <div
            className="block lg:hidden bg-white w-[90%] mx-auto py-6 px-3 rounded-lg h-50vh overflow-y-scroll"
            ref={ref}
          >
            {canUpdateProject(project) && goals?.length > 0 && (
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
                text={"No goals found for your the project!"}
                cta={() => setMobileCreateModal(true)}
                ctaText="Add Goal"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default GoalsList;
