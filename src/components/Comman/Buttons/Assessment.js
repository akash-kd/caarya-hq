import React from "react";

function Assessment() {
  return (
    <div className="bg-black w-full justify-center rounded-full flex flex-row items-center space-x-2 shadow-lg py-5 px-10 text-white font-inter text-base font-semibold leading-6 tracking-[0.4px]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
      >
        <path
          d="M19.5 3H5.5C4.4 3 3.5 3.9 3.5 5V19C3.5 20.1 4.4 21 5.5 21H19.5C20.6 21 21.5 20.1 21.5 19V5C21.5 3.9 20.6 3 19.5 3ZM19.5 19H5.5V5H19.5V19ZM7.5 10H9.5V17H7.5V10ZM11.5 7H13.5V17H11.5V7ZM15.5 13H17.5V17H15.5V13Z"
          fill="white"
        />
      </svg>{" "}
      <p>Take Assessment</p>
    </div>
  );
}

export default Assessment;
