import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosError } from "@utils/index";


type TFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string
}

const authRegister = createAsyncThunk("auth/authRegister", async (formData: TFormData, thunk) => {
    const { rejectWithValue } = thunk
    const response = await axios.post(`/register`, formData)
    try {
        return response.data
        
    } catch (error) {
        return rejectWithValue(axiosError(error))
    }
})

export default authRegister;