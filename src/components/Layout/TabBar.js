import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import { mobileBottomNav } from "helpers/constants";
import { PlusIcon } from "@heroicons/react/solid";
function TabBar() {
  const history = useHistory();
  return (
    <div>
      <div
        className={`w-full fixed z-30 bottom-0 right-0 tapbar left-0 lg:hidden transform transition-all ease-in-out duration-300 font-karla`}
      >
        <div className=" w-full bottom-0 max-w-sm mx-auto">
          <div className="grid grid-cols-5 gap-2 px-2">
            {mobileBottomNav.map((item, idx) => {
              const centerNavIdx = Math.floor(mobileBottomNav.length / 2);

              return (
                <div
                  key={idx}
                  onClick={() => {
                    if (item?.path) history.push(item?.path);
                    else {
                    }
                  }}
                  className={`relative py-2 px-1 ${
                    item?.path !== "/today" &&
                    window.location.pathname.includes(item?.path)
                      ? "bg-primary-red-lightest"
                      : ""
                  }`}
                >
                  <div
                    className={`flex flex-col items-center ${
                      idx === centerNavIdx &&
                      "absolute inset-x-0 -translate-y-3"
                    } ${
                      window.location.pathname.includes(item?.path)
                        ? "text-primary-red-darker font-bold"
                        : "text-primary-gray-280 font-normal"
                    } `}
                  >
                    {item?.icon ? (
                      React.cloneElement(item?.icon, {})
                    ) : idx === centerNavIdx ? (
                      <div
                        className={`w-12 h-12 -mt-2.5 flex flex-row items-center justify-center rounded-full border border-primary-red-lightest ${
                          window.location.pathname.includes(item?.path)
                            ? "bg-white"
                            : "bg-[#ffe9e5]"
                        } `}
                      >
                        <img
                          src={
                            window.location.pathname.includes(item?.path)
                              ? item?.selectedImage
                              : item?.image
                          }
                          alt=""
                          className={`${
                            idx === centerNavIdx
                              ? "h-9 w-9 drop-shadow-md"
                              : "h-6 w-6"
                          }`}
                        />
                      </div>
                    ) : (
                      <img
                        src={
                          window.location.pathname.includes(item?.path)
                            ? item?.selectedImage
                            : item?.image
                        }
                        alt=""
                        className={`${
                          idx === centerNavIdx
                            ? "h-9 w-9 scale-[1.3] drop-shadow-md -mt-[1px]"
                            : "h-6 w-6"
                        }`}
                      />
                    )}
                    {!item?.hideTitle && (
                      <p className={`text-2xs inter mt-1 text-center  `}>
                        {item.name}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TabBar;
