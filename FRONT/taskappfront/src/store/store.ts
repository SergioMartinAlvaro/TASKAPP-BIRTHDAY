import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice';
import tasksReducer from './tasksSlice';
import keysReducer from './keysSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    tasks: tasksReducer,
    keys: keysReducer,
  },
});

export default store;