import { configureStore } from "@reduxjs/toolkit";
import commentReducer from "./commentSlice";

export const store = configureStore({
  reducer: { comment: commentReducer },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;