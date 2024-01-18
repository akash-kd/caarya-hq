import React, { useState, useEffect } from "react";
import { XIcon } from "@heroicons/react/solid";
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
      className={`cursor-pointer bg-white shadow-container rounded-20px ${
        open ? "learning-box-expanded" : `learning-box`
      }`}
    >
      <div>
        <div className="relative group py-5 px-5 focus-within:ring-0">
          <div>
            <span className="bg-primary-red-medium text-2xs text-white rounded-full inline-flex px-2 py-0.5">
              {type?.name}
            </span>
          </div>
          <div className="mt-2 flex flex-col items-start w-full">
            <h3 className="">
              <div className="focus:outline-none w-full">
                <p className="w-full text-sm line-clamp-2 leading-4 font-inter text-primary-gray-1000 cursor-pointer break-words font-bold">
                  {title || "No Title"}
                </p>
              </div>
            </h3>
            <p className="mt-1 text-sm text-primary-gray-1000 opacity-70 line-clamp-2 inter">
              {description || "No Description"}
            </p>
            <div className="mt-4 font-inter text-xs font-bold text-primary-red-darkest border-primary-red-lighter break-all border-t pt-2 w-full flex flex-row items-center justify-between">
              <div
                className={show ? "invisible" : "visible"}
                onClick={() => {
                  onClick ? onClick() : setOpen(true);
                }}
              >
                View ->
              </div>

              <div
                className={show ? "visible" : "invisible"}
                onClick={() => {
                  setShow(false);
                }}
              >
                <XIcon className="w-4 h-4 text-primary-red-darkest cursor-pointer" />
              </div>
            </div>
          </div>
          <span
            className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
            aria-hidden="true"
          >
            <img
              src={creator?.image?.url || "/assets/svg/defaultUser.svg"}
              alt="creator"
              className="h-6 w-6 rounded-full"
            />
          </span>
        </div>
      </div>

      <div
        className={`-mt-3 ${
          open
            ? "show-learning-box learning-box-details-expanded"
            : "hide-learning-box learning-box-details"
        }`}
      >
        {show && (
          <div
            className={`pb-2.5 px-5 learning-box-details-expanded relative ${
              show ? "show-learning-box" : "hide-learning-box"
            }`}
          >
            <div>
              <ReactPlayer
                className="react-player"
                url={long_url}
                width="100%"
                height="100%"
                playing
              />
            </div>
          </div>
        )}
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
