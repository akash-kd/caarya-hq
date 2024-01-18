import {
  ALL_ACCESS,
  PMO,
  CPO,
  VMO,
  PROJECT_MANAGER,
  PROJECT_OWNER,
} from "helpers/constants/accesspass/index";
import {
  PROJECT_TYPE_COMPANY_GOALS,
  PROJECT_TYPE_WORK_STUDY,
  PROJECT_TYPE_CAARYA_INTERNAL,
  PROJECT_TYPE_INITIATIVES,
} from "helpers/projects";
import { getAdmin } from "../common/localStorage";

export const canCreateTask = () => {
  try {
    return false;
  } catch (err) {
    console.log("Error", err);
    return false;
  }
};

export const canUpdateTask = (task) => {
  try {
    const { creator, owner, students } = task;
    const { id, tags } = getAdmin();

    if (task?.project?.type == PROJECT_TYPE_COMPANY_GOALS) {
      if (tags?.includes(ALL_ACCESS)) return true;
      else return false;
    }

    if (
      tags?.includes(ALL_ACCESS) ||
      (tags?.includes(PMO) && task?.project?.type == PROJECT_TYPE_WORK_STUDY) ||
      (tags?.includes(VMO) &&
        task?.project?.type == PROJECT_TYPE_INITIATIVES) ||
      (tags?.includes(CPO) &&
        task?.project?.type == PROJECT_TYPE_CAARYA_INTERNAL) ||
      tags?.includes(PROJECT_OWNER) ||
      tags?.includes(PROJECT_MANAGER)
    ) {
      return true;
    } else if (JSON.stringify(owner).includes(id)) return true;
    else if (JSON.stringify(students).includes(id)) return true;
    else {
      return JSON.stringify(creator).includes(id);
    }
  } catch (err) {
    console.log("Error", err);
    return false;
  }
};

export const canDeleteTask = (task) => {
  try {
    const { creator } = task;
    const { id, tags } = getAdmin();
    if (task?.project?.type == PROJECT_TYPE_COMPANY_GOALS) {
      if (tags?.includes(ALL_ACCESS)) return true;
      else return false;
    }

    if (
      tags?.includes(ALL_ACCESS) ||
      (tags?.includes(PMO) && task?.project?.type == PROJECT_TYPE_WORK_STUDY) ||
      (tags?.includes(VMO) &&
        task?.project?.type == PROJECT_TYPE_INITIATIVES) ||
      (tags?.includes(CPO) &&
        task?.project?.type == PROJECT_TYPE_CAARYA_INTERNAL) ||
      tags?.includes(PROJECT_OWNER) ||
      tags?.includes(PROJECT_MANAGER)
    ) {
      return true;
    } else {
      return JSON.stringify(creator).includes(id);
    }
  } catch (err) {
    console.log("Error", err);
    return false;
  }
};
