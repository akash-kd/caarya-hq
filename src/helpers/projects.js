export const PROJECT_TYPE_PERSONAL = "Personal";
export const PROJECT_TYPE_WORK_STUDY = "WorkStudy";
export const PROJECT_TYPE_CAARYA_INTERNAL = "CaaryaInternal";
export const PROJECT_TYPE_INITIATIVES = "Initiatives";
export const PROJECT_TYPE_COMPANY_GOALS = "CompanyGoals";
export const PROJECT_TYPE_COMMUNITY_GOALS = "CommunityGoals";
export const PROJECT_TYPE_DEPARTMENTAL_DESKS = "DepartmentalDecks";
export const PROJECT_TYPE_FWS = "FWS";
export const PROJECT_TYPE_PROCESSES = "Processes";
export const PROJECT_TYPE_MARKETING = "Marketing";
export const PROJECT_TYPE_SALES = "Sales";

export const ProjectTypes = [
  {
    value: PROJECT_TYPE_WORK_STUDY,
    label: "Products",
    image: "/assets/caaryaLogos/cws_logo.svg",
    passRequired: "pmo",
  },
  {
    value: PROJECT_TYPE_CAARYA_INTERNAL,
    label: "Tools",
    image: "/assets/caaryaLogos/caarya_logo.svg",
    passRequired: "cpo",
  },
  {
    value: PROJECT_TYPE_INITIATIVES,
    label: "Initiatives Projects",
    image: "/assets/caaryaLogos/symmetry_logo.svg",
    passRequired: "vmo",
  },

  {
    value: PROJECT_TYPE_PROCESSES,
    label: "Processes",
    shortLabel: "Processes",
    image: "/assets/images/caaryaLogos/symmetry_logo.svg",
    passRequired: null,
    order: 5,
  },
  {
    value: PROJECT_TYPE_MARKETING,
    label: "Marketing",
    shortLabel: "Marketing",
    image: "/assets/images/caaryaLogos/symmetry_logo.svg",
    passRequired: null,
    order: 6,
  },
  {
    value: PROJECT_TYPE_SALES,
    label: "Sales",
    shortLabel: "Sales",
    image: "/assets/images/caaryaLogos/symmetry_logo.svg",
    passRequired: null,
    order: 7,
  },
  {
    value: PROJECT_TYPE_PERSONAL,
    label: "Personal Projects",
    icon: "HeartIcon",
  },
];

export const PROJECT_CATEGORY_KANBAN = "Kanban";
export const PROJECT_CATEGORY_AGILE_SCRUM = "AgileScrum";

export const ProjectCategories = [
  { value: PROJECT_CATEGORY_KANBAN, label: "Kanban" },
  { value: PROJECT_CATEGORY_AGILE_SCRUM, label: "Agile Scrum" },
];

export const getProjectName = (project) => {
  let title = project?.title;
  if (project?.title?.toLowerCase().includes("icebox")) {
    if (project?.creator) title = project?.creator?.first_name + "'s Icebox";
  }

  return title;
};
