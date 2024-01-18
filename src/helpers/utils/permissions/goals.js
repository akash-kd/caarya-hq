import {
  ALL_ACCESS,
  PMO,
  CPO,
  VMO,
  PROJECT_MANAGER,
  CAARYA_DIRECTOR,
  PROJECT_OWNER,
} from "helpers/constants/accesspass/index";
import {
  PROJECT_TYPE_COMPANY_GOALS,
  PROJECT_TYPE_WORK_STUDY,
  PROJECT_TYPE_CAARYA_INTERNAL,
  PROJECT_TYPE_INITIATIVES,
} from "helpers/projects";
import { getAdmin } from "../common/localStorage";

export const canCreateGoal = () => {
  try {
    const { id, tags } = getAdmin();
    if (
      tags?.includes(ALL_ACCESS) ||
      tags?.includes(CAARYA_DIRECTOR) ||
      tags?.includes(PMO) ||
      tags?.includes(CPO) ||
      tags?.includes(VMO) ||
      tags?.includes(PROJECT_OWNER) ||
      tags?.includes(PROJECT_MANAGER)
    ) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log("Error", err);
    return false;
  }
};

export const canUpdateGoal = (goal, project) => {
  try {
    const { creator, owners } = goal;
    const { id, tags } = getAdmin();

    if (goal?.project?.type == PROJECT_TYPE_COMPANY_GOALS) {
      if (tags?.includes(ALL_ACCESS)) return true;
      else return false;
    }

    if (
      tags?.includes(ALL_ACCESS) ||
      (tags?.includes(PMO) && goal?.project?.type == PROJECT_TYPE_WORK_STUDY) ||
      (tags?.includes(VMO) &&
        goal?.project?.type == PROJECT_TYPE_INITIATIVES) ||
      (tags?.includes(CPO) &&
        goal?.project?.type == PROJECT_TYPE_CAARYA_INTERNAL)
    ) {
      return true;
    } else if (tags?.includes(PROJECT_OWNER)) {
      return JSON.stringify(goal?.project?.owner).includes(id);
    } else if (tags?.includes(PROJECT_MANAGER)) {
      let man = goal?.project?.members
        ?.filter((m) => m?.userProjects?.type == "manager")
        ?.map((m) => m?.id);
      return JSON.stringify(man).includes(id);
    } else if (JSON.stringify(owners).includes(id)) return true;
    else {
      return JSON.stringify(creator).includes(id);
    }
  } catch (err) {
    console.log("Error", err);
    return false;
  }
};

export const canDeleteGoal = (goal) => {
  try {
    const { creator } = goal;
    const { id, tags } = getAdmin();
    if (goal?.project?.type == PROJECT_TYPE_COMPANY_GOALS) {
      if (tags?.includes(ALL_ACCESS)) return true;
      else return false;
    }

    if (
      tags?.includes(ALL_ACCESS) ||
      (tags?.includes(PMO) && goal?.project?.type == PROJECT_TYPE_WORK_STUDY) ||
      (tags?.includes(VMO) &&
        goal?.project?.type == PROJECT_TYPE_INITIATIVES) ||
      (tags?.includes(CPO) &&
        goal?.project?.type == PROJECT_TYPE_CAARYA_INTERNAL)
    ) {
      return true;
    } else if (tags?.includes(PROJECT_OWNER)) {
      return JSON.stringify(goal?.project?.owner).includes(id);
    } else if (tags?.includes(PROJECT_MANAGER)) {
      let man = goal?.project?.members
        ?.filter((m) => m?.userProjects?.type == "manager")
        ?.map((m) => m?.id);
      return JSON.stringify(man).includes(id);
    } else {
      return JSON.stringify(creator).includes(id);
    }
  } catch (err) {
    console.log("Error", err);
    return false;
  }
};
