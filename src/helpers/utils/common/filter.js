import moment from "moment";

const filterByDate = (list, field, time) => {
  let temp = [];
  switch (time) {
    case "today":
      temp = list?.filter((i) => moment(i[field]).unix() <= moment().unix());
      break;
    case "week":
      temp = list?.filter(
        (i) =>
          moment(i[field]).unix() <= moment().add(7, "days").unix() &&
          moment(i[field]).unix() > moment().unix()
      );
      break;
    case "later":
      temp = list?.filter(
        (i) => moment(i[field]).unix() > moment().add(7, "days").unix()
      );
      break;
    default:
      temp = list;
  }

  return temp;
};

const sortByDate = (list, field) => {
  let temp = list.sort(
    (objA, objB) => moment(objA[field]) - moment(objB[field])
  );
  return temp;
};

export { filterByDate, sortByDate };
