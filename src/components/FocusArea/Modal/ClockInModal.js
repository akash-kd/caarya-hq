import { Drawer } from "@mui/material";
import { Clock, Sparkle } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function ClockInModal({ isOpen, closeModal, onUpdate }) {
  const dispatch = useDispatch();
  const [data, setData] = useState({});

  const [selectedTime, setselectedTime] = useState(false);
  const [ctaText, setctaText] = useState(false);

  useEffect(() => {
    if (selectedTime) {
      setTimeout(() => {
        setctaText(true);
      }, 500);
    }
  }, [selectedTime]);
  useEffect(() => {
    if (!ctaText) {
      setTimeout(() => {
        setselectedTime(false);
      }, 50);
    }
  }, [ctaText]);

  //   const handleCreate = async () => {
  //     setCreating(true);
  //     try {
  //       let body = {
  //         ...data,
  //         goalId: goal?.id,
  //         sessionId: session?.id,
  //       };
  //       let currentTime = moment();

  //       body["title"] = `${moment(session?.clockIn).format("ll")} ${moment(
  //         session?.clockIn
  //       ).format("HH:mm:ss")} - ${currentTime.format("ll")} ${currentTime.format(
  //         "HH:mm:ss"
  //       )} `;

  //       const response = await createAJournal(body);

  //       onUpdate(currentTime);
  //       closeModal();
  //     } catch (err) {
  //       dispatch(
  //         showToast({ message: err?.response?.data?.message, type: "error" })
  //       );
  //       console.log("Error", err);
  //     } finally {
  //       setCreating(false);
  //     }
  //   };

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
      <div className="md:max-w-xl lg:h-screen px-6 pt-6 pb-24 space-y-8 rounded-t-2xl lg:rounded-t-none bg-white mx-auto w-full transform transition-all ease-in-out duration-150">
        <div className="flex flex-col space-y-2">
          <div className="flex flex-row items-center justify-between space-x-2 text-primary-gray-800 font-karla text-base font-medium rounded-t-2xl">
            How long do you plan to work on this goal?
          </div>
          <p className="text-primary-neutral-500 font-lato text-xs font-light">
            Decide on a particular aspect of your goal that you want to knock
            off first and dedicate a focused session to it.
          </p>
        </div>
        <div className="flex flex-row items-stretch -ml-2 -mt-2 flex-wrap">
          {[
            "10 Minutes",
            "15 Minutes",
            "20 Minutes",
            "30 Minutes",
            "45 Minutes",
            "1 Hour",
            "2 Hour",
            "Custom",
          ]?.map((item) => {
            return (
              <div
                onClick={() => {
                  setData(item);
                  setselectedTime(true);
                }}
                className={`m-2 flex rounded flex-row items-center justify-center px-3 py-2 border ${
                  data == item
                    ? "border-primary-yellow-medium bg-primary-yellow-30 text-primary-gray-800"
                    : "border-primary-neutral-200 text-primary-neutral-400"
                } font-lato text-xs font-semibold`}
              >
                {item}
              </div>
            );
          })}
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex flex-row items-center space-x-2">
            <Sparkle size={16} color="#A193F2" />
            <p className="text-primary-neutral-400 font-karla text-xs font-medium">
              Pro Tip!
            </p>
          </div>
          <p className="text-primary-neutral-400 font-lato text-2xs font-light">
            Don’t worry about being exact, you can always extend the session or
            start a new one.
            <br />
            <br />
            The important part here is to stay accountable to yourself!
          </p>
        </div>
        <div
          style={{
            boxShadow:
              "0px -4px 6px -4px rgba(0, 0, 0, 0.10), 0px -8px 15px -3px rgba(0, 0, 0, 0.10)",
          }}
          className={`flex bg-primary-yellow-light flex-col fixed bottom-0 right-0 left-0 clockInButton ${
            selectedTime ? "active" : "inactive"
          }`}
        >
          <div
            onClick={() => {
              onUpdate();
            }}
            className={`w-full py-6 px-5 flex cursor-pointer flex-row space-x-2 items-center justify-center text-primary-yellow-darker font-lato text-sm font-semibold transition duration-150 ease-in-out ${
              ctaText ? "opacity-100" : "opacity-0"
            }`}
          >
            <Clock weight="fill" size={24} />
            <p>Clock In Now</p>
          </div>
        </div>
      </div>
    </Drawer>
  );
}

export default ClockInModal;
