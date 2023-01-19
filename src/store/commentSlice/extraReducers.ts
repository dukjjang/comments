import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import {
  deleteComment,
  fetchComments,
  postComment,
  putComment,
} from "./actions";
import { CommentState } from ".";
import { DEFAULT_INPUT_VALUES } from ".";

export const commentExtraReducers = (
  builder: ActionReducerMapBuilder<CommentState>
) => {
  builder.addCase(fetchComments.fulfilled, (state, action) => {
    const { countOfComments, data } = action.payload;
    const totalPageCount = Math.ceil(countOfComments / 4);
    state.comments = data;
    state.totalPage = totalPageCount;
    state.totalSection = Math.ceil(totalPageCount / 5);
  });

  builder.addCase(postComment.fulfilled, (state) => {
    state.inputValues = DEFAULT_INPUT_VALUES;
    state.currentPage = 1;
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
    state.currentPage = 1;
    state.inputValues = DEFAULT_INPUT_VALUES;
  });
};
