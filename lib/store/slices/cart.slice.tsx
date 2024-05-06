import { createSelector, createSlice } from "@reduxjs/toolkit";
import { Cart, Item } from "@/types";

const initialState: Cart = {
  items: [],
  totalPrice: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = state.items.find(
        (item) => item.product._id === action.payload.product._id
      );

      if (item) {
        item.quantity++;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
        state.totalQuantity++;
      }
    },
    removeItem: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.product._id === action.payload.item.product._id
      );
      state.items.splice(itemIndex, 1);
      state.totalQuantity--;
    },
    increaseItemQuantity: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.product._id === action.payload.item.product._id
      );
      state.items[itemIndex].quantity++;
    },
    decreaseItemQuantity: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.product._id === action.payload.item.product._id
      );
      state.items[itemIndex].quantity--;
    },
  },
});

// Custom Selectors
const cart = (state: any) => state.cart;

export const totalCartItemsSelector = createSelector(
  [cart],
  (cart) => cart.totalQuantity
);

export const subtotalCartSelector = createSelector([cart], (cart) =>
  cart.items.reduce((subtotal: number, current: Item) => {
    return (subtotal += current.product.price * current.quantity);
  }, 0)
);

// Exports
export const cartReducer = cartSlice.reducer;
export const {
  addItem,
  removeItem,
  increaseItemQuantity,
  decreaseItemQuantity,
} = cartSlice.actions;
