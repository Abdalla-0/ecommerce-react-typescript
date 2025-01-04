import { TProduct, TLoading, isString } from "@types";
import { createSlice } from "@reduxjs/toolkit";
import { getCartTotalQuantity } from "./selectors";
import getCart from "./actions/getCart";
interface ICartState {
    items: { [key: string]: number },
    productsFullInfo: TProduct[]
    loading: TLoading,
    error: null | string,
}

const initialState: ICartState = {
    items: {},
    productsFullInfo: [],
    loading: "idle",
    error: null
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const id = action.payload;
            if (state.items[id]) {
                state.items[id]++;
            } else {
                state.items[id] = 1;
            }
        },
        cartItemChangeQuantity: (state, action) => {
            state.items[action.payload.id] = action.payload.quantity;
        },
        cartItemRemove: (state, action) => {
            delete state.items[action.payload];
            state.productsFullInfo = state.productsFullInfo.filter(product => product.id !== action.payload);
        },
        cartFullInfoCleanUp: (state) => {
            state.productsFullInfo = []
        },
        cleanCartAfterPlaceOrder: (state => {
            state.items = {};
            state.productsFullInfo = [];
        })
    },
    extraReducers: (builder) => {
        builder.addCase(getCart.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        })
        builder.addCase(getCart.fulfilled, (state, action) => {
            state.loading = "successeded";
            state.productsFullInfo = action.payload;
        })
        builder.addCase(getCart.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        })
    }
})

export type { ICartState };
export { getCartTotalQuantity, getCart }
export const { addToCart, cartItemChangeQuantity, cartItemRemove, cartFullInfoCleanUp, cleanCartAfterPlaceOrder } = cartSlice.actions;
export default cartSlice.reducer;