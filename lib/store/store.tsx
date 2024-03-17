import { configureStore } from "@reduxjs/toolkit";
import { bagReducer } from "./slices/bag.slice";

export const store = configureStore({
  reducer: {
    bag: bagReducer
  },
});

