
import {
    cartItemChangeQuantity,
    cartItemRemove,
    getCart,
    cartFullInfoCleanUp,
} from "@store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { resetOrderStatus } from "@store/orders/orderSlise";
import { useCallback, useEffect } from "react";

const useCart = () => {
    const dispatch = useAppDispatch();
    const { items, productsFullInfo, loading, error } = useAppSelector(
        (state) => state.cart
    );

    const userAccessToken = useAppSelector(state => state.auth.accessToken)


    const placeOrderStatus = useAppSelector(state => state.orderSlice.loading)

    const products = productsFullInfo.map((el) => ({
        ...el,
        quantity: items[el.id],
    }));

    const changeQuantityHandler = useCallback(
        (id: number, quantity: number) => {
            dispatch(cartItemChangeQuantity({ id, quantity }));
        },
        [dispatch]
    );
    const removeItemHandler = useCallback(
        (id: number) => {
            dispatch(cartItemRemove(id));
        },
        [dispatch]
    );
    useEffect(() => {
        const promise = dispatch(getCart());
        return () => {
            promise.abort()
            dispatch(cartFullInfoCleanUp());
            dispatch(resetOrderStatus())
        };
    }, [dispatch]);
    return { products, loading, error, userAccessToken, placeOrderStatus, changeQuantityHandler, removeItemHandler }
}

export default useCart
