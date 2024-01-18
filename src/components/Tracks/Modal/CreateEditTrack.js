import Drawer from "@mui/material/Drawer";
import { Check, Plus, Trash, Users, X } from "@phosphor-icons/react";
import ChronosButton from "components/Comman/Buttons";
import SimpleInput from "components/Comman/Inputs/SimpleInput";
import AddMembers from "components/Modals/AddMembers";
import { createATrack, destroyATrack, updateATrack } from "config/APIs/tracks";
import {
  TRACK_CATEGORY,
  TRACK_CATEGORY_CAARYA,
  defaultTracks,
} from "helpers/constants/tracks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "redux/toaster";
import { fetchAllTracks } from "redux/tracks";
import DeleteTrackModal from "./DeleteTrack";
import AddCollaborator from "./AddCollaborator";
import IconSelector from "./IconSelector";
import { BsPeopleFill } from "react-icons/bs";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { MdSearch } from "react-icons/md";
import { useCallback } from "react";

function CreateEditTrack({
  isOpen,
  closeModal,
  trackCategory,
  editValues,
  onCreate,
}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);
  const squad = useSelector((state) => state.user.squadList)?.filter(
    (e) => e?.is_active
  );
  const [creating, setCreating] = useState(false);
  const [data, setData] = useState({});
  const [addCollaborator, setAddCollaborator] = useState(false);
  const [collaborators, setCollaborators] = useState(squad ?? []);

  const showSuccessNotification = (message) => {
    dispatch(showToast({ message }));
  };

  const showErrorNotification = (message) => {
    dispatch(showToast({ message, type: "error" }));
  };

  useEffect(() => {
    if (isOpen) {
      setAddCollaborator(false);
      if (editValues) {
        let { members, ...obj } = editValues;

        if (members?.find((m) => m?.id !== user?.id)) {
          obj["collaborator"] = members?.find((m) => m?.id !== user?.id);
        }
        setData(obj);
      }
    }
  }, [isOpen, editValues]);

  const handleCreate = async () => {
    if (!data?.title || (data?.title && data?.title == "")) {
      showErrorNotification("Please add all information!");
      return;
    }

    setCreating(true);

    let obj = { ...data };

    const { collaborator } = obj;
    obj["category"] = trackCategory;

    obj["members"] = [user?.id, collaborator?.id];

    try {
      let body = obj;

      const response = await createATrack(body);

      closeModal();
      onCreate(obj);
      setData({});

      showSuccessNotification("Track created successfully!");
    } catch (err) {
      console.log("Error", err);
      showErrorNotification(err.response?.data?.message);
    }
    setCreating(false);
  };

  const handleUpdate = async () => {
    if (
      !data?.title ||
      (data?.title && data?.title == "") ||
      !data?.collaborator ||
      (data?.collaborator && data?.collaborator == null)
    ) {
      showErrorNotification("Please add all information!");
      return;
    }

    setCreating(true);

    let obj = { ...data };

    const { collaborator } = obj;
    obj["category"] = trackCategory;

    obj["members"] = [user?.id, collaborator?.id];
    delete obj?.goals;
    try {
      let body = obj;

      const response = await updateATrack(editValues?.id, body);

      closeModal();
      dispatch(fetchAllTracks());
      setData({});

      showSuccessNotification("Track updated successfully!");
    } catch (err) {
      console.log("Error", err);
      showErrorNotification(err.response?.data?.message);
    }
    setCreating(false);
  };

  const handleCollaboratorSearch = useCallback(
    (e) => {
      const filteredList = squad.filter((item) =>
        item.first_name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setCollaborators(filteredList);
    },
    [squad]
  );

  const showName = (item) => {
    if (data?.title?.toLowerCase()?.includes("with")) {
      const array = data?.title?.toLowerCase()?.split("with");
      const result = array.pop();
      if (item?.first_name?.toLowerCase()?.includes(result)) return true;
      else return false;
    } else return true;
  };

  return (
    <>
      {/* <AddMembers
        isOpen={addCollaborator}
        closeModal={() => setAddCollaborator(false)}
        type="Collaborator"
        selectOne
        selected={[data?.collaborator]}
        onUpdate={(id, val) => {
          if (val?.length > 0) setData({ ...data, collaborator: val[0] });
        }}
      /> */}
      <Drawer
        anchor={window.innerWidth < 1024 ? "bottom" : "right"}
        PaperProps={{
          style: {
            borderRadius:
              window.innerWidth < 1024 ? "20px 20px 0px 0px" : "0px",
            maxHeight: "100vh",
            height: window.innerWidth < 1024 ? "auto" : "100%",
            width: window.innerWidth < 1024 ? "100%" : "560px",
          },
        }}
        open={isOpen}
        onClose={() => {
          setData({});
          closeModal();
        }}
        transitionDuration={250}
      >
        <div
          id={addCollaborator ? "expandingDiv" : ""}
          className="md:max-w-xl add-collab lg:h-screen py-6 px-4 rounded-t-2xl lg:rounded-t-none bg-white mx-auto w-full transform transition-all ease-in-out duration-150 flex flex-col"
        >
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center space-x-2 text-primary-gray-300 font-karla text-base font-medium rounded-t-2xl">
              <img
                src={
                  TRACK_CATEGORY?.find((t) => t?.value == trackCategory)?.image
                }
                alt=""
                className="w-4 h-4"
              />
              <p className="text-primary-grey-300 font-poppins text-base font-medium">
                {editValues
                  ? "Edit Track"
                  : `New Track for 
              ${TRACK_CATEGORY?.find((t) => t?.value == trackCategory)?.label}`}
              </p>
            </div>
          </div>
          <div className="mt-4 flex w-full flex-col items-start space-y-4 h-auto transition-all ease-in-out duration-150">
            <div className="flex flex-row items-start space-x-5 py-4 pr-6">
              <div className="">
                <IconSelector
                  name={data?.icon?.svg}
                  color="#FEF4F9"
                  caarya={trackCategory == TRACK_CATEGORY_CAARYA}
                  data={data?.icon}
                  setData={(val) => {
                    console.log(val);
                    setData({ ...data, icon: val });
                  }}
                />
              </div>
              <div className="flex flex-col space-y-10">
                <SimpleInput
                  isDisabled={
                    editValues &&
                    defaultTracks?.map((a) => a?.title)?.includes(data?.title)
                  }
                  srOnly
                  boldText
                  label="Name"
                  field="title"
                  placeholder="Track Name"
                  details={data}
                  setDetails={setData}
                />

                {data?.collaborator && (
                  <div className="w-full  flex flex-col">
                    <div className=" flex flex-row items-center space-x-2 text-primary-gray-300 font-lato  text-xs font-light">
                      <BsPeopleFill />
                      <p>Collaborator</p>
                    </div>

                    <div className="px-4 py-2 border-b border-primary-gray-225 ">
                      <div className="px-2 py-1.5 border max-w-max border-primary-gray-80 rounded-full bg-primary-yellow-30 flex flex-row items-center space-x-2 text-primary-gray-800 font-lato text-xs font-semibold">
                        <img
                          src={
                            data?.collaborator?.image?.url ||
                            "/assets/images/defaultUser.svg"
                          }
                          className="rounded-full h-5 w-5 object-cover mr-1.5"
                          alt=""
                        />
                        <p>
                          {`${data?.collaborator?.first_name} ${
                            data?.collaborator?.last_name
                              ? data?.collaborator?.last_name
                              : ""
                          }`}
                        </p>
                        <X
                          onClick={() => {
                            setData({
                              ...data,
                              collaborator: null,
                            });
                          }}
                          className="cursor-pointer"
                          size={12}
                        />
                      </div>
                    </div>

                    {/* <AddCollaborator
                    list={squad?.map((a) => ({
                      label: a?.first_name,
                      value: a?.id,
                      image: a?.image,
                    }))}
                    srOnly
                    placeholder="Search for collaborator"
                    value={data?.collaborator?.id}
                    setValue={(val) => {
                      console.log(val);

                      setData({
                        ...data,
                        collaborator: squad?.find((a) => val?.value == a?.id),
                      });
                    }}
                  /> */}
                    {/* <div className="">
                <ChronosButton
                  text="Add Collaborator"
                  tertiary
                  icon={<Plus size={12} />}
                  iconReverse
                  underline
                  onClick={() => {
                    setAddCollaborator(true);
                  }}
                />
              </div> */}
                  </div>
                )}
              </div>
            </div>
            {!data?.collaborator && (
              <>
                <Disclosure
                  as="div"
                  className=" w-full"
                  defaultOpen={addCollaborator}
                >
                  <Disclosure.Button>
                    {addCollaborator ? (
                      <div className="w-full"></div>
                    ) : (
                      <ChronosButton
                        tertiary
                        text="Add Collaborator"
                        onClick={() => {
                          setAddCollaborator(true);
                          setCollaborators(squad);
                        }}
                        iconReverse
                        icon={<Plus className="mr-2.5 w-3 h-3" />}
                      />
                    )}
                  </Disclosure.Button>

                  <Transition
                    className="w-full"
                    enter="transition duration-150 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-150 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Disclosure.Panel>
                      {({ close }) => (
                        <div className="w-full flex flex-col bg-white gap-3">
                          <div className="w-full flex flex-row items-center justify-between py-2">
                            <h1 className="text-primary-gray-800 font-lato text-sm font-semibold leading-5">
                              Choose a Collaborator
                            </h1>
                            <p
                              onClick={() => {
                                close();
                                setTimeout(() => {
                                  setAddCollaborator(false);
                                }, 250);
                              }}
                              className="text-primary-gray-400 font-lato text-xs font-light underline"
                            >
                              Cancel
                            </p>
                          </div>
                          <div className="w-full flex items-center justify-between gap-3 border border-gray-200 placeholder:text-primary-gray-225 rounded-full overflow-hidden">
                            <input
                              type="text"
                              placeholder="Add people by name"
                              className="flex-1 outline-none border-none focus:ring-transparent text-xs font-light font-lato p-2 pl-4"
                              onChange={handleCollaboratorSearch}
                            />
                            <button className="pr-4 text-primary-gray-225">
                              <MdSearch />
                            </button>
                          </div>
                          <div className=" w-full flex flex-col items-start h-[30vh] overflow-y-auto">
                            {collaborators
                              ?.sort((a, b) => a.first_name - b.first_name)
                              ?.map((item) => {
                                // if (showName(item))
                                return (
                                  <div
                                    key={item.id}
                                    onClick={() => {
                                      setData({
                                        ...data,
                                        collaborator: item,
                                        title:
                                          data.title +
                                          " with " +
                                          `${item.first_name} ${
                                            item.last_name ? item.last_name : ""
                                          }`,
                                      });
                                      setAddCollaborator(false);
                                    }}
                                    className="w-full border-b border-primary-gray-200 px-2 py-3 flex flex-row items-center  space-x-4"
                                  >
                                    <img
                                      src={
                                        item?.image?.url ||
                                        "/assets/images/defaultUser.svg"
                                      }
                                      className="rounded-full h-6 w-6 object-cover"
                                      alt=""
                                    />
                                    <p className="text-primary-gray-800 font-lato text-xs font-light">
                                      {item?.first_name}
                                    </p>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      )}
                    </Disclosure.Panel>
                  </Transition>
                </Disclosure>
              </>
            )}
          </div>
          <div className="flex w-full flex-row items-center justify-between mt-auto space-x-8 py-4">
            <ChronosButton
              text="Close"
              tertiary
              underline
              onClick={() => {
                setData({});
                closeModal();
              }}
            />
            <ChronosButton
              loader={creating}
              text={editValues ? "Save Changes" : "Add track"}
              primary
              yellow
              icon={editValues ? <Check size={12} /> : <Plus size={12} />}
              iconReverse
              onClick={() => {
                editValues ? handleUpdate() : handleCreate();
              }}
            />
          </div>
        </div>
      </Drawer>
    </>
  );
}

export default CreateEditTrack;
