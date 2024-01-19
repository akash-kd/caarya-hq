import React from "react";
import { LogoutIcon } from "@heroicons/react/outline";
import { useHistory } from "react-router-dom";

function TopBar() {
  const history = useHistory();
  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("navList");
    localStorage.removeItem("selectedTab");
    window.location.href = window.location.origin + "/";
  };
  return (
    <div
      className={`fixed z-[1000] w-full top-0 right-0 left-0 px-5 py-2 top-nav flex lg:hidden flex-row items-center justify-between ${
        window.location?.pathname == "/focusZone" ? "hidden" : "block"
      }`}
    >
      <a href="/">
        <div className="flex flex-row items-center space-x-1">
          <h1 className="font-normal font-poppins text-xl text-primary-red-medium">
            #caaryaon
          </h1>
        </div>
      </a>
      <div className="flex flex-row items-center space-x-4">
        <div
          onClick={() => {
            history.push("/chronicles");
          }}
          className="bg-white rounded-full flex flex-row items-center justify-center w-8 h-8"
        >
          <img
            src="/assets/svg/tabbar/chronicles.svg"
            alt=""
            className="w-5 h-5"
          />
        </div>{" "}
        <div
          onClick={() => {
            history.push("/shareables");
          }}
          className="bg-white rounded-full flex flex-row items-center justify-center w-8 h-8"
        >
          <img
            src="/assets/svg/tabbar/shareableRed.svg"
            alt=""
            className="w-5 h-5"
          />
        </div>
        <LogoutIcon
          onClick={() => {
            onLogout();
          }}
          className="h-6 w-6 text-primary-red-dark"
        />
      </div>
    </div>
  );
}

export default TopBar;
