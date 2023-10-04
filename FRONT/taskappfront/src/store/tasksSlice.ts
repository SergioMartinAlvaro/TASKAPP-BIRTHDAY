import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {tasks: []},
  reducers: {
    // acciones relacionadas con las tareas
  },
});

export const { /* acciones de tareas */ } = tasksSlice.actions;
export default tasksSlice.reducer;