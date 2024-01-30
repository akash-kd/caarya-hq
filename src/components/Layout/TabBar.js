import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { mobileBottomNav } from "helpers/constants";
import { PlusIcon } from "@heroicons/react/solid";
import { fetchOngoingJournals } from "redux/journals";
import moment from "moment";
import { endSession, extendSession } from "config/APIs/session";
import { showToast } from "redux/toaster";

function TabBar() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [time, setTime] = useState(0);
  const onGoingJournals = useSelector((state) => state?.journals?.onGoing);
  const [openModal, setOpenModal] = useState(false);
  const [extendedTime, setExtendedTime] = useState(0);
  useEffect(() => {
    let isMounted = true;

    if (isMounted && !location?.pathname?.includes("/redirect")) {
      dispatch(fetchOngoingJournals());
      let journal = onGoingJournals?.data;
      console.log(journal);
      let clockIn = moment(journal?.clockIn);
      if (moment().diff(clockIn, "minutes") >= journal?.duration) {
        setOpenModal(true);
      }
    }
    return () => {
      isMounted = false;
    };
  }, []);
  const onExtendSession = async () => {
    try {
      const body = {
        sessionId: onGoingJournals?.data?.sessionId,
        goalId: onGoingJournals?.data?.id,
        newDuration: extendedTime,
      };
      const res = await extendSession(body);
      console.log(res);
      await onClockOut();
    } catch (err) {
      console.log(err);
    }
    openModal(false);
  };

  const onClockOut = async () => {
    try {
      const response = await endSession({
        sessionId: onGoingJournals?.data?.sessionId,
        clockOut: moment(),
        goalId: onGoingJournals?.data?.id,
      });
      console.log(response);
      // onUpdate();
    } catch (err) {
      dispatch(
        showToast({ message: err?.response?.data?.message, type: "error" })
      );
      console.log("Error", err);
    }
    openModal(false);
  };
  return (
    <div className="relative">
      {openModal && (
        <div className="z-50 absolute top-[-500px] bg-white w-full flex flex-col p-8 gap-4 shadow-lg">
          <h1>
            You have an ongoing session complete, do you want to extend your
            session or clock it out?
          </h1>
          <input
            value={extendedTime}
            type="number"
            onChange={(e) => setExtendedTime(e.target.value)}
            placeholder="Enter extended session time in minutes"
          />
          <div className="flex justify-evenly">
            <button onClick={() => onExtendSession()}>Extend</button>
            <button onClick={() => onClockOut()}>Clockout</button>
          </div>
        </div>
      )}
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
