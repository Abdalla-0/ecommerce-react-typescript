import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosError from "@utils/axiosError";
import { RootState } from "@store/store";
import { TOrderItem } from "@types";

type TResponse = TOrderItem[]

const getPlaceOrder = createAsyncThunk("orders/getPlaceOrder", async (_, thunkAPI) => {
    const { rejectWithValue, getState, signal } = thunkAPI
    const { auth } = getState() as RootState


    try {
        const response = await axios.get<TResponse>(`/orders?userId=${auth.user?.id}`, { signal })
        return response.data
    } catch (error) {
        return rejectWithValue(axiosError(error))
    }
})

export default getPlaceOrder