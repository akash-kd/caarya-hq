import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("admin")) || {},
  token: localStorage.getItem("token") || "",
  squad: { teamMembers: [], mentors: [], mentees: [] },
  projects: {},
  projectsList: [],
  squadList: [],
  fetching: true,
  clockIns: [],
};

// Storing User details and Token
export const chronosUser = createSlice({
  name: "user",
  initialState,
  reducers: {
    userUpdate: (state, action) => {
      if (action.payload?.user) {
        let u = action.payload?.user;
        state.user = u;
        localStorage.setItem("admin", JSON.stringify(u));
      }
      if (action.payload?.token) {
        let t = action.payload?.token;
        state.token = t;
        localStorage.setItem("token", t);
      }
    },
    updateUserSquad: (state, action) => {
      if (action.payload?.squad) {
        state.squad = action.payload?.squad;
        let temp = Object.values(action.payload?.squad);
        let s = [];
        temp?.map((i) => {
          s = s.concat(i);
        });
        state.squadList = s;
      }
      if (action.payload?.projects) {
        state.projects = action.payload?.projects;
        let temp = Object.values(action.payload?.projects);
        let p = [];
        temp?.map((i) => {
          p = p.concat(i);
        });
        state.projectsList = p;
      }
      state.fetching = false;
    },
    updateUserClock: (state, action) => {
      state.clockIns = action.payload.list;
    },
  },
});

// Action creators are generated for each case reducer function
export const { userUpdate, updateUserSquad, updateUserClock } =
  chronosUser.actions;

export default chronosUser.reducer;
