import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "@store/store";
import { TProduct } from "@types";
import { axiosError } from "@utils/index";
type TResponse = TProduct[];
const getCart = createAsyncThunk('cart/getCart', async (_, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue, getState, signal } = thunkAPI;
    const { cart } = getState() as RootState;
    const itemsId = Object.keys(cart.items);
    if (!itemsId.length) {
        return fulfillWithValue([]);
    }
    try {
        const concatenatedIds = itemsId.map(id => `id=${id}`).join("&");

        const response = await axios.get<TResponse>(`/api/products.json?${concatenatedIds}`, { signal });
        return response.data;
    } catch (error) {
        return rejectWithValue(axiosError(error))
    }


});

export default getCart;
