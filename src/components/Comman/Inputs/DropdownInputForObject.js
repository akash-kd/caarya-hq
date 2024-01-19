// TODO : Update documentation
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
//Icons
import { CheckIcon } from "@heroicons/react/solid";
import { ChevronDownIcon } from "@heroicons/react/outline";
//Utils
import { classNames } from "helpers/utils/classNames";

/**
 * Dropdown Input field for changing values in an object
 * @param { String } label
 * @param { String } field - Key in the details oject
 * @param { Object } details - Object containing the details of the entity
 * @param { Function } setDetails - Function to changed the value of the given field in details object
 * @param { Boolean } srOnly - To display the label or not
 * @param { [ { label,value } ] } list - To display all options
 * @param { Boolean } required - to set the field as required
 * @returns
 */
export default function DropdownInputForObject({
  label,
  field,
  details,
  setDetails,
  list,
  srOnly = false,
  disabled,
  showError,
  required = false,
  errorMessage = "Please select one",
}) {
  return (
    <div>
      <Listbox
        disabled={disabled}
        value={field ? details[field] : ""}
        onChange={(val) => {
          setDetails({ ...details, [field]: val });
        }}
      >
        {({ open }) => (
          <>
            <div className="flex flex-col items-start w-full">
              <label
                htmlFor={label}
                className={
                  srOnly
                    ? "sr-only"
                    : "text-2xs text-primary-gray-450 leading-3 mb-2.5 font-lato font-normal"
                }
              >
                {required ? label + "*" : label}
              </label>
            </div>
            <div className="relative">
              <Listbox.Button className="bg-white z-[1000] rounded-10px relative w-full py-1.5 pl-3.5 pr-10 text-left cursor-default placeholder:text-primary-gray-350 focus:outline-none focus:ring-transparent focus:border-transparent">
                <span className="block truncate text-primary-gray-450 font-lato font-normal text-xs leading-6 components-custom-input-dropdowninput-span">
                  {list?.find((e) => e?.value == details[field])?.label ||
                    details[field] ||
                    label ||
                    "Select..."}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDownIcon
                    className="h-5 w-5 text-primary-gray-450"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              {showError &&
                (!details[field] ||
                  (details[field] && details[field] == "")) && (
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
                <Listbox.Options className="absolute z-10 w-full bg-white max-h-40 py-1 overflow-auto focus:outline-none">
                  {list?.map((item, index) => (
                    <Listbox.Option
                      key={index}
                      className={({ active }) =>
                        classNames(
                          active
                            ? "text-primary-yellow-darker bg-primary-yellow-lighter"
                            : "text-primary-gray-450",
                          "cursor-default select-none relative py-2 pl-4 pr-9 font-lato font-normal text-xs leading-6"
                        )
                      }
                      value={item?.value}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={classNames(
                              selected ? "" : "",
                              "block truncate text-left"
                            )}
                          >
                            {item.label}
                          </span>

                          {selected ? (
                            <span
                              className={classNames(
                                active
                                  ? "text-primary-yellow-darker"
                                  : "text-primary-gray-450",
                                "absolute inset-y-0 right-0 flex items-center pr-2.5"
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
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
