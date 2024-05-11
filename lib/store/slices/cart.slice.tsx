import { createSelector, createSlice } from "@reduxjs/toolkit";
import { Cart, CartItem } from "@/types";

const initialState: Cart = {
  userClerkId: "",
  items: [],
  totalPrice: 0,
  totalQuantity: 0,
  expireAt: null,
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
      } else {
        state.items.push({ product: { ...action.payload }, quantity: 1 });
        state.totalQuantity++;
      }
    },
    removeItem: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.product._id === action.payload.itemx._id
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
    setCart: (state, action) => {
      return action.payload;
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

export const subtotalCartSelector = createSelector([cart], (cart) =>
  cart.items.reduce((subtotal: number, current: CartItem) => {
    return (subtotal += current.product.price * current.quantity);
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
