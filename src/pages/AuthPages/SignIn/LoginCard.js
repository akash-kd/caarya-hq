import React, { useState, useEffect } from "react";

// APIs
import firebase from "config/firebase.js";
import {
  loginWithFirebaseAuthToken,
  verifyPhoneNumberForOTP,
} from "config/APIs/auth";

// Redux
import { useDispatch } from "react-redux";
import { showToast } from "redux/toaster";
import { userUpdate } from "redux/user";
import { ArrowRight } from "@phosphor-icons/react";

// Core components

const buttonStates = {
  init: {
    text: "Send OTP",
    disabled: false,
  },
  verifyNumber: {
    text: "Verifying Number",
    disabled: true,
  },
  sendOtp: {
    text: "Sending OTP",
    disabled: true,
  },
  askOtp: {
    text: "Verify OTP",
    disabled: false,
  },
  verifyOtp: {
    text: "Verifying OTP",
    disabled: true,
  },
  successOtp: {
    text: "Verified, you'll be redirected shortly",
    disabled: false,
  },
};

function LoginCard() {
  const dispatch = useDispatch();

  document.documentElement.classList.remove("nav-open");

  useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });

  const [phoneNo, setPhoneNo] = useState("");
  const [otp, setOTP] = useState("");
  const auth = firebase.auth();
  const [counter, setCounter] = useState(120);
  const [count, setCount] = useState(0);
  const [option, setOption] = useState("phone");
  const [buttonState, setButtonState] = useState(buttonStates["init"]);
  function _handleTextFieldChange(e) {
    if (!isNaN(e.target.value) && e.target.value.toString().length <= 10) {
      setPhoneNo(e.target.value);
    }
  }

  const handleClick = () => {
    setButtonState(buttonStates["verifyNumber"]);
    //First check whether phone is registered or not
    console.info("Checking number");
    verifyPhoneNumberForOTP(phoneNo)
      .then((res) => {
        console.info("Number found");
        if (res.status == "200" && res.data.success) {
          console.info("Status success");
          setButtonState(buttonStates["sendOtp"]);
          window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
            "send-otp-button",
            {
              size: "invisible",
            }
          );
          console.info("Recaptcha verified");
          const appVerifier = window.recaptchaVerifier;
          console.info("Sending firebase the number");
          firebase
            .auth()
            .signInWithPhoneNumber("+91" + phoneNo, appVerifier)
            .then(function (confirmationResult) {
              console.info("Firebase sign in success");
              setButtonState(buttonStates["askOtp"]);
              setOption("otp");
              window.confirmationResult = confirmationResult;
              console.info("Set confirmation");
              setCounter(120);
              console.log(confirmationResult);
            });
        }
      })
      .catch((e) => {
        console.info("Err in auth number", e, "\n", e?.response);
        setButtonState(buttonStates["init"]);
        dispatch(
          showToast({
            message: e?.response?.data?.message,
            type: "error",
          })
        );
      });
  };

  function otpSubmit() {
    setButtonState(buttonStates["verifyOtp"]);
    console.info("Submitting otp");
    window.confirmationResult
      .confirm(otp)
      .then((result) => {
        console.info("OTP matched");

        setButtonState(buttonStates["successOtp"]);
        dispatch(
          showToast({
            message: "OTP Login Successfull!",
          })
        );

        const token = result.user.getIdToken().then((res) => {
          const body = {
            idToken: res,
          };
          loginWithFirebaseAuthToken(res)
            .then((res) => {
              const { admin: cred, token, type } = res.data.data;
              cred["role"] = "admin";
              cred["loginType"] = "phone";
              dispatch(
                userUpdate({
                  user: cred,
                  token: token,
                })
              );
              localStorage.setItem("role", "admin");
              localStorage.setItem("login_type", "phone");

              if (
                type == "ftp" &&
                (cred?.metaData == null ||
                  (cred?.metaData !== null &&
                    !Object.keys(cred?.metaData)?.includes("onBoarded")))
              ) {
                window.location.href = window.location.origin + "/auth/onboard";
              } else window.location.href = window.location.origin + "/";
            })
            .catch((e) => {
              console.log(e);
            });
        });
      })
      .catch((error) => {
        setButtonState(buttonStates["init"]);
        setOption("phone");
        dispatch(
          showToast({
            message: "OTP Login Unsuccessfull!",
            type: "error",
          })
        );
      });
  }

  return (
    <section className="max-w-[420px] mx-auto">
      <div
        style={{
          boxShadow:
            "0px 4px 6px -4px rgba(0, 0, 0, 0.10), 0px 10px 15px -3px rgba(0, 0, 0, 0.10)",
        }}
        className="w-full flex flex-col items-center rounded-lg"
      >
        <div
          style={{
            background:
              "linear-gradient(0deg, rgba(237, 76, 65, 0.83) 0%, rgba(237, 76, 65, 0.83) 100%), url('/assets/images/loginBg.png'), lightgray -5.183px -40.248px / 110.117% 401.314% no-repeat",
          }}
          className="text-white font-manrope rounded-t-lg py-6 px-5 text-sm lg:text-lg font-extralight text-center tracking-[0.7px]"
        >
          {option == "phone" ? (
            <>
              Enter the number registered with your{" "}
              <span className="font-semibold">LIFE Pass</span> to continue
            </>
          ) : (
            "Enter the OTP sent to your registered mobile number"
          )}
        </div>

        <img
          src="/assets/images/loginBorder.svg"
          alt=""
          className="object-cover w-full"
        />
        <div className="bg-primary-red-500 rounded-b-lg w-full">
          <div className="flex flex-col gap-4 w-full py-4 px-6">
            {option == "phone" ? (
              <>
                <div className="flex flex-col space-y-2">
                  <label
                    htmlFor="phone"
                    className="text-white text-sm lg:text-base font-semibold font-satoshi"
                  >
                    Mobile
                  </label>
                  <div className="flex flex-row items-stretch bg-white rounded-lg gap-2">
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      placeholder="eg. 9844381031"
                      value={phoneNo}
                      onChange={(e) => {
                        e.target.value = e.target.value
                          .trimStart()
                          .replace(/[^0-9]/gi, "");

                        _handleTextFieldChange(e);
                      }}
                      className="w-full  px-6 py-3.5 text-base leading-[24px] border-0 focus:outline-none focus:ring-0 bg-transparent"
                    />
                  </div>{" "}
                  <p className="text-2xs lg:text-xs font-satoshi text-white font-extralight">
                    A verification code will be sent to your mobile number{" "}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col space-y-2">
                  <label
                    htmlFor="otp"
                    className="text-white text-sm lg:text-base font-semibold font-satoshi"
                  >
                    Enter OTP
                  </label>
                  <div className="flex items-center gap-2 px-6 py-3.5 rounded-lg border bg-white border-primary-gray-150">
                    <input
                      type="password"
                      name="otp"
                      id="otp"
                      value={otp}
                      onChange={(e) => {
                        if (
                          !isNaN(e.target.value) &&
                          e.target.value.toString().length <= 6
                        ) {
                          setOTP(e.target.value);
                        }
                      }}
                      className="w-full p-0 text-base leading-[24px] border-0 focus:outline-none focus:ring-0 bg-transparent"
                    />
                  </div>{" "}
                  <p className="text-2xs lg:text-xs font-satoshi text-white font-light">
                    OTP Sent to mobile no. {phoneNo}
                  </p>
                </div>{" "}
              </>
            )}
          </div>
          <div className="flex flex-row items-center justify-center w-full">
            <input
              type="submit"
              id="send-otp-button"
              value={buttonState.text}
              className={`bg-black rounded-[12px] px-8 py-4 cursor-pointer text-primary-gray-100 font-satoshi text-sm font-bold  mb-5`}
              onClick={() => {
                if (option == "phone") {
                  handleClick();
                } else {
                  otpSubmit();
                }
              }}
              disabled={buttonState.disabled}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginCard;
