import { RadioGroup } from "@headlessui/react";

import * as Icons from "@heroicons/react/solid";
import { classNames } from "helpers/utils/classNames";

const HeroIcon = ({ icon }) => {
  const Icon = Icons[icon];
  return (
    <div className="flex-col">
      <Icon className="w-6 h-6 pr-2 rounded-full theme-indigo-500" alt="logo" />
    </div>
  );
};

function ImageRadioInput({
  value,
  setValue,
  valueList,
  labelList,
  label,
  grid = 2,
  lgGrid = 2,
  img,
  flex,
}) {
  return (
    <RadioGroup
      value={value}
      onChange={(e) => {
        // setItem(e);
      }}
      className=""
    >
      <RadioGroup.Label className={(!label ? "hidden" : "", "input-label")}>
        {label}
      </RadioGroup.Label>
      <div
        className={`${
          flex
            ? "-ml-1 flex flex-row items-center flex-wrap"
            : `mt-1.5 grid grid-cols-${grid} gap-2 sm:grid-cols-${lgGrid}`
        }`}
      >
        {valueList.map((option, idx) => (
          <RadioGroup.Option
            onClick={() => {
              setValue(option);
            }}
            key={option?.name}
            value={option}
            className={({ active, checked }) =>
              classNames(
                active ? "" : "",
                value === option
                  ? "border-primary-yellow-medium"
                  : "hover:bg-gray-50 border-primary-gray-200",
                flex ? "m-2" : "",
                "bg-white border rounded-lg px-4 py-2 text-primary-gray-300 space-x-2 cursor-pointer flex items-center justify-center text-sm font-lato font-light sm:flex-1 hover-on-card"
              )
            }
          >
            {img && img.length > 0 && (
              <>
                {img[idx] && img[idx]?.image ? (
                  <img src={img[idx]?.image} alt="icon" className="w-3 h-3" />
                ) : (
                  <HeroIcon icon={img[idx]?.icon} />
                )}
              </>
            )}
            <RadioGroup.Label as="p" className="card-hover-text text-sm ">
              {labelList[idx]}
            </RadioGroup.Label>
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}

export default ImageRadioInput;
