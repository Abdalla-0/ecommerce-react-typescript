import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TCategory } from '@types';
import { axiosError } from "@utils/index";

type TResponse = TCategory[];
const getCategories = createAsyncThunk('categories/getCategories', async (_, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
        const response = await axios.get<TResponse>('/api/categories.json', { signal });
        return response.data;
    } catch (error) {
        return rejectWithValue(axiosError(error))
    }
})

export default getCategories;