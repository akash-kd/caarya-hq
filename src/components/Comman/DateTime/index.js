import React, { useState, useEffect } from "react";
//Moments
import moment from "moment";

/**
 * DateTime Component to show date and time on every page
 * @returns
 */

function DateTime({ dark }) {
  const [time, setTime] = useState(moment().format("LT"));

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getTime();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const getTime = () => {
    setTime(moment().format("LT"));
    setTimeout(() => {
      getTime();
    }, 6000);
  };

  return (
    <div className="hidden md:flex flex-row items-center space-x-5">
      <div className="flex flex-row items-center space-x-2">
        <img
          className="w-3"
          alt=""
          src={
            dark
              ? "/assets/svg/icon/calendarWhite.svg"
              : "/assets/svg/icon/calendar.svg"
          }
        />
        <p
          className={`font-karla font-normal text-sm leading-5 ${
            dark ? "text-white" : "text-primary-gray-1000"
          }`}
        >
          {moment().format("ll")}
        </p>
      </div>
      <div className="flex flex-row items-center space-x-2">
        <img
          className="w-3"
          alt=""
          src={
            dark
              ? "/assets/svg/icon/timeWhite.svg"
              : "/assets/svg/icon/time.svg"
          }
        />
        <p
          className={`font-karla font-normal text-sm leading-5 ${
            dark ? "text-white" : "text-primary-gray-1000"
          }`}
        >
          {time}
        </p>
      </div>
    </div>
  );
}

export default DateTime;
