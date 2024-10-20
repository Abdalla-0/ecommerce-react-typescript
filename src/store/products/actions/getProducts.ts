import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TProduct } from '@types';
import { axiosError } from "@utils/index";

type TResponse = TProduct[];
const getProducts = createAsyncThunk('products/getProducts', async (prefix: string, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
        const response = await axios.get<TResponse>(`/products?cat_prefix=${prefix}`, { signal, }
        );
        return response.data;
    } catch (error) {
        return rejectWithValue(axiosError(error))
    }
})

export default getProducts;