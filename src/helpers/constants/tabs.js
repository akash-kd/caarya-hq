import {
  DiscordLogo,
  HouseLine,
  RocketLaunch,
  Stack,
  Gear,
  SignOut,
  Target,
  Users,
} from "@phosphor-icons/react";
export const LOGOUT = "Logout";
export const SETTINGS = "Settings";
export const DASHBOARD = "Dashboard";
export const TASKS = "Tasks";
export const MYSQUAD = "MySquad";
export const LEARNING = "Learning";
export const PROJECTS = "Projects";
export const DISCORD = "Discord";
export const CLOCK_IN = "Clock In";

export const tabs = [
  {
    name: DASHBOARD,
    tab: DASHBOARD,
    icon: <HouseLine size={32} className="" />,
    path: "/dashboard",
  },
  // {
  //   name: TASKS,
  //   tab: TASKS,
  //   icon: <Target size={25} className="" />,
  //   path: "/tasks",
  // },
  {
    name: PROJECTS,
    tab: PROJECTS,
    icon: <RocketLaunch size={32} className="" />,
    path: "/projects",
  },
  // {
  //   name: MYSQUAD,
  //   tab: MYSQUAD,
  //   icon: <Users size={32} className="" />,
  //   path: "/mySquad",
  // },
  // {
  //   name: LEARNING,
  //   tab: LEARNING,
  //   icon: <Stack size={32} className="" />,
  //   path: "/learning",
  // },
  {
    name: DISCORD,
    tab: DISCORD,
    icon: <DiscordLogo size={25} className="" />,
    path: "/discord",
  },
  // {
  //   name: SETTINGS,
  //   tab: SETTINGS,
  //   icon: <Gear size={32} className="fill-white hover:fill-[#865931] ml-2" />,
  //   path: "/settings",
  // },
  // {
  //   name: LOGOUT,
  //   tab: LOGOUT,
  //   icon: <SignOut size={32} className="fill-white hover:fill-[#865931] ml-2" />,
  //   path: "/logout",
  // },
];
