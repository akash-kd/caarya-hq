import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { classNames } from "helpers/utils/classNames";

export default function IconFilter(props) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="bg-theme-indigo-500 rounded-lg">
          <div className="flex items-center p-1.5 rounded-lg">
            <span className="sr-only">Open options</span>
            <props.icon className={props.iconCss} aria-hidden="true" />
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
          className={`origin-top-right absolute z-30 ${
            props?.position || "right-0"
          } mt-2 w-40 z-10 rounded-2xl shadow-lg bg-white ring-1 ring-primary-gray-1000 ring-opacity-5 focus:outline-none`}
        >
          <div className="py-1 max-h-64 overflow-y-auto">
            {props.list.map((item) => {
              return (
                <Menu.Item>
                  {({ active }) => (
                    <div
                      onClick={() => {
                        props.onClick(item);
                      }}
                      className={classNames(
                        props.selected?.value == item?.value
                          ? "font-bold"
                          : "font-normal",
                        "block px-4 py-2 text-2xs cursor-pointer text-primary-gray-1000 font-lato"
                      )}
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
