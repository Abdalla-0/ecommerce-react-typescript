import { createSlice } from "@reduxjs/toolkit";
import { isString, TLoading, TOrderItem } from "@types";
import placeOrder from "./actions/placeOrder";
import getPlaceOrders from "./actions/getPlaceOrders";
interface IOrderState {
    orderList: TOrderItem[];
    loading: TLoading;
    error: string | null;

}

const initialState: IOrderState = {
    orderList: [],
    loading: "idle",
    error: null,
}


const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        resetOrderStatus: (state) => {
            state.loading = "idle"
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(placeOrder.pending, (state) => {
            state.loading = "pending"
            state.error = null
        })
        builder.addCase(placeOrder.fulfilled, (state) => {
            state.loading = "successeded"
        })
        builder.addCase(placeOrder.rejected, (state, action) => {
            state.loading = "failed"
            if (isString(action.payload)) {
                state.error = action.payload
            }
        })
        // get place order
        builder.addCase(getPlaceOrders.pending, (state) => {
            state.loading = "pending"
            state.error = null
        })
        builder.addCase(getPlaceOrders.fulfilled, (state, action) => {
            state.loading = "successeded"
            state.orderList = action.payload
        })
        builder.addCase(getPlaceOrders.rejected, (state, action) => {
            state.loading = "failed"
            if (isString(action.payload)) {
                state.error = action.payload
            }
        })
    },
})
export { placeOrder, getPlaceOrders }
export const { resetOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;