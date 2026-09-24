// src/store/store.ts
import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import categoriesReducer from "./categories/categoriesSlice";
import productsReducer from "./products/productsSlice";
import cartReducer from "./cart/cartSlice";

// 1. Create the listener middleware
const listenerMiddleware = createListenerMiddleware();

// 2. Automatically listen to any action starting with "cart/" (addToCart, removeItem, etc.)
listenerMiddleware.startListening({
  predicate: (action) => action.type.startsWith("cart/"),
  effect: (_action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    localStorage.setItem("cartItems", JSON.stringify(state.cart.cartItems));
  },
});

// 3. Configure the store
export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
