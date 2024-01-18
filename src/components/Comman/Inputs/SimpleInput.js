// TODO : Update documentation
import { useState } from "react";

/**
 * Simple Input field for changing values in an object
 * @param { String } label
 * @param { String } field - Key in the details oject
 * @param { Object } details - Object containing the details of the entity
 * @param { Function } setDetails - Function to changed the value of the given field in details object
 * @param { Boolean } srOnly - To display the label or not
 * @returns
 */
function SimpleInput({
  label,
  field,
  details,
  setDetails,
  srOnly = false,
  isDisabled,
  showError,
  required = false,
  errorMessage = "Please fill in the details",
  customError,
  bigText,
  placeholder,
  type,
  boldText,
  autoFocus = false,
  onFocus,
  onBlur,
}) {
  const [error, setError] = useState();
  return (
    <>
      <div className="flex flex-col items-start w-full">
        <label htmlFor={label} className={srOnly ? "sr-only" : "input-label"}>
          {required ? label + "*" : label}
        </label>
        <input
          onFocus={onFocus}
          onBlur={onBlur}
          autoFocus={autoFocus}
          id={label}
          name={label}
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
          className={`w-full px-2 pt-2 pb-1  appearance-none  theme-simple-input text-primary-gray-600 font-lato ${
            boldText ? "font-semibold" : "font-normal"
          }  ${
            bigText ? "text-2xl" : "text-sm"
          } leading-6 placeholder:text-primary-gray-225 bg-transparent focus:bg-transparent focus:outline-none focus:ring-transparent`}
        />
        {((showError &&
          (!details[field] || (details[field] && details[field] == ""))) ||
          error) && (
          <p className="text-alert text-2xs flex flex-row items-center mt-1 ml-0.5">
            {error || errorMessage}
          </p>
        )}
        {showError && customError && errorMessage && (
          <p className="text-alert text-2xs flex flex-row items-center mt-1 ml-0.5">
            {errorMessage}
          </p>
        )}
      </div>
    </>
  );
}

export default SimpleInput;
