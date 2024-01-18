import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdArrowBack, MdOutlineTimer } from "react-icons/md";
import WideModalsWrapper from "components/Modals/ModalsWrapper/WideModalWrapper";
import ClockoutModal from "components/Layout/ClockoutModal";
import { clockIn, clockOut } from "config/APIs/users/clock";
import moment from "moment";
import { updateUserClock } from "redux/user";
import { getTimings } from "helpers/utils/common/clock";
import { showToast } from "redux/toaster";
import { bulkUpdateGoals } from "config/APIs/task/goal";
import { fetchAllgoals } from "redux/goal";
function Clock() {
  const dispatch = useDispatch();
  const clock = useSelector((state) => state?.user?.clockIns);
  const inFocusGoal = useSelector((state) => state.goals.inFocus?.goals);
  const [showClockOutJournal, setShowClockOutJournal] = useState(false);
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
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
        height="100vh"
        borderRadius="0px"
        isOpen={showClockOutJournal}
        closeModal={() => {
          setShowClockOutJournal(false);
        }}
        component={
          <ClockoutModal
            onClick={() => {
              setClockOut();
            }}
          />
        }
      />

      {!showClockOutJournal && (
        <section className="px-4">
          <h1 className="px-4 py-2 text-lg font-semibold text-center font-lato">
            Clocking History
          </h1>
          <div className="flex flex-col items-center mt-5">
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
                  setShowClockOutJournal(true);
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
          <div className="px-2 py-3 mt-6 bg-white border rounded font-lato">
            <table className="w-full">
              <thead>
                <tr className="grid grid-cols-4">
                  <th className="text-sm font-bold py-3 px-1.5 text-gray-800">
                    Date
                  </th>
                  <th className="text-sm font-bold py-3 px-1.5 text-gray-800">
                    Clock In
                  </th>
                  <th className="text-sm font-bold py-3 px-1.5 text-gray-800">
                    Clock Out
                  </th>
                  <th className="text-sm font-bold py-3 px-1.5 text-gray-800">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="flex flex-col gap-3">
                {clock?.map((c) => {
                  return (
                    <>
                      <tr className="grid grid-cols-4">
                        <td className="py-3 px-1.5 text-xs text-center text-gray-800">
                          {moment(c?.date).format("DD-MM-YYYY")}
                        </td>
                        <td className="py-3 px-1.5 text-xs text-center text-gray-800">
                          {c?.clockInOut?.timings?.length > 0 &&
                          c?.clockInOut?.timings[0]?.length > 0
                            ? getTimings(c?.clockInOut?.timings[0])?.start
                            : "-"}
                        </td>
                        <td className="py-3 px-1.5 text-xs text-center text-gray-800">
                          {c?.clockInOut?.timings?.length > 0 &&
                          c?.clockInOut?.timings[0]?.length > 1
                            ? getTimings(c?.clockInOut?.timings[0])?.end
                            : "-"}
                        </td>
                        <td className="py-3 px-1.5 text-xs text-center text-gray-800">
                          {getTimings(c?.clockInOut?.timings[0])?.diff}
                        </td>
                      </tr>
                      {c?.clockInOut?.timings?.length > 1 &&
                        c?.clockInOut?.timings?.slice(1)?.map((t) => {
                          return (
                            <tr className="grid grid-cols-4">
                              <td className="py-3 px-1.5 text-xs text-center text-gray-800"></td>
                              <td className="py-3 px-1.5 text-xs text-center text-gray-800">
                                {t?.length > 0 ? getTimings(t)?.start : "-"}
                              </td>
                              <td className="py-3 px-1.5 text-xs text-center text-gray-800">
                                {t.length > 1 ? getTimings(t)?.end : "-"}
                              </td>
                              <td className="py-3 px-1.5 text-xs text-center text-gray-800">
                                {getTimings(t)?.diff}
                              </td>
                            </tr>
                          );
                        })}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </>
  );
}

export default Clock;
