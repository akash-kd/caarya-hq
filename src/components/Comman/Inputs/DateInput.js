import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs from "dayjs";

function DateInput({ date, onChange }) {
  const [calendarOpen, setCalendarOpen] = useState(false);
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDatePicker
          value={dayjs(date)}
          onChange={(value) => {
            onChange(value);
          }}
          sx={{
            width: "100%",
            ".MuiInputBase-input": {
              padding: "4px 8px",
              fontSize: ".8rem",
            },
          }}
          renderInput={({ inputRef, inputProps }) => (
            <div
              onClick={() => setCalendarOpen(true)}
              className="flex flex-col items-center bg-white border rounded-lg py-1 px-2.5 max-w-max"
            >
              {date ? (
                <input
                  ref={inputRef}
                  {...inputProps}
                  className="text-primary-gray-1000 w-20 font-lato font-normal focus:border-0 focus:ring-0 focus:outline-none bg-transparent border-0 p-0 text-xs lg:text-base"
                ></input>
              ) : (
                <input
                  ref={inputRef}
                  {...inputProps}
                  placeholder="Add Due Date"
                  className="text-primary-gray-1000 w-20 bg-white rounded-full py-1 px-2.5 focus:border-0 focus:ring-0 focus:outline-none bg-transparent border-0 p-0 font-karla text-xs"
                ></input>
              )}
            </div>
          )}
        />
      </LocalizationProvider>
    </>
  );
}

export default DateInput;
