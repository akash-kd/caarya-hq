import { ChevronRightIcon } from "@heroicons/react/solid";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import { useCallback, useEffect, useState } from "react";

const AddCollaborator = ({
  list,
  label,
  value,
  setValue,
  srOnly = false,
  isDisabled,
  placeholder,
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [showInputField, setShowInputField] = useState(false);
  const [showInput, setShowInput] = useState(value ? false : true);
  const [searchvalue, setsearchValue] = useState(
    list?.find((l) => l?.value == value)?.label || ""
  );

  const handleChange = useCallback(
    (e) => {
      const query = e.target.value.toLowerCase();
      setsearchValue(query);
      if (query.length > 1) {
        const filterSuggestions = list.filter(
          (suggestion) => suggestion?.label?.toLowerCase().indexOf(query) > -1
        );
        setSuggestions(filterSuggestions);
      } else {
        setSuggestions(list);
      }
    },
    [setSuggestions, list, setsearchValue]
  );

  const handleClick = (suggestion) => {
    setsearchValue(suggestion?.label);
    setValue(suggestion);
    setShowInput(false);
    setShowInputField(false);
    setShowSuggestion(false);
  };

  const handleKeyDown = (e) => {
    // UP ARROW
    if (e.keyCode === 38) {
      if (suggestionIndex === 0) {
        return;
      }
      setSuggestionIndex(suggestionIndex - 1);
    }
    // DOWN ARROW
    else if (e.keyCode === 40) {
      if (suggestionIndex - 1 === suggestions.length) {
        return;
      }
      setSuggestionIndex(suggestionIndex + 1);
    }
    // ENTER
    else if (e.keyCode === 13) {
      setsearchValue(suggestions[suggestionIndex]?.label);
      setValue(suggestions[suggestionIndex]);
      setShowInput(false);
      setSuggestionIndex(0);
      setShowInputField(false);
    }
  };

  const Suggestions = () => {
    return (
      <ul
        id="expandingDiv"
        style={{
          boxShadow:
            "0px 8px 10px -6px rgba(0, 0, 0, 0.10), 0px 20px 25px -5px rgba(0, 0, 0, 0.10), 0px -8px 12px 0px rgba(0, 0, 0, 0.05)",
        }}
        className={`bg-white rounded-b w-full font-lato text-primary-gray-800 text-sm max-h-[248px] overflow-y-auto mt-2  `}
      >
        <div>
          {suggestions.map((suggestion, index) => {
            return (
              <li
                className={`px-2 py-3 flex flex-row items-center justify-between cursor-pointer hover:bg-primary-gray-200 ${
                  index === suggestionIndex
                    ? "bg-primary-purple-lightest text-primary-purple-darker  font-semibold"
                    : "font-medium"
                }`}
                key={index}
                onClick={() => handleClick(suggestion)}
              >
                <div className="flex flex-row items-center space-x-4">
                  <img
                    src={
                      suggestion?.image?.url || "/assets/images/defaultUser.svg"
                    }
                    className="rounded-full h-6 w-6"
                    alt=""
                  />
                  <p className="text-primary-gray-800 font-lato text-xs font-light">
                    {suggestion?.label}
                  </p>
                </div>
                <ChevronRightIcon className="w-5 h-5 text-primary-yellow-dark" />
              </li>
            );
          })}
        </div>
      </ul>
    );
  };

  return (
    <div className="flex flex-col items-start w-full ">
      {!srOnly && (
        <label htmlFor={label} className={srOnly ? "sr-only" : "input-label"}>
          {label}
        </label>
      )}

      <div className="w-full flex flex-row items-center space-x-1.5 py-2 px-4 border-b border-primary-gray-80">
        {showInput ? (
          <>
            {showInputField ? (
              <input
                placeholder={placeholder}
                className={`w-full appearance-none text-primary-gray-800 font-lato font-normal text-sm leading-6 p-0 placeholder:text-primary-gray-225 bg-transparent focus:outline-none focus:ring-transparent focus:border-transparent border-0`}
                type="text"
                value={searchvalue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
            ) : (
              <div
                onClick={() => {
                  setShowInputField(true);
                  setSuggestions(list);
                  setShowSuggestion(true);
                }}
                className={`w-full appearance-none text-primary-gray-225 font-lato font-normal text-sm leading-6 placeholder:text-primary-gray-225 bg-transparent focus:outline-none focus:ring-transparent focus:border-transparent border-0`}
              >
                {placeholder}
              </div>
            )}
            <MagnifyingGlass className="text-primary-gray-225" size={16} />
          </>
        ) : (
          <div className="px-2 py-1.5 border max-w-max border-primary-gray-80 rounded-full bg-primary-yellow-30 flex flex-row items-center space-x-2 text-primary-gray-800 font-lato text-xs font-semibold">
            <img
              src={
                list?.find((a) => a?.value == value)?.image?.url ||
                "/assets/images/defaultUser.svg"
              }
              className="rounded-full h-5 w-5 mr-1.5"
              alt=""
            />
            <p>{list?.find((a) => a?.value == value)?.label}</p>
            <X
              onClick={() => {
                setValue();
                setShowInput(true);
                setsearchValue("");
                setShowSuggestion(true);
              }}
              className="cursor-pointer"
              size={12}
            />
          </div>
        )}
      </div>
      {showSuggestion && <Suggestions />}
    </div>
  );
};

export default AddCollaborator;
