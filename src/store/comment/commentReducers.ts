import { PayloadAction } from "@reduxjs/toolkit";
import { CommentState } from "./commentSlice";

export const commentReducers = {
  setInputValues(
    state: CommentState,
    action: PayloadAction<{ name: string; value: string }>
  ) {
    state.inputValues[action.payload.name] = action.payload.value;
  },

  editComment(state: CommentState, action: PayloadAction<number>) {
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
  setCurrentPage(state: CommentState, action: PayloadAction<number>) {
    state.currentPage = action.payload;
  },
  nextPage(state: CommentState) {
    state.currentPage += 1;
    if (state.currentPage === state.currentSection * state.pageCount + 1) {
      state.firstPage = state.currentPage;
      state.lastPage =
        state.currentSection < state.totalSection
          ? state.currentPage + 4
          : state.totalPage;
      state.currentSection += 1;
    }
  },
  prevPage(state: CommentState) {
    state.currentPage -= 1;
    if (state.currentPage === (state.currentSection - 1) * state.pageCount) {
      state.firstPage = state.currentPage - 4;
      state.lastPage = state.currentPage;
      state.currentSection -= 1;
    }
  },
};
