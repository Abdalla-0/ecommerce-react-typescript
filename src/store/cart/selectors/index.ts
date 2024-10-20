import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@store/store";

export const getCartTotalQuantity = createSelector((state: RootState) => state.cart.items, (items) => {
    const totalQuantity = Object.values(items).reduce((acc, quantity) => acc + quantity, 0)
    return totalQuantity;
})
