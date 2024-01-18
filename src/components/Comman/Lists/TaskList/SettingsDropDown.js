import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { classNames } from "helpers/utils/classNames";
import { DotsHorizontalIcon } from "@heroicons/react/outline";

export default function Settings({ onEdit, onComments, onDelete }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="bg-theme-indigo-500 rounded-lg">
          <div className="flex items-center">
            <span className="sr-only">Open options</span>
            <DotsHorizontalIcon
              className="w-5 h-5 text-primary-gray-1000"
              aria-hidden="true"
            />
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
          style={{ borderRadius: "20px 0px 20px 20px" }}
          className={`origin-top-right absolute right-0 w-24 z-10 shadow-lg bg-white ring-1 ring-primary-gray-1000 ring-opacity-5 focus:outline-none`}
        >
          <div className="py-1 max-h-64 overflow-y-auto">
            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={() => {
                    onEdit();
                  }}
                  className={classNames(
                    "text-primary-gray-1000 font-lato font-normal block px-4 py-2 text-2xs cursor-pointer"
                  )}
                >
                  Edit
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={() => {
                    onComments();
                  }}
                  className={classNames(
                    "text-primary-gray-1000 font-lato font-normal block px-4 py-2 text-2xs cursor-pointer"
                  )}
                >
                  Comments
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={() => {
                    onDelete();
                  }}
                  className={classNames(
                    "text-caarya-red-lighter font-lato font-normal block px-4 py-2 text-2xs cursor-pointer"
                  )}
                >
                  Delete
                </div>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
