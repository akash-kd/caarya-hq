import { ChevronRightIcon } from "@heroicons/react/solid";
import React from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function BreadCrumb({
  page1,
  page2,
  page3,
  click1,
  click2,
  click3,
  back,
  dark = false,
}) {
  const history = useHistory();
  return (
    <div
      className={`${
        dark ? "bg-dark-bg text-stone-200" : "text-primary-neutral-500"
      } px-3 py-2 space-x-2 flex flex-row items-center font-lato -mt-2 tracking-wide  text-2xs border-b border-primary-neutral-100`}
    >
      {back && <BiLeftArrowAlt onClick={history.goBack} className="text-2xl" />}
      <p className="font-semibold ">{page1}</p>
      {page2 && (
        <>
          <ChevronRightIcon className="w-3 h-3" />
          <p className={`  ${page3 ? "font-light" : "font-semibold"}`}>
            {page2}
          </p>
        </>
      )}
      {page3 && (
        <>
          <ChevronRightIcon className="w-3 h-3" />
          <p className={`  ${page3 ? "font-light" : "font-semibold"}`}>
            {page3}
          </p>
        </>
      )}
    </div>
  );
}

export default BreadCrumb;
