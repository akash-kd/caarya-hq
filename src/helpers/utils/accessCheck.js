import {
  CPO,
  PROJECT_MEMBER,
  VMO,
  ALL_ACCESS,
  CAARYA_DIRECTOR,
  PMO,
  PROJECT_MANAGER,
  PROJECT_OWNER,
} from "helpers/constants/accesspass";

export const checkAppAccess = (a, token) => {
  return true;
  // const admin = a || JSON.parse(localStorage.getItem("admin"));

  // if (localStorage.getItem("token") || token) {
  //   return (
  //     admin?.tags?.includes(ALL_ACCESS) ||
  //     admin?.tags?.includes(CAARYA_DIRECTOR) ||
  //     admin?.tags?.includes(PMO) ||
  //     admin?.tags?.includes(VMO) ||
  //     admin?.tags?.includes(CPO) ||
  //     admin?.tags?.includes(PROJECT_MANAGER) ||
  //     admin?.tags?.includes(PROJECT_OWNER) ||
  //     admin?.tags?.includes(PROJECT_MEMBER)
  //   );
  // } else return false;
};
