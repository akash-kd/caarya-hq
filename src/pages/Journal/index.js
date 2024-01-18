import BreadCrumb from "components/Comman/BreadCrumb";
import EmptyState from "components/Comman/EmptyState";
import { findMyJournals } from "config/APIs/journals";
import moment from "moment";
import React, { useEffect, useState } from "react";

function Journal() {
  const [data, setData] = useState([]);
  const [dates, setDates] = useState([]);

  const getAllJournals = async () => {
    try {
      const response = await findMyJournals();

      if (response.status === 200) {
        let data = response.data.data?.response;
        let minDate = moment();
        let maxDate = moment().add(2, "days");
        data?.map((item) => {
          if (
            minDate.format("YYYY-MM-DD") >
            moment(item?.session?.clockIn).format("YYYY-MM-DD")
          ) {
            minDate = moment(item?.session?.clockIn);
          }
        });
        let array = [];

        while (minDate.isSameOrBefore(maxDate)) {
          array.push(minDate.format("YYYY-MM-DD"));
          minDate.add(1, "days");
        }

        setDates(array.reverse());
        setData(data);
      }
    } catch (err) {
      console.log("task fetching error", err);
    }
  };

  useEffect(() => {
    getAllJournals();
  }, []);

  const getDayJournal = (date) => {
    let temp = [];

    temp = data?.filter(
      (i) =>
        moment(date).format("YYYY-MM-DD") ==
        moment(i?.session?.clockIn).format("YYYY-MM-DD")
    );

    return temp;
  };

  return (
    <div>
      <BreadCrumb page1="Journal" />
      {data?.length > 0 ? (
        <div className="flex flex-col space-y-10 p-4">
          <div className="flex flex-col space-y-6">
            {dates?.map((item) => {
              return (
                <div className="flex flex-row items-stretch space-x-1">
                  <div className="bg-primary-yellow-30 py-2 px-1 rounded flex flex-row items-center justify-center text-primary-yellow-900 font-lato text-2xs font-semibold">
                    {moment(item).format("DD")}
                  </div>
                  <div className="px-1 py-3 space-y-6 w-full">
                    {getDayJournal(item)?.length > 0 ? (
                      <>
                        {getDayJournal(item)?.map((i) => {
                          return (
                            <div
                              style={{
                                boxShadow:
                                  "0px 4px 6px -1px rgba(0, 0, 0, 0.10), 0px 2px 4px -2px rgba(0, 0, 0, 0.10), 0px 0px 10px 0px rgba(0, 0, 0, 0.05)",
                              }}
                              className="bg-white rounded-lg py-2 px-4 flex flex-row items-center space-x-2 justify-between w-full"
                            >
                              <div className="flex flex-col space-y-4 w-9/12">
                                <h1 className="text-primary-neutral-800 font-lato text-sm font-semibold">
                                  {i?.goal?.title || i?.title}
                                </h1>
                                <div className="px-6 flex flex-row items-center justify-between w-full">
                                  <div className="flex flex-col space-y-0.5">
                                    <h1 className="text-primary-neutral-500 font-lato text-2xs font-light">
                                      <span className="text-sm font-semibold">
                                        4
                                      </span>{" "}
                                      / 4
                                    </h1>
                                    <p className="text-primary-neutral-800 font-lato text-3xs font-light">
                                      Session no.
                                    </p>
                                  </div>
                                  <div className="flex flex-col space-y-0.5">
                                    <h1 className="text-primary-neutral-500 font-lato text-2xs font-light">
                                      <span className="text-sm font-semibold">
                                        40m
                                      </span>{" "}
                                    </h1>
                                    <p className="text-primary-neutral-800 font-lato text-3xs font-light">
                                      Session Time
                                    </p>
                                  </div>
                                </div>
                                <p className="text-primary-neutral-800 font-lato text-xs font-light">
                                  {i?.description}
                                </p>
                              </div>
                              {i?.mood && (
                                <div className="">
                                  <img
                                    src={`/assets/images/emojis/${i?.mood?.png}.png`}
                                    alt=""
                                    className="w-14 h-14"
                                  />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </>
                    ) : (
                      <div className="p-2 flex flex-col items-center space-y-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <g clip-path="url(#clip0_4044_98581)">
                            <path
                              d="M19.6035 8.14368C19.4093 8.14368 19.2519 8.30108 19.2519 8.49524V23.1375C19.2519 23.2254 19.1805 23.2968 19.0926 23.2968H5.35073C5.26289 23.2968 5.19141 23.2253 5.19141 23.1375V19.1978C5.19141 19.0036 5.034 18.8462 4.83984 18.8462C4.64569 18.8462 4.48828 19.0036 4.48828 19.1978V23.1375C4.48828 23.6131 4.87519 23.9999 5.35073 23.9999H19.0926C19.5682 23.9999 19.9551 23.613 19.9551 23.1375V8.49524C19.9551 8.30104 19.7977 8.14368 19.6035 8.14368Z"
                              fill="#CFCDC9"
                            />
                            <path
                              d="M19.0926 3.13889H16.5411C16.5526 3.05789 16.5589 2.9753 16.5589 2.89116C16.5589 1.92084 15.7695 1.13147 14.7992 1.13147C13.8289 1.13147 13.0395 1.92084 13.0395 2.89116C13.0395 2.97525 13.0459 3.05789 13.0573 3.13889H9.22237C9.1298 3.13959 9.03933 3.17639 8.9738 3.24188L4.59122 7.62445C4.52597 7.69003 4.48852 7.78055 4.48828 7.87303V17.4623C4.48828 17.6565 4.64569 17.8139 4.83984 17.8139C5.034 17.8139 5.19141 17.6565 5.19141 17.4623V8.2246H8.71148C9.18708 8.2246 9.57394 7.83769 9.57394 7.36214V3.84202H13.3197C13.6332 4.32811 14.179 4.65084 14.7992 4.65084C15.4193 4.65084 15.9652 4.32806 16.2787 3.84202H19.0926C19.1805 3.84202 19.2519 3.9135 19.2519 4.00134V6.7597C19.2519 6.95386 19.4093 7.11127 19.6035 7.11127C19.7977 7.11127 19.9551 6.95386 19.9551 6.7597V4.00134C19.9551 3.5258 19.5682 3.13889 19.0926 3.13889ZM8.71148 7.52147H5.68861L8.87086 4.33922V7.36214C8.87081 7.44999 8.79937 7.52147 8.71148 7.52147ZM14.7992 3.94772C14.2166 3.94772 13.7427 3.47377 13.7427 2.89116C13.7427 2.30855 14.2166 1.83459 14.7992 1.83459C15.3818 1.83459 15.8557 2.30855 15.8557 2.89116C15.8557 3.47377 15.3818 3.94772 14.7992 3.94772Z"
                              fill="#CFCDC9"
                            />
                            <path
                              d="M11.0594 16.7014C11.1845 16.8499 11.4063 16.8688 11.5547 16.7435C11.7126 16.6104 11.9367 16.5342 12.1702 16.5342H12.1735C12.4081 16.5349 12.6332 16.6126 12.7909 16.7472C12.8572 16.8038 12.9383 16.8314 13.019 16.8314C13.1183 16.8314 13.217 16.7895 13.2865 16.708C13.4126 16.5604 13.3951 16.3385 13.2474 16.2124C12.9608 15.9677 12.5801 15.8323 12.1756 15.8311C12.1737 15.8311 12.1719 15.8311 12.17 15.8311C11.7676 15.8311 11.3883 15.9641 11.1015 16.206C10.9531 16.3312 10.9342 16.553 11.0594 16.7014Z"
                              fill="#CFCDC9"
                            />
                            <path
                              d="M14.0977 15.2315C14.1051 15.2323 14.1127 15.2324 14.1202 15.2328C14.1246 15.233 14.129 15.2335 14.1334 15.2335H14.1354C14.3287 15.2335 14.4859 15.0774 14.4869 14.8839C14.4878 14.7133 14.367 14.5704 14.2059 14.5376C14.2048 14.5373 14.2035 14.5372 14.2023 14.537C14.1922 14.535 14.1819 14.5333 14.1715 14.5323C14.1673 14.5319 14.163 14.5319 14.1587 14.5316C14.1516 14.5311 14.1445 14.5304 14.1373 14.5304H14.1331C14.1324 14.5304 14.1318 14.5304 14.1311 14.5304C14.119 14.5304 14.1071 14.531 14.0953 14.5322C13.918 14.55 13.7812 14.6998 13.7812 14.882C13.7812 15.0622 13.9186 15.2105 14.0936 15.2309C14.095 15.231 14.0963 15.2314 14.0977 15.2315Z"
                              fill="#CFCDC9"
                            />
                            <path
                              d="M10.3066 14.5304C10.1124 14.5304 9.95703 14.6878 9.95703 14.882C9.95703 15.0761 10.1165 15.2335 10.3107 15.2335C10.5048 15.2335 10.6622 15.0761 10.6622 14.882C10.6622 14.6878 10.5048 14.5304 10.3107 14.5304H10.3066Z"
                              fill="#CFCDC9"
                            />
                            <path
                              d="M8.82683 12.5256C8.19538 13.3015 7.84766 14.2807 7.84766 15.2828C7.84766 17.694 9.80937 19.6557 12.2207 19.6557C14.632 19.6557 16.5936 17.694 16.5936 15.2828C16.5936 14.2805 16.2458 13.3011 15.6141 12.5252C14.9918 11.7606 14.1215 11.2235 13.1636 11.0128C12.9738 10.971 12.7864 11.0911 12.7446 11.2807C12.7029 11.4703 12.8229 11.6578 13.0125 11.6996C13.816 11.8763 14.5463 12.3271 15.0688 12.9691C15.5987 13.62 15.8905 14.4417 15.8905 15.2828C15.8905 17.3063 14.2442 18.9526 12.2207 18.9526C10.1971 18.9526 8.55078 17.3063 8.55078 15.2828C8.55078 14.4418 8.84248 13.6203 9.37217 12.9694C9.89455 12.3275 10.6246 11.8766 11.4279 11.6997C11.6175 11.658 11.7374 11.4704 11.6957 11.2808C11.6539 11.0912 11.4664 10.9714 11.2767 11.013C10.319 11.224 9.449 11.7611 8.82683 12.5256Z"
                              fill="#CFCDC9"
                            />
                            <path
                              d="M12.2188 9.72721C12.4124 9.72721 12.5697 9.57051 12.5703 9.37668L12.5737 8.23687C12.5743 8.04271 12.4174 7.88484 12.2232 7.88428C12.2228 7.88428 12.2225 7.88428 12.2221 7.88428C12.0285 7.88428 11.8712 8.04098 11.8706 8.23481L11.8672 9.37462C11.8666 9.56878 12.0235 9.72665 12.2177 9.72721H12.2188Z"
                              fill="#CFCDC9"
                            />
                            <path
                              d="M10.5184 10.213C10.5799 10.213 10.6422 10.1969 10.6987 10.163C10.8653 10.0632 10.9194 9.84733 10.8197 9.68074L10.2275 8.69201C10.1277 8.52541 9.9118 8.47122 9.74521 8.57102C9.57861 8.67077 9.52447 8.88668 9.62422 9.05327L10.2164 10.042C10.2823 10.152 10.3989 10.213 10.5184 10.213Z"
                              fill="#CFCDC9"
                            />
                            <path
                              d="M13.9138 10.2287C14.0326 10.2287 14.1485 10.1684 14.2147 10.0595L14.8128 9.07405C14.9136 8.90806 14.8607 8.69183 14.6947 8.59109C14.5287 8.4904 14.3125 8.54323 14.2117 8.70922L13.6136 9.69467C13.5128 9.86065 13.5657 10.0769 13.7317 10.1776C13.7887 10.2122 13.8517 10.2287 13.9138 10.2287Z"
                              fill="#CFCDC9"
                            />
                            <path
                              d="M5.32563 3.2195C5.39425 3.28817 5.48425 3.32248 5.57421 3.32248C5.66416 3.32248 5.75416 3.28817 5.82278 3.2195L6.11875 2.92353L6.41472 3.2195C6.48335 3.28812 6.57335 3.32248 6.6633 3.32248C6.75325 3.32248 6.84325 3.28817 6.91188 3.2195C7.04918 3.0822 7.04918 2.85959 6.91188 2.72234L6.61591 2.42637L6.91188 2.1304C7.04918 1.99311 7.04918 1.7705 6.91188 1.63325C6.77458 1.49595 6.55197 1.49595 6.41472 1.63325L6.11875 1.92921L5.82278 1.63325C5.68549 1.49595 5.46288 1.49595 5.32563 1.63325C5.18833 1.77054 5.18833 1.99315 5.32563 2.1304L5.6216 2.42637L5.32563 2.72234C5.18833 2.85959 5.18833 3.0822 5.32563 3.2195Z"
                              fill="#CFCDC9"
                            />
                            <path
                              d="M11.2007 1.54925C11.2693 1.61793 11.3593 1.65224 11.4492 1.65224C11.5392 1.65224 11.6292 1.61793 11.6978 1.54925L11.9238 1.32332L12.1497 1.54925C12.2184 1.61788 12.3084 1.65224 12.3984 1.65224C12.4883 1.65224 12.5783 1.61793 12.647 1.54925C12.7843 1.41196 12.7843 1.18935 12.647 1.0521L12.421 0.826113L12.647 0.600129C12.7843 0.462832 12.7843 0.240223 12.647 0.102973C12.5096 -0.0343242 12.2871 -0.0343242 12.1498 0.102973L11.9238 0.32891L11.6979 0.102973C11.5606 -0.0343242 11.338 -0.0343242 11.2007 0.102973C11.0634 0.24027 11.0634 0.462879 11.2007 0.600129L11.4267 0.826113L11.2007 1.0521C11.0633 1.18935 11.0633 1.41196 11.2007 1.54925Z"
                              fill="#CFCDC9"
                            />
                            <path
                              d="M5.44641 5.22662C5.44641 4.47461 4.83459 3.86279 4.08258 3.86279C3.33056 3.86279 2.71875 4.47461 2.71875 5.22662C2.71875 5.97864 3.33056 6.59045 4.08258 6.59045C4.83459 6.59045 5.44641 5.97864 5.44641 5.22662ZM4.08258 5.88732C3.71827 5.88732 3.42188 5.59093 3.42188 5.22662C3.42188 4.86231 3.71827 4.56592 4.08258 4.56592C4.44689 4.56592 4.74328 4.86231 4.74328 5.22662C4.74328 5.59093 4.44689 5.88732 4.08258 5.88732Z"
                              fill="#CFCDC9"
                            />
                            <path
                              d="M20.9561 1.48297L21.1821 1.25699C21.3194 1.11969 21.3194 0.897083 21.1821 0.759833C21.0447 0.622536 20.8222 0.622536 20.6849 0.759833L20.4589 0.985771L20.233 0.759833C20.0956 0.622536 19.8731 0.622536 19.7358 0.759833C19.5985 0.89713 19.5985 1.11974 19.7358 1.25699L19.9618 1.48297L19.7358 1.70896C19.5985 1.84625 19.5985 2.06886 19.7358 2.20611C19.8045 2.27474 19.8945 2.3091 19.9844 2.3091C20.0744 2.3091 20.1644 2.27479 20.233 2.20611L20.459 1.98018L20.6849 2.20611C20.7536 2.27474 20.8436 2.3091 20.9335 2.3091C21.0235 2.3091 21.1135 2.27479 21.1822 2.20611C21.3195 2.06882 21.3195 1.84621 21.1822 1.70896L20.9561 1.48297Z"
                              fill="#CFCDC9"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_4044_98581">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        <p className="text-primary-neutral-300 text-xs font-lato font-semibold">
                          No Entries
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {/* {data?.map((item) => {
            return (
              <div className="relative flex flex-col items-start space-y-1 border-b border-primary-gray-200 p-2">
                <p className="font-karla text-sm font-medium text-primary-gray-800 w-10/12">
                  {item?.title}
                </p>
                <p className="font-karla text-xs font-light text-primary-gray-800">
                  {item?.description}
                </p>
                <p className="font-karla text-xs font-light text-primary-gray-800">
                  Goal: <u>{item?.goal?.title}</u>
                </p>
                {item?.mood && (
                  <div className="absolute right-1">
                    <img
                      src={`/assets/images/emojis/${item?.mood?.png}.png`}
                      alt=""
                      className="w-10 h-10"
                    />
                  </div>
                )}
              </div>
            );
          })} */}
        </div>
      ) : (
        <div className="px-8 h-80vh flex flex-col items-center justify-center space-y-4">
          <img src="/assets/images/empty/journal.svg" className="w-24 h-24" />
          <h1 className="text-primary-gray-300 font-karla text-xl font-light">
            No Journal entry found!
          </h1>
          {/* <p className="text-center text-primary-gray-300 font-lato text-xs font-light">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatu
          </p> */}
        </div>
      )}
    </div>
  );
}

export default Journal;
