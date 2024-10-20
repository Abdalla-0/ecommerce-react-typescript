import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosError from "@utils/axiosError";


type TFormDate = {
    email: string,
    password: string
}

type TResponse = {
    accessToken: string,
    user: {
        id: number,
        firstName: string,
        lastName: string,
        email: string
    }
}

const authLogin = createAsyncThunk("auth/authLogin", async (formData: TFormDate, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const response = await axios.post<TResponse>("/login", formData)

        return response.data
    } catch (error) {
        rejectWithValue(axiosError(error))
    }
})


export default authLogin;