import { createSlice } from '@reduxjs/toolkit';
import { emptyUser } from '../models/IUser';

const userSlice = createSlice({
  name: 'user',
  initialState: { isAdmin: false, isAuthenticated: false, user: emptyUser, allUsers: [], menuMessage: '' },
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
    },
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
    setMenuMessage: (state, action) => {
      state.menuMessage = action.payload
    }
  },
});

export const { stateLogin, logout, setMenuMessage, setIsAdmin } = userSlice.actions;
export default userSlice.reducer;