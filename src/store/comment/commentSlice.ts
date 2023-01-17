import { createSlice } from "@reduxjs/toolkit";
import { Comment, InputValues } from "../../interfaces/index";
import {
  fetchComments,
  fetchTotalComments,
  deleteComment,
  postComment,
  putComment,
} from "./commentThunks";

export interface CommentState {
  comments: Comment[];
  currentPage: number;
  inputValues: InputValues;
  totalPage: number;
  currentSection: number;
  totalSection: number;
  pageCount: number;
  firstPage: number;
  lastPage: number;
}

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
  currentSection: 1,
  totalSection: 1,
  pageCount: 5,
  firstPage: 1,
  lastPage: 5,
};

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
    setPageSection(state, action) {
      if (
        action.payload === "next" &&
        state.totalSection > state.currentSection
      ) {
        state.currentSection++;
      }
      if (action.payload === "prev" && state.currentSection > 1) {
        state.currentSection--;
      }
      state.lastPage =
        state.currentSection * state.pageCount > state.totalPage
          ? state.totalPage
          : state.currentSection * state.pageCount;

      state.firstPage =
        state.currentSection === 1
          ? 1
          : state.currentSection * state.pageCount - state.pageCount + 1;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchTotalComments.fulfilled, (state, action) => {
      const totalPageNumber = Math.ceil(action.payload.length / 4);
      state.totalPage = totalPageNumber;
      state.totalSection = Math.ceil(totalPageNumber / 5);
    });

    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload;
    });

    builder.addCase(postComment.fulfilled, (state) => {
      state.inputValues = DEFAULT_INPUT_VALUES;
      state.currentPage = 0;
      state.currentSection = 1;
      state.firstPage = 1;
      state.lastPage = 5;
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
      state.currentPage = 0;
    });
  },
});

export const { setInputValues, editComment, setCurrentPage, setPageSection } =
  commentSlice.actions;

export default commentSlice.reducer;
