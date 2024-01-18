import { useState, useEffect } from "react";
import moment from "moment";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

function DateSelect({ date = null, setDate, type, canChange = true }) {
  const [selectedTab, setSelectedTab] = useState();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (date) {
      console.log(
        date,
        moment(date).format("MM-DD-YYYY"),
        moment().add(1, "days").format("MM-DD-YYYY")
      );
      if (type == "goal") {
        if (
          new Date(date) > new Date(new Date().getTime()) &&
          new Date(date) <=
            new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000)
        ) {
          setSelectedTab(0);
        } else if (
          new Date(date) >
            new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000) &&
          new Date(date) <
            new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
        ) {
          setSelectedTab(1);
        } else {
          setSelectedTab(2);
        }
      } else {
        if (
          new Date(date) >
            new Date(new Date().getTime() - 24 * 60 * 60 * 1000) &&
          new Date(date) < new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
        ) {
          setSelectedTab(0);
        } else if (
          new Date(date) >
            new Date(new Date().getTime() + 24 * 60 * 60 * 1000) &&
          new Date(date) <
            new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
        ) {
          setSelectedTab(1);
        } else {
          setSelectedTab(2);
        }
      }
    }
  }, [date]);

  return (
    <>
      <div className="w-full">
        <div className="grid grid-cols-6 gap-x-2 md:gap-x-4 w-full relative">
          <div
            onClick={() => {
              let d =
                type == "goal"
                  ? new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000)
                  : new Date();

              canChange && setDate(d);
            }}
            className={`flex flex-row items-center cursor-pointer rounded primary-shadow justify-center space-x-1 sm:space-x-2.5 py-2 px-2 border col-span-2 z-10 ${
              selectedTab == 0
                ? "bg-primary-yellow-lightest border-black"
                : "bg-white border-gray-200"
            }`}
          >
            <h1
              className={`font-lato text-xs mt-0.5 cursor-pointer ${
                selectedTab == 0
                  ? "text-black font-normal"
                  : "text-gray-400 font-normal"
              }`}
            >
              {type == "goal" ? "This sprint" : "Today"}
            </h1>
          </div>
          <div
            onClick={() => {
              let d =
                type == "goal"
                  ? new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
                  : new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);
              canChange && setDate(d);
            }}
            className={`flex flex-row items-center cursor-pointer primary-shadow rounded justify-center space-x-1 sm:space-x-2.5 py-2 px-2 border col-span-2 ${
              selectedTab == 1
                ? "bg-primary-yellow-lightest border-black"
                : "bg-white border-gray-200"
            }`}
          >
            <h1
              className={`font-lato text-xs mt-0.5 cursor-pointer ${
                selectedTab == 1
                  ? "text-black font-normal"
                  : "text-gray-400 font-normal"
              }`}
            >
              {type == "goal" ? "This month" : "This week"}
            </h1>
          </div>
          <div
            onClick={() => canChange && setCalendarOpen(true)}
            className={`flex flex-row items-center cursor-pointer primary-shadow rounded justify-center space-x-1 sm:space-x-2.5 py-2 px-2 border col-span-2 ${
              selectedTab == 2
                ? "bg-primary-yellow-lightest border-black"
                : "bg-white border-gray-200"
            }`}
          >
            <h1
              className={`font-lato text-xs mt-0.5 cursor-pointer ${
                selectedTab == 2
                  ? "text-black font-normal"
                  : "text-gray-400 font-normal"
              }`}
            >
              Set a date
            </h1>
          </div>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DesktopDatePicker
              open={calendarOpen}
              label=""
              value={selectedTab == 2 ? date : null}
              onChange={(value) => {
                console.log(value);
                setDate(value);
                setSelectedTab(2);
                setCalendarOpen(false);
              }}
              PopperProps={{
                placement: "bottom-end",
                anchorEl: anchorEl,
              }}
              renderInput={({ inputRef, inputProps }) => (
                <div
                  onClick={(event) => {
                    setCalendarOpen(true);
                    setAnchorEl(event.currentTarget);
                  }}
                  className={`hidden flex-row items-center primary-shadow rounded justify-center space-x-1 sm:space-x-2.5 py-2 px-2  col-span-2  ${
                    selectedTab == 2
                      ? "bg-primary-ash-500"
                      : "bg-primary-ash-200"
                  }`}
                >
                  {/* {selectedTab == 2 ? (
                    <img
                      src="/assets/images/icons/calendarWhite.svg"
                      alt=""
                      className="w-3"
                    />
                  ) : (
                    <img
                      src="/assets/images/icons/calendar.svg"
                      alt=""
                      className="w-3"
                    />
                  )} */}
                  <input
                    aria-label="Date"
                    ref={inputRef}
                    {...inputProps}
                    placeholder="Custom"
                    className={`font-lato text-xs mt-0.5 cursor-pointer bg-transparent w-20 ${
                      selectedTab == 2
                        ? "text-white font-normal"
                        : "text-primary-ash-500 font-normal"
                    }`}
                  ></input>
                </div>
              )}
            />
          </LocalizationProvider>
        </div>
      </div>
    </>
  );
}

export default DateSelect;

