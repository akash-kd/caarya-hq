import { createSlice } from "@reduxjs/toolkit";
import * as TaskAPI from "config/APIs/task/task";
import { getAdmin } from "helpers/utils/common/localStorage";
import moment from "moment";

const initialState = {
  tasks: [],

  fetching: true,
  owner: {
    fetching: true,
    tasks: [],
    page: 0,
    totalPage: null,
  },
  creator: {
    fetching: true,
    tasks: [],
    page: 0,
    totalPage: null,
  },
  collaborator: {
    fetching: true,
    tasks: [],
    page: 0,
    totalPage: null,
  },
  completed: {
    fetching: true,
    tasks: [],
    page: 0,
    totalPage: null,
  },
  requestedFocus: {
    fetching: true,
    tasks: [],
    page: 0,
    totalPage: null,
  },
  inFocus: {
    fetching: true,
    tasks: [],
    page: 0,
    totalPage: null,
  },
  dueToday: {
    fetching: true,
    tasks: [],
    page: 0,
    totalPage: null,
  },
  icebox: {
    fetching: true,
    tasks: [],
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
export const userTasks = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    updateTasks: (state, action) => {
      let tasks = action.payload?.tasks?.response || action.payload?.tasks;
      const { id } = getAdmin();
      let owned = tasks?.filter((t) => t?.ownerId == id);
      let collab = tasks?.filter((t) =>
        JSON.stringify(t?.students)?.includes(id)
      );
      let created = tasks?.filter((t) => t?.creatorId == id);
      let dueToday = owned?.filter(
        (t) =>
          moment(t?.dueDate).format("DD-MM-YYYY") ==
          moment().format("DD-MM-YYYY")
      );
      let inFocus = owned?.filter((t) => t?.inFocus == 1);
      let reqFocus = owned?.filter((t) => t?.inFocus == 2);
      let icebox = tasks?.filter((t) => t?.goalId == null);
      state.tasks = tasks;
      state.owner = {
        fetching: false,
        tasks: owned,
        page: 0,
        totalPage: 1,
      };
      state.collaborator = {
        fetching: false,
        tasks: collab,
        page: 0,
        totalPage: 1,
      };
      state.creator = {
        fetching: false,
        tasks: created,
        page: 0,
        totalPage: 1,
      };
      state.dueToday = {
        fetching: false,
        tasks: dueToday,
        page: 0,
        totalPage: 1,
      };
      state.inFocus = {
        fetching: false,
        tasks: inFocus,
        page: 0,
        totalPage: 1,
      };
      state.requestedFocus = {
        fetching: false,
        tasks: reqFocus,
        page: 0,
        totalPage: 1,
      };
      state.icebox = {
        fetching: false,
        tasks: icebox,
        page: 0,
        totalPage: 1,
      };
      state.fetching = false;
    },
    updateTasksList: (state, action) => {
      let list = action.payload.list;
      let tab = action.payload.tab;
      state[tab].tasks = list;
      state.tasks = list;
    },
    updateList: (state, action) => {
      let tab = action.payload.tab;
      state[tab].page = action.payload.data.currentPage;
      state[tab].totalPage = action.payload.data.totalPages;
      let t = [...state[tab].tasks];
      t = t.concat(action.payload.data.response);
      t = [...new Map(t.map((item) => [item["id"], item])).values()];
      state[tab].tasks =
        tab !== "completed"
          ? t?.filter((i) => i?.status !== "Completed")
          : t?.filter((i) => i?.status == "Completed");
      state[tab].fetching = false;

      t = [...state.tasks];
      t = t.concat(action.payload.data.response);
      t = [...new Map(t.map((item) => [item["id"], item])).values()];
      state.tasks = t;

      let c = [...state.tasks];
      c = c.concat(t);
      c = [...new Map(c.map((item) => [item["id"], item])).values()];
      c = c?.filter((i) => i?.status == "Completed");
      state.completed.tasks = c;

      let f = [...state.tasks];
      f = f.concat(t);
      f = [...new Map(f.map((item) => [item["id"], item])).values()];
      f = f?.filter((i) => i?.inFocus == 2);
      state.requestedFocus.tasks = f;
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
  },
});

// Action creators are generated for each case reducer function
export const { updateTasks, updateTasksList, updateList, updateAddTask } =
  userTasks.actions;

export default userTasks.reducer;

export function fetchAllTasks(assignedAs, page, goalId) {
  return async (dispatch) => {
    try {
      let q = {
        // page: page + 1,
        // size: window.innerWidth < 1024 ? 10 : 50,
      };

      if (goalId) {
        q["goalId"] = goalId;
      }

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

      const response = await TaskAPI.getAllTasks(q);

      if (response.status === 200) {
        let data = response.data.data;

        dispatch(updateTasks({ tasks: data }));
      }
    } catch (err) {
      console.log("task fetching error", err);
    }
  };
}
