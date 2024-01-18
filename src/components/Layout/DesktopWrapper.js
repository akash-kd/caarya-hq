import { useEffect, useState } from "react";
import TaskCreateModal from "components/Modals/Task/TaskCreate";
import { tabs } from "helpers/constants/tabs";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import WideModalsWrapper from "components/Modals/ModalsWrapper/WideModalWrapper";
import LogoutModal from "./LogoutModal";
import { Bell, SignOut, User } from "@phosphor-icons/react";
import { MdOutlineTimer } from "react-icons/md";
import ClockoutModal from "./ClockoutModal";
import { clockIn, clockOut } from "config/APIs/users/clock";
import moment from "moment";
import { updateUserClock } from "redux/user";
import { showToast } from "redux/toaster";
import { bulkUpdateGoals } from "config/APIs/task/goal";
import { fetchAllgoals } from "redux/goal";

function DesktopWrapper({ children }) {
  const dispatch = useDispatch();
  const clock = useSelector((state) => state?.user?.clockIns);
  const user = useSelector((state) => state.user.user);
  const inFocusGoal = useSelector((state) => state.goals.inFocus?.goals);
  const history = useHistory();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [logOut, setLogOut] = useState(false);
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [openClockoutModal, setOpenClockoutModal] = useState(false);
  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("navList");
    localStorage.removeItem("selectedTab");
    window.location.href = window.location.origin + "/";
  };
  useEffect(() => {
    if (clock?.length > 0) {
      let recent = clock[0];
      let clockins = recent?.clockInOut?.timings;
      console.log(clockins);

      let last = clockins?.length > 0 ? clockins[clockins?.length - 1] : [];
      console.log(last[0]);
      if (last?.length == 1) {
        const time1 = last[0];
        const time2 = moment();

        const format = "HH:mm:ss";

        const diffInMilliseconds = moment(time2, format).diff(
          moment(time1, format)
        );

        setTime(diffInMilliseconds);
        setRunning(true);
      } else {
        setTime(0);
        setRunning(false);
      }
    }
  }, [clock]);
  const setClockIn = async () => {
    if (inFocusGoal?.length == 0) {
      dispatch(
        showToast({ message: "Select goals to focus on!", type: "error" })
      );
      return;
    }
    try {
      let { data } = await clockIn({ dateTime: new Date() });
      if (data) {
        setRunning(true);
        try {
          let ids = inFocusGoal?.map((a) => a?.id);
          let { data } = await bulkUpdateGoals(ids, { inFocus: 1 });
        } catch (e) {
          console.log(e);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const setClockOut = async () => {
    try {
      let { data } = await clockOut({ dateTime: new Date() });
      if (data) {
        setTime(0);
        setRunning(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <WideModalsWrapper
        isOpen={logOut}
        closeModal={() => {
          setLogOut(false);
        }}
        component={<LogoutModal onLogout={onLogout} />}
      />
      <WideModalsWrapper
        isOpen={openClockoutModal}
        closeModal={() => {
          setOpenClockoutModal(false);
        }}
        component={
          <ClockoutModal
            onClick={() => {
              setClockOut();
            }}
          />
        }
      />
      <TaskCreateModal
        myTask={true}
        isOpen={openCreateModal}
        closeModal={() => setOpenCreateModal(false)}
        onCreate={() => {
          setOpenCreateModal(false);

          if (!window.location.pathname.includes("task")) {
            history.push("/tasks");
          }
        }}
      />
      <div className="w-screen h-screen lg:flex flex-row items-stretch hidden">
        <div className="side-nav py-5 h-full w-full flex flex-col justify-between">
          <div className="flex flex-col space-y-7 items-center">
            <div className="flex flex-row items-center justify-between w-full px-5">
              <a href="/">
                <div className="flex flex-row items-center space-x-2.5">
                  <img
                    src="/assets/caaryaLogos/forge.png"
                    className="h-6 w-6 object-fill"
                    alt="logo"
                  />
                  <h1 className="font-semibold font-karla text-sm text-primary-yellow-dark">
                    Forge
                  </h1>
                </div>
              </a>
              <div className="flex gap-2 items-center text-primary-yellow-dark">
                <User size={14} />
                <Bell size={14} />
              </div>
            </div>
            <div className="px-5 flex items-start space-y-1.5 w-full justify-between text-primary-yellow-dark">
              <div className="flex flex-col items-start w-full font-semibold">
                <h2 className="font-karla text-xs">Hello,</h2>
                <h1 className="text-xl font-karla">{user?.first_name}</h1>
              </div>
            </div>
            <div className="flex flex-col items-start w-full pl-2.5 space-y-2.5">
              {tabs?.map((item, idx) => {
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      history.push(item?.path);
                    }}
                    className={`w-full cursor-pointer flex flex-row items-center space-x-4 menuitem ${
                      window.location.pathname.includes(item?.path)
                        ? "active"
                        : ""
                    }`}
                  >
                    {item?.image ? (
                      <img
                        src={
                          window.location.pathname.includes(item?.path)
                            ? item?.selectedImage
                            : item?.image
                        }
                        alt=""
                        className="w-6 h-6"
                      />
                    ) : (
                      item?.icon
                    )}
                    <p className="">{item?.name}</p>
                  </div>
                );
              })}
            </div>
            {/* <div
              onClick={() => {
                setOpenCreateModal(true);
              }}
              className="mx-auto addTask p-2 w-full flex flex-row items-center justify-between cursor-pointer"
            >
              <div className="flex flex-row items-center justify-center w-full">
                <img
                  src="/assets/svg/icon/addProject.svg"
                  className="h-5 w-5 object-cover"
                  alt="logo"
                />
                <p className="ml-1.5 font-normal ">Add New Task</p>
              </div>
            </div> */}
            {running && (
              <div className="text-2xl font-bold text-primary-yellow-dark">
                <span>
                  {("0" + Math.floor((time / 3600000) % 60)).slice(-2)}:
                </span>
                <span>
                  {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
                </span>
                <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
              </div>
            )}
            {!running ? (
              <div
                onClick={() => {
                  setClockIn();
                }}
                className="mx-auto addTask !bg-primary-yellow-dark p-2 w-full flex flex-row items-center justify-between cursor-pointer"
              >
                <div className="flex flex-row items-center justify-center gap-2 w-full">
                  <p className="ml-1.5 font-semibold">Clock In</p>
                  <MdOutlineTimer className="h-5 w-5 object-cover" />
                </div>
              </div>
            ) : (
              <div
                onClick={() => {
                  setOpenClockoutModal(true);
                }}
                className="mx-auto addTask !bg-primary-yellow-dark p-2 w-full flex flex-row items-center justify-between cursor-pointer"
              >
                <div className="flex flex-row items-center justify-center gap-2 w-full">
                  <p className="ml-1.5 font-semibold">Clock Out</p>
                  <MdOutlineTimer className="h-5 w-5 object-cover" />
                </div>
              </div>
            )}
          </div>

          <div className="pl-2.5 mt-auto mx-auto w-full flex flex-row items-center justify-between cursor-pointer">
            <div
              className={`w-full cursor-pointer px-2 flex flex-row items-center space-x-5 py-3 menuitem`}
              onClick={() => {
                setLogOut(true);
              }}
            >
              <SignOut size={25} />
              <p className="ml-1.5 font-normal">Logout</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-stretch w-[80vw] mx-auto max-w-[1380px] px-5.5 pt-5">
          {/* <PageHeader /> */}
          {children}
        </div>
      </div>
    </>
  );
}

export default DesktopWrapper;
