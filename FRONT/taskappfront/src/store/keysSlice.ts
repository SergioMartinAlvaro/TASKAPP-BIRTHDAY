import { createSlice } from '@reduxjs/toolkit';

const keysSlice = createSlice({
  name: 'keys',
  initialState: {keys: []},
  reducers: {
    // acciones relacionadas con las llaves
  },
});

export const { /* acciones de llaves */ } = keysSlice.actions;
export default keysSlice.reducer;