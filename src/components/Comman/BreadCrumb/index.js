import { ChevronRightIcon } from "@heroicons/react/solid";
import React from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function BreadCrumb({ page1, page2, page3, click1, click2, click3, back }) {
  const history = useHistory();
  return (
    <div className=" px-3 py-2 space-x-2 flex flex-row items-center font-lato -mt-2 tracking-wide text-primary-yellow-darker text-2xs border-b-2 border-primary-gray-80">
      {back && <BiLeftArrowAlt onClick={history.goBack} className="text-2xl" />}
      <p className="font-semibold ">{page1}</p>
      {page2 && (
        <>
          <ChevronRightIcon className="w-3 h-3" />
          <p className={`font-light  ${page3 ? "" : "underline"}`}>{page2}</p>
        </>
      )}
      {page3 && (
        <>
          <ChevronRightIcon className="w-3 h-3" />
          <p className={`font-light underline `}>{page3}</p>
        </>
      )}
    </div>
  );
}

export default BreadCrumb;
