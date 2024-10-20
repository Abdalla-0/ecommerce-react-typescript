import { createSlice } from "@reduxjs/toolkit";
import getCategories from "./actions/getCategories";
import { TLoading, TCategory, isString } from '@types';

interface ICategoriesState {
    records: TCategory[],
    loading: TLoading,
    error: string | null,
}

const initialState: ICategoriesState = {
    records: [],
    loading: "idle",
    error: null
}

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        categoryCleanUp: (state) => {
            state.records = []
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCategories.pending, (state) => {
            state.loading = "pending"
            state.error = null
        })
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.loading = "successeded"
            state.records = action.payload
        })
        builder.addCase(getCategories.rejected, (state, action) => {
            state.loading = "failed"
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        })
    }
});
export const { categoryCleanUp } = categoriesSlice.actions
export default categoriesSlice.reducer;