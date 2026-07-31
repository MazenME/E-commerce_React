import { createSlice } from "@reduxjs/toolkit";
import getCategories from "@/store/actions/getCategories";
import type { IInitialState } from "@/interfaces/interfaces";



const initialState: IInitialState = {
  records: [],
  loading: "idle" ,
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload;
      state.error = null;
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      if (action.meta.aborted) return;
      state.loading = "rejected";
      state.error = action.payload ?? null;
    });

  },
});

export default categoriesSlice.reducer;
