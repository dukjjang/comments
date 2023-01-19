import { createSlice } from "@reduxjs/toolkit";
import { Comment, InputValues } from "../../interfaces/index";
import { commentReducers as reducers } from "./reducers";
import { commentExtraReducers as extraReducers } from "./extraReducers";

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

export const DEFAULT_INPUT_VALUES = {
  id: -1,
  profile_url: "",
  author: "",
  content: "",
  createdAt: "",
};

export const initialState: CommentState = {
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
  reducers,
  extraReducers,
});

export const {
  setInputValues,
  editComment,
  nextPage,
  prevPage,
  setCurrentPage,
} = commentSlice.actions;

export default commentSlice.reducer;
