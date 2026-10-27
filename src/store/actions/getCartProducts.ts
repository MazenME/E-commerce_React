import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import axiosInstance from "@/services/axios";
import type { TResponseProducts } from "@/types/types";

const getCartProducts = createAsyncThunk(
  "cart/getCartProducts",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState, fulfillWithValue } = thunkAPI;
    const { cart } = getState() as RootState;
    const itemsId = Object.keys(cart.cartItems);
    if (!itemsId.length) {
      return fulfillWithValue([]);
    }
    try {
      const concatIds = itemsId.map((id) => `id=${id}`).join("&");
      const response = await axiosInstance.get<TResponseProducts>(`/products?${concatIds}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)){
        console.log(error);
        return rejectWithValue(error.response?.data.message || error.message);
        
      }else {
        return rejectWithValue("something went wrong");
      }
    }
  },
);

export default getCartProducts;
