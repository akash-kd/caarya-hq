export const getDayDiff = (date) => {
  try {
    const time = new Date(date);
    const today = new Date();
    today.setMilliseconds(
      Math.floor(today.getMilliseconds() / (60 * 60 * 1000)) * (60 * 60 * 1000)
    );
    let diff = (time.getTime() - today.getTime()) / (60 * 60 * 24 * 1000);
    const isDue = diff < 0;
    diff = Math.round(Math.abs(diff));
    if (diff === 0) return "Today";
    return `${diff} ${diff === 1 ? "day" : "days"} ${isDue ? "due" : "left"}`;
  } catch (err) {
    console.log("Error", err);
    return "Today";
  }
};
