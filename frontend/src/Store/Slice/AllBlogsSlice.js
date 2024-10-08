import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const STATUSES = {
  LOADING: "loading",
  ERROR: "error",
  SUCCESS: "success",
  IDLE: "idle",
};

export const blogsSlice = createSlice({
  name: "blogs",
  initialState: {
    status: STATUSES.IDLE,
    data: [],
  },
  extraReducers: (bundler) => {
    bundler
      .addCase(fetchBlogs.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        if (action.payload?.message) {
          state.status = STATUSES.ERROR;
        } else {
          state.status = STATUSES.SUCCESS;
        }
        state.data = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const fetchBlogs = createAsyncThunk("fetchBlogs", async (page) => {
  try {
    console.log(page);
    if (page <= 0) page = 1;
    const { data } = await axios.get(`/blogs?page=${page}`);
    return data;
    // return {};
  } catch (error) {
    console.log(error);
  }
});

export default blogsSlice.reducer;
