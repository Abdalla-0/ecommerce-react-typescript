
import { useAppDispatch, useAppSelector } from "@store/hook";
import { getPlaceOrders, resetOrderStatus } from "@store/orders/orderSlise";
import { useEffect, useState } from "react";
import { TProduct } from "@types";
const useOrders = () => {
    const dispatch = useAppDispatch();
    const { loading, error, orderList } = useAppSelector(
        (state) => state.orderSlice
    );
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<TProduct[]>([]);
    const viewDetailsHandler = (id: number) => {
        const producDetails = orderList.find((order) => order.id === id);
        const newItems = producDetails?.items ?? [];
        setShowModal(true);
        if (Array.isArray(newItems)) {
            setSelectedProduct((prev) => [...prev, ...newItems]);
        } else {
            setSelectedProduct((prev) => [...prev]);
        }

    };

    const closeModalHandler = () => {
        setShowModal(false);
        setSelectedProduct([]);
    };
    useEffect(() => {
        const promise = dispatch(getPlaceOrders());
        return () => {
            promise.abort();
            dispatch(resetOrderStatus());
        };
    }, [dispatch]);
    return { loading, error, orderList, showModal, selectedProduct, viewDetailsHandler, closeModalHandler }
}

export default useOrders