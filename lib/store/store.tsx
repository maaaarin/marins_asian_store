import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./slices/cart.slice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
