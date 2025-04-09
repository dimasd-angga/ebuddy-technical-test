import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/store/slices/authSlice';
import usersReducer from '@/store/slices/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
