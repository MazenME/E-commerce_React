import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "@/services/axios";
import type { TResponseProducts } from "@/types/types";

const getProducts = createAsyncThunk<TResponseProducts, string | void, { rejectValue: string }>(
  "products/getProducts",
  async (prefix: string | void, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const url = prefix ? `/products?cat_prefix=${prefix}` : `/products`;
      const response = await axiosInstance.get<TResponseProducts>(url, {
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

export default getProducts;
