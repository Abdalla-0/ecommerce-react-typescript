import { createSlice } from "@reduxjs/toolkit";
import likeToggle from "./actions/likeToggle";
import getWishList from "./actions/getWishList";
import { TLoading } from '../../types/shared.types';
import { TProduct } from '../../types/product.types';
import { isString } from "@types";
import { authLogout } from "@store/auth/authSlice";

interface IWishlistState {
    productsId: number[]
    productsFullInfo: TProduct[]
    error: null | string
    loading: TLoading
}

const initialState: IWishlistState = {
    productsId: [],
    productsFullInfo: [],
    error: null,
    loading: "idle"
}

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        wishlistFullInfoCleanUp: (state) => {
            state.productsFullInfo = []
        }
    },
    extraReducers: (builder) => {
        // ##################################  likeToggle  ##################################
        builder.addCase(likeToggle.pending, (state) => {
            state.error = null
        })
        builder.addCase(likeToggle.fulfilled, (state, action) => {
            if (action.payload.type === "add") {
                state.productsId = [...state.productsId, action.payload.id]
            } else {
                state.productsId = state.productsId.filter(id => id !== action.payload.id)
                state.productsFullInfo = state.productsFullInfo.filter(product => product.id !== action.payload.id)
            }
        })
        builder.addCase(likeToggle.rejected, (state, action) => {
            if (action.payload && typeof action.payload === "string") {
                state.error = action.payload
            }
        })
        // ##################################  getWishList  ##################################
        builder.addCase(getWishList.pending, (state) => {
            state.loading = "pending"
            state.error = null
        })
        builder.addCase(getWishList.fulfilled, (state, action) => {
            state.loading = "successeded"
            if (action.payload.dataType === "productsFullInfo") {
                state.productsFullInfo = action.payload.data as TProduct[]
            } else if (action.payload.dataType === "productsIds") {
                state.productsId = action.payload.data as number[]
            }

        })
        builder.addCase(getWishList.rejected, (state, action) => {
            state.loading = "failed"
            if (isString(action.payload)) {
                state.error = action.payload
            }
        })

        // when logout reset 
        builder.addCase(authLogout, (state) => {
            state.productsId = []
            state.productsFullInfo = []
        })

    }
})
export { likeToggle, getWishList };
export const { wishlistFullInfoCleanUp } = wishlistSlice.actions
export default wishlistSlice.reducer;