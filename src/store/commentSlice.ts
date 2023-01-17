import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Comment, InputValues } from "../interfaces/index";
import axios from "axios";

export interface CommentState {
  comments: Comment[];
  inputValues: InputValues;
}

const initialState: CommentState = {
  comments: [],
  inputValues: {
    profile_url: "",
    author: "",
    content: "",
    createdAt: "",
  },
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
  async (inputValues: InputValues) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/comments`,
      {
        id: Math.random() * 100,
        author: inputValues.author,
        content: inputValues.content,
        profile_url: "https://picsum.photos/id/1/50/50",
        createdAt: inputValues.createdAt,
      }
    );
    return response.data;
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    setInputValues(state, action) {
      state.inputValues[action.payload.name] = action.payload.value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload;
    });
    builder.addCase(postComment.fulfilled, (state, action) => {
      state.comments.unshift(action.payload);
    });
  },
});

export const { setInputValues } = commentSlice.actions;

export default commentSlice.reducer;
