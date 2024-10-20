import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosError from "@utils/axiosError";
import { RootState } from "@store/store";


const placeOrder = createAsyncThunk("orders/placeOrder", async (subtotal: number, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI
    const { cart, auth } = getState() as RootState

    const orderItems = cart.productsFullInfo.map((el) => ({ id: el.id, title: el.title, img: el.img, price: el.price, quantity: cart.items[el.id] }))

    try {
        const response = await axios.post("/orders", {
            userId: auth.user?.id,
            items: orderItems,
            subtotal,
        })
        return response.data
    } catch (error) {
        return rejectWithValue(axiosError(error))
    }
})

export default placeOrder