import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Comment, InputValues } from "../interfaces/index";
import axios from "axios";

export interface CommentState {
  comments: Comment[];
  currentPage: number;
  inputValues: InputValues;
  totalPage: number;
}

const BASE_URL = process.env.REACT_APP_API_URL;

const DEFAULT_INPUT_VALUES = {
  id: -1,
  profile_url: "",
  author: "",
  content: "",
  createdAt: "",
};

const initialState: CommentState = {
  comments: [],
  currentPage: 1,
  inputValues: DEFAULT_INPUT_VALUES,
  totalPage: 1,
};

export const fetchTotalComments = createAsyncThunk(
  "commentSlice/fetchTotalComments",
  async () => {
    const response = await axios.get(`${BASE_URL}/comments`);
    return response.data;
  }
);

export const fetchComments = createAsyncThunk(
  "commentSlice/fetchComments",
  async (currentPage: number) => {
    if (currentPage === 0) currentPage = 1;
    const response = await axios.get(
      `${BASE_URL}/comments?_page=${currentPage}&_limit=4&_order=desc&_sort=createdAt`
    );
    return response.data;
  }
);

export const postComment = createAsyncThunk(
  "commentSlice/postComment",
  async (inputValues: InputValues) => {
    const response = await axios.post(`${BASE_URL}/comments`, {
      id: (Math.random() * 1000).toFixed(3),
      author: inputValues.author,
      content: inputValues.content,
      profile_url: "https://picsum.photos/id/1/50/50",
      createdAt: inputValues.createdAt,
    });
    return response.data;
  }
);

export const putComment = createAsyncThunk(
  "commentSlice/putComment",
  async (inputValues: InputValues) => {
    const { id, content, author, createdAt, profile_url } = inputValues;
    const response = await axios.put(`${BASE_URL}/comments/${id}`, {
      id,
      content,
      author,
      createdAt,
      profile_url,
    });
    return response.data;
  }
);

export const deleteComment = createAsyncThunk(
  "commentSlice/deleteComment",
  async (id: number) => {
    await axios.delete(`${BASE_URL}/comments/${id}`);
    return id;
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    setInputValues(state, action) {
      state.inputValues[action.payload.name] = action.payload.value;
    },
    editComment(state, action) {
      const target = state.comments.find(
        (comment) => comment.id === action.payload
      );
      if (target)
        state.inputValues = {
          id: target.id,
          profile_url: target.profile_url,
          author: target.author,
          content: target.content,
          createdAt: target?.createdAt,
        };
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchTotalComments.fulfilled, (state, action) => {
      state.totalPage = Math.ceil(action.payload.length / 4);
    });

    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload;
    });

    builder.addCase(postComment.fulfilled, (state, action) => {
      state.currentPage = 0;
      state.inputValues = DEFAULT_INPUT_VALUES;
    });

    builder.addCase(putComment.fulfilled, (state, action) => {
      const targetIndex = state.comments.findIndex(
        (comment) => comment.id === action.payload.id
      );
      state.comments[targetIndex] = action.payload;
      state.inputValues = DEFAULT_INPUT_VALUES;
    });

    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.comments = state.comments.filter(
        (comment) => comment.id !== action.payload
      );
    });
  },
});

export const { setInputValues, editComment, setCurrentPage } =
  commentSlice.actions;

export default commentSlice.reducer;
