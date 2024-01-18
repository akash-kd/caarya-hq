import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CircledRadioInput from "components/Comman/Inputs/CircledRadioInput";
import DateSelect from "components/Comman/Inputs/Date";
import moment from "moment";
import { TShirtSizes } from "helpers/task";
import { getProjectName } from "helpers/projects";
import DropdownInputForMultipleSelect from "components/Comman/Inputs/DropdownForMultipleSelect";
import * as TaskAPI from "config/APIs/task/task";
import { showToast } from "redux/toaster";
import { updateTasksList } from "redux/task";
import { UserIcon, XIcon } from "@heroicons/react/solid";
import AddMembers from "components/Modals/AddMembers";
import DropdownInput from "components/Comman/Inputs/DropdownInput";

function ViewEditDetails({ details, setDetails, onUpdate, onDelete }) {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState({});
  const user = useSelector((state) => state.user.user);
  const userList = useSelector((state) => state.user.squadList);
  const [showAddMembersModal, setShowAddMembersModal] = useState(false);
  const [showAddOwnerModal, setShowAddOwnerModal] = useState(false);
  const [creating, setCreating] = useState(false);
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
    <>
      <AddMembers
        isOpen={window.innerWidth < 1024 ? showAddMembersModal : false}
        closeModal={() => setShowAddMembersModal(false)}
        id={details?.id}
        onUpdate={(id, profiles) => {
          addMembers(id, profiles);
          setEdit({ ...edit, collaborators: false });
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
          setEdit({ ...edit, owners: false });
          setShowAddOwnerModal(false);
        }}
      />
      <div className="space-y-8 px-2.5">
        <div className="flex flex-row items-center space-x-3">
          <div className="input-label m-0 w-1/3">Description</div>
          <div className="w-2/3 relative flex flex-row items-start justify-between space-x-2.5">
            <>
              {edit?.description ? (
                <input
                  autoFocus={edit?.description}
                  value={details?.description}
                  onChange={(e) => {
                    setDetails({ ...details, description: e.target.value });
                  }}
                  placeholder="Add a description"
                  className="text-primary-gray-1000 placeholder:text-primary-gray-250 focus:border-0 focus:ring-0 focus:outline-none bg-transparent  font-lato font-normal text-xs lg:text-base"
                ></input>
              ) : details?.description ? (
                <p className="text-primary-gray-1000 font-lato font-normal text-xs lg:text-base">
                  {details?.description}
                </p>
              ) : (
                <p className="text-primary-gray-250 font-lato font-normal text-xs lg:text-base">
                  Add a description
                </p>
              )}
            </>
            <div className="absolute top-1 right-0 cursor-pointer">
              {edit?.description ? (
                <img
                  src="/assets/svg/check.svg"
                  onClick={() => {
                    setEdit({ ...edit, description: false });
                    onUpdate();
                  }}
                  alt=""
                  className="w-3 h-auto"
                />
              ) : (
                <img
                  onClick={() => {
                    setEdit({ ...edit, description: true });
                  }}
                  src="/assets/svg/editIcon.svg"
                  alt=""
                  className="w-3 h-auto"
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center space-x-3">
          <div className="input-label m-0 w-1/3">Due on</div>
          <div className="w-2/3 relative flex flex-row items-start justify-between space-x-2.5">
            <div className="flex flex-col items-start space-y-1.5">
              <div className="font-lato text-primary-gray-1000 flex flex-row items-center space-x-3 text-xs lg:text-base">
                <b className=""> {moment(details?.date)?.format("LL")}</b>
              </div>
              <div
                className={`${
                  edit?.date ? "task-edit-box-expanded" : "task-edit-box"
                }`}
              >
                <div
                  className={`transition ease-in-out duration-150 ${
                    edit?.date ? "show-task-edit" : "hide-task-edit"
                  }`}
                >
                  <DateSelect
                    details={details}
                    setDetails={setDetails}
                    date={details?.date}
                    setDate={(val) => {
                      setDetails({ ...details, date: val });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="absolute top-1 right-0 cursor-pointer">
              {edit?.date ? (
                <img
                  src="/assets/svg/check.svg"
                  onClick={() => {
                    setEdit({ ...edit, date: false });
                    onUpdate();
                  }}
                  alt=""
                  className="w-3 h-auto"
                />
              ) : (
                <img
                  onClick={() => {
                    setEdit({ ...edit, date: true });
                  }}
                  src="/assets/svg/editIcon.svg"
                  alt=""
                  className="w-3 h-auto"
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center space-x-3">
          <div className="input-label m-0 w-1/3">T-Shirt Size</div>
          <div className="w-2/3 relative flex flex-row items-start justify-between space-x-2.5">
            {edit?.tShirtSize && (
              <div
              // className={`${
              //   edit?.tShirtSize
              //     ? "task-edit-slide-in"
              //     : "task-edit-slide-out"
              // }`}
              >
                <CircledRadioInput
                  details={details}
                  setDetails={setDetails}
                  field="tShirtSize"
                  list={TShirtSizes?.map((i) => ({ label: i, value: i }))}
                />
              </div>
            )}
            {!edit?.tShirtSize && (
              <div
                className={`${
                  !edit?.tShirtSize
                    ? "task-edit-slide-in"
                    : "task-edit-slide-out"
                }`}
              >
                {details?.tShirtSize ? (
                  <p className="px-3 py-1 max-w-max rounded bg-slate-200 text-slate-800 font-lato font-normal text-xs lg:text-base">
                    {details?.tShirtSize}
                  </p>
                ) : (
                  <p className="text-primary-gray-250 font-lato font-normal text-xs lg:text-base">
                    Add T-Shirt Size
                  </p>
                )}
              </div>
            )}
            <div className="absolute top-1 right-0 cursor-pointer">
              {edit?.tShirtSize ? (
                <img
                  src="/assets/svg/check.svg"
                  onClick={() => {
                    setEdit({ ...edit, tShirtSize: false });
                    onUpdate();
                  }}
                  alt=""
                  className="w-3 h-auto"
                />
              ) : (
                <img
                  onClick={() => {
                    setEdit({ ...edit, tShirtSize: true });
                  }}
                  src="/assets/svg/editIcon.svg"
                  alt=""
                  className="w-3 h-auto"
                />
              )}
            </div>
          </div>
        </div>
        {details?.type && (
          <div className="flex flex-row items-center space-x-3">
            <div className="input-label m-0 w-1/3">Type</div>
            <div className="w-2/3 relative flex flex-row items-start justify-between space-x-2.5">
              <p className="text-primary-gray-1000 font-lato font-normal text-xs lg:text-base">
                {details?.type?.name}
              </p>
            </div>
          </div>
        )}
        {details?.project && (
          <div className="flex flex-row items-center space-x-3">
            <div className="input-label m-0 w-1/3">Project</div>
            <div className="w-2/3 relative flex flex-row items-center justify-between space-x-2.5">
              <div className="px-2.5 flex flex-row items-center py-0.5 font-bold max-w-max rounded-full border-2 space-x-1.5 border-primary-gray-1000 bg-transparent text-primary-gray-1000 font-lato text-2xs lg:text-base">
                <img
                  src={details?.project?.image?.url || "/assets/svg/rocket.svg"}
                  alt=""
                  className="rounded-full w-2 h-2 lg:w-4 lg:h-4"
                />
                <p>{getProjectName(details?.project)}</p>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-row items-center space-x-3">
          <div className="input-label m-0 w-1/3">Owner</div>
          <div className="w-2/3 relative flex flex-row items-start justify-between space-x-2.5">
            <>
              {edit?.owner ? (
                <>
                  {window.innerWidth > 1024 ? (
                    <div className="w-11/12">
                      <DropdownInput
                        list={userList?.map((i) => ({
                          label: i?.first_name,
                          value: i?.id,
                          image: i?.image || {
                            url: "/assets/images/defaultUser.svg",
                          },
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
                </>
              ) : (
                <div className="flex flex-row items-center">
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
              )}
            </>
            <div className="absolute top-1 right-0 cursor-pointer">
              {edit?.owner && user?.id == details?.creator?.id ? (
                <img
                  src="/assets/svg/check.svg"
                  onClick={() => {
                    setEdit({ ...edit, owner: false });
                    addMembers(details?.id, details?.students);
                    onUpdate();
                  }}
                  alt=""
                  className="w-3 h-auto"
                />
              ) : (
                <img
                  onClick={() => {
                    setEdit({ ...edit, owner: true });
                    setShowAddOwnerModal(true);
                  }}
                  src="/assets/svg/editIcon.svg"
                  alt=""
                  className="w-3 h-auto"
                />
              )}
            </div>
          </div>
        </div>{" "}
        {/* <div className="flex flex-row items-center space-x-3">
          <div className="input-label m-0 w-1/3">Collaborators</div>
          <div className="w-2/3 relative flex flex-row items-start justify-between space-x-2.5">
            <>
              {edit?.collaborators ? (
                <>
                  {window.innerWidth > 1024 ? (
                    <div className="w-11/12">
                      <DropdownInputForMultipleSelect
                        label="Collaborators"
                        srOnly
                        list={userList
                          ?.filter?.((e) => e?.is_active)
                          ?.map((i) => ({
                            label: i?.first_name,
                            value: i?.id,
                            image: i?.image || {
                              url: "/assets/images/defaultUser.svg",
                            },
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
                    <></>
                  )}
                </>
              ) : (
                <div className="-m-1.5 flex flex-row flex-wrap items-center">
                  {details?.students?.length > 0 ? (
                    details?.students.map((person) => {
                      return (
                        <div
                          className="flex flex-row items-center m-1.5"
                          key={person?.id}
                        >
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

                          {user?.id == details?.owner?.id &&
                            edit?.collaborators && (
                              <XIcon
                                className="w-2.5 h-2.5 ml-2.5 mt-1 lg:w-4 lg:h-4 text-caarya-red-medium cursor-pointer"
                                onClick={() => {
                                  let s = [...details.students];
                                  if (s?.find((i) => i?.id == person?.id)) {
                                    s = s?.filter((i) => i?.id !== person?.id);
                                  } else {
                                    s.push(
                                      userList?.find((i) => i?.id == person?.id)
                                    );
                                  }

                                  setDetails({ ...details, students: s });
                                }}
                              />
                            )}
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-gray-700 font-lato font-bold text-sm lg:text-base">
                      No collaborators
                    </p>
                  )}
                </div>
              )}
            </>
            <div className="absolute top-1 right-0 cursor-pointer">
              {edit?.collaborators && user?.id == details?.owner?.id ? (
                <img
                  src="/assets/svg/check.svg"
                  onClick={() => {
                    setEdit({ ...edit, collaborators: false });
                    addMembers(details?.id, details?.students);
                    onUpdate();
                  }}
                  alt=""
                  className="w-3 h-auto"
                />
              ) : (
                <img
                  onClick={() => {
                    setEdit({ ...edit, collaborators: true });
                    setShowAddMembersModal(true);
                  }}
                  src="/assets/svg/editIcon.svg"
                  alt=""
                  className="w-3 h-auto"
                />
              )}
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default ViewEditDetails;
