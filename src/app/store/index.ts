import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import authReducer from "../../features/auth/slices/authSlice";
import navigationReducer from "../../features/navigation/slices/navigationSlice";
import { authApi } from "../../features/auth/services/authApi";
import { menuApi } from "../../features/navigation/services/menuApi";
import { userApi } from "../../features/user-management";

// Configure store with all reducers and middleware
export const store = configureStore({
  reducer: {
    // Feature slices
    auth: authReducer,
    navigation: navigationReducer,
    // userApi

    // API reducers
    [authApi.reducerPath]: authApi.reducer,
    [menuApi.reducerPath]: menuApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["persist/PERSIST"],
      },
    })
      .concat(authApi.middleware)
      .concat(menuApi.middleware)
      .concat(userApi.middleware), // ← ADD,

  devTools: false, //process.env.NODE_ENV !== "production",
});

// Enable refetchOnFocus and refetchOnReconnect behavior
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
