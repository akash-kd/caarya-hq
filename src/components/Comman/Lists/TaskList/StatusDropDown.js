import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { TaskStatus } from "helpers/task";

export default function StatusDropDown({ task, onUpdate, index }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="bg-theme-indigo-500 rounded-lg">
          <div className="flex items-center">
            <div
              style={{
                backgroundColor: TaskStatus.find((e) => e.value == task?.status)
                  ?.lightColor,
                color: TaskStatus.find((e) => e.value == task?.status)?.color,
              }}
              className="rounded-full py-0.5 px-2 font-lato font-normal text-2xs text-center"
            >
              {TaskStatus.find((e) => e.value == task?.status)?.label}
            </div>
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
            borderRadius:
              index === 0 ? "20px 0px 20px 20px" : "20px 20px 0px 20px",
          }}
          className={`${
            index === 0
              ? "origin-top-right top-7"
              : "origin-bottom-right bottom-6"
          } right-0 absolute  w-24 z-30 shadow-lg px-3 py-3 bg-white ring-1 ring-primary-gray-1000 ring-opacity-5 focus:outline-none`}
        >
          <div className="py-1 max-h-64 overflow-y-auto space-y-1.5">
            {TaskStatus.map((item) => {
              return (
                <Menu.Item>
                  {({ active }) => (
                    <div
                      onClick={() => {
                        onUpdate(item?.value);
                      }}
                      style={{
                        backgroundColor: item?.lightColor,
                        color: item?.color,
                      }}
                      className="rounded-full py-0.5 px-2 font-lato font-normal text-2xs text-center"
                    >
                      {item.label}
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