function DateSelectOptions({ date = null, setDate, canChange = true }) {
  const [selectedTab, setSelectedTab] = useState();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (date) {
      console.log(
        date,
        moment(date).format("MM-DD-YYYY"),
        moment().add(1, "days").format("MM-DD-YYYY")
      );

      if (
        new Date(date) > new Date(new Date().getTime() - 24 * 60 * 60 * 1000) &&
        new Date(date) < new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
      ) {
        setSelectedTab(0);
      } else if (
        new Date(date) > new Date(new Date().getTime() + 24 * 60 * 60 * 1000) &&
        new Date(date) <
          new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
      ) {
        setSelectedTab(1);
      } else if (
        new Date(date) >
          new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000) &&
        new Date(date) <
          new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
      ) {
        setSelectedTab(2);
      } else if (
        new Date(date) >
          new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000) &&
        new Date(date) <
          new Date(new Date().getTime() + 90 * 24 * 60 * 60 * 1000)
      ) {
        setSelectedTab(3);
      } else {
        setSelectedTab(4);
      }
    }
  }, [date]);

  return (
    <>
      <div className="w-full">
        <div className="w-full flex flex-row items-center -ml-1 flex-wrap relative">
          <div
            onClick={() => {
              let d = new Date();

              canChange && setDate(d);
            }}
            className={`m-1 flex flex-row items-center cursor-pointer rounded primary-shadow justify-center space-x-1 sm:space-x-2.5 px-2 py-1 border col-span-2 z-10 ${
              selectedTab == 0
                ? "bg-primary-yellow-30 border-primary-yellow-medium"
                : "bg-white border-primary-gray-200"
            }`}
          >
            <h1
              className={`font-lato text-xs mt-0.5 cursor-pointer ${
                selectedTab == 0
                  ? "text-black font-normal"
                  : "text-gray-400 font-normal"
              }`}
            >
              Later Today
            </h1>
          </div>
          <div
            onClick={() => {
              let d = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);
              canChange && setDate(d);
            }}
            className={`m-1 flex flex-row items-center cursor-pointer primary-shadow rounded justify-center space-x-1 sm:space-x-2.5 px-2 py-1 border col-span-2 ${
              selectedTab == 1
                ? "bg-primary-yellow-30 border-primary-yellow-medium"
                : "bg-white border-primary-gray-200"
            }`}
          >
            <h1
              className={`font-lato text-xs mt-0.5 cursor-pointer ${
                selectedTab == 1
                  ? "text-black font-normal"
                  : "text-gray-400 font-normal"
              }`}
            >
              This Week
            </h1>
          </div>
          <div
            onClick={() => {
              let d = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000);
              canChange && setDate(d);
            }}
            className={`m-1 flex flex-row items-center cursor-pointer primary-shadow rounded justify-center space-x-1 sm:space-x-2.5 px-2 py-1 border col-span-2 ${
              selectedTab == 2
                ? "bg-primary-yellow-30 border-primary-yellow-medium"
                : "bg-white border-primary-gray-200"
            }`}
          >
            <h1
              className={`font-lato text-xs mt-0.5 cursor-pointer ${
                selectedTab == 2
                  ? "text-black font-normal"
                  : "text-gray-400 font-normal"
              }`}
            >
              This Month
            </h1>
          </div>
          <div
            onClick={() => {
              let d = new Date(new Date().getTime() + 90 * 24 * 60 * 60 * 1000);
              canChange && setDate(d);
            }}
            className={`m-1 flex flex-row items-center cursor-pointer primary-shadow rounded justify-center space-x-1 sm:space-x-2.5 px-2 py-1 border col-span-2 ${
              selectedTab == 3
                ? "bg-primary-yellow-30 border-primary-yellow-medium"
                : "bg-white border-primary-gray-200"
            }`}
          >
            <h1
              className={`font-lato text-xs mt-0.5 cursor-pointer ${
                selectedTab == 3
                  ? "text-black font-normal"
                  : "text-gray-400 font-normal"
              }`}
            >
              This Quarter
            </h1>
          </div>
          <div
            onClick={() => canChange && setCalendarOpen(true)}
            className={`m-1 flex flex-row items-center cursor-pointer primary-shadow rounded justify-center space-x-1 sm:space-x-2.5 px-2 py-1 border col-span-2 ${
              selectedTab == 4
                ? "bg-primary-yellow-30 border-primary-yellow-medium"
                : "bg-white border-primary-gray-200"
            }`}
          >
            <h1
              className={`font-lato text-xs mt-0.5 cursor-pointer ${
                selectedTab == 4
                  ? "text-black font-normal"
                  : "text-gray-400 font-normal"
              }`}
            >
              Set a date
            </h1>
          </div>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DesktopDatePicker
              open={calendarOpen}
              label=""
              value={selectedTab == 4 ? date : null}
              onChange={(value) => {
                console.log(value);
                setDate(value);
                setSelectedTab(2);
                setCalendarOpen(false);
              }}
              PopperProps={{
                placement: "bottom-end",
                anchorEl: anchorEl,
              }}
              renderInput={({ inputRef, inputProps }) => (
                <div
                  onClick={(event) => {
                    setCalendarOpen(true);
                    setAnchorEl(event.currentTarget);
                  }}
                  className={`hidden flex-row items-center primary-shadow rounded justify-center space-x-1 sm:space-x-2.5 py-2 px-2  col-span-2  ${
                    selectedTab == 4
                      ? "bg-primary-ash-500"
                      : "bg-primary-ash-200"
                  }`}
                >
                  {/* {selectedTab == 2 ? (
                    <img
                      src="/assets/images/icons/calendarWhite.svg"
                      alt=""
                      className="w-3"
                    />
                  ) : (
                    <img
                      src="/assets/images/icons/calendar.svg"
                      alt=""
                      className="w-3"
                    />
                  )} */}
                  <input
                    aria-label="Date"
                    ref={inputRef}
                    {...inputProps}
                    placeholder="Custom"
                    className={`font-lato text-xs mt-0.5 cursor-pointer bg-transparent w-20 ${
                      selectedTab == 4
                        ? "text-white font-normal"
                        : "text-primary-ash-500 font-normal"
                    }`}
                  ></input>
                </div>
              )}
            />
          </LocalizationProvider>
        </div>
      </div>
    </>
  );
}

export { DateSelectOptions };
