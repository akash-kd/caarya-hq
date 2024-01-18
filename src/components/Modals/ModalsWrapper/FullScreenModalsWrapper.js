import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import Drawer from "@mui/material/Drawer";

function FullScreenModalsWrapper({
  isOpen,
  closeModal,
  component,
  height = "50vh",
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
          style: { maxHeight: height, borderRadius: "14px 14px 0px 0px" },
        }}
      >
        {React.cloneElement(component, { closeModal: onClose })}
      </Drawer>
      <Transition.Root show={modalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={() => {
            console.log("");
          }}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
              <div className="bg-transparent pb-5 inline-block overflow-hidden transform transition-all sm:my-8 align-middle max-w-5xl min-h-80vh sm:w-full">
                <div className="bg-white min-h-80vh rounded-lg shadow-xl">
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

export default FullScreenModalsWrapper;
