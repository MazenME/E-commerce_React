import { createSlice } from "@reduxjs/toolkit";
import type {  IProductsInitialState } from "@/interfaces/interfaces";
import getProducts from "../actions/getProducts";



const initialState: IProductsInitialState = {
  records: [],
  loading: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productsCleanUp: (state) => {
      state.records = [];
      state.loading = "idle";
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload;
      state.error = null;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      if (action.meta.aborted) return;
      state.loading = "rejected";
      state.error = action.payload || action.error.message || null;
    });
  },
});

export const { productsCleanUp } = productsSlice.actions;
export default productsSlice.reducer;
