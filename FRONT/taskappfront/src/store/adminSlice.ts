import { createSlice } from "@reduxjs/toolkit";
import { emptyKey } from "../models/IKey";

const adminSlice = createSlice({
  name: "keys",
  initialState: { allUsers: [], allTasks: [], allKeys: [] },
  reducers: {
    setAllKeys: (state, action) => {
      state.allKeys = action.payload;
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    setAllTasks: (state, action) => {
      state.allTasks = action.payload;
    },
    cleanAllValues: (state) => {
      state.allTasks = [];
      state.allUsers = [];
      state.allKeys = [];
    },
    addUser: (state, action) => {
      state.allUsers.push(action.payload);
    },
    removeUser: (state, action) => {
      const newAllUsers = state.allUsers.filter(
        (user) => user.id !== action.payload.id
      );
      state.allUsers = newAllUsers;
    },
    editUser: (state, action) => {
      const newAllUsers = state.allUsers.filter(
        (user) => user.id !== action.payload.id
      );
      newAllUsers.push(action.payload);
      state.allUsers = newAllUsers;
    },
    addTask: (state, action) => {
      state.allTasks.push(action.payload);
    },
    removeTask: (state, action) => {
      const newAllTasks = state.allTasks.filter(
        (task) => task.id !== action.payload.id
      );
      state.allUsers = newAllTasks;
    },
    editTask: (state, action) => {
      const newAllTasks = state.allTasks.filter(
        (task) => task.id !== action.payload.id
      );
      newAllTasks.push(action.payload);
      state.allTasks = newAllTasks;
    },
    addKey: (state, action) => {
      state.allKeys.push(action.payload);
    },
    removeKey: (state, action) => {
      const newAllKeys = state.allKeys.filter(
        (key) => key.id !== action.payload.id
      );
      state.allKeys = newAllKeys;
    },
    editKey: (state, action) => {
      const newAllKeys = state.allKeys.filter(
        (key) => key.id !== action.payload.id
      );
      newAllKeys.push(action.payload);
      state.allTasks = newAllKeys;
    },
  },
});

export const {
  setAllKeys,
  addKey,
  removeKey,
  editKey,
  setAllTasks,
  addTask,
  editTask,
  removeTask,
  setAllUsers,
  addUser,
  removeUser,
  editUser,
  cleanAllValues,
} = adminSlice.actions;
export default adminSlice.reducer;
