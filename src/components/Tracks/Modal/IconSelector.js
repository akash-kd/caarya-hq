import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { trackColors, trackIcons } from "helpers/constants/tracks";

export default function IconSelector({
  caarya,
  position,
  name = "default",
  data,
  setData,
}) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button
        style={{ background: data?.backgroundColor || "#FEF4F9" }}
        className="flex flex-row items-center justify-center w-10 h-10 rounded-lg relative"
      >
        <div className="absolute -top-2 -right-2  bg-white border border-primary-gray-80 w-5 h-5 rounded-full flex flex-row items-center justify-center">
          <img src="/assets/svg/icon/edit.svg" alt="" className="w-3 h-3" />
        </div>{" "}
        <div className="flex items-center p-1.5 rounded-lg">
          <span className="sr-only">Open options</span>
          <div
            style={{ color: data?.color || "#CC66CC" }}
            className="flex flex-row items-center justify-center rounded"
          >
            {React.cloneElement(
              trackIcons?.find((a) => a?.name == name)?.svg,
              {}
            )}
          </div>
        </div>
      </Menu.Button>
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
            boxShadow:
              "0px 8px 10px -6px rgba(0, 0, 0, 0.10), 0px 20px 25px -5px rgba(0, 0, 0, 0.10), 0px -8px 12px 0px rgba(0, 0, 0, 0.05)",
          }}
          className={`origin-top-right absolute z-30 ${
            position || "left-0"
          } mt-2  max-w-xs w-96 rounded bg-white border border-primary-gray-80 focus:outline-none`}
        >
          <div className="py-4 px-2 max-h-64 overflow-y-auto">
            <div className="px-1.5 pb-4 grid grid-cols-8 gap-1.5 border-b border-primary-gray-80">
              {trackColors?.map((item) => {
                return (
                  <div
                    onClick={() => {
                      setData({ ...data, ...item });
                    }}
                    className={`flex flex-row items-center justify-center h-8 w-8 ${
                      data?.backgroundColor == item?.backgroundColor
                        ? "border rounded border-primary-gray-80"
                        : ""
                    }`}
                  >
                    <div
                      style={{ background: item?.backgroundColor }}
                      className="rounded h-6 w-6"
                    ></div>
                  </div>
                );
              })}
            </div>
            <div className="pt-4 grid grid-cols-7 gap-3">
              {trackIcons?.map((item) => {
                if (caarya || (!caarya && !item?.caarya)) {
                  return (
                    <div
                      onClick={() => {
                        setData({ ...data, svg: item?.name });
                      }}
                      style={{
                        background:
                          name == item?.name
                            ? data?.backgroundColor
                            : "#FAFAFA",
                        color: name == item?.name ? data?.color : "#CFCDC9",
                      }}
                      className="p-1 flex flex-row items-center justify-center w-8 h-8 rounded"
                    >
                      {React.cloneElement(item?.svg, {})}
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
