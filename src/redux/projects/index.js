import { createSlice } from "@reduxjs/toolkit";
import { findAll } from "config/APIs/project";
import { logError } from "helpers/utils/common/logError";
import { updateItemInArray, updateObject } from "helpers/utils/redux";

const initialState = {
  list: [],
  typeWiseList: {},
  fetching: true,
  categorizedList: [],
};

const getCategorizedlist = (list) => {
  let categories = [];
  list?.map((item) => {
    if (categories?.find((c) => c?.name == item?.category)) {
      let c = categories?.find((c) => c?.name == item?.category);
      let ind = categories?.findIndex((c) => c?.name == item?.category);
      if (c?.types?.find((c) => c?.name == item?.type)) {
        let t = c?.types?.find((c) => c?.name == item?.type);
        let idx = c?.types?.findIndex((c) => c?.name == item?.type);
        if (t?.projects) {
          t.projects.push(item);
        } else {
          t["projects"] = [item];
        }
        c.types[idx] = t;
      } else {
        c.types.push({ name: item?.type, projects: [item] });
      }
      categories[ind] = c;
    } else {
      categories.push({
        name: item?.category,
        types: [{ name: item?.type, projects: [item] }],
      });
    }
  });
  return categories;
};
// Storing projects
export const project = createSlice({
  name: "project",
  initialState,
  reducers: {
    updateList: (state, action) => {
      state.list = action.payload.list;
      let list = action.payload.list;

      let types = [];

      let temp = {};

      list?.map((i) => {
        if (types?.includes(i?.type)) {
          temp[i.type].push(i);
        } else {
          types.push(i?.type);
          temp[i.type] = [i];
        }
      });
      state.categorizedList = getCategorizedlist(list);
      state.typeWiseList = temp;
      state.fetching = false;
    },
    updateAProject: (state, action) => {
      let id = action.payload.id;
      let t = action.payload.project;
      const newList = updateItemInArray(state.list, id, (project) => {
        return updateObject(project, { ...t });
      });
      state.list = newList;
      state.categorizedList = getCategorizedlist(newList);
    },
    addAProject: (state, action) => {
      let t = action.payload.project;

      const newList = state.list.concat([t]);
      state.list = newList;
      state.categorizedList = getCategorizedlist(newList);
    },
    deleteAProject: (state, action) => {
      let id = action.payload.id;
      const newList = state.list.filter((t) => t?.id !== id);
      state.list = newList;
      state.categorizedList = getCategorizedlist(newList);
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateList, updateAProject, addAProject, deleteAProject } =
  project.actions;

export function fetchAllProjects() {
  return async (dispatch) => {
    try {
      const response = await findAll({ status: "Live", is_active: true });
      if (response.status === 200) {
        let data = response.data.data.response;

        dispatch(
          updateList({ list: data?.filter((i) => i?.type !== "Personal") })
        );
      }
    } catch (err) {
      logError("Fetch all projects: ", err);
    }
  };
}

export default project.reducer;
