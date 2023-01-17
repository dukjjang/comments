import { configureStore } from "@reduxjs/toolkit";
import commentReducer from "./comment/commentSlice";
import logger from "redux-logger";

export const store = configureStore({
  reducer: { comment: commentReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
