// src/store/store.ts
import { combineReducers, configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import categoriesReducer from "./categories/categoriesSlice";
import productsReducer from "./products/productsSlice";
import cartReducer from "./cart/cartSlice";

// 1. Root reducer combining all slice reducers
export const rootReducer = combineReducers({
  categories: categoriesReducer,
  products: productsReducer,
  cart: cartReducer,
});

// 2. Create listener middleware for side-effects
export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  predicate: (action) => action.type.startsWith("cart/"),
  effect: (_action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(state.cart.cartItems));
      }
    } catch (error) {
      console.error("Failed to save cartItems to localStorage:", error);
    }
  },
});

// 3. Factory function to create a new store instance (essential for tests)
export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(listenerMiddleware.middleware),
  });
};

// 4. Singleton store for the live application
export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
export default store;
