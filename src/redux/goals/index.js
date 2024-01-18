import { createSlice } from "@reduxjs/toolkit";
import * as GoalAPI from "config/APIs/task/goal";
import { getSortedByDate } from "helpers/array";
import { getAdmin } from "helpers/utils/common/localStorage";
import moment from "moment";

const initialState = {
  goals: [],
  projectWiseGoals: [],
  thisWeek: { fetching: false, list: [], projectWiseGoals: [] },
  thisMonth: { fetching: false, list: [], projectWiseGoals: [] },
  thisQuarter: { fetching: false, list: [], projectWiseGoals: [] },
  dailyPlannerGoals: {
    fetching: true,
    list: [],
    pendingTasks: [],
    dueTodayTasks: [],
    dueTomorrowTasks: [],
    otherTasks: [],
  },
  tempDailyPlannerGoals: [],
  fetching: true,
  owner: {
    fetching: true,
    goals: [],
    page: 0,
    totalPage: null,
  },
  creator: {
    fetching: true,
    goals: [],
    page: 0,
    totalPage: null,
  },
  collaborator: {
    fetching: true,
    goals: [],
    page: 0,
    totalPage: null,
  },
  completed: {
    fetching: true,
    goals: [],
    page: 0,
    totalPage: null,
  },
  requestedFocus: {
    fetching: true,
    goals: [],
    page: 0,
    totalPage: null,
  },
  inFocus: {
    fetching: true,
    goals: [],
    page: 0,
    totalPage: null,
  },
  dueToday: {
    fetching: true,
    goals: [],
    page: 0,
    totalPage: null,
  },
  icebox: {
    fetching: true,
    goals: [],
    page: 0,
    totalPage: null,
  },
  shared: {
    fetching: true,
    goals: [],
    page: 0,
    totalPage: null,
  },
  addTask: {
    goalId: null,
    projectId: null,
    project: null,
    goal: null,
  },
  refreshList: true,
};

// Storing User's Tasks
export const goals = createSlice({
  name: "goals",
  initialState,
  reducers: {
    updateGoalsList: (state, action) => {
      let type = action.payload.type;
      let list = action.payload.list;
      let projectWise = action.payload.projectWise;
      let fetching = action.payload.fetching;
      if (fetching !== null && fetching != undefined) {
        state[type].fetching = fetching;
      }
      if (list?.length > 0) {
        state[type].list = list;
        let t = [...state.goals];
        t = t.concat(list);
        t = [...new Map(t.map((item) => [item["id"], item])).values()];
        state.goals = t;
      }
      if (projectWise?.length > 0) {
        state[type].projectWiseGoals = projectWise;
        let t = [...state.projectWiseGoals];
        t = t.concat(projectWise);
        t = [...new Map(t.map((item) => [item["id"], item])).values()];
        state.projectWiseGoals = t;
      }
    },
    updateDailyPlannerGoals: (state, action) => {
      let {
        list,
        fetching,
        pendingTasks,
        dueTodayTasks,
        dueTomorrowTasks,
        otherTasks,
      } = action.payload;

      if (fetching !== null && fetching != undefined) {
        state.dailyPlannerGoals.fetching = fetching;
      }
      if (list?.length > 0) {
        state.dailyPlannerGoals.list = list;
      }
      if (pendingTasks?.length > 0) {
        state.dailyPlannerGoals.pendingTasks = pendingTasks;
      }
      if (dueTodayTasks?.length > 0) {
        state.dailyPlannerGoals.dueTodayTasks = dueTodayTasks;
      }
      if (dueTomorrowTasks?.length > 0) {
        state.dailyPlannerGoals.dueTomorrowTasks = dueTomorrowTasks;
      }
      if (otherTasks?.length > 0) {
        state.dailyPlannerGoals.otherTasks = otherTasks;
      }
    },
    updateDailyPlannerTempGoals: (state, action) => {
      state.tempDailyPlannerGoals = action.payload;
    },
    updategoals: (state, action) => {
      let goals = action.payload?.goals?.response || action.payload?.goals;
      const { id } = getAdmin();
      let owned = goals?.filter((t) => t?.ownerId == id);
      let collab = goals?.filter((t) =>
        JSON.stringify(t?.students)?.includes(id)
      );
      let created = goals?.filter((t) => t?.creatorId == id);
      let dueToday = owned?.filter(
        (t) =>
          moment(t?.dueDate).format("DD-MM-YYYY") ==
          moment().format("DD-MM-YYYY")
      );
      let inFocus = owned?.filter((t) => t?.inFocus == 1);
      let reqFocus = owned?.filter((t) => t?.inFocus == 2);
      let icebox = goals?.filter((t) => t?.goalId == null);
      let shared = created?.filter((t) => t?.ownerId !== id);
      state.goals = goals;
      state.owner = {
        fetching: false,
        goals: owned,
        page: 0,
        totalPage: 1,
      };
      state.collaborator = {
        fetching: false,
        goals: collab,
        page: 0,
        totalPage: 1,
      };
      state.creator = {
        fetching: false,
        goals: created,
        page: 0,
        totalPage: 1,
      };
      state.dueToday = {
        fetching: false,
        goals: dueToday,
        page: 0,
        totalPage: 1,
      };
      state.inFocus = {
        fetching: false,
        goals: inFocus,
        page: 0,
        totalPage: 1,
      };
      state.requestedFocus = {
        fetching: false,
        goals: reqFocus,
        page: 0,
        totalPage: 1,
      };
      state.icebox = {
        fetching: false,
        goals: icebox,
        page: 0,
        totalPage: 1,
      };
      state.shared = {
        fetching: false,
        goals: shared,
        page: 0,
        totalPage: 1,
      };
      state.fetching = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateGoalsList,
  updateDailyPlannerGoals,
  updateDailyPlannerTempGoals,
  updategoals,
} = goals.actions;

export default goals.reducer;

export function fetchAllgoals(assignedAs, page, goalId) {
  return async (dispatch) => {
    try {
      let q = {
        // page: page + 1,
        // size: window.innerWidth < 1024 ? 10 : 50,
      };

      if (assignedAs) {
        switch (assignedAs) {
          case "completed":
            q["status"] = "Completed";
            break;
          case "requestedFocus":
            q["inFocus"] = 2;
            break;
          default:
            q["assignedAs"] = assignedAs;
        }
      }

      const response = await GoalAPI.getAllGoals(q);

      if (response.status === 200) {
        let data = response.data.data;

        dispatch(updategoals({ goals: data }));
      }
    } catch (err) {
      console.log("task fetching error", err);
    }
  };
}
