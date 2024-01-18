import React from "react";
import { UserIcon } from "@heroicons/react/outline";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { TaskStatus } from "helpers/task";
import { PencilAltIcon } from "@heroicons/react/outline";
import { getProjectName } from "helpers/projects";
import moment from "moment";

function ViewDetails({ setEditable, fetching, details }) {
  return (
    <div className="w-full">
      {!fetching && (
        <div className="pt-3 pb-4 px-2.5 space-y-5 relative">
          <div
            onClick={() => {
              setEditable(true);
            }}
            className="cursor-pointer max-w-max flex flex-row items-center space-x-1.5 px-2.5 py-1 rounded-full bg-secondary-red-50"
          >
            <p className="font-karla text-secondary-red-550 text-xs lg:text-base">
              Edit details
            </p>
            <img src="/assets/svg/editIcon.svg" alt="" className="w-3 h-auto" />
          </div>
          {/* {details?.status && (
            <p
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
          {/* <PencilAltIcon
            className="h-4 w-4 text-caarya-red-lighter absolute top-0 right-7"
            onClick={() => {
              setEditable(true);
            }}
          /> */}
          <div className="w-full">
            <h1 className="input-label">Description</h1>
            {details?.description ? (
              <p
                // onClick={() => {
                //   setEdit({ ...edit, description: true });
                // }}
                className="text-primary-gray-1000 font-lato font-normal text-xs lg:text-base"
              >
                {details?.description}
              </p>
            ) : (
              <p
                // onClick={() => {
                //   setEdit({ ...edit, description: true });
                // }}
                className="text-primary-gray-250 font-lato font-normal text-xs lg:text-base"
              >
                Add a Description
              </p>
            )}
          </div>
          <div className="w-full">
            <h1 className="input-label">Due on</h1>
            <div className="flex flex-col items-start px-2.5 py-1 rounded-full max-w-max bg-white">
              {details?.date ? (
                <div className="text-primary-gray-1000 max-w-max font-lato font-normal focus:border-0 focus:ring-0 focus:outline-none bg-transparent border-0 p-0 text-xs lg:text-base">
                  {moment(details?.date).format("LL")}
                </div>
              ) : (
                <div className="text-primary-gray-250 focus:border-0 focus:ring-0 focus:outline-none bg-transparent border-0 p-0 font-karla text-xs lg:text-base">
                  Add Due Date
                </div>
              )}
            </div>
            {/* <LocalizationProvider dateAdapter={DateAdapter}>
              <DatePicker
                open={false}
                label=""
                value={details?.date}
                // onChange={(value) => {
                //   setDetails({
                //     ...details,
                //     date: value,
                //   });
                //   setCalendarOpen(false);
                //   handleUpdate();
                // }}
                renderInput={({ inputRef, inputProps }) => (
                  <div
                    // onClick={() => setCalendarOpen(true)}
                    className="flex flex-col items-start px-2.5 py-1 rounded-full max-w-max bg-white"
                  >
                    {details?.date ? (
                      <input
                        ref={inputRef}
                        {...inputProps}
                        className="text-primary-gray-1000 max-w-max font-lato font-normal focus:border-0 focus:ring-0 focus:outline-none bg-transparent border-0 p-0 text-xs lg:text-base"
                      ></input>
                    ) : (
                      <input
                        ref={inputRef}
                        {...inputProps}
                        placeholder="Add Due Date"
                        className="text-primary-gray-1000 focus:border-0 focus:ring-0 focus:outline-none bg-transparent border-0 p-0 font-karla text-xs lg:text-base"
                      ></input>
                    )}
                  </div>
                )}
              />
            </LocalizationProvider> */}
          </div>
          <div className="w-full space-y-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1 space-y-1">
                <h1 className="input-label">T-Shirt Size</h1>
                {details?.tShirtSize ? (
                  <p
                    // onClick={() => {
                    //   setShowEditModal({ isOpen: true, type: "T-Shirt Size" });
                    // }}
                    className="px-3 py-1 max-w-max mt-2 rounded bg-slate-200 text-slate-800 font-lato font-normal text-xs lg:text-base"
                  >
                    {details?.tShirtSize}
                  </p>
                ) : (
                  <p
                    // onClick={() => {
                    //   setShowEditModal({ isOpen: true, type: "T-Shirt Size" });
                    // }}
                    className="text-primary-gray-250 font-lato font-normal text-xs lg:text-base"
                  >
                    Add T-Shirt Size
                  </p>
                )}
              </div>
              {/* <div className="col-span-1 space-y-1">
                <h1 className="input-label">
                  Priority
                </h1>
                {details?.priority ? (
                  <p
                    // onClick={() => {
                    //   setShowEditModal({ isOpen: true, type: "Priority" });
                    // }}
                    className="px-3 py-1 max-w-max mt-2 rounded bg-slate-200 text-slate-800 font-lato font-normal text-xs lg:text-base"
                  >
                    {details?.priority}
                  </p>
                ) : (
                  <p
                    // onClick={() => {
                    //   setShowEditModal({ isOpen: true, type: "Priority" });
                    // }}
                    className="text-primary-gray-1000 font-lato font-normal text-xs lg:text-base"
                  >
                    Add Priority
                  </p>
                )}
              </div> */}
            </div>
          </div>
          {details?.type && (
            <div className="w-full space-y-1">
              <h1 className="input-label">Type</h1>

              <p className="text-primary-gray-1000 font-lato font-normal text-xs lg:text-base">
                {details?.type?.name}
              </p>
            </div>
          )}
          {/* <div className="w-full space-y-1">
            <div className="grid grid-cols-1 gap-4">
              <div className="col-span-1 space-y-1">
                <h1 className="font-medium text-xs lg:text-base">Status</h1>
                {details?.status ? (
                  <p
                    onClick={() => {
                      setShowEditModal({ isOpen: true, type: "Status" });
                    }}
                    className="px-3 py-1 max-w-max mt-2 rounded font-karla text-sm"
                    style={{
                      color: TaskStatus.find((e) => e.value == details?.status)
                        .color,
                      backgroundColor: TaskStatus.find(
                        (e) => e.value == details?.status
                      ).lightColor,
                    }}
                  >
                    {details?.status}
                  </p>
                ) : (
                  <p
                    onClick={() => {
                      setShowEditModal({ isOpen: true, type: "Status" });
                    }}
                    className="text-primary-gray-1000 font-karla text-xs lg:text-base"
                  >
                    Add Status
                  </p>
                )}
              </div>
            </div>
          </div> */}

          {details?.project && (
            <div className="w-full space-y-1.5">
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
          <div className="w-full">
            <h1 className="input-label">Collaborators</h1>
            <div className="mt-2 grid grid-cols-2 gap-4">
              {details?.students?.length > 0 &&
                details?.students.map((person) => {
                  return (
                    <div
                      className="flex flex-row items-center"
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
                    </div>
                  );
                })}
            </div>
            {details?.students?.length === 0 && (
              <p
                // onClick={() => {
                //   setShowAddMembersModal(true);
                // }}
                className="mt-1 text-primary-gray-250 font-lato font-normal text-xs lg:text-base"
              >
                Add Collaborators to Task
              </p>
            )}
          </div>
          <div className="w-full">
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
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewDetails;
