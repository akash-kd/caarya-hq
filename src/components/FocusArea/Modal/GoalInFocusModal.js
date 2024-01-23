import { Drawer } from "@mui/material";
import { X } from "@phosphor-icons/react";
import React from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import GoalHubCard from "components/Sprint/GoalHubCard";
import { fetchAllgoals } from "redux/goal";
import { useDispatch, useSelector } from "react-redux";

function GoalsInFocusModal({ isOpen, closeModal }) {
  const dispatch = useDispatch();
  const allGoals = useSelector((state) => state.goals?.owner?.goals);
  const getGoals = () => {
    let temp = [];
    temp = allGoals?.filter((i) => i?.focusIn == null);

    return temp;
  };
  return (
    <Drawer
      anchor={window.innerWidth < 1024 ? "bottom" : "right"}
      PaperProps={{
        style: {
          borderRadius: window.innerWidth < 1024 ? "20px 20px 0px 0px" : "0px",
          maxHeight: "100vh",
          height: window.innerWidth < 1024 ? "auto" : "100%",
          width: window.innerWidth < 1024 ? "100%" : "560px",
        },
      }}
      open={isOpen}
      onClose={() => {
        closeModal();
      }}
      transitionDuration={250}
    >
      <div className="relative md:max-w-xl lg:h-screen p-6 rounded-t-2xl lg:rounded-t-none bg-white mx-auto w-full transform transition-all ease-in-out duration-150">
        <div
          onClick={() => {
            closeModal();
          }}
          className="absolute rounded-full top-2 right-2 flex flex-row items-center justify-center w-9 h-9 bg-primary-gray-50"
        >
          <X size={24} color="#696763" />
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex flex-row items-center justify-between space-x-2 text-primary-gray-800 font-karla text-base font-medium rounded-t-2xl">
            Manage Goals In Focus
          </div>
          <p className="text-primary-neutral-500 font-lato text-xs font-light">
            Plan when to pick up your goals from here
          </p>
        </div>

        <Disclosure defaultOpen>
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
                className={`w-full mt-4 space-y-4 max-h-40vh overflow-y-auto`}
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
        </Disclosure>
      </div>
    </Drawer>
  );
}

export default GoalsInFocusModal;
