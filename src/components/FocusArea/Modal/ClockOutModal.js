import { Drawer } from "@mui/material";
import { Dot, X } from "@phosphor-icons/react";
import ChronosButton from "components/Comman/Buttons";
import SimpleTextArea from "components/Comman/Inputs/SimpleTextArea";
import { createAJournal } from "config/APIs/journals";
import { TRACK_CATEGORY } from "helpers/constants/tracks";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { showToast } from "redux/toaster";

function ClockOutModal({ isOpen, closeModal, onUpdate, goal, session }) {
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
      open={isOpen}
      onClose={() => closeModal()}
      transitionDuration={500}
      PaperProps={{
        style: {
          width: window.innerWidth < 1024 ? "100%" : "100vw",
          height: window.innerWidth < 1024 ? "100vh" : "100vh",
          background: "transparent",
          boxShadow: "none",
        },
      }}
    >
      <div className="h-screen flex flex-row items-end justify-between lg:justify-end">
        <div className="variation-bg h-[75vh] w-[100vh] lg:w-[720px] lg:h-screen relative rounded-t-2xl lg:rounded-t-none">
          <div className="z-40 flex cursor-pointer flex-row items-center justify-center absolute -top-16 lg:top-[50%] lg:-left-20 left-0 right-0 w-full lg:max-w-max">
            <div
              onClick={() => {
                closeModal();
              }}
              style={{ boxShadow: "0px 0px 30px 0px #FFF" }}
              className="text-white flex flex-row items-center justify-center h-10 w-10 bg-black rounded-full"
            >
              <X size={24} />
            </div>
          </div>
          <div className="md:max-w-xl lg:h-screen p-8 rounded-t-2xl lg:rounded-t-none bg-white mx-auto w-full transform transition-all ease-in-out duration-150 space-y-8">
            <div className="flex flex-col items-start space-y-2 text-primary-neutral-500 font-karla text-xs font-medium rounded-t-2xl">
              <div className="flex flex-row items-center space-x-2">
                Clocking Out for goal
              </div>
              <div className="w-full shadow rounded-lg bg-white p-4 flex flex-col items-start space-y-2">
                {goal?.track ? (
                  <div className="flex flex-row items-center space-x-1 text-primary-gray-300 text-3xs font-lato">
                    <Dot
                      weight="fill"
                      size={10}
                      className="text-caarya-red-lighter"
                    />
                    <p className="font-semibold">{goal?.track?.category} / </p>
                    <p className="font-light">{goal?.track?.title}</p>
                  </div>
                ) : (
                  <div className="flex flex-row items-center space-x-1 text-primary-gray-300 text-3xs font-lato">
                    <p className="font-light">No Track</p>
                  </div>
                )}
                <div className="text-primary-neutral-500 font-lato text-sm font-semibold">
                  {goal?.title}
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full items-center space-y-2">
              <h1 className="text-primary-gray-800 font-lato text-lg font-semibold">
                How did things go?
              </h1>
              <h1 className="text-primary-gray-300 font-lato text-xs font-light">
                This will be saved in your journal
              </h1>
            </div>{" "}
            <div className="flex flex-col items-center w-full space-y-2">
              <h1 className="text-primary-gray-400 text-center font-lato text-sm font-light">
                Select an emoji that represents how your mood was for the
                session
              </h1>
              <div className="flex flex-row items-center justify-center space-x-6 p-2">
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
                      ? "border border-primary-yellow-light rounded-lg"
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
                      ? "border border-primary-yellow-light rounded-lg"
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
                      ? "border border-primary-yellow-light rounded-lg"
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
            <div className="mt-4 grid grid-cols-2 gap-5 py-4 border-t border-primary-gray-200 ">
              <ChronosButton
                text="Cancel"
                tertiary
                onClick={() => {
                  setData({});
                  closeModal();
                }}
              />
              <ChronosButton
                loader={creating}
                text="Save"
                primary
                yellow
                onClick={() => {
                  handleCreate();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
}

export default ClockOutModal;
