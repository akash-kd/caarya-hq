import React from "react";
//Ui
import { RadioGroup } from "@headlessui/react";
//Utils
import { classNames } from "helpers/utils/classNames";

/**
 * Circular Radio Input field for changing values in an object
 * @param { String } label
 * @param { String } field - Key in the details oject
 * @param { Object } details - Object containing the details of the entity
 * @param { Function } setDetails - Function to changed the value of the given field in details object
 * @param { Boolean } srOnly - To display the label or not
 * @param { [ { label,value } ] } list - To display all options
 * @param { Boolean } required - to set the field as required
 * @returns
 */
export default function SimpleRadioBoxesForObject({
  labelComponent,
  label,
  field,
  details,
  setDetails,
  list,
  srOnly = false,
  showError,
  maxItems,
  minItems = 5,
  required = false,
  darkSelect,
  selectBlue,
  errorMessage = "Please select one",
  customSelect,
}) {
  return (
    <div className="w-full">
      <RadioGroup
        value={details[field]}
        onChange={(e) => {
          setDetails({ ...details, [field]: e });
        }}
        className=""
      >
        {(label || labelComponent) && (
          <RadioGroup.Label
            className={
              srOnly
                ? "sr-only"
                : "text-2xs text-primary-gray-450 leading-3 mb-2.5 font-lato font-normal"
            }
          >
            {labelComponent
              ? React.cloneElement(labelComponent, {})
              : required
              ? label + "*"
              : label}
          </RadioGroup.Label>
        )}
        {console.log(minItems)}
        <div
          className={`mt-2.5 grid ${
            minItems ? `grid-cols-${minItems}` : "grid-cols-5"
          } gap-3 md:grid-cols-${minItems} xl:grid-cols-${maxItems}`}
        >
          {list.map((option) => (
            <RadioGroup.Option
              key={option.label + field}
              value={option?.value}
              className={({ active, checked }) =>
                classNames(
                  active ? "" : "",
                  checked
                    ? `${
                        customSelect
                          ? `input-field-box-selected-custom ${
                              customSelect?.find(
                                (i) => details[field] == i?.value
                              )?.selected
                            }`
                          : darkSelect
                          ? selectBlue
                            ? "input-field-box-selected-blue"
                            : "input-field-box-selected-dark font-bold"
                          : "input-field-box-selected font-bold"
                      }`
                    : "input-field-box",
                  "hover-on-card p-2 flex items-center justify-center font-lato text-primary-gray-1000 text-sm sm:flex-1"
                )
              }
            >
              <RadioGroup.Label
                as="p"
                className="card-hover-text cursor-pointer"
              >
                {option?.label}
              </RadioGroup.Label>
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
