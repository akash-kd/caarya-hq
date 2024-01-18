import React from "react";
import Drawer from "@mui/material/Drawer";

// Icons
import { XIcon } from "@heroicons/react/solid";
import ChronosButton from "components/Comman/Buttons";

function ConfirmModal({ isOpen, closeModal, onAccept, text, loader }) {
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
      <div className="modals-component md:max-w-xl lg:h-screen lg:pt-20 mx-auto w-full transform transition-all ease-in-out duration-150">
        <div className="flex flex-row items-end justify-between px-5 pt-5 rounded-t-20px">
          <h5
            className="font-lato font-bold text-sm text-primary-gray-1000 flex flex-col items-start"
            id="exampleModalLiveLabel"
          >
            Confirmation!
          </h5>

          <button
            aria-label="Close"
            type="button"
            onClick={() => {
              closeModal();
            }}
          >
            <XIcon className="h-6 w-6 text-primary-gray-1000" />
          </button>
        </div>

        <div className="text-left text-sm font-karla text-primary-gray-1000 mt-3 px-5">
          {React.cloneElement(text, {})}
        </div>
        <div className="mt-8 flex w-full flex-row items-center justify-end space-x-5 px-5 pb-5">
          <ChronosButton
            loader={loader}
            text="Yes"
            secondary
            onClick={onAccept}
          />

          <ChronosButton text="No" primary onClick={closeModal} />
        </div>
      </div>
    </Drawer>
  );
}

export default ConfirmModal;
