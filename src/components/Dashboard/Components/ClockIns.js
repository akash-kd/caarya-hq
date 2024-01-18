import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function ClockIns({ totalTime, percentage }) {
  return (
    <div className="p-4 rounded-xl shadow bg-white flex flex-col items-start space-y-8 w-full">
      <p className="text-primary-neutral-800 font-lato text-base font-semibold">
        Clock in’s
      </p>
      <div className="flex flex-col items-center w-full">
        <CircularProgressbarWithChildren
          value={percentage || 0}
          text={``}
          circleRatio={0.5}
          styles={buildStyles({
            rotation: 1 / 2 + 1 / 4,
            strokeLinecap: "butt",
            pathColor: "#FFBC00",
            trailColor: "#E7E6E5",
          })}
        >
          <div className="flex flex-col items-center -mt-2 text-primary-neutral-800 font-inter text-center text-xs font-light">
            <p>{percentage}%</p>
            <p className="text-3xs">completed</p>
          </div>
        </CircularProgressbarWithChildren>
        <div className="-mt-6 flex flex-row items-center space-x-2 text-primary-neutral-800 font-inter font-semibold text-sm">
          <p>{totalTime}</p>
          <p className="text-primary-neutral-400 font-light">/ 40h</p>
        </div>
      </div>
    </div>
  );
}

export default ClockIns;
