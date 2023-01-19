import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import {
  deleteComment,
  fetchComments,
  fetchTotalComments,
  postComment,
  putComment,
} from "./commentActions";
import { CommentState } from "./commentSlice";
import { DEFAULT_INPUT_VALUES } from "./commentSlice";

export const commentExtraReducers = (
  builder: ActionReducerMapBuilder<CommentState>
) => {
  builder.addCase(fetchTotalComments.fulfilled, (state, action) => {
    const totalPageNumber = Math.ceil(action.payload.length / 4);
    state.totalPage = totalPageNumber;
    state.totalSection = Math.ceil(totalPageNumber / 5);
  });

  builder.addCase(fetchComments.fulfilled, (state, action) => {
    state.comments = action.payload;
    if (state.currentPage === 0) state.currentPage = 1;
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
    state.inputValues = DEFAULT_INPUT_VALUES;
  });
};
