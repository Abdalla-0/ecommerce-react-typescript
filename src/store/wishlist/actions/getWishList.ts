import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosError } from "@utils/index";
import { TProduct } from '@types';
import { RootState } from "@store/store";


type TDataType = "productsFullInfo" | "productsIds"
type TResponse = TProduct[]

const getWishList = createAsyncThunk("wishlist/getWishList", async (dataType: TDataType, thunkAPI) => {
    const { rejectWithValue, signal, getState } = thunkAPI
    const { auth } = getState() as RootState

    try {
        const userWishList = await axios.get<{ productId: number }[]>(`/wishlist?userId=${auth.user?.id}`)
        if (!userWishList.data.length) {
            return { data: [], dataType: "empty" }
        }

        if (dataType === "productsIds") {
            const concatenatedItemsId = userWishList.data.map((el) => el.productId)
            return { data: concatenatedItemsId, dataType: "productsIds" }
        } else {
            const concatenatedItemsId = userWishList.data.map((el) => `id=${el.productId}`).join("&")
            const response = await axios.get<TResponse>(`/products?${concatenatedItemsId}`, { signal })
            return { data: response.data, dataType: "productsFullInfo" }
        }


    } catch (error) {
        return rejectWithValue(axiosError(error))
    }
})
export default getWishList;