import { createSelector, createSlice } from "@reduxjs/toolkit";
import { Bag, Item } from "@/types";

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
        }
    },
});

// Custom Selectors
const bag = (state: any) => state.bag;

export const totalBagItemsSelector = createSelector(
    [bag],
    (bag) => bag.totalQuantity
);

export const subtotalBagSelector = createSelector([bag], (bag) =>
    bag.items.reduce((subtotal: number, current: Item) => {
        return subtotal += current.product.price * current.quantity;
     }, 0)
);

// Exports
export const bagReducer = bagSlice.reducer;
export const { addItem, removeItem, increaseItemQuantity, decreaseItemQuantity } = bagSlice.actions;
