
import { useAppDispatch, useAppSelector } from "@store/hook";
import { useEffect } from "react";
import getCategories from "@store/categories/actions/getCategories";
import { categoryCleanUp } from "@store/categories/categoriesSlice";
const useCategories = () => {
    const dispatch = useAppDispatch();
    const { loading, records, error } = useAppSelector(
        (state) => state.categories
    );

    useEffect(() => {
        const promise = dispatch(getCategories());

        return () => {
            dispatch(categoryCleanUp());
            promise.abort()
        };
    }, [dispatch]);
    return { loading, error, records }
}

export default useCategories