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
    cleanTasks: (state) => {
      state.tasksToDo = [];
      state.tasksCompleted = []
    }
  },
});

export const { setTasksCompleted, setTaskToDo, cleanTasks } = tasksSlice.actions;
export default tasksSlice.reducer;