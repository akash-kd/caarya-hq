import ChronosButton from "components/Comman/Buttons";
import React from "react";

function LogoutModal({ closeModal, onLogout }) {
  return (
    <div className="bg-white mx-auto rounded-20px p-5 max-w-md w-full flex flex-col items-start space-y-5 relative z-[999]">
      <p className="font-lato text-sm text-primary-gray-1000">Are you sure?</p>
      <div className="flex flex-row items-stretch justify-center w-full space-x-4">
        <ChronosButton secondary text="Cancel" onClick={() => closeModal()} />
        <ChronosButton
          primary
          red
          text="Logout"
          onClick={() => {
            onLogout();
            closeModal();
          }}
        />
      </div>
    </div>
  );
}

export default LogoutModal;
