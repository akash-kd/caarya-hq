import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import React from "react";
import GoalHubCard from "./GoalHubCard";
import { GoalStatus } from "helpers/goals";
import EmptyState from "components/Comman/EmptyState";

function GoalHubList({
  heading,
  list,
  onUpdate,
  showFocus,
  plannerMode,
  type,
}) {
  return (
    <div>
      <Disclosure defaultOpen>
        {({ open }) => (
          <>
            {heading && (
              <div className="w-full flex flex-row items-center justify-between p-2 border-b border-primary-gray-100">
                <p className="font-lato font-semibold text-sm text-primary-gray-800">
                  {heading} ({list?.length || 0})
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
            )}
            <Disclosure.Panel
              className={`w-full mt-4 dailyPlannerBg ${
                plannerMode ? "active" : "inactive"
              } rounded-lg py-3 px-2 space-y-2`}
            >
              {GoalStatus?.map((item) => {
                if (list?.filter((g) => g?.status == item?.value)?.length > 0)
                  return (
                    <>
                      <h1
                        className={`${
                          plannerMode
                            ? "text-primary-neutral-400"
                            : "text-primary-neutral-400"
                        } font-lato text-xs font-semibold`}
                      >
                        {item?.label}
                      </h1>
                      {list
                        ?.filter((g) => g?.status == item?.value)
                        ?.map((goal) => {
                          return (
                            <GoalHubCard
                              type={type}
                              plannerMode={plannerMode}
                              item={goal}
                              onUpdate={onUpdate}
                              showFocus={showFocus}
                            />
                          );
                        })}
                    </>
                  );
              })}
              {list?.length == 0 && (
                <EmptyState noImage text="No Goals found!" />
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}

export default GoalHubList;
