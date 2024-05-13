// wishlistSlice.js
import { WishlistItem, Wishlist } from "@/types";
import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState: Wishlist = {
  wishlist: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addWishlist: (state, action) => {
      const newItem = action.payload;
      state.wishlist.push({ _id: newItem });
    },
    removeWishlist: (state, action) => {
      const itemIdToRemove = action.payload;
      state.wishlist = state.wishlist.filter(
        (item: WishlistItem) => item._id !== itemIdToRemove
      );
    },
    resetWishlist: () => initialState,
    setWishlist: (state, action) => {
      state.wishlist = action.payload;
    },
  },
});

const wishlist = (state: any) => state.wishlist.wishlist;

export const isOnWishlistSelector = createSelector(
  [wishlist, (_, itemId: string) => itemId],
  (wishlist, itemId) =>
    wishlist.some((item: WishlistItem) => item._id === itemId)
);

export const wishlistReducer = wishlistSlice.reducer;
export const { addWishlist, removeWishlist, resetWishlist, setWishlist } =
  wishlistSlice.actions;
