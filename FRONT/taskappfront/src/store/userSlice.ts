import { createSlice } from '@reduxjs/toolkit';
import { emptyUser } from '../models/IUser';

const userSlice = createSlice({
  name: 'user',
  initialState: { isAuthenticated: false, user: emptyUser, allUsers: [], menuMessage: '' },
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
    setMenuMessage: (state, action) => {
      state.menuMessage = action.payload
    }
  },
});

export const { stateLogin, logout, setMenuMessage } = userSlice.actions;
export default userSlice.reducer;