import type { ICartInitialState } from "@/interfaces/interfaces";
import { createSlice } from "@reduxjs/toolkit";


const storedCart = localStorage.getItem("cartItems");
const initialCartItems = storedCart ? JSON.parse(storedCart) : {};

const initialState: ICartInitialState = {
  cartItems: initialCartItems,
  productInfo: [],
  loading: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id } = action.payload;
      state.cartItems[id] = (state.cartItems[id] || 0) + 1;
    },
  },
});



export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
