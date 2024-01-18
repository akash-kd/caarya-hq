import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

export default function PriorityDropdown({
  priorityValue,
  setPriorityValue,
  index = 0,
  disabled,
}) {
  return (
    <Menu as="div" className="relative inline-block text-left PriorityDropdown">
      <div>
        <Menu.Button disabled={disabled} className="">
          <div className="flex items-center PriorityDropdown cursor-pointer">
            {priorityValue || priorityValue === 0 ? (
              <div
                className={`PriorityDropdown flex items-center gap-[2px] priority-dark-${priorityValue}`}
              >
                <img src="/assets/svg/icon/fire.svg" className="h-3" />P
                {priorityValue}
              </div>
            ) : (
              <div
                className={`PriorityDropdown flex items-center gap-[2px] priority-dark-${0}`}
              >
                <span className="text-3xs">
                  <img src="/assets/svg/icon/fire.svg" className="h-3" />
                </span>{" "}
                P?
              </div>
            )}
          </div>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          style={{
            // BorderRadius:
            //   Index === 0 ? "20px 0px 20px 20px" : "20px 20px 0px 20px",
            borderRadius: "4px",
          }}
          className={`${
            index === 0
              ? "origin-top-right top-7"
              : "origin-bottom-right bottom-6"
          } right-0 absolute  w-16 z-30 shadow-lg p-2 bg-white ring-1 ring-primary-gray-1000 ring-opacity-5 focus:outline-none`}
        >
          <div className="py-1 max-h-64 overflow-y-auto space-y-1.5 PriorityDropdownItem">
            {[1, 2, 3, 4, 5, 6].map((item) => {
              return (
                <Menu.Item>
                  {({ active }) => (
                    <div
                      onClick={() => {
                        setPriorityValue(item);
                      }}
                      className={` priority-dark-${item} PriorityDropdownItem mx-auto text-center text-[10px] rounded-[4px] py-0.5 cursor-pointer flex items-center justify-center`}
                    >
                      <img
                        src="/assets/svg/icon/fire.svg"
                        className="h-3 PriorityDropdownItem"
                      />
                      P{item}
                    </div>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
