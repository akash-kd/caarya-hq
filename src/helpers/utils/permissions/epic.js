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

export const canCreateEpic = () => {
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

export const canUpdateEpic = (epic) => {
  try {
    const { creator, members } = epic;
    const { id, tags } = getAdmin();

    if (epic?.project?.type == PROJECT_TYPE_COMPANY_GOALS) {
      if (tags?.includes(ALL_ACCESS)) return true;
      else return false;
    }

    if (
      tags?.includes(ALL_ACCESS) ||
      (tags?.includes(PMO) && epic?.project?.type == PROJECT_TYPE_WORK_STUDY) ||
      (tags?.includes(VMO) &&
        epic?.project?.type == PROJECT_TYPE_INITIATIVES) ||
      (tags?.includes(CPO) &&
        epic?.project?.type == PROJECT_TYPE_CAARYA_INTERNAL)
    ) {
      return true;
    } else if (tags?.includes(PROJECT_OWNER)) {
      return JSON.stringify(epic?.project?.owner).includes(id);
    } else if (tags?.includes(PROJECT_MANAGER)) {
      let man = epic?.project?.members
        ?.filter((m) => m?.userProjects?.type == "manager")
        ?.map((m) => m?.id);
      return JSON.stringify(man).includes(id);
    } else if (JSON.stringify(members).includes(id)) return true;
    else {
      return JSON.stringify(creator).includes(id);
    }
  } catch (err) {
    console.log("Error", err);
    return false;
  }
};

export const canDeleteEpic = (epic) => {
  try {
    const { creator } = epic;
    const { id, tags } = getAdmin();
    if (epic?.project?.type == PROJECT_TYPE_COMPANY_GOALS) {
      if (tags?.includes(ALL_ACCESS)) return true;
      else return false;
    }

    if (
      tags?.includes(ALL_ACCESS) ||
      (tags?.includes(PMO) && epic?.project?.type == PROJECT_TYPE_WORK_STUDY) ||
      (tags?.includes(VMO) &&
        epic?.project?.type == PROJECT_TYPE_INITIATIVES) ||
      (tags?.includes(CPO) &&
        epic?.project?.type == PROJECT_TYPE_CAARYA_INTERNAL)
    ) {
      return true;
    } else if (tags?.includes(PROJECT_OWNER)) {
      return JSON.stringify(epic?.project?.owner).includes(id);
    } else if (tags?.includes(PROJECT_MANAGER)) {
      let man = epic?.project?.members
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
