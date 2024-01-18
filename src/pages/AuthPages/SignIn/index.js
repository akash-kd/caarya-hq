import React, { useState, useEffect } from "react";
import OtpInput from "otp-input-react";

// APIs
import firebase from "config/firebase.js";
import {
  loginWithFirebaseAuthToken,
  verifyPhoneNumberForOTP,
} from "config/APIs/auth";
import * as SquadAPIs from "config/APIs/squad";

// Redux
import { useDispatch } from "react-redux";
import { showToast } from "redux/toaster";
import { userUpdate } from "redux/user";

import Footer from "./Footer";
import { ChevronLeftIcon } from "@heroicons/react/solid";

// Core components

const buttonStates = {
  init: {
    text: "Submit",
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
    text: "Login",
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

function SignIn() {
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
              const { admin: cred, token } = res.data.data;
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
              window.location.href = window.location.origin + "/";
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
    <>
      <section className="otp-login-container min-h-screen max-h-screen flex items-stretch justify-center bg-white relative">
        <div className="lg:w-1/2 w-full flex flex-col items-center justify-center mx-8 -mt-32 md:px-16 px-0 z-0">
          <div className="z-10 inset-0 items-center pb-6">
            <img
              className="mx-auto w-28"
              src="/assets/caaryaLogos/text_logo.png"
              alt="logo"
            />
          </div>
          {/* <div className="block w-full py-2.5">
            <p className="font-karla font-medium text-xl text-center text-primary-yellow-light">
              <span className="rounded-full text-primary-yellow-darker">
                Forge
              </span>
            </p>
          </div> */}
          <div className="w-full md:py-6 z-20">
            <div>
              {option === "phone" ? (
                <form
                  className="react-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleClick();
                  }}
                >
                  <h1 className="text-xl text-primary-yellow-darker font-karla font-medium mb-4 border-primary-yellow-lightest border-b pb-2">
                    connect to chronos
                  </h1>
                  <fieldset className="form-group">
                    <label className="text-primary-yellow-darker text-xs font-medium">
                      Phone Number
                    </label>
                    <input
                      id="formName"
                      className="form-input p-3 font-lato mt-1 bg-white border-b border-primary-yellow-lightest"
                      type="phone"
                      required
                      onChange={(e) => {
                        e.target.value = e.target.value
                          .trimStart()
                          .replace(/[^0-9]/gi, "");

                        _handleTextFieldChange(e);
                      }}
                    />
                  </fieldset>
                  <div className="form-group mt-2">
                    <div className=" cursor-pointer">
                      <button
                        id="send-otp-button"
                        type="button"
                        className="btn font-lato bg-primary-yellow-darker text-primary-yellow-lightest rounded text-xs mt-3 font-bold capitalize"
                        onClick={handleClick}
                        disabled={buttonState.disabled}
                      >
                        {buttonState.text}
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div>
                  <form
                    className="react-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      otpSubmit();
                    }}
                  >
                    <h1 className="login-caption font-medium text-primary-yellow-darker font-lato mb-4">
                      Enter the OTP sent to your phone
                    </h1>
                    <fieldset className="form-group">
                      <OtpInput
                        otpType="number"
                        value={otp}
                        onChange={(value) => {
                          if (value.toString().length == 6) {
                          }
                          setOTP(value);
                        }}
                        OTPLength={6}
                        inputStyles={{
                          width: "32px",
                          height: "35px",
                          border: "none",
                          backgroundColor: "#fff",
                          borderRadius: "4px",
                          padding: "6px",
                          marginRight: "8px",
                        }}
                        separator={<span style={{ width: "5px" }}></span>}
                      />
                    </fieldset>
                    <div className="form-group mt-2">
                      <div className=" cursor-pointer">
                        <button
                          id="send-otp-button"
                          type="button"
                          className="btn font-lato bg-primary-yellow-darker text-primary-yellow-lightest rounded text-xs mt-3 font-bold capitalize"
                          placeholder=""
                          onClick={() => otpSubmit()}
                          disabled={buttonState.disabled}
                        >
                          {buttonState.text}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignIn;
