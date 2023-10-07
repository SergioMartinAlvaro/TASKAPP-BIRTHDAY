import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import tasksReducer from './tasksSlice';
import keysReducer from './keysSlice';

// Combina los reducers en un solo reducer raíz
const rootReducer = combineReducers({
  user: userReducer,
  tasks: tasksReducer,
  keys: keysReducer,
});

// Configura y crea el store utilizando el reducer combinado
const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;