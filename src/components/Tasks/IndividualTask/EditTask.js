import React, { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import * as TaskAPI from "config/APIs/task/task";
import { UserIcon, XIcon } from "@heroicons/react/solid";
import AddMembers from "components/Modals/AddMembers";
import { showToast } from "redux/toaster";
import { useDispatch, useSelector } from "react-redux";
import EditTask from "components/Modals/EditTask";
import ConfirmModal from "components/Modals/Common/ConfirmModal";
import DateInput from "components/Comman/Inputs/DateInput";

// Redux
import { updateTasksList } from "redux/task";
import { getProjectName } from "helpers/projects";
import { classNames } from "helpers/utils/classNames";
import { TShirtSizes } from "helpers/task";
import DropdownInputForMultipleSelect from "components/Comman/Inputs/DropdownForMultipleSelect";
import DropdownInput from "components/Comman/Inputs/DropdownInput";
import DateSelect from "components/Comman/Inputs/Date";
import moment from "moment";

function EditDetails({ onUpdate, setEditable, onDelete, details, setDetails }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const userList = useSelector((state) => state.user.squadList);
  const [creating, setCreating] = useState(false);
  const [showEditModal, setShowEditModal] = useState({
    isOpen: false,
    type: "",
  });
  const [showAddMembersModal, setShowAddMembersModal] = useState(false);
  const [showAddOwnerModal, setShowAddOwnerModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const addMembers = async (id, profiles) => {
    setCreating(true);

    try {
      let body = {
        students: profiles.map((e) => e.id),
      };

      const response = await TaskAPI.updateTasks(id, body);

      onUpdate();
      dispatch(updateTasksList());
      dispatch(showToast({ message: "Members updated successfully!" }));
    } catch (err) {
      switch (err.response?.status) {
        case 401:
          dispatch(showToast({ message: "Unauthorized!", type: "error" }));
          break;
        default:
          dispatch(
            showToast({ message: err.response?.data?.message, type: "error" })
          );
      }
    }
    setCreating(false);
  };

  return (
    <div className="w-full lg:h-80vh">
      <AddMembers
        isOpen={window.innerWidth < 1024 ? showAddMembersModal : false}
        closeModal={() => setShowAddMembersModal(false)}
        id={details?.id}
        onUpdate={(id, profiles) => {
          addMembers(id, profiles);

          setShowAddMembersModal(false);
        }}
      />
      <AddMembers
        type="Owner"
        isOpen={window.innerWidth < 1024 ? showAddOwnerModal : false}
        selected={details?.owner ? [details?.owner] : []}
        closeModal={() => setShowAddOwnerModal(false)}
        id={details?.id}
        onUpdate={(id, profiles) => {
          if (profiles?.length > 0) {
            setDetails({
              ...details,
              owner: profiles[0],
              owner_id: profiles[0]?.id,
            });
          } else {
            setDetails({
              ...details,
              owner: null,
              owner_id: null,
            });
          }

          setShowAddOwnerModal(false);
        }}
      />
      <ConfirmModal
        isOpen={deleteModal}
        closeModal={() => setDeleteModal(false)}
        onAccept={() => {
          onDelete();
          setDeleteModal(false);
        }}
        text={<>Are you sure you want to delete the Task?</>}
      />

      <EditTask
        isOpen={showEditModal?.isOpen}
        closeModal={() => setShowEditModal({ isOpen: false, type: "" })}
        task={details}
        details={details}
        setDetails={setDetails}
        type={showEditModal?.type}
        onUpdate={() => {
          onUpdate();
          setShowEditModal({ isOpen: false, type: "" });
        }}
      />

      <div className="pt-3 pb-4 px-2.5 space-y-4 lg:space-y-5 relative">
        <div
          onClick={() => {
            setEditable(false);
            onUpdate();
          }}
          className="cursor-pointer max-w-max flex flex-row items-center space-x-1.5 px-2.5 py-1 rounded-full bg-secondary-green-50"
        >
          <p className="font-karla text-secondary-green-550 text-xs lg:text-base">
            Save changes?
          </p>
          <img src="/assets/svg/check.svg" alt="" className="w-3 h-auto" />
        </div>
        {/* <input
          value={details?.title}
          onChange={(e) => {
            setDetails({ ...details, title: e.target.value });
          }}
          className="text-primary-gray-1000 focus:border-0 w-full focus:ring-0 focus:outline-none bg-transparent font-medium font-lato text-xs lg:text-base"
        ></input>
        <CheckIcon
          className="h-4 w-4 text-caarya-red-lighter absolute top-0 right-7"
          onClick={() => {
            setEditable(false);
            onUpdate();
          }}
        /> */}
        {/* {details?.status && (
          <p
            onClick={() => {
              setShowEditModal({ isOpen: true, type: "Status" });
            }}
            className="px-3 py-1 max-w-max rounded-full font-lato font-normal text-2xs"
            style={{
              color: TaskStatus.find((e) => e.value == details?.status).color,
              backgroundColor: TaskStatus.find(
                (e) => e.value == details?.status
              ).lightColor,
            }}
          >
            {details?.status}
          </p>
        )} */}
        <div className="w-full px-2.5">
          <h1 className="input-label">Description</h1>

          <input
            value={details?.description}
            onChange={(e) => {
              setDetails({ ...details, description: e.target.value });
            }}
            placeholder="Add a description"
            className="text-primary-gray-1000 placeholder:text-primary-gray-250 focus:border-0 focus:ring-0 focus:outline-none bg-transparent  font-lato font-normal text-xs lg:text-base"
          ></input>
        </div>
        <div className="w-full px-2.5">
          <label
            htmlFor="Owners"
            className="input-label flex flex-row items-center space-x-3"
          >
            Due on{" "}
            <b className="ml-1"> {moment(details?.date)?.format("LL")}</b>
          </label>
          {/* <DateInput
            date={details?.date}
            onChange={(value) =>
              setDetails({
                ...details,
                date: value,
              })
            }
          /> */}
          <DateSelect
            details={details}
            setDetails={setDetails}
            date={details?.date}
            setDate={(val) => {
              setDetails({ ...details, date: val });
            }}
          />
        </div>
        <div className="w-full px-2.5 space-y-1">
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="col-span-1">
              <h1 className="input-label">T-Shirt Size</h1>
              <RadioGroup
                value={details?.tShirtSize}
                onChange={(e) =>
                  setDetails({
                    ...details,
                    tShirtSize: e,
                  })
                }
                className=""
              >
                <RadioGroup.Label className=""></RadioGroup.Label>
                <div className="flex flex-row items-stretch space-x-3">
                  {TShirtSizes.map((option) => (
                    <RadioGroup.Option
                      key={option.name}
                      value={option}
                      className={({ active, checked }) =>
                        classNames(
                          option == details?.tShirtSize
                            ? "bg-primary-yellow-lightest border-transparent text-primary-yellow-darkest"
                            : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50",
                          "border rounded-full py-2 px-1 h-9 w-9 cursor-pointer flex items-center justify-center text-sm font-medium uppercase sm:flex-1 hover-on-card"
                        )
                      }
                    >
                      <RadioGroup.Label as="p" className="card-hover-text">
                        {option}
                      </RadioGroup.Label>
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
        {details?.type && (
          <div className="w-full px-2.5">
            <h1 className="input-label">Type</h1>
            <div className="flex flex-row items-center space-x-2">
              <p className="text-primary-gray-1000 font-lato font-normal text-xs lg:text-base">
                {details?.type?.name}
              </p>
            </div>
          </div>
        )}

        {details?.project && (
          <div className="w-full px-2.5 space-y-1.5">
            <h1 className="input-label">Project</h1>
            <div className="px-2.5 flex flex-row items-center py-0.5 font-bold max-w-max rounded-full border-2 space-x-1.5 border-primary-gray-1000 bg-transparent text-primary-gray-1000 font-lato text-2xs lg:text-base">
              <img
                src={details?.project?.image?.url || "/assets/svg/rocket.svg"}
                alt=""
                className="rounded-full w-2 h-2 lg:w-4 lg:h-4"
              />
              <p>{getProjectName(details?.project)}</p>
            </div>
          </div>
        )}
        <div className="w-full px-2.5">
          <h1 className="input-label">Collaborators</h1>
          <div className="mt-2 grid grid-cols-2 gap-4">
            {details?.students?.length > 0 &&
              details?.students.map((person) => {
                return (
                  <div className="flex flex-row items-center" key={person?.id}>
                    {person?.image?.url ? (
                      <img
                        src={person?.image?.url}
                        className="rounded-full h-4 w-4 mr-2"
                        alt=""
                      />
                    ) : (
                      <div className="rounded-full h-4 w-4 flex flex-row items-center justify-center bg-primary-yellow-dark mr-2">
                        <UserIcon className="rounded-full h-3.5 w-3.5 text-white" />
                      </div>
                    )}
                    <p className="text-gray-700 font-lato font-bold text-sm lg:text-base">
                      {person?.first_name}
                    </p>

                    {user?.id == details?.owner?.id && (
                      <XIcon
                        className="w-2.5 h-2.5 ml-2.5 mt-1 lg:w-4 lg:h-4 text-caarya-red-medium cursor-pointer"
                        onClick={() => {
                          let s = [...details.students];
                          if (s?.find((i) => i?.id == person?.id)) {
                            s = s?.filter((i) => i?.id !== person?.id);
                          } else {
                            s.push(userList?.find((i) => i?.id == person?.id));
                          }

                          setDetails({ ...details, students: s });
                        }}
                      />
                    )}
                  </div>
                );
              })}
          </div>
          {showAddMembersModal && window.innerWidth > 1024 ? (
            <div className="mt-2.5">
              <DropdownInputForMultipleSelect
                label="Collaborators"
                srOnly
                list={userList?.map((i) => ({
                  label: i?.first_name,
                  value: i?.id,
                  image: i?.image,
                }))}
                selectedValues={details?.students?.map((i) => i?.id)}
                setDetails={(val) => {
                  let s = [...details.students];
                  if (s?.find((i) => i?.id == val)) {
                    s = s?.filter((i) => i?.id !== val);
                  } else {
                    s.push(userList?.find((i) => i?.id == val));
                  }

                  setDetails({ ...details, students: s });
                }}
              />
            </div>
          ) : (
            <>
              {details?.students?.length === 0 && (
                <>
                  {user?.id == details?.owner?.id ? (
                    <div
                      onClick={() => {
                        setShowAddMembersModal(true);
                      }}
                      className="flex flex-row items-center space-x-2"
                    >
                      <p className="mt-1 text-primary-gray-250 font-lato font-normal text-xs lg:text-base">
                        Add Collaborators to Task
                      </p>
                      <img
                        src="/assets/svg/editIcon.svg"
                        alt=""
                        className="w-3 h-auto"
                      />
                    </div>
                  ) : (
                    <p
                      // onClick={() => {
                      //   setShowAddMembersModal(true);
                      // }}
                      className="mt-1 text-primary-gray-1000 font-lato font-normal text-2xs"
                    >
                      NA
                    </p>
                  )}
                </>
              )}
            </>
          )}
        </div>
        <div className="w-full px-2.5">
          <h1 className="input-label">Owner</h1>
          {details?.owner ? (
            <div className="mt-2 flex flex-row items-center">
              {details?.owner?.image?.url ? (
                <img
                  src={details?.owner?.image?.url}
                  className="rounded-full h-4 w-4 mr-2"
                  alt=""
                />
              ) : (
                <div className="rounded-full h-4 w-4 flex flex-row items-center justify-center bg-primary-yellow-dark mr-2">
                  <UserIcon className="rounded-full h-3.5 w-3.5 text-white" />
                </div>
              )}
              <p className="text-gray-700 font-lato font-bold text-sm lg:text-base">
                {details?.owner?.first_name}
              </p>
            </div>
          ) : showAddOwnerModal && window.innerWidth > 1024 ? (
            <></>
          ) : user?.id == details?.creator?.id ? (
            <div
              onClick={() => {
                setShowAddOwnerModal(true);
              }}
              className="flex flex-row items-center space-x-2"
            >
              <p className="mt-1 text-primary-gray-250 font-lato font-normal text-xs lg:text-base">
                Assign Task
              </p>
              <img
                src="/assets/svg/editIcon.svg"
                alt=""
                className="w-3 h-auto"
              />
            </div>
          ) : (
            <p
              // onClick={() => {
              //   setShowAddMembersModal(true);
              // }}
              className="mt-1 text-primary-gray-1000 font-lato font-normal text-2xs"
            >
              NA
            </p>
          )}
          {showAddOwnerModal && window.innerWidth > 1024 ? (
            <div className="mt-2.5">
              <DropdownInput
                list={userList?.map((i) => ({
                  label: i?.first_name,
                  value: i?.id,
                  image: i?.image,
                }))}
                value={details?.owner_id}
                setValue={(val) => {
                  setDetails({
                    ...details,
                    owner_id: val,
                    owner: userList?.find((i) => i?.id == val),
                  });
                }}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
        {/* {taskPermission(details) && (
            <div className="w-full pt-3">
              <div
                onClick={() => setDeleteModal(true)}
                className="px-3 py-1 max-w-max rounded bg-red-100 text-red-700 cursor-pointer"
              >
                Delete
              </div>
            </div>
          )} */}
      </div>
    </div>
  );
}

export default EditDetails;
