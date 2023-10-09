import { createSlice } from '@reduxjs/toolkit';
import { emptyUser } from '../models/IUser';

const userSlice = createSlice({
  name: 'user',
  initialState: { isAuthenticated: false, user: emptyUser, allUsers: [] },
  reducers: {
    stateLogin: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem('userAvatar');
      localStorage.removeItem('userData');
      state.isAuthenticated = false;
      state.user = null;
    }
  },
});

export const { stateLogin, logout } = userSlice.actions;
export default userSlice.reducer;