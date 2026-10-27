import type { ICartInitialState } from "@/interfaces/interfaces";
import { createSlice } from "@reduxjs/toolkit";
import getCartProducts from "@/store/actions/getCartProducts";

const getInitialCartItems = (): { [id: number]: number } => {
  try {
    if (typeof window === "undefined") return {};
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : {};
  } catch (error) {
    console.error("Failed to parse cartItems from localStorage:", error);
    return {};
  }
};

const initialState: ICartInitialState = {
  cartItems: getInitialCartItems(),
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

    changeQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      if(quantity > 0){
        state.cartItems[id] = quantity;
      }else{
        delete state.cartItems[id];
      }
    },

    removeFromCart: (state, action) => {
      const { id } = action.payload;
      delete state.cartItems[id];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartProducts.fulfilled, (state, action) => {
        state.loading = "succeeded";  
        state.productInfo = action.payload;
      })
      .addCase(getCartProducts.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getCartProducts.rejected, (state, action) => {
        state.loading = "rejected";
        if (action.payload && typeof action.payload === "string") {
          state.error = action.payload;
        }
      });
  },
});

export const { addToCart, changeQuantity, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
