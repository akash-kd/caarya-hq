import React, { Fragment, useEffect, useState } from "react";
//Ui
import { Dialog, Transition } from "@headlessui/react";
//Material ui
import Drawer from "@mui/material/Drawer";

function WideModalsWrapper({
  isOpen,
  closeModal,
  component,
  height = "50vh",
  borderRadius = "14px 14px 0px 0px",
  showWhiteBg,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  useEffect(() => {
    if (isOpen) {
      if (window.innerWidth > 1024) {
        setModalOpen(isOpen);
      } else {
        setDrawerOpen(isOpen);
      }
    }
  }, [isOpen]);

  const onClose = () => {
    closeModal();
    setModalOpen(false);
    setDrawerOpen(false);
  };

  return (
    <>
      <Drawer
        anchor={window.innerWidth < 1024 ? "bottom" : "right"}
        open={drawerOpen}
        onClose={() => {
          closeModal();
          setDrawerOpen(false);
        }}
        PaperProps={{
          style: { maxHeight: height, borderRadius: borderRadius },
        }}
      >
        {React.cloneElement(component, { closeModal: onClose })}
      </Drawer>
      <Transition.Root show={modalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-30 inset-0 overflow-y-auto"
          onClose={() => {
            console.log("");
          }}
        >
          <div className="flex items-end justify-center min-h-screen pt-6 px-6 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-primary-gray-1000 bg-opacity-80 backdrop-filter backdrop-blur transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="bg-transparent inline-block overflow-hidden transform transition-all p-5 sm:my-8 align-middle sm:max-w-6xl sm:w-full">
                <div
                  className={
                    showWhiteBg
                      ? "bg-white rounded-lg shadow-xl"
                      : "bg-transparent"
                  }
                >
                  {React.cloneElement(component, { closeModal: onClose })}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

export default WideModalsWrapper;
