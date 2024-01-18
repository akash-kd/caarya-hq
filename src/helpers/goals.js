const TableHeadColumns = [
  { label: "Status", field: "status" },
  { label: "Title", field: "title" },
  { label: "Time", field: "due_date" },
  { label: "Creator", field: "creator" },
  { label: "Owners", field: "owners" },
  { label: "Project", field: "project" },
  { label: "Tasks", field: "tasks" },
  { label: "Date Of Creation", field: "createdAt" },
];
export const GoalCategory = [
  { label: "Innovations", value: "Innovations" },
  { label: "Operations ", value: "Operations" },
  { label: "Finance", value: "Finance" },
  { label: "Outreach", value: "Outreach" },
];

export const GoalStatus = [
  {
    value: "NotStarted",
    label: "Not Started",
    color: "#C63434",
    lightColor: "#FED6D2",
    message: "Get Started",
    mssgColor: "#C63434",
  },
  {
    value: "InProgress",
    label: "In Progress",
    color: "#BA7507",
    lightColor: "#FDEECD",
    message: "Send For Review",
    mssgColor: "#CE5511",
  },
  {
    value: "InReview",
    label: "In Review",
    color: "#CE5511",
    lightColor: "#FCDCCC",
    message: "Mark Completed",
    mssgColor: "#008B46",
  },
  {
    value: "Completed",
    label: "Completed",
    color: "#008B46",
    lightColor: "#D8F3D7",
    message: "",
    mssgColor: "#008B46",
  },
];

export const TshirtValues = [
  {
    value: 1,
    color: "#4CA6E5",
  },
  {
    value: 2,
    color: "#33A329",
  },
  {
    value: 4,
    color: "#FFBC00",
  },
  {
    value: 8,
    color: "#FF8800",
  },
  {
    value: 16,
    color: "#FB6F60",
  },
];
export const PriorityValues = [
  {
    value: 1,
    color: "#E72113",
  },
  {
    value: 2,
    color: "#FF8800",
  },
  {
    value: 3,
    color: "#F7DE3B",
  },
  {
    value: 4,
    color: "#6775F5",
  },
  {
    value: 5,
    color: "#178229",
  },
];

export const GOAL_RANK_PRIORITY = 1;

export { TableHeadColumns };
