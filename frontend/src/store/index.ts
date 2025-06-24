import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import bandsReducer from './slices/bandsSlice';
import rehearsalsReducer from './slices/rehearsalsSlice';
import availabilityReducer from './slices/availabilitySlice';
import notificationsReducer from './slices/notificationsSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bands: bandsReducer,
    rehearsals: rehearsalsReducer,
    availability: availabilityReducer,
    notifications: notificationsReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types as they might contain non-serializable data
        ignoredActions: ['auth/loginSuccess', 'auth/registerSuccess'],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;