import React from "react";
import Drawer from "@mui/material/Drawer";

import { Warning } from "@phosphor-icons/react";

function DeleteTrackModal({ isOpen, closeModal, onAccept, loader }) {
  return (
    <Drawer
      anchor={window.innerWidth < 1024 ? "bottom" : "right"}
      open={isOpen}
      onClose={() => closeModal()}
      transitionDuration={300}
      PaperProps={{
        style: {
          borderRadius: window.innerWidth < 1024 ? "20px 20px 0px 0px" : "0px",
          maxHeight: "100vh",
          width: window.innerWidth < 1024 ? "100%" : "560px",
        },
      }}
    >
      <div className="bg-white p-6 flex flex-col items-center space-y-6 md:max-w-xl lg:h-screen mx-auto w-full transform transition-all ease-in-out duration-150">
        <div className="flex flex-col items-center space-y-4 py-4">
          <Warning size={40} color="#FBA804" />
          <h1 className="text-primary-gray-800 font-karla text-base font-medium leading-6">
            Deleting Goal Track
          </h1>
        </div>

        <p className="text-left w-full text-xs font-lato text-primary-neutral-500">
          You cannot recover this track once deleted and all goals inside this
          track will be moved to ‘<b>Trackless Goals</b>’ track.
        </p>
        <p className="text-left w-full text-xs font-lato text-primary-neutral-500">
          Are you sure you want to delete this track?
        </p>
        <div className="flex w-full flex-row items-center justify-between space-x-5 py-6">
          <button
            onClick={closeModal}
            className={`py-3 px-5 rounded-lg border border-primary-neutral-500 flex flex-row items-center justify-center `}
          >
            <p
              className={`flex items-center gap-1 text-primary-neutral-500 font-lato text-sm font-semibold`}
            >
              No, Cancel
            </p>
          </button>{" "}
          <button
            onClick={onAccept}
            className={`py-3 px-5 rounded-lg border border-primary-error-300 flex flex-row items-center justify-center `}
          >
            <p
              className={`flex items-center gap-1 text-primary-error-500 font-lato text-sm font-semibold`}
            >
              Yes, Delete
            </p>
            {loader && (
              <div
                className={`w-4 h-4 bg-transparent border-primary-error-500 border-2 rounded-full border-t-0 animate-spin ml-2`}
              />
            )}
          </button>
        </div>
      </div>
    </Drawer>
  );
}

export default DeleteTrackModal;
