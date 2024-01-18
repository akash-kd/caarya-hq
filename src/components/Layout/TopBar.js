import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import WideModalsWrapper from "components/Modals/ModalsWrapper/WideModalWrapper";
import LogoutModal from "./LogoutModal";
import { Bell } from "@phosphor-icons/react";

function TopBar() {
  const [logOut, setLogOut] = useState(false);
  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("navList");
    localStorage.removeItem("selectedTab");
    window.location.href = window.location.origin + "/";
  };
  return (
    <>
      <WideModalsWrapper
        isOpen={logOut}
        closeModal={() => {
          setLogOut(false);
        }}
        component={<LogoutModal onLogout={onLogout} />}
      />

      <div className="fixed w-full top-0 right-0 left-0 px-3 py-2 text-primary-yellow-darkest top-nav flex lg:hidden flex-row items-stretch justify-between">
        <a href="/">
          <div className="flex flex-row items-center space-x-1">
            <img
              src="/assets/caaryaLogos/forge.png"
              className="h-6 w-6 object-fill"
              alt="logo"
            />
            <h1 className="font-karla text-xl ">Forge</h1>
          </div>
        </a>

        <div className="flex flex-row items-center space-x-4">
          <Bell size={20} />
          <Menu as="div" className="relative block text-left">
            <Menu.Button className="">
              <img
                src="/assets/svg/navigation/menu.svg"
                className="h-4 w-4 mt-1.5 object-cover"
                alt="logo"
              />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                style={{ borderRadius: "20px 0px 20px 20px" }}
                className={`origin-top-right absolute right-0 w-24 z-10 shadow-lg bg-white ring-1 ring-primary-gray-1000 ring-opacity-5 focus:outline-none `}
              >
                <div className="py-1 max-h-64 overflow-y-auto relative z-50">
                  {[1].map((item) => {
                    return (
                      <Menu.Item key={item}>
                        {({ active }) => (
                          <div
                            onClick={() => {
                              setLogOut(true);
                            }}
                            className="text-primary-gray-1000 font-lato font-normal block px-4 py-2 text-2xs cursor-pointer"
                          >
                            Logout
                          </div>
                        )}
                      </Menu.Item>
                    );
                  })}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </>
  );
}

export default TopBar;
