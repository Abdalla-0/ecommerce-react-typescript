import { createSlice } from "@reduxjs/toolkit";
import getProducts from "./actions/getProducts";
import { TLoading, TProduct, isString } from '@types';

interface IProductsState {
    records: TProduct[],
    loading: TLoading,
    error: string | null,
}

const initialState: IProductsState = {
    records: [],
    loading: "idle",
    error: null
}

const ProductSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        ProductsCleanUp: (state) => {
            state.records = []
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state) => {
            state.loading = "pending"
            state.error = null
        })
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.loading = "successeded"
            state.records = action.payload

        })
        builder.addCase(getProducts.rejected, (state, action) => {
            state.loading = "failed"
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        })
    }
});
export type { IProductsState }
export const { ProductsCleanUp } = ProductSlice.actions;
export default ProductSlice.reducer;