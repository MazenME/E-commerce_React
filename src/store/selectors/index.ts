import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const getTotalQuantity = createSelector(
  (state: RootState) => state.cart.cartItems,
  (cartItems) =>
    Object.values(cartItems).reduce(
      (total: number, quantity: number) => total + quantity,
      0
    )
);

export { getTotalQuantity }