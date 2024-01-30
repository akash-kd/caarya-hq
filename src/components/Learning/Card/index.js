import React, { useState, useEffect } from "react";
import { ChevronRightIcon, XIcon } from "@heroicons/react/solid";
import ReactPlayer from "react-player";
import WideModalsWrapper from "components/Modals/ModalsWrapper/WideModalWrapper";
import VideoPlayer from "./VideoPlayer";

/**
 * ShortURLs Card Component under caarya.space
 * @param {String} title
 * @param {String} description
 * @param {Object} type
 * @param {Object} creator -Object containing creators details
 * @param {Function} onClick
 * @returns
 */

function ShortURLsCard({ title, description, type, creator, long_url }) {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
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
    <>
      <WideModalsWrapper
        isOpen={openModal}
        closeModal={() => setOpenModal(false)}
        component={
          <VideoPlayer url={long_url} closeModal={() => setOpenModal(false)} />
        }
      />
      <div
        onClick={() => {
          setOpenModal(true);
        }}
        style={{
          boxShadow:
            "0px 4px 6px -4px rgba(0, 0, 0, 0.10), 0px 10px 15px -3px rgba(0, 0, 0, 0.10)",
        }}
        className="p-4 bg-white rounded-lg flex flex-col space-y-3"
      >
        <div className="flex flex-row items-stretch justify-between">
          <span className="bg-[#816FE9] text-3xs text-white rounded-full font-lato font-medium leading-3 inline-flex px-2 py-1">
            {type?.name}
          </span>
          <div className="text-xs flex flex-row items-center space-x-1 font-bold text-[#5E4FBA] underline underline-offset-2 font-lato leading-5">
            <p>Watch Now </p> <ChevronRightIcon className="w-4 h-4" />
          </div>
        </div>
        <div className="px-2 flex flex-col space-y-2">
          <p className="text-sm line-clamp-2 leading-5 font-lato text-black font-medium">
            {title || "No Title"}
          </p>
          <p className="text-primary-neutral-500 font-lato text-xs font-normal leading-5 tracking-[0.24px]">
            Category
          </p>
        </div>
      </div>
    </>
  );
}

function ShortUrlLoader() {
  return (
    <div
      style={{
        boxShadow:
          "0px 4px 6px -4px rgba(0, 0, 0, 0.10), 0px 10px 15px -3px rgba(0, 0, 0, 0.10)",
      }}
      className="p-4 bg-white rounded-lg flex flex-col space-y-3"
    >
      <div className="flex flex-row items-stretch justify-between">
        <span className="bg-[#816FE9] text-3xs text-white rounded-full font-lato font-medium leading-3 inline-flex px-2 py-1"></span>
        <div className="text-xs font-bold text-[#5E4FBA] underline underline-offset-2 font-lato leading-5">
          <div>Watch Now ></div>
        </div>
      </div>
      <div className="px-2 flex flex-col space-y-2">
        <p className="font-lato text-sm h-2 rounded bg-primary-yellow-lighter animate-pulse w-full font-normal text-primary-gray-600"></p>
      </div>
    </div>
  );
}

export default ShortURLsCard;
export { ShortUrlLoader };
