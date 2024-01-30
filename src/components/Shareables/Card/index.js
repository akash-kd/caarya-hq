import React, { useState, useEffect } from "react";
import { ChevronRightIcon, XIcon } from "@heroicons/react/solid";
import ReactPlayer from "react-player";

/**
 * ShortURLs Card Component under caarya.space
 * @param {String} title
 * @param {String} description
 * @param {Object} type
 * @param {Object} creator -Object containing creators details
 * @param {Function} onClick
 * @returns
 */

function ShortURLsCard({
  title,
  description,
  type,
  creator,
  long_url,
  onClick,
  short_url,
}) {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setShow(true);
      }, 100);
    }
  }, [open]);

  useEffect(() => {
    if (!show) {
      setTimeout(() => {
        setOpen(false);
      }, 50);
    }
  }, [show]);
  return (
    <div
      style={{
        boxShadow:
          "0px 4px 6px -4px rgba(0, 0, 0, 0.10), 0px 10px 15px -3px rgba(0, 0, 0, 0.10)",
      }}
      className="p-4 bg-white rounded-lg flex flex-col space-y-3"
    >
      <div className="flex flex-row items-stretch justify-between">
        <span className="flex flex-row items-center space-x-2 bg-primary-neutral-50 text-3xs text-primary-neutral-700 rounded-full font-lato font-medium leading-3 inline-flex px-2 py-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
          >
            <g clip-path="url(#clip0_178_745)">
              <path
                d="M7.95444 10H2.04534C1.67034 10 1.36353 9.69318 1.36353 9.31818V0.681816C1.36353 0.306816 1.67034 0 2.04534 0H6.13626L8.63626 2.5V9.31818C8.63626 9.69318 8.32944 10 7.95444 10Z"
                fill="#0086F9"
              />
              <path d="M6.13623 0L8.63623 2.5H6.13623V0Z" fill="#0067D9" />
              <path
                d="M2.95435 3.86328H7.04526V4.43146H2.95435V3.86328Z"
                fill="#FBFFFF"
              />
              <path
                d="M2.95435 5.22656H7.04526V5.79475H2.95435V5.22656Z"
                fill="#FBFFFF"
              />
              <path
                d="M2.95435 6.58984H5.9089V7.15803H2.95435V6.58984Z"
                fill="#FBFFFF"
              />
            </g>
            <defs>
              <clipPath id="clip0_178_745">
                <rect width="10" height="10" fill="white" />
              </clipPath>
            </defs>
          </svg>{" "}
          <p>{type?.name}</p>
        </span>
        <a
          href={short_url}
          target="__blank"
          className="text-xs flex flex-row items-center space-x-1 font-bold text-primary-red-medium underline underline-offset-2 font-lato leading-5"
        >
          <p>View </p> <ChevronRightIcon className="w-4 h-4" />
        </a>
      </div>
      <div className="px-2 flex flex-col space-y-2">
        <p className="text-sm line-clamp-2 leading-5 font-lato text-black font-medium">
          {title || "No Title"}
        </p>
        <p className="text-primary-neutral-500 font-lato text-xs font-normal leading-5 tracking-[0.24px]">
          Associated Project
        </p>
      </div>
    </div>
  );
}

function ShortUrlLoader() {
  return (
    <div className=" cursor-pointer bg-white shadow-container rounded-20px">
      <div>
        <div className="relative group py-5 px-5 focus-within:ring-0 animate-pulse">
          <div>
            <span className="bg-primary-red-dark text-2xs text-white rounded-full inline-flex px-2 py-0.5"></span>
          </div>
          <div className="mt-2 flex flex-col items-start w-full">
            <h3 className="">
              <div className="focus:outline-none w-full">
                <p className="w-10/12 text-sm line-clamp-2 leading-4 font-inter text-primary-gray-1000 cursor-pointer break-words font-bold">
                  <p className="inter text-sm h-2 rounded bg-primary-red-lighter animate-pulse w-full font-normal text-primary-gray-600"></p>
                </p>
              </div>
            </h3>
            <p className="inter text-sm h-2 mt-1 rounded w-7/12 bg-primary-red-lighter animate-pulse w-full font-normal text-primary-gray-600"></p>

            <a
              target="_blank"
              className="mt-4 text-xs font-bold text-primary-red-darkest border-primary-red-lighter break-all inter border-t pt-2 w-full"
            >
              <p className="inter text-sm h-2 rounded w-20 bg-primary-red-lighter animate-pulse w-full font-normal text-primary-gray-600"></p>
            </a>
          </div>
          <span
            className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
            aria-hidden="true"
          >
            <img
              src={"/assets/svg/defaultUser.svg"}
              alt="creator"
              className="h-6 w-6 rounded-full"
            />
          </span>
        </div>
      </div>
    </div>
  );
}

export default ShortURLsCard;
export { ShortUrlLoader };
