import { Switch } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Fire, SlidersHorizontal } from "@phosphor-icons/react";
import BreadCrumb from "components/Comman/BreadCrumb";
import Tabs, { DividerTabs } from "components/Comman/Tabs";
import GoalHubList from "components/GoalHub/GoalHubList";
import GoalCreateEdit from "components/Modals/Goal/GoalCreate/GoalCreateEdit";
import { TASK_STATUS_INPROGRESS, TASK_STATUS_NOTSTARTED } from "helpers/task";

import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllgoals } from "redux/goal";

function GoalHub() {
  const dispatch = useDispatch();
  const allGoals = useSelector((state) => state.goals?.goals);
  const myGoals = useSelector((state) => state.goals?.owner?.goals);
  const sharedGoals = useSelector((state) => state.goals?.shared?.goals);

  const [createNew, setCreateNew] = useState(false);
  const [selectedTab, setSelectedTab] = useState("my");
  const [selectedSharedTab, setSelectedSharedTab] = useState("clockedIn");
  const [plannerMode, setPlannerMode] = useState(false);
  const [plannerHeading, setPlannerHeading] = useState(false);

  const getGoals = (list, time) => {
    let temp = [];
    switch (time) {
      case "today":
        temp = list?.filter(
          (i) =>
            i?.status == TASK_STATUS_INPROGRESS ||
            (i?.status == TASK_STATUS_NOTSTARTED && i?.priority == 1) ||
            moment(i?.dueDate).unix() <= moment().unix()
        );
        break;
      case "week":
        temp = list?.filter(
          (i) =>
            (i?.status == TASK_STATUS_NOTSTARTED &&
              (i?.priority == 2 || i?.priority == 3)) ||
            (moment(i?.dueDate).unix() <= moment().add(7, "days").unix() &&
              moment(i?.dueDate).unix() > moment().unix())
        );
        break;
      case "later":
        temp = list?.filter(
          (i) =>
            (i?.status == TASK_STATUS_NOTSTARTED && i?.priority > 3) ||
            !i?.priority
        );
        break;
      default: {
        switch (selectedSharedTab) {
          case "clockedIn":
            temp = list?.filter((i) =>
              i?.sessions?.find((a) => a?.clockOut == null)
            );
            break;
          case "inFocus":
            temp = list?.filter((i) => i?.focusIn !== null);
            break;
          case "week":
            temp = list?.filter(
              (i) =>
                (i?.status == TASK_STATUS_NOTSTARTED &&
                  (i?.priority == 2 || i?.priority == 3)) ||
                (moment(i?.dueDate).unix() <= moment().add(7, "days").unix() &&
                  moment(i?.dueDate).unix() > moment().unix())
            );
            break;
          case "later":
            temp = list?.filter(
              (i) =>
                (i?.status == TASK_STATUS_NOTSTARTED && i?.priority > 3) ||
                !i?.priority
            );
            break;
          default:
            temp = list;
        }
      }
    }

    return temp;
  };
  useEffect(() => {
    if (plannerMode) {
      setTimeout(() => {
        setPlannerHeading(true);
      }, 500);
    }
  }, [plannerMode]);
  useEffect(() => {
    if (!plannerHeading) {
      setTimeout(() => {
        setPlannerMode(false);
      }, 50);
    }
  }, [plannerHeading]);

  return (
    <>
      <GoalCreateEdit
        isOpen={createNew}
        closeModal={() => setCreateNew(false)}
      />{" "}
      <div>
        <BreadCrumb page1="Goal Hub" />
        {/* <div className="text-primary-gray-300 font-semibold font-lato text-base border-b border-primary-gray-200 w-full grid grid-cols-2 divide-x divide-primary-gray-200">
          <div className="py-3 px-4 flex flex-row items-center justify-center space-x-4">
            <SlidersHorizontal size={20} />
            <p>Sort</p>
          </div>
          <div className="py-3 px-4 flex flex-row items-center justify-center space-x-4">
            <Funnel size={20} />
            <p>Filter</p>
          </div>
        </div> */}
        <DividerTabs
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          tabs={[
            { label: "My Goals", value: "my" },
            { label: "Shared Goals", value: "shared" },
          ]}
        />
        <div className="flex flex-col px-4">
          {/* <div className=""></div>
          <h1 className="px-2 text-primary-gray-800 font-karla text-base font-medium">
            All goals for {user?.first_name}
          </h1>
          <div className="flex flex-row items-center justify-start">
            <ChronosButton
              secondary
              yellow
              text="Add New Goal"
              onClick={() => {
                setCreateNew(true);
              }}
            />
          </div> */}
          {selectedTab == "my" && (
            <div
              className={`flex flex-col space-y-3 dailyPlannerHeight ${
                plannerMode ? "active" : "inactive"
              }`}
            >
              <div className="flex flex-row items-center space-x-2 py-5 text-primary-gray-800 font-lato text-sm font-semibold">
                <Fire size={16} />
                <p>Priority Planner Mode</p>
                <Switch
                  checked={plannerMode ? true : false}
                  onChange={() => {
                    if (!plannerMode) setPlannerMode(!plannerMode);
                    else {
                      setPlannerHeading(false);
                    }
                  }}
                  as={Fragment}
                >
                  {({ checked }) => (
                    /* Use the `checked` state to conditionally style the button. */
                    <button
                      className={`${
                        checked ? "bg-[#5E4FBA]" : "bg-[#E7E6E5]"
                      } relative inline-flex h-[18px] w-8 items-center rounded-full`}
                    >
                      <span className="sr-only">Enable notifications</span>
                      <span
                        className={`${
                          checked ? "translate-x-4" : "translate-x-1"
                        } inline-block h-3 w-3 transform rounded-full bg-white transition`}
                      />
                    </button>
                  )}
                </Switch>
              </div>

              <div
                className={`w-full flex flex-col space-y-3 transition duration-150 ease-in-out ${
                  plannerHeading ? "opacity-100" : "opacity-0"
                }`}
              >
                <p className="text-primary-600 font-lato text-sm font-light">
                  Decide what to do based on what is <b>urgent</b> and{" "}
                  <b>important</b> for you at this moment
                </p>
                <div className="flex flex-row items-center justify-end">
                  <p className="text-secondary-indigo-500 font-lato text-xs font-semibold underline">
                    Learn more
                  </p>
                </div>
              </div>
            </div>
          )}
          <div className="flex flex-row items-stretch space-x-4 overflow-x-auto py-6">
            <div className="rounded shadow-filters flex flex-row items-center space-x-2 p-2 text-primary-gray-800 font-lato text-xs font-semibold">
              <SlidersHorizontal size={16} />
              <p>Sort</p>
              <ChevronDownIcon className="w-4 h-4" />
            </div>
            <div className="rounded shadow-filters flex flex-row items-center space-x-2 p-2 text-primary-gray-800 font-lato text-xs font-semibold">
              <p>Category</p>
              <ChevronDownIcon className="w-4 h-4" />
            </div>
            <div className="rounded shadow-filters flex flex-row items-center space-x-2 p-2 text-primary-gray-800 font-lato text-xs font-semibold">
              <p>Status</p>
              <ChevronDownIcon className="w-4 h-4" />
            </div>
            <div className="rounded shadow-filters flex flex-row items-center space-x-2 p-2 text-primary-gray-800 font-lato text-xs font-semibold">
              <p>Project</p>
              <ChevronDownIcon className="w-4 h-4" />
            </div>
          </div>

          {selectedTab == "shared" && (
            <>
              <Tabs
                tabs={[
                  { label: "Clocked In", value: "clockedIn" },
                  { label: "In Focus", value: "inFocus" },
                  { label: "Week", value: "week" },
                  { label: "Later", value: "later" },
                ]}
                selectedTab={selectedSharedTab}
                setSelectedTab={setSelectedSharedTab}
              />
            </>
          )}
          {selectedTab == "my" ? (
            <div className={`w-full`}>
              <GoalHubList
                type={selectedSharedTab}
                plannerMode={plannerMode}
                heading="Recommended to Focus"
                list={getGoals(myGoals, "today")}
                onUpdate={() => {
                  dispatch(fetchAllgoals());
                }}
                showFocus
              />
              <GoalHubList
                plannerMode={plannerMode}
                heading="For This Week"
                list={getGoals(myGoals, "week")}
                onUpdate={() => {
                  dispatch(fetchAllgoals());
                }}
              />
              <GoalHubList
                plannerMode={plannerMode}
                heading="For Later"
                list={getGoals(myGoals, "later")}
                onUpdate={() => {
                  dispatch(fetchAllgoals());
                }}
              />
            </div>
          ) : (
            <div className={`w-full pt-6`}>
              <GoalHubList
                plannerMode={plannerMode}
                heading=""
                list={getGoals(sharedGoals)}
                onUpdate={() => {
                  dispatch(fetchAllgoals());
                }}
                showFocus
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default GoalHub;
