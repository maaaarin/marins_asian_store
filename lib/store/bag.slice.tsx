import { createSelector, createSlice } from "@reduxjs/toolkit";
import { Bag } from "@/types";

const initialState: Bag = {
    items: [],
    totalPrice: 0,
    totalQuantity: 0,
};

const bagSlice = createSlice({
    name: "bag",
    initialState,
    reducers: {
        addItem: (state, action) => {
            const bagItems = state.items.find(
                (item) => item.product._id === action.payload.product._id
            );

            if (bagItems) {
                bagItems.quantity++;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
                state.totalQuantity++;
            }
        },
    },
});

// Custom Selectors
const bag = (state: any) => state.bag;
export const totalBagItemsSelector = createSelector([bag], (state: any) => state.totalQuantity);

// Exports
export const bagReducer = bagSlice.reducer;
export const { addItem } = bagSlice.actions;
