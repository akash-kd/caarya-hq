import { useState } from "react";

function SimpleTextArea({
  label,
  field,
  details,
  setDetails,
  srOnly = false,
  isDisabled,
  showError,
  required = false,
  errorMessage = "Please fill in the details",
  bigText,
  placeholder,
  type,
  boldText,
  autoFocus = false,
  horizontal,
  rows = 3,
}) {
  const [error, setError] = useState();
  return (
    <>
      <div
        className={`flex flex-col items-start space-y-0.5 ${
          horizontal
            ? "lg:flex-row lg:items-center lg:space-y-0 lg:space-x-2.5"
            : ""
        } w-full`}
      >
        <label
          htmlFor={label}
          className={`${srOnly ? "sr-only" : "input-label"} ${
            horizontal && " lg:w-3/12"
          }`}
        >
          {required ? label + "*" : label}
        </label>
        <div
          className={`theme-simple-input w-full ${horizontal && "lg:w-9/12"}`}
        >
          <textarea
            autoFocus={autoFocus}
            id={label}
            name={label}
            rows={rows}
            disabled={isDisabled}
            placeholder={placeholder ? placeholder : `Enter ${label}`}
            value={details[field] || ""}
            onChange={(e) => {
              switch (type) {
                case "phone":
                  e.target.value = e.target.value
                    .trimStart()
                    .replace(/[^0-9]/gi, "");
                  // console.log(e.key, e.charCode, e);
                  // if (e.key !== 8) if (e?.target?.value?.length > 10) return;
                  break;
                case "number":
                  e.target.value = e.target.value
                    .trimStart()
                    .replace(/[^0-9]/gi, "");
                  break;
                default:
              }

              if (field === "name" || field === "title") {
                if (e.target.value?.length > 100) {
                  setError("Cannot exceed 100 characters!");
                  return;
                }
              }
              setError();
              setDetails({ ...details, [field]: e.target.value });
            }}
            className={`w-full appearance-none border-0 p-2 pb-1 text-primary-gray-1000 font-poppins ${
              boldText ? "font-bold" : "font-normal"
            }  ${
              bigText ? "text-2xl" : "text-sm"
            } leading-6 placeholder:text-primary-gray-225 bg-transparent focus:outline-none focus:ring-transparent`}
          ></textarea>
          {((showError &&
            (!details[field] || (details[field] && details[field] == ""))) ||
            error) && (
            <p className="text-caarya-red-lighter text-2xs flex flex-row items-center mt-1 ml-0.5">
              {error || errorMessage}
            </p>
          )}
          {showError && errorMessage && (
            <p className="text-caarya-red-lighter text-2xs flex flex-row items-center mt-1 ml-0.5">
              {errorMessage}
            </p>
          )}{" "}
        </div>
      </div>
    </>
  );
}

export default SimpleTextArea;
