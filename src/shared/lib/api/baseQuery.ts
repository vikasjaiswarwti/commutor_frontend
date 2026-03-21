import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import type { RootState } from "../../../app/store/index";

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || "http://192.168.1.60:83",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    console.log("token from baseQuery", token);

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    headers.set("Content-Type", "application/json");

    return headers;
  },
});
