import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Comment } from "../interfaces/index";
import axios from "axios";

export interface CommentState {
  comments: Comment[];
}

const initialState: CommentState = {
  comments: [],
};

export const fetchComments = createAsyncThunk(
  "commentSlice/fetchComments",
  async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/comments`
    );
    return response.data;
  }
);

export const postComment = createAsyncThunk(
  "commentSlice/postComment",
  async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/comments`
    );
    return response.data;
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload;
    });
    builder.addCase(postComment.fulfilled, (state, action) => {
      state.comments.push(action.payload);
    });
  },
});

export default commentSlice.reducer;
