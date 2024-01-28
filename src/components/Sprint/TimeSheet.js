import {
  CheckCircleIcon,
  ChevronRightIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import { Clock } from "@phosphor-icons/react";
import { useState } from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import JournalCard from "./JournalCard";

function TimeSheet() {
  const [journals, setJournals] = useState([{ id: 1 }]);
  return (
    <div className="flex flex-col space-y-4 pb-6">
      <div className="p-2 flex flex-row items-center justify-between">
        <div className="flexflex-col">
          <h1 className="text-primary-red-medium font-lato text-xl font-semibold">
            Sprint 3
          </h1>
          <p className="text-primay-neutral-400 font-lato text-3xs font-bold leading-[8px]">
            22/01/23 - 28/01/23
          </p>
        </div>
        <p className="text-primary-red-medium flex flex-row items-center space-x-2 font-lato text-xs font-semibold underline">
          View All <ChevronRightIcon className="w-5 h-5" />
        </p>
      </div>
      <div className="py-4 px-2 flex flex-col space-y-6">
        <div className="px-4 flex flex-row items-center justify-between">
          <div className="flex flex-col space-y-1">
            <h1 className="text-primary-dawn-500 font-lato text-2xl font-bold leading-6">
              3
            </h1>
            <p className="text-primary-neutral-500 font-lato text-2xs font-light leading-[10px]">
              Goals Worked On
            </p>
          </div>

          <div className="flex flex-col items-center w-full max-w-[120px]">
            <CircularProgressbarWithChildren
              value={20}
              text={``}
              circleRatio={0.5}
              styles={buildStyles({
                rotation: 1 / 2 + 1 / 4,
                strokeLinecap: "butt",
                pathColor: "#A193F2",
                trailColor: "#E7E6E5",
              })}
            ></CircularProgressbarWithChildren>
            <div className="-mt-12 flex flex-row items-center space-x-2 text-primary-neutral-800 font-inter font-semibold text-base">
              <p>24h 36m</p>
              <p className="text-primary-neutral-400 font-light">/ 40h</p>
            </div>
            <p className="text-primary-neutral-500 mt-0.5 text-2xs font-lato leading-[10px] font-light">
              Total Hours Clocked In
            </p>
          </div>
        </div>
        <div className="grid grid-cols-7">
          {[1, 2, 3, 4, 5, 6, 7]?.map((i) => {
            return (
              <div className="py-2 w-full flex flex-col items-center space-y-1">
                <div className="w-full pb-2 border-b border-primary-neutral-300 flex flex-row items-center justify-center">
                  {i == 1 ? (
                    <XCircleIcon className="w-6 h-6 text-[#9C9A96]" />
                  ) : i == 2 ? (
                    <CheckCircleIcon className="w-6 h-6 text-[#2BB656]" />
                  ) : i == 3 ? (
                    <div className="w-6 h-6 flex flex-row items-center justify-center">
                      <Clock className="w-4 h-4 text-[#CFCDC9]" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-primary-neutral-[#FAFAFA]" />
                  )}
                </div>
                <p className="text-black font-lato text-2xs font-bold leading-4">
                  {i == 1
                    ? "M"
                    : i == 2 || i == 4
                    ? "T"
                    : i == 3
                    ? "W"
                    : i == 5
                    ? "F"
                    : "S"}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full flex flex-col space-y-4">
        <div className="px-2 flex flex-row items-center justify-between">
          <h1 className="text-primary-neutral-400 font-lato text-sm font-medium leading-5 tracking-[0.28px]">
            Thursday, 25th Jan 2023
          </h1>
          <div className="flex flex-row items-center space-x-2 text-primary-green-dark font-lato text-sm font-medium leading-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
            >
              <path
                d="M5 11C5 10.8674 5.05268 10.7402 5.14645 10.6464C5.24021 10.5527 5.36739 10.5 5.5 10.5H7.5C7.63261 10.5 7.75979 10.5527 7.85355 10.6464C7.94732 10.7402 8 10.8674 8 11C8 11.1326 7.94732 11.2598 7.85355 11.3536C7.75979 11.4473 7.63261 11.5 7.5 11.5H5.5C5.36739 11.5 5.24021 11.4473 5.14645 11.3536C5.05268 11.2598 5 11.1326 5 11ZM5 9C5 8.86739 5.05268 8.74021 5.14645 8.64645C5.24021 8.55268 5.36739 8.5 5.5 8.5H10.5C10.6326 8.5 10.7598 8.55268 10.8536 8.64645C10.9473 8.74021 11 8.86739 11 9C11 9.13261 10.9473 9.25979 10.8536 9.35355C10.7598 9.44732 10.6326 9.5 10.5 9.5H5.5C5.36739 9.5 5.24021 9.44732 5.14645 9.35355C5.05268 9.25979 5 9.13261 5 9ZM5 7C5 6.86739 5.05268 6.74021 5.14645 6.64645C5.24021 6.55268 5.36739 6.5 5.5 6.5H10.5C10.6326 6.5 10.7598 6.55268 10.8536 6.64645C10.9473 6.74021 11 6.86739 11 7C11 7.13261 10.9473 7.25979 10.8536 7.35355C10.7598 7.44732 10.6326 7.5 10.5 7.5H5.5C5.36739 7.5 5.24021 7.44732 5.14645 7.35355C5.05268 7.25979 5 7.13261 5 7ZM5 5C5 4.86739 5.05268 4.74021 5.14645 4.64645C5.24021 4.55268 5.36739 4.5 5.5 4.5H10.5C10.6326 4.5 10.7598 4.55268 10.8536 4.64645C10.9473 4.74021 11 4.86739 11 5C11 5.13261 10.9473 5.25979 10.8536 5.35355C10.7598 5.44732 10.6326 5.5 10.5 5.5H5.5C5.36739 5.5 5.24021 5.44732 5.14645 5.35355C5.05268 5.25979 5 5.13261 5 5Z"
                fill="#008B46"
              />
              <path
                d="M3 0.5H13C13.5304 0.5 14.0391 0.710714 14.4142 1.08579C14.7893 1.46086 15 1.96957 15 2.5V14.5C15 15.0304 14.7893 15.5391 14.4142 15.9142C14.0391 16.2893 13.5304 16.5 13 16.5H3C2.46957 16.5 1.96086 16.2893 1.58579 15.9142C1.21071 15.5391 1 15.0304 1 14.5V13.5H2V14.5C2 14.7652 2.10536 15.0196 2.29289 15.2071C2.48043 15.3946 2.73478 15.5 3 15.5H13C13.2652 15.5 13.5196 15.3946 13.7071 15.2071C13.8946 15.0196 14 14.7652 14 14.5V2.5C14 2.23478 13.8946 1.98043 13.7071 1.79289C13.5196 1.60536 13.2652 1.5 13 1.5H3C2.73478 1.5 2.48043 1.60536 2.29289 1.79289C2.10536 1.98043 2 2.23478 2 2.5V3.5H1V2.5C1 1.96957 1.21071 1.46086 1.58579 1.08579C1.96086 0.710714 2.46957 0.5 3 0.5Z"
                fill="#008B46"
              />
              <path
                d="M1 5.5V5C1 4.86739 1.05268 4.74021 1.14645 4.64645C1.24021 4.55268 1.36739 4.5 1.5 4.5C1.63261 4.5 1.75979 4.55268 1.85355 4.64645C1.94732 4.74021 2 4.86739 2 5V5.5H2.5C2.63261 5.5 2.75979 5.55268 2.85355 5.64645C2.94732 5.74021 3 5.86739 3 6C3 6.13261 2.94732 6.25979 2.85355 6.35355C2.75979 6.44732 2.63261 6.5 2.5 6.5H0.5C0.367392 6.5 0.240215 6.44732 0.146447 6.35355C0.0526784 6.25979 0 6.13261 0 6C0 5.86739 0.0526784 5.74021 0.146447 5.64645C0.240215 5.55268 0.367392 5.5 0.5 5.5H1ZM1 8.5V8C1 7.86739 1.05268 7.74021 1.14645 7.64645C1.24021 7.55268 1.36739 7.5 1.5 7.5C1.63261 7.5 1.75979 7.55268 1.85355 7.64645C1.94732 7.74021 2 7.86739 2 8V8.5H2.5C2.63261 8.5 2.75979 8.55268 2.85355 8.64645C2.94732 8.74021 3 8.86739 3 9C3 9.13261 2.94732 9.25979 2.85355 9.35355C2.75979 9.44732 2.63261 9.5 2.5 9.5H0.5C0.367392 9.5 0.240215 9.44732 0.146447 9.35355C0.0526784 9.25979 0 9.13261 0 9C0 8.86739 0.0526784 8.74021 0.146447 8.64645C0.240215 8.55268 0.367392 8.5 0.5 8.5H1ZM1 11.5V11C1 10.8674 1.05268 10.7402 1.14645 10.6464C1.24021 10.5527 1.36739 10.5 1.5 10.5C1.63261 10.5 1.75979 10.5527 1.85355 10.6464C1.94732 10.7402 2 10.8674 2 11V11.5H2.5C2.63261 11.5 2.75979 11.5527 2.85355 11.6464C2.94732 11.7402 3 11.8674 3 12C3 12.1326 2.94732 12.2598 2.85355 12.3536C2.75979 12.4473 2.63261 12.5 2.5 12.5H0.5C0.367392 12.5 0.240215 12.4473 0.146447 12.3536C0.0526784 12.2598 0 12.1326 0 12C0 11.8674 0.0526784 11.7402 0.146447 11.6464C0.240215 11.5527 0.367392 11.5 0.5 11.5H1Z"
                fill="#008B46"
              />
            </svg>
            <p>0</p>
          </div>
        </div>
        <div className="py-4 px-2 flex flex-col space-y-2 items-center justify-center bg-primary-neutral-50">
          {journals.length === 0 ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g clip-path="url(#clip0_33_9692)">
                  <path
                    d="M19.6008 8.14368C19.4065 8.14368 19.2492 8.30108 19.2492 8.49524V23.1375C19.2492 23.2254 19.1777 23.2968 19.0899 23.2968H5.34799C5.26014 23.2968 5.18866 23.2253 5.18866 23.1375V19.1978C5.18866 19.0036 5.03125 18.8462 4.8371 18.8462C4.64294 18.8462 4.48553 19.0036 4.48553 19.1978V23.1375C4.48553 23.6131 4.87244 23.9999 5.34799 23.9999H19.0899C19.5655 23.9999 19.9523 23.613 19.9523 23.1375V8.49524C19.9523 8.30104 19.795 8.14368 19.6008 8.14368Z"
                    fill="#CFCDC9"
                  />
                  <path
                    d="M19.0899 3.13889H16.5384C16.5498 3.05789 16.5561 2.9753 16.5561 2.89116C16.5561 1.92084 15.7667 1.13147 14.7964 1.13147C13.8262 1.13147 13.0368 1.92084 13.0368 2.89116C13.0368 2.97525 13.0431 3.05789 13.0546 3.13889H9.21963C9.12705 3.13959 9.03658 3.17639 8.97105 3.24188L4.58847 7.62445C4.52322 7.69003 4.48577 7.78055 4.48553 7.87303V17.4623C4.48553 17.6565 4.64294 17.8139 4.8371 17.8139C5.03125 17.8139 5.18866 17.6565 5.18866 17.4623V8.2246H8.70874C9.18433 8.2246 9.57119 7.83769 9.57119 7.36214V3.84202H13.317C13.6305 4.32811 14.1763 4.65084 14.7964 4.65084C15.4166 4.65084 15.9625 4.32806 16.276 3.84202H19.0899C19.1777 3.84202 19.2492 3.9135 19.2492 4.00134V6.7597C19.2492 6.95386 19.4065 7.11127 19.6008 7.11127C19.795 7.11127 19.9523 6.95386 19.9523 6.7597V4.00134C19.9523 3.5258 19.5654 3.13889 19.0899 3.13889ZM8.70874 7.52147H5.68586L8.86811 4.33922V7.36214C8.86807 7.44999 8.79663 7.52147 8.70874 7.52147ZM14.7964 3.94772C14.2139 3.94772 13.7399 3.47377 13.7399 2.89116C13.7399 2.30855 14.2139 1.83459 14.7964 1.83459C15.3791 1.83459 15.853 2.30855 15.853 2.89116C15.853 3.47377 15.3791 3.94772 14.7964 3.94772Z"
                    fill="#CFCDC9"
                  />
                  <path
                    d="M11.0585 16.7014C11.1837 16.8499 11.4055 16.8688 11.5539 16.7435C11.7117 16.6104 11.9359 16.5342 12.1694 16.5342H12.1726C12.4073 16.5349 12.6323 16.6126 12.7901 16.7472C12.8563 16.8038 12.9375 16.8314 13.0181 16.8314C13.1175 16.8314 13.2162 16.7895 13.2857 16.708C13.4117 16.5604 13.3942 16.3385 13.2465 16.2124C12.9599 15.9677 12.5792 15.8323 12.1747 15.8311C12.1729 15.8311 12.171 15.8311 12.1692 15.8311C11.7668 15.8311 11.3874 15.9641 11.1006 16.206C10.9522 16.3312 10.9334 16.553 11.0585 16.7014Z"
                    fill="#CFCDC9"
                  />
                  <path
                    d="M14.0964 15.2315C14.1038 15.2323 14.1113 15.2324 14.1189 15.2328C14.1233 15.233 14.1276 15.2335 14.1321 15.2335H14.134C14.3273 15.2335 14.4845 15.0774 14.4856 14.8839C14.4865 14.7133 14.3657 14.5704 14.2046 14.5376C14.2034 14.5373 14.2022 14.5372 14.201 14.537C14.1909 14.535 14.1806 14.5333 14.1702 14.5323C14.166 14.5319 14.1617 14.5319 14.1574 14.5316C14.1503 14.5311 14.1431 14.5304 14.1359 14.5304H14.1318C14.1311 14.5304 14.1305 14.5304 14.1298 14.5304C14.1177 14.5304 14.1057 14.531 14.0939 14.5322C13.9166 14.55 13.7799 14.6998 13.7799 14.882C13.7799 15.0622 13.9173 15.2105 14.0922 15.2309C14.0936 15.231 14.095 15.2314 14.0964 15.2315Z"
                    fill="#CFCDC9"
                  />
                  <path
                    d="M10.304 14.5304C10.1098 14.5304 9.95444 14.6878 9.95444 14.882C9.95444 15.0761 10.1139 15.2335 10.3081 15.2335C10.5022 15.2335 10.6596 15.0761 10.6596 14.882C10.6596 14.6878 10.5022 14.5304 10.3081 14.5304H10.304Z"
                    fill="#CFCDC9"
                  />
                  <path
                    d="M8.82515 12.5256C8.1937 13.3015 7.84598 14.2807 7.84598 15.2828C7.84598 17.694 9.8077 19.6557 12.219 19.6557C14.6303 19.6557 16.592 17.694 16.592 15.2828C16.592 14.2805 16.2441 13.3011 15.6125 12.5252C14.9901 11.7606 14.1198 11.2235 13.1619 11.0128C12.9721 10.971 12.7847 11.0911 12.743 11.2807C12.7012 11.4703 12.8212 11.6578 13.0108 11.6996C13.8143 11.8763 14.5447 12.3271 15.0672 12.9691C15.597 13.62 15.8888 14.4417 15.8888 15.2828C15.8888 17.3063 14.2425 18.9526 12.219 18.9526C10.1954 18.9526 8.5491 17.3063 8.5491 15.2828C8.5491 14.4418 8.84081 13.6203 9.37049 12.9694C9.89287 12.3275 10.6229 11.8766 11.4262 11.6997C11.6159 11.658 11.7358 11.4704 11.694 11.2808C11.6522 11.0912 11.4647 10.9714 11.275 11.013C10.3174 11.224 9.44732 11.7611 8.82515 12.5256Z"
                    fill="#CFCDC9"
                  />
                  <path
                    d="M12.2175 9.72721C12.4112 9.72721 12.5685 9.57051 12.5691 9.37668L12.5725 8.23687C12.5731 8.04271 12.4162 7.88484 12.222 7.88428C12.2216 7.88428 12.2213 7.88428 12.2209 7.88428C12.0272 7.88428 11.87 8.04098 11.8694 8.23481L11.8659 9.37462C11.8654 9.56878 12.0223 9.72665 12.2165 9.72721H12.2175Z"
                    fill="#CFCDC9"
                  />
                  <path
                    d="M10.518 10.213C10.5795 10.213 10.6418 10.1969 10.6983 10.163C10.8649 10.0632 10.919 9.84733 10.8193 9.68074L10.2271 8.69201C10.1273 8.52541 9.9114 8.47122 9.74481 8.57102C9.57822 8.67077 9.52408 8.88668 9.62383 9.05327L10.216 10.042C10.282 10.152 10.3985 10.213 10.518 10.213Z"
                    fill="#CFCDC9"
                  />
                  <path
                    d="M13.9141 10.2287C14.0328 10.2287 14.1488 10.1684 14.2149 10.0595L14.8131 9.07405C14.9138 8.90806 14.8609 8.69183 14.6949 8.59109C14.5289 8.4904 14.3128 8.54323 14.212 8.70922L13.6138 9.69467C13.5131 9.86065 13.566 10.0769 13.7319 10.1776C13.789 10.2122 13.8519 10.2287 13.9141 10.2287Z"
                    fill="#CFCDC9"
                  />
                  <path
                    d="M5.32331 3.2195C5.39193 3.28817 5.48193 3.32248 5.57189 3.32248C5.66184 3.32248 5.75184 3.28817 5.82047 3.2195L6.11643 2.92353L6.4124 3.2195C6.48103 3.28812 6.57103 3.32248 6.66098 3.32248C6.75093 3.32248 6.84093 3.28817 6.90956 3.2195C7.04686 3.0822 7.04686 2.85959 6.90956 2.72234L6.61359 2.42637L6.90956 2.1304C7.04686 1.99311 7.04686 1.7705 6.90956 1.63325C6.77226 1.49595 6.54965 1.49595 6.4124 1.63325L6.11643 1.92921L5.82047 1.63325C5.68317 1.49595 5.46056 1.49595 5.32331 1.63325C5.18601 1.77054 5.18601 1.99315 5.32331 2.1304L5.61928 2.42637L5.32331 2.72234C5.18601 2.85959 5.18601 3.0822 5.32331 3.2195Z"
                    fill="#CFCDC9"
                  />
                  <path
                    d="M11.201 1.54925C11.2696 1.61793 11.3596 1.65224 11.4495 1.65224C11.5395 1.65224 11.6295 1.61793 11.6981 1.54925L11.9241 1.32332L12.15 1.54925C12.2187 1.61788 12.3087 1.65224 12.3987 1.65224C12.4886 1.65224 12.5786 1.61793 12.6473 1.54925C12.7846 1.41196 12.7846 1.18935 12.6473 1.0521L12.4213 0.826113L12.6473 0.600129C12.7846 0.462832 12.7846 0.240223 12.6473 0.102973C12.5099 -0.0343242 12.2874 -0.0343242 12.1501 0.102973L11.9242 0.32891L11.6982 0.102973C11.5609 -0.0343242 11.3383 -0.0343242 11.201 0.102973C11.0637 0.24027 11.0637 0.462879 11.201 0.600129L11.427 0.826113L11.201 1.0521C11.0636 1.18935 11.0636 1.41196 11.201 1.54925Z"
                    fill="#CFCDC9"
                  />
                  <path
                    d="M5.44491 5.22662C5.44491 4.47461 4.8331 3.86279 4.08108 3.86279C3.32907 3.86279 2.71725 4.47461 2.71725 5.22662C2.71725 5.97864 3.32907 6.59045 4.08108 6.59045C4.8331 6.59045 5.44491 5.97864 5.44491 5.22662ZM4.08108 5.88732C3.71677 5.88732 3.42038 5.59093 3.42038 5.22662C3.42038 4.86231 3.71677 4.56592 4.08108 4.56592C4.4454 4.56592 4.74179 4.86231 4.74179 5.22662C4.74179 5.59093 4.4454 5.88732 4.08108 5.88732Z"
                    fill="#CFCDC9"
                  />
                  <path
                    d="M20.9538 1.48297L21.1798 1.25699C21.3171 1.11969 21.3171 0.897083 21.1798 0.759833C21.0425 0.622536 20.8199 0.622536 20.6826 0.759833L20.4567 0.985771L20.2307 0.759833C20.0934 0.622536 19.8708 0.622536 19.7335 0.759833C19.5962 0.89713 19.5962 1.11974 19.7335 1.25699L19.9595 1.48297L19.7335 1.70896C19.5962 1.84625 19.5962 2.06886 19.7335 2.20611C19.8022 2.27474 19.8922 2.3091 19.9822 2.3091C20.0721 2.3091 20.1621 2.27479 20.2308 2.20611L20.4567 1.98018L20.6827 2.20611C20.7513 2.27474 20.8413 2.3091 20.9313 2.3091C21.0212 2.3091 21.1112 2.27479 21.1799 2.20611C21.3172 2.06882 21.3172 1.84621 21.1799 1.70896L20.9538 1.48297Z"
                    fill="#CFCDC9"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_33_9692">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <p className="text-primary-neutral-300 font-inter text-xs font-semibold">
                No Entries
              </p>
              <div className="flex flex-row items-center space-x-2 text-primary-red-medium font-lato text-xs font-bold leading-5 underline underline-offset-2">
                <p>Clock In Now</p>
                <ChevronRightIcon className="w-5 h-5" />
              </div>
            </>
          ) : (
            <JournalCard journals />
          )}
        </div>
      </div>
    </div>
  );
}

export default TimeSheet;
