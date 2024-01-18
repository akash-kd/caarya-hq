import {
  AcademicCapIcon,
  BadgeCheckIcon,
  ChartSquareBarIcon,
  ExclamationCircleIcon,
  LightBulbIcon,
  LightningBoltIcon,
  PuzzleIcon,
} from "@heroicons/react/outline";

export const TASK_TYPE_EPICS = "Epics";
export const TASK_TYPE_PERSONAL = "Personal";
export const TASK_TYPE_STORIES = "Stories";
export const TASK_TYPE_TASKS = "Tasks";
export const TASK_TYPE_BUGS = "Bugs";
export const TASK_TYPE_FEATURE_RECOMMENDATION = "FeatureRecommendation";
export const TASK_TYPE_QUESTS = "Quests";
export const TASK_STATUS_NOTSTARTED = "NotStarted";
export const TASK_STATUS_INPROGRESS = "InProgress";
export const TASK_STATUS_INREVIEW = "InReview";
export const TASK_STATUS_COMPLETED = "Completed";

export const TaskStatus = [
  {
    value: "NotStarted",
    label: "Not Started",
    color: "#C63434",
    lightColor: "#FED6D2",
    message: "Get Started",
    mssgColor: "#C63434",
    nextStatus: "InProgress",
  },
  {
    value: "InProgress",
    label: "In Progress",
    color: "#BA7507",
    lightColor: "#FDEECD",
    message: "Send For Review",
    mssgColor: "#CE5511",
    nextStatus: "InReview",
  },
  {
    value: "InReview",
    label: "In Review",
    color: "#CE5511",
    lightColor: "#FCDCCC",
    message: "Mark Completed",
    mssgColor: "#008B46",
    nextStatus: "Completed",
  },
  {
    value: "Completed",
    label: "Completed",
    color: "#008B46",
    lightColor: "#D8F3D7",
    message: "",
    mssgColor: "#008B46",
    nextStatus: "Completed",
  },
];

export const TaskTableHeadColumns = [
  { label: "Title", field: "title" },
  { label: "Status", field: "status" },
  { label: "Date", field: "date" },
  { label: "Goal", field: "goal" },
  { label: "Project", field: "goal" },
  { label: "Creator", field: "creator" },
  { label: "Category", field: "category" },
  { label: "Students", field: "students" },
];

export const TShirtSizes = ["XS", "S", "M", "L", "XL"];
export const TShirtSizesValues = [
  { size: "XS", value: "< 2 hours" },
  { size: "S", value: "2-4 hours" },
  { size: "M", value: "5-6 hours" },
  { size: "L", value: "7-8 hours" },
  { size: "XL", value: "9-10 hours" },
];

export const StoryPointEstimates = ["XS", "S", "M", "L", "XL"];

export const TaskCategories = [
  // { value: TASK_TYPE_EPICS, icon: LightBulbIcon },
  { value: TASK_TYPE_PERSONAL, icon: AcademicCapIcon },
  // { value: TASK_TYPE_STORIES, icon: LightningBoltIcon },
  { value: TASK_TYPE_TASKS, icon: BadgeCheckIcon },
  { value: TASK_TYPE_BUGS, icon: ExclamationCircleIcon },
  // { value: TASK_TYPE_FEATURE_RECOMMENDATION, icon: PuzzleIcon },
  // { value: TASK_TYPE_QUESTS, icon: ChartSquareBarIcon },
];
