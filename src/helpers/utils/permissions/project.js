import {
  ALL_ACCESS,
  PMO,
  CPO,
  VMO,
  PROJECT_MANAGER,
  PROJECT_MEMBER,
  PROJECT_OWNER,
  CAARYA_DIRECTOR,
} from "helpers/constants/accesspass/index";
import { getAdmin } from "../common/localStorage";

export const canCreateProject = () => {
  try {
    const { id, tags } = getAdmin();
    if (
      tags?.includes(ALL_ACCESS) ||
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

export const canViewInProject = (project) => {
  try {
    const { creator, owner, members } = project;
    const { id, tags } = getAdmin();

    if (
      tags?.includes(ALL_ACCESS) ||
      tags?.includes(CAARYA_DIRECTOR) ||
      tags?.includes(PMO) ||
      tags?.includes(CPO) ||
      tags?.includes(VMO)
    ) {
      return true;
    } else if (tags?.includes(PROJECT_OWNER)) {
      return JSON.stringify(owner).includes(id);
    } else if (tags?.includes(PROJECT_MANAGER)) {
      let man = members
        ?.filter((m) => m?.userProjects?.type == "manager")
        ?.map((m) => m?.id);
      return JSON.stringify(man).includes(id);
    } else if (tags?.includes(PROJECT_MEMBER)) {
      let mem = members
        ?.filter((m) => m?.userProjects?.type == "member")
        ?.map((m) => m?.id);
      return JSON.stringify(mem).includes(id);
    } else {
      return JSON.stringify(creator).includes(id);
    }
  } catch (err) {
    console.log("Error", err);
    return false;
  }
};

export const canUpdateProject = (project) => {
  try {
    const { creator, owner, members } = project;
    const { id, tags } = getAdmin();
    if (
      tags?.includes(ALL_ACCESS) ||
      tags?.includes(PMO) ||
      tags?.includes(CPO) ||
      tags?.includes(VMO)
    ) {
      return true;
    } else if (tags?.includes(PROJECT_OWNER)) {
      return JSON.stringify(owner).includes(id);
    } else if (tags?.includes(PROJECT_MANAGER)) {
      let man = members
        ?.filter((m) => m?.userProjects?.type == "manager")
        ?.map((m) => m?.id);
      return JSON.stringify(man).includes(id);
    }
  } catch (err) {
    console.log("Error", err);
    return false;
  }
};

export const canAddToProject = (project) => {
  try {
    const { creator, owner, members } = project;
    const { id, tags } = getAdmin();
    if (
      tags?.includes(ALL_ACCESS) ||
      tags?.includes(PMO) ||
      tags?.includes(CPO) ||
      tags?.includes(VMO)
    ) {
      return true;
    } else if (tags?.includes(PROJECT_OWNER)) {
      return JSON.stringify(owner).includes(id);
    } else if (tags?.includes(PROJECT_MANAGER)) {
      let man = members
        ?.filter((m) => m?.userProjects?.type == "manager")
        ?.map((m) => m?.id);
      return JSON.stringify(man).includes(id);
    }
  } catch (err) {
    console.log("Error", err);
    return false;
  }
};

export const canDeleteProject = (project) => {
  try {
    const { creator, owner } = project;
    const { id, tags } = getAdmin();
    if (
      tags?.includes(ALL_ACCESS) ||
      tags?.includes(PMO) ||
      tags?.includes(CPO) ||
      tags?.includes(VMO)
    ) {
      return true;
    } else if (tags?.includes(PROJECT_OWNER)) {
      return JSON.stringify(owner).includes(id);
    } else {
      return JSON.stringify(creator).includes(id);
    }
  } catch (err) {
    console.log("Error", err);
    return false;
  }
};
