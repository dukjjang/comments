import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { InputValues } from "../../interfaces";
const BASE_URL = process.env.REACT_APP_API_URL;

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
