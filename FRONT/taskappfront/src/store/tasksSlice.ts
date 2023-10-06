import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {tasksCompleted: [], tasksToDo: []},
  reducers: {
    setTasksCompleted: (state, action) => {
      state.tasksCompleted = action.payload;
    },
    setTaskToDo: (state, action) => {
      state.tasksToDo = action.payload
    },
  },
});

export const { setTasksCompleted, setTaskToDo } = tasksSlice.actions;
export default tasksSlice.reducer;