import { Drawer } from "@mui/material";
import { X } from "@phosphor-icons/react";
import ChronosButton from "components/Comman/Buttons";
import SimpleTextArea from "components/Comman/Inputs/SimpleTextArea";
import { createAJournal } from "config/APIs/journals";
import { TRACK_CATEGORY } from "helpers/constants/tracks";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { showToast } from "redux/toaster";

function ClockOutJournal({ isOpen, closeModal, onUpdate, goal, session }) {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [creating, setCreating] = useState(false);

  const handleCreate = async () => {
    setCreating(true);
    try {
      let body = {
        ...data,
        goalId: goal?.id,
        sessionId: session?.id,
      };
      let currentTime = moment();

      body["title"] = `${moment(session?.clockIn).format("ll")} ${moment(
        session?.clockIn
      ).format("HH:mm:ss")} - ${currentTime.format("ll")} ${currentTime.format(
        "HH:mm:ss"
      )} `;

      const response = await createAJournal(body);

      onUpdate(currentTime);
      closeModal();
    } catch (err) {
      dispatch(
        showToast({ message: err?.response?.data?.message, type: "error" })
      );
      console.log("Error", err);
    } finally {
      setCreating(false);
    }
  };

  return (
    <Drawer
      anchor={window.innerWidth < 1024 ? "bottom" : "right"}
      PaperProps={{
        style: {
          borderRadius: window.innerWidth < 1024 ? "20px 20px 0px 0px" : "0px",
          maxHeight: "100vh",
          height: window.innerWidth < 1024 ? "auto" : "100%",
          width: window.innerWidth < 1024 ? "100%" : "560px",
        },
      }}
      open={isOpen}
      onClose={() => {
        closeModal();
        setData({});
      }}
      transitionDuration={250}
    >
      <div className="md:max-w-xl lg:h-screen pt-6 pb-10 px-4 rounded-t-2xl lg:rounded-t-none bg-white mx-auto w-full transform transition-all ease-in-out duration-150">
        <div className="flex flex-row items-center justify-between space-x-2 text-primary-gray-300 font-karla text-base font-medium rounded-t-2xl">
          <div className="flex flex-row items-center space-x-2">
            Clocking Out
          </div>
          <X
            onClick={() => {
              closeModal();
              setData({});
            }}
            size={20}
          />
        </div>

        <div className="mt-4 flex w-full flex-col items-start px-4 space-y-4 h-auto transition-all ease-in-out duration-150">
          <div className="flex flex-col w-full items-center space-y-2">
            <h1 className="text-primary-gray-800 font-lato text-lg font-semibold">
              How did things go?
            </h1>
            <h1 className="text-primary-gray-300 font-lato text-xs font-light">
              This will be saved in your journal
            </h1>
          </div>
          <div className="flex flex-col w-full items-start space-y-1.5">
            <h1 className="text-primary-gray-400 text-base font-semibold font-lato">
              Worked On:
            </h1>
            <div className="w-full bg-white rounded-lg border border-primary-gray-280 px-3 py-2 space-y-2">
              {goal?.track ? (
                <div className="flex flex-row items-center space-x-1 text-primary-gray-300 text-3xs font-lato">
                  <img
                    src={
                      TRACK_CATEGORY?.find(
                        (t) => t?.value == goal?.track?.category
                      )?.image
                    }
                    alt=""
                    className="w-2.5 h-2.5"
                  />
                  <p className="font-semibold">{goal?.track?.category} / </p>
                  <p className="font-light">{goal?.track?.title}</p>
                </div>
              ) : (
                <div className="flex flex-row items-center space-x-1 text-primary-gray-300 text-3xs font-lato">
                  <p className="font-light">No Track</p>
                </div>
              )}
              <h1 className="text-primary-gray-400 font-lato text-sm font-semibold">
                {goal?.title}
              </h1>
              <p className="text-primary-gray-400 font-lato text-sm font-light">
                {goal?.title}
              </p>
            </div>
          </div>
          <div className="flex flex-col w-full space-y-1">
            <h1 className="text-primary-gray-400 font-lato text-sm font-light">
              Select an emoji that represents how your mood was for the session
            </h1>
            <div className="flex flex-row items-center justify-center space-x-6">
              <div
                onClick={() => {
                  setData({
                    ...data,
                    mood: {
                      png: "happy",
                    },
                  });
                }}
                className={`flex flex-row items-center justify-center p-3 ${
                  data?.mood?.png == "happy"
                    ? "border border-primary-yellow-light rounded-lg bg-primary-yellow-lightest"
                    : ""
                }`}
              >
                <img
                  src="/assets/images/emojis/happy.png"
                  alt=""
                  className="w-10 h-10"
                />
              </div>
              <div
                onClick={() => {
                  setData({
                    ...data,
                    mood: {
                      png: "fine",
                    },
                  });
                }}
                className={`flex flex-row items-center justify-center p-3 ${
                  data?.mood?.png == "fine"
                    ? "border border-primary-yellow-light rounded-lg bg-primary-yellow-lightest"
                    : ""
                }`}
              >
                <img
                  src="/assets/images/emojis/fine.png"
                  alt=""
                  className="w-10 h-10"
                />
              </div>
              <div
                onClick={() => {
                  setData({
                    ...data,
                    mood: {
                      png: "sad",
                    },
                  });
                }}
                className={`flex flex-row items-center justify-center p-3 ${
                  data?.mood?.png == "sad"
                    ? "border border-primary-yellow-light rounded-lg bg-primary-yellow-lightest"
                    : ""
                }`}
              >
                <img
                  src="/assets/images/emojis/sad.png"
                  alt=""
                  className="w-10 h-10"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full space-y-3">
            <h1 className="text-primary-gray-300 font-lato text-sm font-light">
              Additional Comments
            </h1>
            <SimpleTextArea
              srOnly
              label="description"
              field="description"
              details={data}
              setDetails={setData}
            />
          </div>
        </div>
        <div className="mt-4 flex w-full flex-row items-center justify-end space-x-8 py-4 border-t border-primary-gray-200 ">
          <ChronosButton
            text="Cancel"
            tertiary
            underline
            onClick={() => {
              setData({});
              closeModal();
            }}
          />
          <ChronosButton
            loader={creating}
            text="Continue"
            primary
            yellow
            onClick={() => {
              handleCreate();
            }}
          />
        </div>
      </div>
    </Drawer>
  );
}

export default ClockOutJournal;
