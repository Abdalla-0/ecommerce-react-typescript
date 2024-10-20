import { useAppDispatch, useAppSelector } from "@store/hook";
import { useEffect } from "react";
import getProducts from "@store/products/actions/getProducts";
import { useParams } from "react-router-dom";
import { ProductsCleanUp } from "@store/products/productsSlice";
const useProducts = () => {

    const dispatch = useAppDispatch();
    const { loading, records, error } = useAppSelector((state) => state.products);
    const userAccessToken = useAppSelector((state) => state.auth.accessToken);
    const cartItems = useAppSelector((state) => state.cart.items);
    const wishlistProductsId = useAppSelector(
        (state) => state.wishlist.productsId
    );

    const productsFullInfo = records.map((record) => ({
        ...record,
        quantity: cartItems[record.id],
        isLiked: wishlistProductsId.includes(record.id),
        isAuthenticated: userAccessToken ? true : false,
    }));
    const params = useParams();
    const prefix = params.prefix as string;

    useEffect(() => {
        const promise = dispatch(getProducts(prefix as string));
        return () => {
            dispatch(ProductsCleanUp());
            promise.abort()
        };
    }, [dispatch, prefix]);
    return { loading, productsFullInfo, error, prefix }
}

export default useProducts