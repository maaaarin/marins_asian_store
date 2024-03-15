import { configureStore } from "@reduxjs/toolkit";
import { bagReducer } from "./bag.slice";

export const store = configureStore({
  reducer: {
    bag: bagReducer
  },
});

