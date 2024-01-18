import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, XIcon } from "@heroicons/react/solid";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { classNames } from "helpers/utils/classNames";

/**
 * Dropdown Input field for selecting multiple values
 * @param { String } label
 * @param { Function } setDetails - Function to send the value of recently selected
 * @param { Array } selectedValues - All the selected values
 * @param { Boolean } srOnly - To display the label or not
 * @param { [ { label,value } ] } list - To display all options
 * @param { Boolean } required - to set the field as required
 * @returns
 */
export default function DropdownInputForMultipleSelect({
  label,
  setDetails,
  list,
  selectedValues,
  srOnly = false,
  isDisabled,
  showError,
  required = false,
  errorMessage = "Please select at least one",
}) {
  return (
    <div>
      <Listbox
        onChange={(val) => {
          setDetails(val);
        }}
      >
        {({ open }) => (
          <>
            <Listbox.Label
              className={
                srOnly
                  ? "sr-only"
                  : "block subtitle1 mb-2 text-neutral-gray-500"
              }
            >
              {required ? label + "*" : label}
            </Listbox.Label>
            <div className="relative">
              <Listbox.Button className="theme-input relative w-full pt-1.5 pl-3.5 pr-10 text-left cursor-default placeholder:text-primary-gray-350 focus:outline-none focus:ring-transparent ">
                <span className="flex flex-row flex-wrap items-center truncate text-primary-gray-1000 font-lato font-normal text-sm leading-6">
                  {selectedValues?.length > 0 && (
                    <>
                      {selectedValues?.map((i) => {
                        return (
                          <div className="flex flex-row mr-2.5 mb-1.5 items-center truncate text-primary-gray-1000 font-lato font-normal text-xs leading-6">
                            <img
                              src={
                                list?.find((e) => e?.value == i)?.image?.url ||
                                "/assets/images/defaultUser.svg"
                              }
                              className="rounded-full h-5 w-5 mr-1.5"
                              alt=""
                            />
                            <p className="">
                              {list?.find((e) => e?.value == i)?.label}
                            </p>

                            <XIcon
                              onClick={(e) => {
                                e.preventDefault();
                                setDetails(i);
                              }}
                              className="w-3.5 h-3.5 ml-2 text-caarya-red-medium cursor-pointer"
                            />
                          </div>
                        );
                      })}
                    </>
                  )}
                  {(selectedValues?.length == 0 || !selectedValues) && (
                    <div className="mb-1.5 text-gray-300">Select {label}</div>
                  )}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDownIcon
                    className="h-5 w-5 text-primary-gray-600"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              {showError &&
                (!selectedValues ||
                  (selectedValues && selectedValues.length === 0)) && (
                  <p className="text-caarya-red-lighter bodyText3 flex flex-row items-center mt-1 ml-0.5">
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
                  {list
                    ?.filter((i) => !selectedValues?.includes(i?.value))
                    ?.map((item, index) => (
                      <Listbox.Option
                        key={index}
                        className={({ active }) =>
                          classNames(
                            selectedValues?.includes(item?.value)
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
                                "block truncate"
                              )}
                            >
                              {item.label}
                            </span>

                            {selectedValues?.includes(item?.value) ? (
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
  );
}
