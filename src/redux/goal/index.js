import { createSlice } from "@reduxjs/toolkit";
import * as API from "config/APIs/task/goal";
import { getAdmin } from "helpers/utils/common/localStorage";
import moment from "moment";

const initialState = {
  goals: [],

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

// Storing User's goals
export const usergoals = createSlice({
  name: "goals",
  initialState,
  reducers: {
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
    updategoalsList: (state, action) => {
      let list = action.payload.list;
      let tab = action.payload.tab;
      state[tab].goals = list;
      state.goals = list;
    },
    updateList: (state, action) => {
      let tab = action.payload.tab;
      state[tab].page = action.payload.data.currentPage;
      state[tab].totalPage = action.payload.data.totalPages;
      let t = [...state[tab].goals];
      t = t.concat(action.payload.data.response);
      t = [...new Map(t.map((item) => [item["id"], item])).values()];
      state[tab].goals =
        tab !== "completed"
          ? t?.filter((i) => i?.status !== "Completed")
          : t?.filter((i) => i?.status == "Completed");
      state[tab].fetching = false;

      t = [...state.goals];
      t = t.concat(action.payload.data.response);
      t = [...new Map(t.map((item) => [item["id"], item])).values()];
      state.goals = t;

      let c = [...state.goals];
      c = c.concat(t);
      c = [...new Map(c.map((item) => [item["id"], item])).values()];
      c = c?.filter((i) => i?.status == "Completed");
      state.completed.goals = c;

      let f = [...state.goals];
      f = f.concat(t);
      f = [...new Map(f.map((item) => [item["id"], item])).values()];
      f = f?.filter((i) => i?.inFocus == 2);
      state.requestedFocus.goals = f;
    },
    updateAddTask: (state, action) => {
      let goal = action?.payload?.goal;
      let refresh = action?.payload?.refresh;
      let task = action?.payload?.task;

      if (goal !== null) {
        state.addTask = {
          goalId: goal?.id,
          projectId: goal?.project?.id,
          project: goal,
          goal: goal?.project,
        };
      } else {
        state.addTask = {
          goalId: null,
          projectId: null,
          project: null,
          goal: null,
        };
      }
      state.refreshList = refresh;
    },
    updateInFocus: (state, action) => {
      let goal = action?.payload?.goal;
      let inFocus = state.inFocus.goals || [];
      if (inFocus?.find((g) => g?.id == goal?.id)) {
        inFocus = inFocus?.filter((g) => g?.id !== goal?.id);
      } else {
        inFocus.push(goal);
      }
      state.inFocus = {
        fetching: false,
        goals: inFocus,
        page: 0,
        totalPage: null,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updategoals,
  updategoalsList,
  updateList,
  updateAddTask,
  updateInFocus,
} = usergoals.actions;

export default usergoals.reducer;

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

      const response = await API.getAllGoals(q);

      if (response.status === 200) {
        let data = response.data.data;

        dispatch(updategoals({ goals: data }));
      }
    } catch (err) {
      console.log("task fetching error", err);
    }
  };
}
