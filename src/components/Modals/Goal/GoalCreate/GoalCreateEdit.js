import Drawer from "@mui/material/Drawer";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "redux/toaster";
import ChronosButton from "components/Comman/Buttons";
import * as GoalAPI from "config/APIs/task/goal";
import {
  ArrowClockwise,
  ArrowsCounterClockwise,
  Fire,
  Plus,
  Siren,
  TShirt,
  Target,
  Warning,
  X,
} from "@phosphor-icons/react";
import SimpleInput from "components/Comman/Inputs/SimpleInput";
import { fetchAllgoals } from "redux/goal";
import SimpleTextArea from "components/Comman/Inputs/SimpleTextArea";
import ImageRadioInput from "components/Comman/Inputs/ImageRadioInput";
import {
  TRACK_CATEGORY,
  TRACK_CATEGORY_CAARYA,
  defaultTracks,
  trackIcons,
} from "helpers/constants/tracks";
import SearchBox from "components/Comman/Inputs/SearchBox";
import { fetchAllTracks } from "redux/tracks";
import { DateSelectOptions } from "components/Comman/Inputs/Date";
import { Disclosure, Switch, Transition } from "@headlessui/react";
import { ChevronRightIcon, SearchIcon } from "@heroicons/react/solid";
import { getGoalPriority } from "helpers/utils/goal";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

const defaultValue = {
  title: "",
  date: null,
  status: null,
  important: false,
  urgent: false,
};

