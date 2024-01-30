import {
  Clock,
  Crosshair,
  SignOut,
  Sliders,
  Plus,
} from "@phosphor-icons/react";
import FocusGoalCard from "components/FocusArea/FocusGoalCard";
import ClockInModal from "components/FocusArea/Modal/ClockInModal";
import ClockOutModal from "components/FocusArea/Modal/ClockOutModal";
import GoalsInFocusModal from "components/FocusArea/Modal/GoalInFocusModal";
import { endSession, startSession } from "config/APIs/session";
import { goalFocusTime } from "helpers/constants/goals";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchAllgoals } from "redux/goal";
import { fetchOngoingJournals } from "redux/journals";
import { showToast } from "redux/toaster";

function FocusArea() {
  const history = useHistory();
  const allGoals = useSelector((state) => state.goals?.goals);
  const ongoingGoal = useSelector((state) => state.journals?.onGoing);
  const [selectedFocus, setselectedFocus] = useState("Nightwatch");

  const dispatch = useDispatch();
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [openClockIn, setOpenClockIn] = useState(false);
  const [openClockOut, setOpenClockOut] = useState(false);
  const [openFocusGoals, setOpenFocusGoals] = useState(false);
  const [currentSession, setCurrentSession] = useState();
  const [focusedGoal, setFocusedGoal] = useState();
  useEffect(() => {
    dispatch(fetchOngoingJournals());
    if (Object.keys(ongoingGoal?.data).length !== 0) {
      setOpenClockIn(false);
      setFocusedGoal(ongoingGoal?.data);
      setCurrentSession({
        id: ongoingGoal?.data?.sessionId,
        clockIn: ongoingGoal?.data?.clockIn,
      });
    }
  }, []);
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

  useEffect(() => {
    if (currentSession) {
      if (currentSession?.clockIn) {
        const time1 = moment(currentSession?.clockIn);
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
  }, [currentSession]);

  const clockIn = async () => {
    try {
      let time = moment();
      const response = await startSession({
        clockIn: time,
        goalId: focusedGoal?.id,
      });
      setCurrentSession(response?.data?.data);
    } catch (err) {
      dispatch(
        showToast({ message: err?.response?.data?.message, type: "error" })
      );
      console.log("Error", err);
    }
  };

  const clockOut = async () => {
    let time = moment();
    try {
      const response = await endSession({
        sessionId: currentSession?.id,
        clockOut: time,
        goalId: focusedGoal?.id,
      });

      dispatch(fetchAllgoals());
      setFocusedGoal();
    } catch (err) {
      dispatch(
        showToast({ message: err?.response?.data?.message, type: "error" })
      );
      console.log("Error", err);
    }
  };

  const getGoals = (focus) => {
    let temp = [];
    temp = allGoals?.filter((i) =>
      focus ? i?.focusIn == focus : i?.focusIn == selectedFocus
    );
    return temp;
  };
  return (
    <>
      <ClockInModal
        isOpen={openClockIn}
        closeModal={() => {
          setOpenClockIn(false);
        }}
        onUpdate={() => {
          clockIn();
          setOpenClockIn(false);
        }}
      />{" "}
      <ClockOutModal
        goal={focusedGoal}
        session={currentSession}
        isOpen={openClockOut}
        closeModal={() => {
          setOpenClockOut(false);
        }}
        onUpdate={() => {
          clockOut();
          setOpenClockOut(false);
        }}
      />
      <GoalsInFocusModal
        isOpen={openFocusGoals}
        closeModal={() => {
          setOpenFocusGoals(false);
        }}
        onUpdate={() => {
          setOpenFocusGoals(false);
        }}
      />
      <div className="fixed top-0 bottom-0 right-0 left-0 z-40 bg-white">
        <div
          style={{
            background: goalFocusTime?.find((i) => i?.label == selectedFocus)
              ?.backgroundRadiant,
          }}
          className="h-screen overflow-y-auto"
        >
          <div className="">
            <div className="px-4 py-1 flex flex-row items-center space-x-2">
              <Crosshair size={12} color="#fff" />
              <p className="text-white text-2xs font-semibold font-lato">
                Focus Zone
              </p>
            </div>
            <div className="px-4 text-white font-lato py-4 flex flex-row items-center justify-between space-x-2">
              <h1 className="font-karla font-medium text-lg">Today</h1>
              <div
                onClick={() => history.goBack()}
                className="cursor-pointer flex flex-row items-center justify-end space-x-2 font-lato text-xs font-semibold"
              >
                <p>Leave Focus Zone</p>
                <SignOut size={20} />
              </div>
            </div>
            <div className="py-2 px-1 space-y-1 flex flex-col items-center text-white">
              <div className="flex flex-row items-center space-x-2">
                {React.cloneElement(
                  goalFocusTime?.find((i) => i?.label == selectedFocus)?.svg,
                  {}
                )}
                <p className="font-lato text-base font-semibold leading-6">
                  {selectedFocus}
                </p>
              </div>
              <p className="font-lato text-xs font-light leading-5">
                {goalFocusTime?.find((i) => i?.label == selectedFocus)?.time}
              </p>
            </div>
            <div className="py-1 px-6 w-full">
              <div className="h-[1px] w-full bg-white"></div>
            </div>
            <div className="h-6" />
          </div>
          {focusedGoal && !openClockIn ? (
            <div className="p-4 flex flex-col space-y-4">
              <FocusGoalCard item={focusedGoal} focused />
              <div className="flex flex-row items-center justify-center text-white font-lato text-sm space-x-2">
                <Clock size={16} />
                <p className="font-semibold">This Session:</p>
                <p className="font-light">
                  <div className="flex flex-row items-center space-x-2 tracking-widest">
                    <div className="flex flex-col items-center">
                      <p className="">
                        {" "}
                        {("0" + Math.floor((time / 3600000) % 60)).slice(-2)}:
                      </p>
                      {/* <p className="">Hour</p> */}
                    </div>
                    <p className="">:</p>
                    <div className="flex flex-col items-center">
                      <p className="">
                        {" "}
                        {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
                      </p>
                      {/* <p className="">Min</p> */}
                    </div>
                    <p className="">:</p>
                    <div className="flex flex-col items-center">
                      <p className="">
                        {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
                      </p>
                      {/* <p className="">Sec</p> */}
                    </div>
                  </div>
                </p>
              </div>
              <div
                onClick={() => {
                  setOpenClockOut(true);
                }}
                className="w-full py-3 px-5 text-white flex flex-row items-center justify-center rounded-lg border border-white bg-white bg-opacity-[0.15] shadow font-lato text-xs font-semibold leading-5"
              >
                Clock Out Of Session
              </div>
            </div>
          ) : (
            <div className="relative">
              <img
                src="/assets/svg/bgCurve.png"
                alt=""
                className="w-full object-cover h-6 -mt-5"
              />
              <div className="bg-white p-4 flex flex-col space-y-4 h-[75vh] pb-20 overflow-y-auto">
                <div className="flex flex-col items-start space-y-2">
                  <h1 className="text-primary-neutral-500 font-lato text-sm font-semibold leading-5">
                    Goals for you to pick up in this time frame
                  </h1>
                  <p className="text-primary-neutral-500 font-lato text-xs font-light">
                    Clock in goals for the goals you pick up
                  </p>
                </div>
                <div className="p-2 flex flex-col space-y-4">
                  {getGoals()?.map((item) => {
                    return (
                      <>
                        <FocusGoalCard
                          item={item}
                          onFocus={() => {
                            setOpenClockIn(true);
                            setTimeout(() => {
                              setFocusedGoal(item);
                            }, 1000);
                          }}
                        />
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
        <div
          onClick={() => {
            history.push("/focusGoals");
          }}
          className="z-50 fixed bottom-16 right-4 rounded-full shadow-xl bg-primary-neutral-900 text-white flex flex-row items-center justify-center w-12 h-12"
        >
          <Sliders size={24} />
        </div>
        <div className="bottom-0 left-0 right-0 fixed grid grid-cols-3 bg-white">
          {goalFocusTime?.map((item) => {
            return (
              <div
                onClick={() => {
                  setselectedFocus(item?.label);
                }}
                className={`py-4 px-1 flex flex-row items-center justify-center font-lato text-sm leading-5 ${
                  selectedFocus == item?.label
                    ? "bg-primary-neutral-100 text-primary-gray-800 font-semibold"
                    : "text-primary-neutral-400 font-light"
                }`}
              >
                {item?.label} ({getGoals(item?.label)?.length || 0})
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default FocusArea;
