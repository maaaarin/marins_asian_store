import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./slices/cart.slice";
import { wishlistReducer } from "./slices/wishlist.slice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});
