import React from "react";
import ChronosButton from ".";
import { endSession, startSession } from "config/APIs/session";
import moment from "moment";
import { useDispatch } from "react-redux";
import { showToast } from "redux/toaster";
import { useEffect, useState } from "react";
import ClockOutJournal from "components/Journal/Modals/ClockOutJournal";

function GoalClock({ currentSession, goal, onUpdate }) {
  const dispatch = useDispatch();
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [openJournal, setOpenJournal] = useState(false);
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
      const response = await startSession({
        clockIn: moment(),
        goalId: goal?.id,
      });

      onUpdate();
    } catch (err) {
      dispatch(
        showToast({ message: err?.response?.data?.message, type: "error" })
      );
      console.log("Error", err);
    }
  };

  const clockOut = async (time) => {
    try {
      const response = await endSession({
        sessionId: currentSession?.id,
        clockOut: time,
        goalId: goal?.id,
      });

      onUpdate();
    } catch (err) {
      dispatch(
        showToast({ message: err?.response?.data?.message, type: "error" })
      );
      console.log("Error", err);
    }
  };

  return (
    <>
      <ClockOutJournal
        isOpen={openJournal}
        closeModal={() => {
          setOpenJournal(false);
        }}
        goal={goal}
        session={currentSession}
        onUpdate={(time) => {
          clockOut(time);
        }}
      />
      <div className="w-full space-y-4">
        {currentSession && (
          <div className="flex flex-row items-center space-x-4">
            <p className="text-secondary-orange-400 text-xs font-lato font-semibold">
              Clocked In:
            </p>
            <div className="flex flex-row items-center space-x-2 tracking-widest text-primary-yellow-700 font-lato">
              <div className="flex flex-col items-center">
                <p className="font-semibold text-xs">
                  {" "}
                  {("0" + Math.floor((time / 3600000) % 60)).slice(-2)}:
                </p>
                <p className="font-light text-3xs">Hour</p>
              </div>
              <p className="font-semibold text-xs">:</p>
              <div className="flex flex-col items-center">
                <p className="font-semibold text-xs">
                  {" "}
                  {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
                </p>
                <p className="font-light text-3xs">Min</p>
              </div>
              <p className="font-semibold text-xs">:</p>
              <div className="flex flex-col items-center">
                <p className="font-semibold text-xs">
                  {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
                </p>
                <p className="font-light text-3xs">Sec</p>
              </div>
            </div>
          </div>
        )}
        <div className="w-full flex flex-row items-center justify-center">
          <ChronosButton
            text={currentSession ? "Clock Out" : "Clock In"}
            onClick={() => {
              currentSession ? setOpenJournal(true) : clockIn();
            }}
            primary
            yellow
          />
        </div>
      </div>
    </>
  );
}

export default GoalClock;