function GoalCreateEdit({
  closeModal,
  isOpen,
  onCreate,
  project,
  goal,
  track,
}) {
  const { user } = useSelector((state) => state.user);
  const { projectsList } = useSelector((state) => state.user);
  const trackList = useSelector((state) => state.tracks?.list);
  const dispatch = useDispatch();
  const [data, setData] = useState(defaultValue);
  const [showDescription, setShowDescription] = useState(false);
  const [titleFocus, setTitleFocus] = useState(false);
  const [openTrackList, setOpenTrackList] = useState(false);
  const [openProjectList, setOpenProjectList] = useState(false);
  const [creating, setCreating] = useState(false);
  const [showSignificance, setShowSignificance] = useState(false);
  const [search, setSearch] = useState({
    searchText: "",
    isSearch: false,
    searchProject: "",
  });

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      let obj = {};

      if (project) {
        obj = { ...obj, projectId: project?.id, project: project };
      }
      if (track) {
        obj = {
          ...obj,
          track: track,
          trackId: track?.id,
          trackCategory: track?.category,
        };
      }

      setData(obj);
    }
    return () => {
      isMounted = false;
    };
  }, [isOpen, project, goal, track]);

  const showSuccessNotification = (message) => {
    dispatch(showToast({ message }));
  };

  const showErrorNotification = (message) => {
    dispatch(showToast({ message, type: "error" }));
  };

  const handleCreate = async () => {
    if (!data.dueDate) {
      data.dueDate = new Date();
    }

    setCreating(true);

    let obj = { ...data };

    const { owners, collaborators, ...newTask } = obj;

    if (!obj?.status) {
      newTask["status"] = "NotStarted";
    }

    if (obj?.track && getCollaborator(obj?.track)) {
      newTask["ownerId"] = getCollaborator(obj?.track)?.id;
    }

    newTask["priority"] = getGoalPriority(newTask?.important, newTask?.urgent);

    if (defaultTracks?.map((a) => a?.title)?.includes(data?.track?.title)) {
      newTask["ownerId"] = user?.id;
    }
    try {
      let body = {
        ...newTask,
      };

      const response = await GoalAPI.createGoal(body);

      closeModal();
      if (onCreate) onCreate(obj);
      setData(defaultValue);
      dispatch(fetchAllgoals());
      dispatch(fetchAllTracks());

      showSuccessNotification("Goal created successfully!");
    } catch (err) {
      console.log("Error", err);
      console.log(err?.response);
      showErrorNotification(err.response?.data?.message);
    }
    setCreating(false);
  };
  const getCollaborator = (item) => {
    let user1 = item?.members?.filter((m) => m?.id !== user?.id);
    return user1?.length > 0 ? user1[0] : null;
  };

  return (
    <Drawer
      anchor={window.innerWidth < 1024 ? "bottom" : "right"}
      PaperProps={{
        style: {
          borderRadius: window.innerWidth < 1024 ? "20px 20px 0px 0px" : "0px",
          maxHeight: "100vh",
          height: window.innerWidth < 1024 ? "auto" : "100%",
          width: window.innerWidth < 1024 ? "100%" : "560px",
        },
      }}
      open={isOpen}
      onClose={() => {
        closeModal();
        setData(defaultValue);
      }}
      transitionDuration={250}
    >
      <div className="md:max-w-xl lg:h-screen pt-6 pb-10 px-4 rounded-t-2xl lg:rounded-t-none bg-white mx-auto w-full transform transition-all ease-in-out duration-150">
        <div className="flex flex-row items-center justify-between space-x-2 text-primary-gray-300 font-karla text-base font-medium rounded-t-2xl">
          <div className="flex flex-row items-center space-x-2">
            <Target className="w-4 h-4 text-caarya-red-lighter" />
            <p className="">Add New Goal</p>
          </div>
          <X
            onClick={() => {
              closeModal();
              setData(defaultValue);
            }}
            size={20}
          />
        </div>

        <div className="mt-4 flex w-full flex-col items-start space-y-4 h-auto transition-all ease-in-out duration-150">
          <div
            className={`flex w-full flex-col items-start space-y-2 px-2 ${
              openTrackList ? "bg-primary-gray-25 pb-2" : "bg-white"
            }`}
          >
            {!data?.track || openTrackList ? (
              <ImageRadioInput
                value={data?.trackCategory}
                setValue={(val) => {
                  if (data?.trackCategory == val) {
                    setOpenTrackList(!openTrackList);
                  } else {
                    setOpenTrackList(true);
                  }
                  setData({ ...data, trackCategory: val });
                }}
                valueList={TRACK_CATEGORY?.map((t) => t?.value)}
                labelList={TRACK_CATEGORY?.map((t) => t?.label)}
                label="Track"
                flex
                img={TRACK_CATEGORY?.map((t) => ({ image: t?.image }))}
              />
            ) : (
              <div
                onClick={() => {
                  setOpenTrackList(!openTrackList);
                }}
                className=""
              >
                <div className="input-label">Track</div>
                <div className="bg-white border rounded px-2 py-1 text-primary-gray-300 space-x-2 cursor-pointer flex items-center justify-center text-xs font-lato font-light sm:flex-1 hover-on-card border-primary-yellow-medium">
                  <img
                    src={
                      TRACK_CATEGORY?.find(
                        (a) => a?.value == data?.trackCategory
                      )?.image
                    }
                    alt="icon"
                    className="w-3 h-3"
                  />
                  <p className="font-semibold">{data?.trackCategory}</p>
                  <p className="font-semibold">/</p>
                  <p> {data?.track?.title}</p>
                </div>
              </div>
            )}
            {openTrackList && (
              <div className="space-y-2 w-full p-3 bg-white rounded-lg">
                <div className="w-full">
                  <SearchBox
                    placeholder="Search by track name or member"
                    search={search}
                    setSearch={setSearch}
                  />
                </div>
                <div className="flex flex-row items-center space-x-2 p-2 text-primary-gray-300 font-lato text-xs font-light">
                  <Plus size={16} />
                  <p>New Track</p>
                </div>
                <div className="space-y-0.5 max-h-40vh overflow-y-auto">
                  {trackList
                    ?.filter(
                      (i) =>
                        i?.title == "Your Individual Goals" ||
                        !defaultTracks?.map((a) => a?.title)?.includes(i?.title)
                    )
                    ?.map((item) => {
                      if (data?.trackCategory == item?.category)
                        if (
                          search?.searchText == "" ||
                          (search?.searchText !== "" &&
                            (item?.title
                              ?.toLowerCase()
                              ?.includes(search?.searchText?.toLowerCase()) ||
                              JSON.stringify(item?.members)
                                ?.toLowerCase()
                                ?.includes(search?.searchText?.toLowerCase())))
                        )
                          return (
                            <div
                              onClick={() => {
                                setData({
                                  ...data,
                                  trackId: item?.id,
                                  track: item,
                                });
                                setOpenTrackList(false);
                              }}
                              className={`bg-white space-x-5 p-2 flex flex-row items-center ${
                                data?.trackId == item?.id
                                  ? "border border-primary-yellow-medium rounded bg-primary-yellow-30"
                                  : ""
                              }`}
                            >
                              <div
                                style={{
                                  background: defaultTracks?.find(
                                    (a) => a?.title == item?.title
                                  )
                                    ? defaultTracks?.find(
                                        (a) => a?.title == item?.title
                                      )?.icon?.backgroundColor
                                    : item?.icon?.backgroundColor || "#FAFAFA",
                                }}
                                className="rounded h-8 w-8  flex flex-row items-center justify-center"
                              >
                                {defaultTracks?.find(
                                  (a) => a?.title == item?.title
                                ) ? (
                                  <div
                                    style={{
                                      color: defaultTracks?.find(
                                        (a) => a?.title == item?.title
                                      )?.icon?.color,
                                    }}
                                    className="flex flex-row items-center justify-center rounded"
                                  >
                                    {React.cloneElement(
                                      defaultTracks?.find(
                                        (a) => a?.title == item?.title
                                      )?.icon?.svg,
                                      {}
                                    )}
                                  </div>
                                ) : (
                                  item?.icon?.svg && (
                                    <div
                                      style={{
                                        color: item?.icon?.color || "#CFCDC9",
                                      }}
                                      className="flex flex-row items-center justify-center rounded"
                                    >
                                      {React.cloneElement(
                                        trackIcons?.find(
                                          (a) => a?.name == item?.icon?.svg
                                        )?.svg,
                                        {}
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                              <div className="flex flex-col ">
                                <h1 className="text-primary-gray-800 font-poppins text-xs leading-[18px]  font-medium">
                                  {item?.title}
                                </h1>
                                <p className="text-primary-gray-300 font-lato text-2xs font-light">
                                  {getCollaborator(item) ? (
                                    <>
                                      Shared with {" • "}
                                      <u>{getCollaborator(item)?.first_name}</u>
                                    </>
                                  ) : (
                                    "Not Shared"
                                  )}
                                  {" • "} {item?.goals?.length || 0} Goals
                                </p>
                              </div>
                            </div>
                          );
                    })}
                </div>
              </div>
            )}
          </div>

          {data?.trackCategory && data?.trackId && (
            <>
              <div className="flex w-full flex-col items-start space-y-4 px-2">
                <SimpleInput
                  label="Goal Title"
                  field="title"
                  details={data}
                  setDetails={setData}
                  onFocus={() => {
                    setTitleFocus(true);
                  }}
                  onBlur={() => {
                    setTimeout(() => {
                      setTitleFocus(false);
                    }, 100);
                  }}
                />{" "}
                {titleFocus && (
                  <div
                    onClick={() => {
                      setShowDescription(true);
                    }}
                    className="px-2  flex flex-row items-center space-x-2 text-primary-gray-280 font-lato text-xs font-light"
                  >
                    <Plus size={12} className="" />
                    <p>Add Description</p>
                  </div>
                )}
                {showDescription && (
                  <SimpleTextArea
                    label="Goal Description"
                    field="description"
                    details={data}
                    setDetails={setData}
                  />
                )}
                {data?.trackCategory == TRACK_CATEGORY_CAARYA && (
                  <div className="flex flex-col space-y-2 w-full">
                    <p className="input-label">Select Project</p>
                    <Disclosure
                      as="div"
                      className=" w-full"
                      defaultOpen={openProjectList}
                    >
                      <Disclosure.Button className="w-full">
                        {openProjectList ? (
                          <div className="w-full">
                            <SearchBox
                              placeholder="Search project"
                              search={search}
                              setSearch={setSearch}
                            />
                          </div>
                        ) : (
                          <div
                            onClick={() => {
                              if (!data?.project) {
                                setOpenProjectList(true);
                              }
                            }}
                            className="px-3 w-full flex py-2 border-b border-primary-neutral-200"
                          >
                            {data?.project ? (
                              <div className="px-2 py-1.5 border rounded-full border-primary-neutral-200 flex flex-row items-center space-x-2 text-primary-gray-500 font-lato text-xs font-semibold leading-5">
                                {data?.project?.image?.url ? (
                                  <img
                                    src={data?.project?.image?.url}
                                    alt=""
                                    className="w-5 h-5 rounded object-cover"
                                  />
                                ) : (
                                  <div className="w-5 h-5 rounded bg-primary-gray-300" />
                                )}
                                <p>{data?.project?.title}</p>
                                <X
                                  onClick={() => {
                                    setData({
                                      ...data,
                                      project: null,
                                      projectId: null,
                                    });
                                  }}
                                  size={16}
                                />
                              </div>
                            ) : (
                              <p className="w-full text-left text-primary-gray-225 font-lato text-sm font-light">
                                Start typing to search for project
                              </p>
                            )}
                          </div>
                        )}
                      </Disclosure.Button>

                      <Transition
                        className="w-full"
                        enter="transition duration-150 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-150 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                      >
                        <Disclosure.Panel>
                          {({ close }) => (
                            <div className="w-full bg-white space-y-3">
                              <div className=" w-full flex flex-col items-start h-[30vh] overflow-y-auto">
                                {projectsList?.map((item) => {
                                  if (
                                    search?.searchText == "" ||
                                    (search?.searchText !== "" &&
                                      (item?.title
                                        ?.toLowerCase()
                                        ?.includes(
                                          search?.searchText?.toLowerCase()
                                        ) ||
                                        JSON.stringify(item?.members)
                                          ?.toLowerCase()
                                          ?.includes(
                                            search?.searchText?.toLowerCase()
                                          )))
                                  )
                                    return (
                                      <div
                                        key={item.id}
                                        onClick={() => {
                                          close();
                                          setData({
                                            ...data,
                                            project: item,
                                            projectId: item?.id,
                                          });
                                          setOpenProjectList(false);
                                        }}
                                        className="w-full border-b border-primary-gray-200 px-2 py-3 flex flex-row items-center justify-between space-x-4"
                                      >
                                        <div className="flex flex-row items-center space-x-4">
                                          <img
                                            src={
                                              item?.image?.url ||
                                              "/assets/images/defaultUser.svg"
                                            }
                                            className="rounded h-6 w-6 object-cover"
                                            alt=""
                                          />
                                          <p className="text-primary-gray-800 font-lato text-xs font-light">
                                            {item?.title}
                                          </p>
                                        </div>
                                        <ChevronRightIcon className="text-primary-gray-250 w-5 h-5" />
                                      </div>
                                    );
                                })}
                              </div>
                            </div>
                          )}
                        </Disclosure.Panel>
                      </Transition>
                    </Disclosure>
                  </div>
                )}
              </div>
            </>
          )}

          {!titleFocus &&
            data?.title &&
            data?.title !== "" &&
            data?.track &&
            data?.trackId &&
            (data?.trackCategory !== TRACK_CATEGORY_CAARYA ||
              (data?.trackCategory == TRACK_CATEGORY_CAARYA &&
                data?.project &&
                data?.projectId)) && (
              <div className="flex w-full flex-col items-start space-y-4 px-2">
                <div className="w-full flex flex-col">
                  <div className="input-label">Due Date</div>
                  <div className="py-2 space-x-2 flex flex-row items-center">
                    <div className="flex flex-row items-center gap-2 px-2 py-1.5">
                      <ArrowsCounterClockwise size={12} color={"#1A6BE5"} />
                      <p className="text-primary-gray-600 font-lato text-xs font-semibold leading-5">
                        This is a habit
                      </p>
                    </div>
                    <Switch
                      checked={data?.habbit ? true : false}
                      onChange={() => {
                        setData({
                          ...data,
                          habbit: data?.habbit ? null : defaultValue,
                        });
                      }}
                      as={Fragment}
                    >
                      {({ checked }) => (
                        /* Use the `checked` state to conditionally style the button. */
                        <button
                          className={`${
                            checked ? "bg-[#1A6BE5]" : "bg-[#E7E6E5]"
                          } relative inline-flex h-5 w-8 items-center rounded-full`}
                        >
                          <span className="sr-only">Enable notifications</span>
                          <span
                            className={`${
                              checked ? "translate-x-4" : "translate-x-1"
                            } inline-block h-3 w-3 transform rounded-full bg-white transition`}
                          />
                        </button>
                      )}
                    </Switch>
                  </div>
                  {data?.habbit ? (
                    <>
                      <div className="w-full py-2 grid grid-cols-3 gap-2">
                        <div
                          onClick={() => {
                            setData({
                              ...data,
                              habbit: { ...data?.habbit, type: "daily" },
                            });
                          }}
                          className={` flex flex-row items-center cursor-pointer rounded primary-shadow justify-center space-x-1 sm:space-x-2.5 px-2 py-1 border z-10 ${
                            data?.habbit?.type == "daily"
                              ? "bg-primary-yellow-30 border-primary-yellow-medium"
                              : "bg-white border-primary-neutral-200"
                          }`}
                        >
                          <h1
                            className={`font-lato text-xs mt-0.5 cursor-pointer ${
                              data?.habbit?.type == "daily"
                                ? "text-black font-normal"
                                : "text-gray-400 font-normal"
                            }`}
                          >
                            Daily
                          </h1>
                        </div>
                        <div
                          onClick={() => {
                            setData({
                              ...data,
                              habbit: { ...data?.habbit, type: "weekly" },
                            });
                          }}
                          className={`flex flex-row items-center cursor-pointer rounded primary-shadow justify-center space-x-1 sm:space-x-2.5 px-2 py-1 border z-10 ${
                            data?.habbit?.type == "weekly"
                              ? "bg-primary-yellow-30 border-primary-yellow-medium"
                              : "bg-white border-primary-neutral-200"
                          }`}
                        >
                          <h1
                            className={`font-lato text-xs mt-0.5 cursor-pointer ${
                              data?.habbit?.type == "weekly"
                                ? "text-black font-normal"
                                : "text-gray-400 font-normal"
                            }`}
                          >
                            Weekly
                          </h1>
                        </div>
                        <div
                          onClick={() => {
                            setData({
                              ...data,
                              habbit: { ...data?.habbit, type: "monthly" },
                            });
                          }}
                          className={`flex flex-row items-center cursor-pointer rounded primary-shadow justify-center space-x-1 sm:space-x-2.5 px-2 py-1 border z-10 ${
                            data?.habbit?.type == "monthly"
                              ? "bg-primary-yellow-30 border-primary-yellow-medium"
                              : "bg-white border-primary-neutral-200"
                          }`}
                        >
                          <h1
                            className={`font-lato text-xs mt-0.5 cursor-pointer ${
                              data?.habbit?.type == "monthly"
                                ? "text-black font-normal"
                                : "text-gray-400 font-normal"
                            }`}
                          >
                            Monthly
                          </h1>
                        </div>
                      </div>
                      {data?.habbit?.type == "weekly" && (
                        <>
                          <div className="flex flex-col items-start py-2">
                            <p className="text-primary-gray-300 font-lato text-xs font-semibold">
                              Repeats Every
                            </p>
                            <div className="grid grid-cols-7 gap-2">
                              {[
                                "Mon",
                                "Tue",
                                "Wed",
                                "Thu",
                                "Fri",
                                "Sat",
                                "Sun",
                              ]?.map((item) => {
                                return (
                                  <div
                                    key={item}
                                    onClick={() => {
                                      setData({
                                        ...data,
                                        habbit: {
                                          ...data?.habbit,
                                          repeat: item,
                                        },
                                      });
                                    }}
                                    className={` flex flex-row items-center cursor-pointer rounded primary-shadow justify-center space-x-1 sm:space-x-2.5 px-2 py-1 border z-10 ${
                                      data?.habbit?.repeat == item
                                        ? "bg-primary-yellow-30 border-primary-yellow-medium"
                                        : "bg-white border-primary-neutral-200"
                                    }`}
                                  >
                                    <h1
                                      className={`font-lato text-xs mt-0.5 cursor-pointer ${
                                        data?.habbit?.repeat == item
                                          ? "text-black font-normal"
                                          : "text-gray-400 font-normal"
                                      }`}
                                    >
                                      {item}
                                    </h1>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </>
                      )}
                      {data?.habbit?.type == "monthly" && <></>}
                    </>
                  ) : (
                    <DateSelectOptions
                      date={data?.dueDate}
                      setDate={(val) => {
                        setData({ ...data, dueDate: val });
                      }}
                      canChange
                    />
                  )}
                </div>
                <div className="w-full flex flex-col gap-2">
                  <div className="flex flex-row items-center justify-between">
                    <div className="input-label">Significance Right Now</div>
                    <button
                      onClick={() => setShowSignificance(!showSignificance)}
                      className="rounded-full px-2.5 py-1 flex flex-row gap-1 items-center space-x-2 bg-secondary-indigo-30 text-secondary-indigo-500 text-2xs font-lato font-light underline"
                    >
                      Learn more
                      {!showSignificance ? (
                        <RiArrowDropDownLine />
                      ) : (
                        <RiArrowDropUpLine />
                      )}
                    </button>
                  </div>
                  {showSignificance && (
                    <div className="flex flex-col gap-4 p-2 bg-secondary-indigo-30 text-secondary-indigo-500 font-lato text-xs leading-[18px] font-light  ">
                      <p>
                        Determine whether or not this goal requires your
                        immediate attention based on 2 aspects.
                      </p>
                      <ul className="flex flex-col gap-4 list-disc list-inside">
                        <li>
                          Is it <span className="font-semibold">Important</span>{" "}
                          to do this right now? You can reflect on the potential
                          impact of achieving or not achieving this goal to
                          determine this.
                        </li>
                        <li>
                          Is it <span className="font-semibold">Urgent</span> to
                          do this right now? You might assess the goal’s
                          deadline and any immediate consequences that might
                          arise if the goals is not addressed promptly.
                        </li>
                      </ul>
                    </div>
                  )}
                  <div className="px-4 py-2 grid grid-cols-2 gap-8">
                    <div
                      onClick={() => {
                        setData({ ...data, important: !data?.important });
                      }}
                      className={`font-lato text-xs font-semibold rounded border ${
                        data?.important
                          ? "border-primary-yellow-medium bg-primary-yellow-30 text-primary-gray-800"
                          : "border-primary-gray-200  text-gray-400"
                      } px-4 py-2 flex flex-row items-center space-x-2 justify-center`}
                    >
                      <Warning
                        size={16}
                        color={data?.important ? "#FF8800" : "#9C9A96"}
                      />
                      <p>Important</p>
                    </div>
                    <div
                      onClick={() => {
                        setData({ ...data, urgent: !data?.urgent });
                      }}
                      className={`font-lato text-xs font-semibold rounded border ${
                        data?.urgent
                          ? "border-primary-error-500 bg-primary-error-30 text-primary-gray-800"
                          : "border-primary-gray-200  text-gray-400"
                      }  px-4 py-2 flex flex-row items-center space-x-2 justify-center`}
                    >
                      <Siren
                        size={16}
                        color={data?.urgent ? "#E72113" : "#9C9A96"}
                      />
                      <p>Urgent</p>
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-col">
                  <div className="input-label">
                    How much effort might this require?
                  </div>
                  <div className="py-2 flex flex-row items-stretch space-x-2">
                    {[
                      { label: "1h", value: 1, color: "#4CA6E5" },
                      { label: "2h", value: 2, color: "#33A329" },
                      { label: "4h", value: 4, color: "#FFBC00" },
                      { label: "8h", value: 8, color: "#FF8800" },
                      { label: "16h", value: 16, color: "#FB6F60" },
                    ]?.map((p) => {
                      return (
                        <div
                          key={p.value}
                          onClick={() => {
                            setData({
                              ...data,
                              metaData: { ...data?.metaData, hours: p?.value },
                            });
                          }}
                          className={`p-1 ${
                            data?.metaData?.hours == p?.value
                              ? "border border-primary-neutral-200 bg-white rounded"
                              : ""
                          }`}
                        >
                          <div
                            style={{ color: p?.color, borderColor: p?.color }}
                            className={`p-1.5 flex flex-row items-center space-x-0.5 rounded border `}
                          >
                            <TShirt size={12} />
                            <p className="text-primary-gray-800 font-lato text-2xs font-semibold">
                              {p?.label}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
        </div>
        {!titleFocus &&
          data?.title &&
          data?.title !== "" &&
          data?.track &&
          data?.trackId &&
          (data?.trackCategory !== TRACK_CATEGORY_CAARYA ||
            (data?.trackCategory == TRACK_CATEGORY_CAARYA &&
              data?.project &&
              data?.projectId)) && (
            <div className="mt-4 flex w-full flex-row items-center justify-end space-x-8 py-4 border-t border-primary-gray-225 ">
              <ChronosButton
                text="Cancel"
                tertiary
                underline
                onClick={() => {
                  setData(defaultValue);
                  closeModal();
                }}
              />
              <ChronosButton
                loader={creating}
                text="Add Goal"
                primary
                yellow
                icon={<Plus size={12} />}
                iconReverse
                onClick={() => {
                  handleCreate();
                }}
              />
            </div>
          )}
      </div>
    </Drawer>
  );
}

export default GoalCreateEdit;
