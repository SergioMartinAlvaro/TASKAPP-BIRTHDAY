import { createSlice } from '@reduxjs/toolkit';
import { emptyKey } from '../models/IKey';

const keysSlice = createSlice({
  name: 'keys',
  initialState: {keyAssigned: [emptyKey]},
  reducers: {
    setKey: (state, action) => {
      state.keyAssigned = action.payload;
    },
    cleanKey: (state) => {
      state.keyAssigned = [emptyKey]
    }
  },
});

export const { setKey, cleanKey } = keysSlice.actions;
export default keysSlice.reducer;