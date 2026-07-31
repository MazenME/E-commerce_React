import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "@/services/axios";
import type { TResponseCategories } from "@/types/types";

const getCategories = createAsyncThunk<TResponseCategories, void, { rejectValue: string }>(
  "categories/getCategories",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await axiosInstance.get<TResponseCategories>("/categories", {
        signal: thunkAPI.signal,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  },
);

export default getCategories;
