import { RadioGroup } from "@headlessui/react";
import { classNames } from "helpers/utils/classNames";

function CircledRadioInput({ details, setDetails, field, list }) {
  return (
    <>
      <RadioGroup
        value={details[field]}
        onChange={(e) =>
          setDetails({
            ...details,
            [field]: e,
          })
        }
        className=""
      >
        <RadioGroup.Label className=""></RadioGroup.Label>
        <div className="flex flex-row items-stretch space-x-3">
          {list?.map((option) => (
            <RadioGroup.Option
              key={option?.value}
              value={option?.value}
              className={({ active, checked }) =>
                classNames(
                  option?.value == details[field]
                    ? "bg-primary-yellow-darkest border-transparent text-white"
                    : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50",
                  "border rounded-full py-2 px-1 h-9 w-9 cursor-pointer flex items-center justify-center text-sm font-medium uppercase sm:flex-1 hover-on-card"
                )
              }
            >
              <RadioGroup.Label as="p" className="card-hover-text">
                {option?.label}
              </RadioGroup.Label>
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </>
  );
}

export default CircledRadioInput;
