import { ArrowRight } from "@phosphor-icons/react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ClockInHistory from "./Components/ClockInHistory";
import Sessions from "./Components/Sessions";
import ClockIns from "./Components/ClockIns";
import { dashboardFocus } from "helpers/constants/dashboard";

function MobileDashboard({ data }) {
  const history = useHistory();

  return (
    <div>
      <div className="space-y-10 pt-2.5">
        <div className="flex flex-col items-start space-y-2">
          <p className="text-primary-neutral-400 font-lato text-xs font-semibold">
            This Week
          </p>
          <div className="grid grid-cols-2 gap-6 w-full">
            <Sessions list={data?.sessionsCount} />
            <ClockIns {...data?.sessionTime} />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-4 flex flex-col space-y-8">
          <div className="w-full flex flex-row items-center justify-between">
            <p className="text-primary-neutral-800 font-lato text-base font-semibold">
              Your Day
            </p>
            <div
              onClick={() => {
                history.push("/focusZone");
              }}
              className="text-xs text-secondary-indigo-700 font-lato font-semibold underline underline-offset-2 flex flex-row items-center space-x-1"
            >
              <p>Plan Your Day</p>
              <ArrowRight size={12} />
            </div>
          </div>
          <div className="flex flex-col items-stretch space-y-4">
            {dashboardFocus?.map((item) => {
              return (
                <div
                  style={{ borderColor: item?.borderColor }}
                  className="rounded-2xl border bg-white flex flex-row items-stretch space-x-1 w-full"
                >
                  <div
                    style={{ background: item?.bg }}
                    className="flex flex-col items-center justify-center rounded-l-2xl px-2"
                  >
                    {item?.svg}
                  </div>
                  <div className="rounded-r-2xl py-3 px-2 flex flex-row items-center justify-between w-full">
                    <div className="flex flex-col items-start">
                      <p className="text-primary-neutral-800 font-lato text-sm font-semibold">
                        {item?.name}
                      </p>
                      <p className="text-primary-neutral-500 font-lato text-2xs font-light">
                        {item?.time}
                      </p>
                    </div>
                    <div className="flex flex-col items-end px-4">
                      <p className="text-primary-neutral-800 font-lato text-[32px] leading-[48px] font-semibold">
                        {data?.goalsFocusIn?.find(
                          (i) => i?.focusIn == item?.name
                        )?.goalCount || 0}
                      </p>
                      <p className="text-primary-neutral-800 font-lato text-xs font-light">
                        Goals in focus
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4 flex flex-col space-y-8">
          <div className="w-full flex flex-row items-center justify-between">
            <p className="text-primary-neutral-800 font-lato text-base font-semibold">
              Your Goals
            </p>
            <div
              onClick={() => {
                history.push("/goalHub");
              }}
              className="text-xs text-secondary-indigo-700 font-lato font-semibold underline underline-offset-2 flex flex-row items-center space-x-1"
            >
              <p>View All</p>
              <ArrowRight size={12} />
            </div>
          </div>
          <div className="w-full grid grid-cols-3 gap-4">
            {[
              {
                borderColor: "#FFE99A",
                color: "#FFBC00",
                status: "In Progress",
                value: "InProgress",
              },
              {
                borderColor: "#C2F2BD",
                color: "#2BB656",
                status: "Completed",
                value: "Completed",
              },
              {
                borderColor: "#FEB8B1",
                color: "#ED4C41",
                status: "Not Started",
                value: "NotStarted",
              },
            ]?.map((item) => {
              return (
                <div
                  style={{
                    borderColor: item?.borderColor,
                    color: item?.color,
                  }}
                  className="border rounded-lg py-4 px-2 flex flex-col items-center space-y-1"
                >
                  <p className="text-center text-[32px] leading-8 font-semibold font-lato">
                    {data?.goalsStatus?.find((i) => i?.status == item?.value)
                      ?.goalCount || 0}
                  </p>
                  <p className="text-center text-[8px] text-primary-neutral-800 font-light font-lato">
                    {item?.status}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <ClockInHistory list={data?.sessionsCount} />
      </div>
    </div>
  );
}

export default MobileDashboard;
