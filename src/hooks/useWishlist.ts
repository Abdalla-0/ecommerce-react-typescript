import { getWishList } from "@store/wishlist/wishlistSlice";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { useEffect } from "react";
import { wishlistFullInfoCleanUp } from "@store/wishlist/wishlistSlice";
const useWishlist = () => {
    const dispatch = useAppDispatch();
    const { loading, productsFullInfo, error } = useAppSelector(
        (state) => state.wishlist
    );
    const cartItems = useAppSelector((state) => state.cart.items);
    const records = productsFullInfo.map((record) => ({
        ...record,
        quantity: cartItems[record.id],
        isLiked: true,
        isAuthenticated: true
    }));
    useEffect(() => {
        const promise = dispatch(getWishList("productsFullInfo"));

        return () => {
            dispatch(wishlistFullInfoCleanUp());
            promise.abort()
        };
    }, [dispatch]);
    return { loading, records, error }
}

export default useWishlist