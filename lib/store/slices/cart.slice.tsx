import { createSelector, createSlice } from "@reduxjs/toolkit";
import { Cart, CartItem } from "@/types";
import { Types } from "mongoose";

const initialState: Cart = {
  userClerkId: "",
  items: [],
  totalAmount: 0,
  totalQuantity: 0,
  expireAt: null,
  _id: "",
};

// Use State with car, refetch the car once (just at start) that's actually fucking genius!
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = state.items.find(
        (item) => item.product._id === action.payload._id
      );
      if (item) {
        item.quantity++;
        state.totalQuantity++;
      } else {
        state.items.push({ product: { ...action.payload }, quantity: 1 });
        state.totalQuantity++;
      }
    },
    removeItem: (state, action) => {
      let actualItem = action.payload.item;
      const itemIndex = state.items.findIndex(
        (item) => item.product._id === action.payload.item.product._id
      );
      state.items.splice(itemIndex, 1);
      state.totalQuantity -= actualItem.quantity;
    },
    increaseItemQuantity: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.product._id === action.payload.item.product._id
      );
      state.items[itemIndex].quantity++;
      state.totalQuantity++;
    },
    decreaseItemQuantity: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.product._id === action.payload.item.product._id
      );
      state.items[itemIndex].quantity--;
      state.totalQuantity--;
    },
    setCart: (state, action) => {
      const { userClerkId, items, totalAmount, totalQuantity, expireAt, _id } =
        action.payload;
      state.userClerkId = userClerkId;
      state.items = items;
      state.totalAmount = totalAmount;
      state.totalQuantity = totalQuantity;
      state.expireAt = expireAt;
      if (_id) {
        state._id = _id;
      }
    },
    resetCart: () => initialState,
  },
});

// Custom Selectors
const cart = (state: any) => state.cart;

export const totalQuantityCartSelector = createSelector(
  [cart],
  (cart) => cart.totalQuantity
);

export const countCartItemsSelector = createSelector(
  [cart],
  (cart) => cart.items.length
);

export const cartIdSelector = createSelector([cart], (cart) => cart._id);

export const subtotalCartSelector = createSelector([cart], (cart) =>
  cart.items.reduce((subtotal: number, current: CartItem) => {
    return (subtotal += current.product.price * current.quantity);
  }, 0)
);

export const totalPointsCartSelector = createSelector([cart], (cart) =>
  cart.items.reduce((points: number, current: CartItem) => {
    return (points += Math.round(
      current.product.price * current.quantity * 50
    ));
  }, 0)
);

// Exports
export const cartReducer = cartSlice.reducer;
export const {
  setCart,
  resetCart,
  addItem,
  removeItem,
  increaseItemQuantity,
  decreaseItemQuantity,
} = cartSlice.actions;
