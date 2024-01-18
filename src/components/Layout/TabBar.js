import React, { useState } from "react";

import { useHistory } from "react-router";
import { mobileBottomNav } from "helpers/constants";
import { PlusIcon } from "@heroicons/react/solid";
import GoalCreateEdit from "components/Modals/Goal/GoalCreate/GoalCreateEdit";
function TabBar() {
  const history = useHistory();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  return (
    <div>
      <GoalCreateEdit
        isOpen={openCreateModal}
        closeModal={() => setOpenCreateModal(false)}
        onCreate={() => {
          setOpenCreateModal(false);
        }}
      />
      <div
        className={`w-full fixed z-30 bottom-0 right-0 tapbar left-0 lg:hidden transform transition-all ease-in-out duration-300 font-karla`}
      >
        <div className=" w-full bottom-0 max-w-sm mx-auto">
          <div className="grid grid-cols-5 gap-2">
            {mobileBottomNav.map((item, idx) => {
              const centerNavIdx = Math.floor(mobileBottomNav.length / 2);

              return (
                <div
                  key={idx}
                  onClick={() => {
                    if (item?.path) history.push(item?.path);
                    else setOpenCreateModal(true);
                  }}
                  className={`relative py-2 px-1 ${
                    window.location.pathname.includes(item?.path)
                      ? "bg-primary-yellow-30"
                      : ""
                  }`}
                >
                  <div
                    className={`flex flex-col items-center ${
                      idx === centerNavIdx &&
                      "absolute inset-x-0 -translate-y-3"
                    } ${
                      window.location.pathname.includes(item?.path)
                        ? "text-primary-yellow-darker font-bold"
                        : "text-primary-gray-280 font-normal"
                    } `}
                  >
                    {item?.icon ? (
                      React.cloneElement(item?.icon, {})
                    ) : idx === centerNavIdx ? (
                      <PlusIcon className="rounded-full p-2 h-9 w-9 scale-110 mb-1 -mt-0.5 shadow-md bg-primary-yellow-subtle text-primary-yellow-darker" />
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
                            ? "h-9 w-9 scale-150 drop-shadow-md -mt-0.5"
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
