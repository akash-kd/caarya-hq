import React, { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import {
  CheckCircleIcon,
  ChevronRightIcon,
  PlusIcon,
  XIcon,
} from "@heroicons/react/solid";
import { useSelector } from "react-redux";
import EmptyState from "components/Comman/EmptyState";
import ChronosButton from "components/Comman/Buttons";
import SearchBox from "components/Comman/Inputs/SearchBox";
import { ArrowLeft } from "@phosphor-icons/react";

function AddMembers({
  isOpen,
  closeModal,
  id,
  onUpdate,
  type = "Members",
  selected,
  projectId,
  selectOne,
}) {
  const squad = useSelector((state) => state.user.squadList)?.filter(
    (e) => e?.is_active
  );
  const [creating, setCreating] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [selectedProfiles, setSelectedProfiles] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [fetching, setFetching] = useState(false);

  const isInSearch = (search, item) => {
    let name =
      item?.first_name +
      (item?.middle_name ? item?.middle_name : "") +
      item?.last_name;

    name = name?.toLowerCase();

    return name?.includes(search?.toLowerCase());
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted && isOpen) {
      if (selected?.length > 0) setSelectedProfiles(selected);
      setProfiles(squad?.teamMembers);
    }

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  const addMembers = async () => {
    setCreating(true);

    onUpdate(id, selectedProfiles);

    setCreating(false);
    closeModal();
  };

  const addOrRemoveUser = (item) => {
    if (type == "Owner" || selectOne) {
      setSelectedProfiles([item]);
    } else {
      if (selectedProfiles.includes(item)) {
        let temp = selectedProfiles.filter((e) => e?.id !== item?.id);
        setSelectedProfiles(temp);
      } else {
        setSelectedProfiles((state) => [...state, item]);
      }
    }
  };

  return (
    <Drawer
      anchor={window.innerWidth < 1024 ? "bottom" : "right"}
      open={isOpen}
      onClose={() => closeModal()}
      transitionDuration={500}
      PaperProps={{
        style: {
          borderRadius: "0px",
          maxHeight: "100vh",
          width: window.innerWidth < 1024 ? "100%" : "360px",
        },
      }}
    >
      <div className="bg-white md:max-w-xl h-50vh lg:h-screen lg:pt-20 rounded-t-2xl lg:rounded-t-none mx-auto w-full transform transition-all ease-in-out duration-150">
        <div className="relative p-4">
          <div className="flex flex-row items-center space-x-2 text-primary-gray-300 font-karla text-base font-medium rounded-t-2xl">
            <ArrowLeft size={12} />
            <h5 className="">Add {type}</h5>
          </div>
          <div className="mt-4">
            {/* <div className="flex flex-row items-start py-3.5">
              <div className="w-5">
                <ChevronRightIcon className="w-4 h-4 mt-1 text-primary-gray-1000" />
              </div>
              <div className="text-primary-gray-350 overflow-y-scroll">
                <div className="flex flex-row items-center flex-wrap">
                  {selectedProfiles?.length > 0 &&
                    selectedProfiles?.map((item, index) => {
                      return (
                        <div className="p-0.5 m-0.5 bg-white rounded-full flex flex-row items-center">
                          <img
                            src={
                              item?.image?.url ||
                              "/assets/images/defaultUser.svg"
                            }
                            alt="owner"
                            className="w-3 h-3 object-cover rounded-full"
                          />
                          <p className="font-lato mx-1.5 font-normal text-sm text-primary-gray-600">
                            {item?.first_name}
                          </p>
                          <XIcon
                            onClick={() => {
                              addOrRemoveUser(item);
                            }}
                            className="w-3 h-3 text-primary-indigo-650 cursor-pointer"
                          />
                        </div>
                      );
                    })}
                </div>
              </div>
            </div> */}

            <SearchBox
              placeholder="Search..."
              search={searchItem}
              setSearch={setSearchItem}
            />
          </div>
          <div className="w-full py-4">
            <div
              className={`${
                projectId ? "h-55vh" : "h-60vh"
              } max-h-60vh flex flex-col w-full overflow-y-scroll py-2`}
            >
              {squad.length > 0 &&
                squad.map((item) => {
                  if (
                    searchItem?.searchText !== "" &&
                    !isInSearch(searchItem?.searchText, item)
                  )
                    return;

                  return (
                    <div
                      onClick={() => {
                        addOrRemoveUser(item);
                      }}
                      className={`${
                        selectedProfiles.find((e) => e?.id === item?.id)
                          ? "bg-primary-yellow-lightest"
                          : "bg-white"
                      } border-b border-primary-gray-50 px-2 py-3 flex flex-row items-center justify-between`}
                    >
                      <div className="flex flex-row items-center space-x-4">
                        <img
                          className="h-8 w-8 rounded-full object-cover"
                          src={
                            item.image?.url || "/assets/images/defaultUser.svg"
                          }
                          alt=""
                        />
                        <p className="text-primary-gray-800 text-base font-lato font-light">
                          {item?.first_name}
                        </p>
                      </div>
                      <ChevronRightIcon className="w-5 h-5 text-primary-yellow-700" />
                    </div>
                  );
                })}

              {!fetching &&
                selectedProfiles?.length < 6 &&
                [1, 2, 3, 4, 5, 6]?.map((i) => {
                  if (i - selectedProfiles?.length > 0) {
                    return <div />;
                  }
                })}

              {!fetching && squad?.length === 0 && (
                <div className="col-span-2">
                  <EmptyState
                    ctaText="Add members"
                    text={"No members found!"}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="w-full grid grid-cols-2 gap-x-4 py-2 px-4.5">
            <ChronosButton
              text="Cancel"
              onClick={() => {
                closeModal();
              }}
              secondary
              yellow
            />
            <ChronosButton
              text="  Add  "
              onClick={() => {
                addMembers();
              }}
              primary
              yellow
            />
          </div>
        </div>
      </div>
    </Drawer>
  );
}

export default AddMembers;
