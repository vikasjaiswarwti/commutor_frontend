// import { configureStore } from "@reduxjs/toolkit";
// import { setupListeners } from "@reduxjs/toolkit/query";
// import type { TypedUseSelectorHook } from "react-redux";
// import { useDispatch, useSelector } from "react-redux";
// import authReducer from "../../features/auth/slices/authSlice";
// import navigationReducer from "../../features/navigation/slices/navigationSlice";
// import { authApi } from "../../features/auth/services/authApi";
// import { menuApi } from "../../features/navigation/services/menuApi";
// import { userApi } from "../../features/user-management";

// // Configure store with all reducers and middleware
// export const store = configureStore({
//   reducer: {
//     // Feature slices
//     auth: authReducer,
//     navigation: navigationReducer,
//     // userApi

//     // API reducers
//     [authApi.reducerPath]: authApi.reducer,
//     [menuApi.reducerPath]: menuApi.reducer,
//     [userApi.reducerPath]: userApi.reducer,
//   },

//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         // Ignore these action types
//         ignoredActions: ["persist/PERSIST"],
//       },
//     })
//       .concat(authApi.middleware)
//       .concat(menuApi.middleware)
//       .concat(userApi.middleware), // ← ADD,

//   devTools: false, //process.env.NODE_ENV !== "production",
// });

// // Enable refetchOnFocus and refetchOnReconnect behavior
// setupListeners(store.dispatch);

// // Infer the `RootState` and `AppDispatch` types from the store itself

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// export const useAppDispatch: () => AppDispatch = useDispatch;
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// -----------------------------------------------------------------------------

// src/app/store/index.ts
// ─────────────────────────────────────────────────────────────────────────────
// Fix: spreading ...apiReducers into the reducer map loses the full state type,
// so TypeScript can't reconcile the middleware signatures.
// Solution: use combineReducers() explicitly — the full state type is inferred
// upfront and the middleware constraint is satisfied.
//
// To add a new API: one import + one line in apiSlices array. Nothing else.
// ─────────────────────────────────────────────────────────────────────────────

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";

// ── Regular slices ────────────────────────────────────────────────────────────
import authReducer from "../../features/auth/slices/authSlice";
import navigationReducer from "../../features/navigation/slices/navigationSlice";
// import dashboardReducer from "../../features/dashboard/slices/dashboardSlice";

// ── RTK Query API slices ──────────────────────────────────────────────────────
import { authApi } from "../../features/auth/services/authApi";
import { menuApi } from "../../features/navigation/services/menuApi";
import { userApi } from "../../features/user-management/services/userApi";

// import { orderApi }   from "../../features/orders/services/orderApi";
// import { reportApi }  from "../../features/reports/services/reportApi";
// import { vehicleApi } from "../../features/fleet/services/vehicleApi";

// ─────────────────────────────────────────────────────────────────────────────
// ROOT REDUCER — explicit combineReducers gives TypeScript the full state shape
// before configureStore sees it, so the middleware types resolve correctly.
//
// ADD NEW SLICES: one line in the object below.
// ─────────────────────────────────────────────────────────────────────────────

const rootReducer = combineReducers({
  // ── Regular slices ─────────────────────────────────────────────────────────
  auth: authReducer,
  navigation: navigationReducer,
  // dashboard: dashboardReducer,

  // ── RTK Query cache reducers ────────────────────────────────────────────────
  [authApi.reducerPath]: authApi.reducer,
  [menuApi.reducerPath]: menuApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  // [orderApi.reducerPath]:   orderApi.reducer,
  // [reportApi.reducerPath]:  reportApi.reducer,
  // [vehicleApi.reducerPath]: vehicleApi.reducer,
});

// ─────────────────────────────────────────────────────────────────────────────
// API SLICE REGISTRY — add ONE line per new createApi(). Middleware auto-built.
// ─────────────────────────────────────────────────────────────────────────────

const apiSlices = [
  authApi,
  menuApi,
  userApi,
  // orderApi,
  // reportApi,
  // vehicleApi,
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// STORE
// ─────────────────────────────────────────────────────────────────────────────

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) => {
    const base = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    });

    // Append all API middlewares from the registry in one loop
    return apiSlices.reduce(
      (chain, api) => chain.concat(api.middleware),
      base as any,
    ) as typeof base;
  },

  // devTools: process.env.NODE_ENV !== "production",
  devTools: false,
});

setupListeners(store.dispatch);

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
