import { Plus, X } from "@phosphor-icons/react";
import React, { useState } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import GoalHubCard from "components/GoalHub/GoalHubCard";
import { fetchAllgoals } from "redux/goal";
import { useDispatch, useSelector } from "react-redux";
import GoalCreate from "components/Modals/Goal/GoalCreate";

function FocusGoals({}) {
  const [openAdd, setOpenAdd] = useState(false);
  const dispatch = useDispatch();
  const allGoals = useSelector((state) => state.goals?.owner?.goals);
  const getGoals = () => {
    let temp = [];
    // temp = allGoals?.filter((i) => i?.focusIn == null);

    return allGoals;
  };
  return (
    <div className="relative md:max-w-xl lg:h-screen p-6 rounded-t-2xl lg:rounded-t-none bg-white mx-auto w-full transform transition-all ease-in-out duration-150">
      <GoalCreate
        isOpen={openAdd}
        closeModal={() => setOpenAdd(null)}
        onCreate={() => {}}
      />{" "}
      {/* <div
        onClick={() => {
          closeModal();
        }}
        className="absolute rounded-full top-2 right-2 flex flex-row items-center justify-center w-9 h-9 bg-primary-gray-50"
      >
        <X size={24} color="#696763" />
      </div> */}
      <div className="flex flex-col space-y-2">
        <div className="flex flex-row items-center justify-between space-x-2 text-primary-gray-800 font-karla text-base font-medium rounded-t-2xl">
          Manage Goals In Focus
        </div>
        <p className="text-primary-neutral-500 font-lato text-xs font-light">
          Plan when to pick up your goals from here
        </p>
      </div>
      <div className={`w-full mt-4 space-y-4 max-h-70vh overflow-y-auto pb-20`}>
        {getGoals()?.map((goal) => {
          return (
            <GoalHubCard
              item={goal}
              onUpdate={() => {
                dispatch(fetchAllgoals());
              }}
              showFocus
            />
          );
        })}
      </div>
      {/* <Disclosure defaultOpen>
        {({ open }) => (
          <>
            <div className="mt-6 w-full flex flex-row items-center justify-between p-2 ">
              <p className="font-lato font-semibold text-sm text-primary-gray-800">
                Unslotted Goals ({getGoals()?.length || 0})
              </p>
              <Disclosure.Button>
                <ChevronDownIcon
                  className={`h-4 w-4 transform text-primary-gray-400 ${
                    open ? "-rotate-180" : "rotate-0"
                  }`}
                  aria-hidden="true"
                />
              </Disclosure.Button>
            </div>

            <Disclosure.Panel
              className={`w-full mt-4 space-y-4 max-h-70vh overflow-y-auto pb-20`}
            >
              {getGoals()?.map((goal) => {
                return (
                  <GoalHubCard
                    item={goal}
                    onUpdate={() => {
                      dispatch(fetchAllgoals());
                    }}
                    showFocus
                  />
                );
              })}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure> */}
      <div
        onClick={() => {
          setOpenAdd(true);
        }}
        className="z-50 fixed bottom-12 right-4 rounded-full shadow-xl bg-primary-neutral-900 text-white flex flex-row items-center justify-center w-12 h-12"
      >
        <Plus size={24} />
      </div>
    </div>
  );
}

export default FocusGoals;
