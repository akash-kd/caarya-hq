import React, { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import { RadioGroup } from "@headlessui/react";
import { Fade } from "react-awesome-reveal";

// Icons
import { XIcon, ArrowRightIcon } from "@heroicons/react/solid";
import Arrow from "assets/icons/Arrow.svg";
import * as Icons from "@heroicons/react/outline";

// APIs
import * as TaskAPI from "config/APIs/task/task";

// Redux
import { useDispatch } from "react-redux";
import { showToast } from "redux/toaster";

// Utils
import { TaskStatus, TShirtSizes } from "helpers/task";
import { classNames } from "helpers/utils/classNames";

const HeroIcon = ({ icon }) => {
  const Icon = Icons[icon];
  return (
    <div className="flex-col">
      <Icon className="h-7 w-7 cursor-pointer text-primary-yellow-darkest" />
    </div>
  );
};

function EditTask({
  isOpen,
  closeModal,
  task,
  onUpdate,
  type,
  details,
  setDetails,
}) {
  const dispatch = useDispatch();
  const [creating, setCreating] = useState(false);
  const [typeList, setTypeList] = useState([]);
  // const [details, setDetails] = useState();

  // useEffect(() => {
  //   let isMounted = true;
  //   if (isMounted) {
  //     setDetails(task);
  //   }

  //   return () => {
  //     isMounted = false;
  //   };
  // }, [task]);

  useEffect(() => {
    let isMounted = true;
    if (isOpen) {
      updateTask();
    }

    return () => {
      isMounted = false;
    };
  }, [details]);

  const updateTask = async () => {
    setCreating(true);
    let update = details;
    update["type_id"] = details?.type?.id;
    delete update?.type;
    delete update?.goal;
    try {
      let body = {
        task: update,
      };
      const response = await TaskAPI.updateTasks(task?.id, body);
      onUpdate();
      closeModal();
      dispatch(showToast({ message: "Task updated successfully!" }));
    } catch (err) {
      switch (err.response?.status) {
        case 401:
          dispatch(showToast({ message: "Unauthorized!", type: "error" }));
          break;
        default:
          dispatch(
            showToast({ message: "Something went wrong!", type: "error" })
          );
      }
    }
    setCreating(false);
    closeModal();
  };

  return (
    <Drawer
      anchor={window.innerWidth < 1024 ? "bottom" : "right"}
      open={isOpen}
      onClose={() => closeModal()}
      transitionDuration={500}
      PaperProps={{
        style: { maxHeight: "50vh", borderRadius: "20px 20px 0px 0px" },
      }}
    >
      <div className="bg-gray-50 rounded-t-[20px]">
        <div className="relative">
          {/* <div className="bg-primary-yellow-light text-primary-yellow-darkest">
            <div className="flex flex-row w-full items-center justify-between p-3 rounded-t-lg">
              <h5 className="font-karla" id="exampleModalLiveLabel">
                {type} for {task?.title}
              </h5>
              <button
                aria-label="Close"
                type="button"
                onClick={() => closeModal()}
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>
          </div> */}
          <div className="px-3 pt-3 pb-3 relative">
            <div className="relative">
              <div className="flex flex-row w-full items-center justify-between p-3 rounded-t-lg">
                <div className="text-left text-base poppins font-medium mb-3">
                  Select {type}
                </div>
                <button
                  aria-label="Close"
                  type="button"
                  onClick={() => closeModal()}
                >
                  <XIcon className="h-5 w-5" />
                </button>
              </div>

              <div>
                <div className="" md="12">
                  <div
                    className={`w-full grid grid-cols-1 max-h-75vh overflow-y-auto`}
                  >
                    {type == "T-Shirt Size" && (
                      <RadioGroup
                        value={details?.tShirtSize}
                        onChange={(e) =>
                          setDetails({
                            ...details,
                            tShirtSize: e,
                          })
                        }
                        className=""
                      >
                        <RadioGroup.Label className=""></RadioGroup.Label>
                        <div className="flex flex-row items-stretch space-x-3">
                          {TShirtSizes.map((option) => (
                            <RadioGroup.Option
                              key={option.name}
                              value={option}
                              className={({ active, checked }) =>
                                classNames(
                                  option == details?.tShirtSize
                                    ? "bg-primary-yellow-lightest border-transparent text-primary-yellow-darkest"
                                    : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50",
                                  "border rounded-full py-2 px-1 h-9 w-9 cursor-pointer flex items-center justify-center text-sm font-medium uppercase sm:flex-1 hover-on-card"
                                )
                              }
                            >
                              <RadioGroup.Label
                                as="p"
                                className="card-hover-text"
                              >
                                {option}
                              </RadioGroup.Label>
                            </RadioGroup.Option>
                          ))}
                        </div>
                      </RadioGroup>
                    )}

                    {type == "Status" && (
                      <RadioGroup
                        value={details?.status}
                        onChange={(e) =>
                          setDetails({
                            ...details,
                            status: e,
                          })
                        }
                        className=""
                      >
                        <RadioGroup.Label className=""></RadioGroup.Label>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
                          {TaskStatus.map((option) => (
                            <RadioGroup.Option
                              key={option.value}
                              value={option.value}
                              className={({ active, checked }) =>
                                classNames(
                                  option.value == details?.status
                                    ? "bg-primary-yellow-lightest border-transparent text-primary-yellow-darkest"
                                    : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50",
                                  "border rounded-md p-2 cursor-pointer flex items-center justify-center text-sm font-medium uppercase sm:flex-1 hover-on-card"
                                )
                              }
                            >
                              <RadioGroup.Label
                                as="p"
                                className="card-hover-text"
                              >
                                {option.label}
                              </RadioGroup.Label>
                            </RadioGroup.Option>
                          ))}
                        </div>
                      </RadioGroup>
                    )}
                    {type == "Priority" && (
                      <RadioGroup
                        value={details?.priority}
                        onChange={(e) =>
                          setDetails({
                            ...details,
                            priority: e,
                          })
                        }
                        className=""
                      >
                        <RadioGroup.Label className=""></RadioGroup.Label>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
                          {[1, 2, 3, 4, 5, 6].map((option) => (
                            <RadioGroup.Option
                              key={option.name}
                              value={option}
                              className={({ active, checked }) =>
                                classNames(
                                  option == details?.priority
                                    ? "bg-primary-yellow-lightest border-transparent text-primary-yellow-darkest"
                                    : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50",
                                  "border rounded-md p-2 cursor-pointer flex items-center justify-center text-sm font-medium uppercase sm:flex-1 hover-on-card"
                                )
                              }
                            >
                              <RadioGroup.Label
                                as="p"
                                className="card-hover-text"
                              >
                                {option}
                              </RadioGroup.Label>
                            </RadioGroup.Option>
                          ))}
                        </div>
                      </RadioGroup>
                    )}
                    {type == "Task Type" &&
                      typeList?.map((item) => (
                        <Fade direction="up" triggerOnce>
                          <div
                            onClick={() => {
                              setDetails({
                                ...details,
                                type: item,
                              });
                            }}
                            key={item.id}
                            className={`${
                              details?.type?.id == item?.id
                                ? "bg-primary-yellow-lightest text-gray-700 hover:bg-theme-indigo-500"
                                : "bg-gray-50  text-gray-900 hover:bg-gray-50"
                            }
                              cursor-pointer px-2 flex items-center justify-start text-sm inter py-2.5 text-gray-400 font-medium sm:flex-1  border-b border-gray-300
                            `}
                          >
                            <p className="card-hover-text flex flex-div items-center justify-start text-left">
                              {item?.hero_icon ? (
                                <HeroIcon icon={item.hero_icon} />
                              ) : null}
                              <p className="ml-2 text-gray-500 font-semibold text-base inter pl-2">
                                {item?.name}
                              </p>
                            </p>
                          </div>
                        </Fade>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="fixed bottom-2 w-full bg-gray-50">
            <div className="pt-3 px-3">
              <div className="w-full flex flex-div items-center justify-end">
                <div className="bg-primary-yellow-light rounded-lg">
                  <button
                    className="text-primary-yellow-darkest font-karla text-sm cursor-pointer flex flex-div items-center justify-center hover-on-card px-3 py-1"
                    type="button"
                    onClick={updateTask}
                  >
                    Update
                    <img
                      src={Arrow}
                      className="h-2.5 ml-2.5 mt-0.5"
                      alt="arrow"
                    />
                    {creating && (
                      <div className="ml-2 h-5 w-5 rounded-full border border-theme-indigo-200 animate-spin border-t-0" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </Drawer>
  );
}

export default EditTask;
