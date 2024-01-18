import moment from "moment";

export const addOrRemove = (list, item) => {
  let tempSelected = list || [];

  if (tempSelected.find((e) => e?.id == item?.id)) {
    tempSelected = tempSelected?.filter((e) => e?.id !== item?.id);
  } else {
    tempSelected.push(item);
  }

  return tempSelected;
};

export const getUniqueArrayOfObj = (list) => {
  let temp = [...new Map(list.map((item) => [item?.id, item])).values()];
  return temp || [];
};

export const getSortedByDate = (list, field) => {
  let temp = list.sort(
    (a, b) => moment(a[field]).unix() - moment(b[field]).unix()
  );
  return temp || [];
};
