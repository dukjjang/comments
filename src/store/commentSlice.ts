import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Comment } from "../interfaces/index";
import { getComments } from "../apis";

export interface CommentState {
  comments: Comment[];
}

export const fetchComments = createAsyncThunk(
  "commentSlice/fetchComments",
  getComments
);

export const commentSlice = createSlice({
  name: "comment",
  initialState: { comments: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload;
    });
  },
});

export default commentSlice.reducer;
