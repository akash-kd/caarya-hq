import { Fragment, useEffect, useMemo } from "react";
import { Menu, Transition } from "@headlessui/react";
import { TaskStatus } from "helpers/task";
import { ChevronDownIcon } from "@heroicons/react/solid";

export const getStatusColor = (status) => {
  switch (status) {
    case "NotStarted":
      return "bg-secondary-red-30";
    case "InProgress":
      return "bg-primary-yellow-30";
    case "InReview":
      return "bg-secondary-blue-50";
    case "Completed":
      return "bg-secondary-green-30";
    default:
      return "bg-secondary-red-30";
  }
};

export default function StatusDropDown({ status, setStatus, index, disabled }) {
  const activeStatus = useMemo(
    () => TaskStatus.find((e) => e.value == status)?.label,
    [status]
  );

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button disabled={disabled} className="">
          <div className="flex flex-row items-center space-x-1">
            <div
              className={`StatusDropdown ${getStatusColor(
                status
              )} p-1 px-2 flex flex-row items-center space-x-1 rounded font-semibold text-3xs text-primary-gray-800 text-center`}
            >
              <p>{activeStatus}</p>
              <ChevronDownIcon className="w-2 h-2" />
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
            borderRadius: 8,
            // Index === 0 ? "20px 0px 20px 20px" : "20px 20px 0px 20px",
          }}
          className={`${
            index === 0
              ? "origin-bottom-right bottom-6"
              : "origin-top-right top-7"
          } right-0 absolute  w-28 z-50 shadow-lg px-3 py-3 bg-white ring-1 ring-primary-gray-1000 ring-opacity-5 focus:outline-none`}
        >
          <div className="py-1 max-h-64 overflow-y-auto space-y-1.5">
            {TaskStatus.map((item, idx) => {
              return (
                <Menu.Item key={idx}>
                  {({ active }) => (
                    <div
                      onClick={() => {
                        setStatus(item?.value);
                      }}
                      className={`${getStatusColor(
                        item?.value
                      )} p-1 rounded cursor-pointer font-semibold text-3xs text-primary-gray-800 text-center`}
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
