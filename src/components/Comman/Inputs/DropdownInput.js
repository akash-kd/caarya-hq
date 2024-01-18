// TODO : Update documentation
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
//Icons
import { CheckIcon } from "@heroicons/react/solid";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { classNames } from "helpers/utils/classNames";

/**
 * Dropdown Input field for changing values in an object
 * @param { String } label
 * @param { String } field - Key in the details oject
 * @param { Object } details - Object containing the details of the entity
 * @param { Function } setValue - Function to changed the value of the given field in details object
 * @param { Boolean } srOnly - To display the label or not
 * @param { [ { label,value } ] } list - To display all options
 * @param { Boolean } required - to set the field as required
 * @returns
 */
export default function DropdownInput({
  label,
  dark,
  field,
  value,
  setValue,
  list,
  srOnly = false,
  isDisabled,
  showError,
  required = false,
  errorMessage = "Please select one",
}) {
  return (
    <>
      <div className="block w-full">
        <Listbox
          disabled={isDisabled}
          value={value}
          onChange={(val) => {
            setValue(val);
          }}
        >
          {({ open }) => (
            <>
              {!srOnly && (
                <div className="flex flex-col items-start w-full">
                  <label
                    htmlFor={label}
                    className={srOnly ? "sr-only" : "input-label"}
                  >
                    {required ? label + "*" : label}
                  </label>
                </div>
              )}
              <div className="relative font-lato">
                <Listbox.Button
                  className={`theme-input ${
                    dark ? "dark" : ""
                  } relative w-full py-1.5 pl-3.5 pr-10 text-left cursor-default placeholder:text-primary-gray-350 focus:outline-none focus:ring-transparent`}
                >
                  <span
                    className={`flex flex-row items-center truncate text-primary-gray-1000 inter font-normal text-xs leading-6 components-custom-input-dropdowninput-span max-w-[100px]`}
                  >
                    {list?.find((e) => e?.value == value)?.image && (
                      <img
                        src={
                          list?.find((e) => e?.value == value)?.image?.url ||
                          "/assets/images/defaultUser.svg"
                        }
                        className="rounded-full h-5 w-5 mr-1.5"
                        alt=""
                      />
                    )}{" "}
                    {list?.find((e) => e?.value == value)?.label ||
                      label ||
                      "Select..."}
                  </span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDownIcon
                      className={`h-5 w-5 text-primary-gray-600 `}
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                {showError && !value && (
                  <p className="text-caarya-red-lighter text-2xs flex flex-row items-center mt-1 ml-0.5">
                    {errorMessage}
                  </p>
                )}
                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-30 border-t-0 -mt-1.5 pt-1.5 w-full bg-white rounded-b-10px border border-neutral-gray-300 shadow-sm max-h-60 py-1 overflow-auto focus:outline-none">
                    {list?.map((item, index) => (
                      <Listbox.Option
                        key={index}
                        className={({ active }) =>
                          classNames(
                            active
                              ? "text-white bg-primary-yellow-darkest"
                              : "text-primary-gray-600",
                            "cursor-pointer select-none relative py-2 pl-4 pr-9 font-lato font-normal text-sm leading-6"
                          )
                        }
                        value={item?.value}
                      >
                        {({ selected, active }) => (
                          <div className="flex flex-row items-center">
                            {item?.image && (
                              <img
                                src={
                                  item?.image?.url ||
                                  "/assets/images/defaultUser.svg"
                                }
                                className="rounded-full h-5 w-5 mr-1.5"
                                alt=""
                              />
                            )}
                            <span
                              className={classNames(
                                selected ? "" : "",
                                "block text-left"
                              )}
                            >
                              {item.label}
                            </span>
                            {selected ? (
                              <span
                                className={classNames(
                                  active
                                    ? "text-white"
                                    : "text-primary-indigo-650",
                                  "absolute inset-y-0 right-0 flex items-center pr-2.5"
                                )}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </div>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      </div>

      {/* <div className="block md:hidden">
        <label htmlFor={label} className={srOnly ? "sr-only" : "input-label"}>
          {required ? label + "*" : label}
        </label>

        <div className="relative">
          <div className="input-dropdown-box relative w-full py-1.5 px-3.5 text-left cursor-default placeholder:text-primary-gray-350 focus:outline-none focus:ring-transparent focus:border-transparent">
            <select
              value={
                list?.find((e) => e?.value == value)?.label ||
                label ||
                "Select..."
              }
              disabled={isDisabled}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              className="block truncate text-primary-gray-600 font-lato font-normal text-xs w-full bg-transparent leading-6 components-custom-input-dropdowninput-span"
            >
              <option>
                {list?.find((e) => e?.value == value)?.label ||
                  label ||
                  "Select..."}
              </option>
              {list?.map((item, index) => (
                <option
                  key={index}
                  className={
                    "text-primary-gray-600 cursor-default select-none relative py-2 pl-4 pr-9 font-lato font-normal text-xs leading-6"
                  }
                  value={item?.value}
                >
                  {item.label}
                </option>
              ))}
            </select>
          </div>
          {showError && !value && (
            <p className="text-caarya-red-lighter text-2xs flex flex-row items-center mt-1 ml-0.5">
              {errorMessage}
            </p>
          )}
        </div>
      </div> */}
    </>
  );
}
