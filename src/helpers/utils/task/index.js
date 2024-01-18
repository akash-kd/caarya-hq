import moment from "moment";

export const getTypeDatePeriod = (type) => {
  // const start = new Date();
  // start.setMilliseconds(
  //   start.getMilliseconds() - (start.getMilliseconds() % (60 * 60 * 1000))
  // );
  // const end = new Date(start);

  let start = moment().format("YYYY-MM-DD");
  let end = moment().format("YYYY-MM-DD");

  switch (type) {
    case "today":
      start = moment().add(1, "days").format("YYYY-MM-DD");
      end = moment().add(2, "days").format("YYYY-MM-DD");
      return { end_time: end };
    case "week":
      start = moment().add(1, "days").format("YYYY-MM-DD");
      end = moment().add(7, "days").format("YYYY-MM-DD");
      return {
        start_time: start,
        end_time: end,
      };
    default:
  }
  start = moment().add(7, "days").format("YYYY-MM-DD");
  return { start_time: start };
};

export const getProjectName = (task, my) => {
  let project = task?.project;
  let title = project?.title;

  if (project?.title?.toLowerCase().includes("icebox")) {
    if (project?.creator) title = project?.creator?.first_name + "'s Icebox";

    if (my) {
      // let c = tasks?.length > 0 ? tasks[0] : {};
      // title = c?.creator?.first_name + "'s Icebox";
    }
  }

  return title;
};
