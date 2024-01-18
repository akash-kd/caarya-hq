import { classNames } from "helpers/utils/classNames";
import { RadioGroup } from "@headlessui/react";

function RadioInput({ value, setValue, list, label = "", srOnly }) {
  return (
    <>
      <RadioGroup
        value={value}
        onChange={(e) => {
          console.log(e);
          setValue(e);
          // setItem(e);
        }}
        className="mt-2"
      >
        <RadioGroup.Label className={srOnly ? "sr-only" : ""}>
          {label}
        </RadioGroup.Label>
        <div className="mt-1.5 grid grid-cols-2 gap-3">
          {list.map((option) => (
            <RadioGroup.Option
              key={option.value}
              value={option?.value}
              className={({ active, checked }) =>
                classNames(
                  active
                    ? "ring-2 ring-offset-2 ring-primary-yellow-medium"
                    : "",
                  option?.value == value
                    ? "bg-primary-yellow-medium border-transparent text-primary-gray-1000 "
                    : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50",
                  "border rounded-md p-2 flex items-center justify-center text-2xs font-lato font-medium sm:flex-1"
                )
              }
            >
              <RadioGroup.Label as="p">{option.label}</RadioGroup.Label>
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </>
  );
}

export default RadioInput;
