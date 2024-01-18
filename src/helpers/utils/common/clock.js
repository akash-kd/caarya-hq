import moment from "moment";

export const getTimings = (arr) => {
  let start = moment(arr[0], "HH:mm:ss").format("LTS");
  let end = arr?.length > 1 ? moment(arr[1], "HH:mm:ss").format("LTS") : "-";
  let diff = "";

  if (arr?.length == 2) {
    const time1 = arr[0];
    const time2 = arr[1];

    const format = "HH:mm:ss";

    const diffInMilliseconds = moment(time2, format).diff(
      moment(time1, format)
    );
    const diffInHours = moment.duration(diffInMilliseconds).asHours();
    if (parseInt(diffInHours) > 0) {
      diff = diffInHours.toFixed(2) + " hrs";
    } else {
      const diffInMin = moment.duration(diffInMilliseconds).asMinutes();
      if (parseInt(diffInMin) > 0) {
        diff = diffInMin.toFixed(2) + " mins";
      } else {
        const diffInSec = moment.duration(diffInMilliseconds).asSeconds();
        if (parseInt(diffInSec) > 0) {
          diff = diffInSec.toFixed(2) + " secs";
        }
      }
    }
  } else {
    diff = "-";
  }
  return { start, end, diff };
};

export const getTotalTime = (sessions) => {
  let timeSecs = 0;
  sessions?.map((item) => {
    if (item?.clockOut) {
      let timeDiff = moment
        .duration(moment(item?.clockOut).diff(moment(item?.clockIn)))
        .asSeconds();

      timeSecs = timeSecs + timeDiff;
    }
  });

  let hrs = 0,
    mins = 0,
    secs = 0;

  hrs = Math.floor(timeSecs / 3600);
  timeSecs = timeSecs % 3600;
  mins = Math.floor(timeSecs / 60);
  secs = Math.floor(timeSecs % 60);

  return (
    hrs.toString().padStart(2, "0") +
    ":" +
    mins.toString().padStart(2, "0") +
    ":" +
    secs.toString().padStart(2, "0")
  );
};
