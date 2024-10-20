import { Heading } from "@components/common";
import { CartItemList, CartSubtotalPrice } from "@components/eCommerce/";
import Loading from "@components/feedback/Loading/Loading";
import useCart from "@hooks/useCart";
import { LottieHandler } from "@components/feedback";
const Cart = () => {
  const {
    products,
    loading,
    error,
    userAccessToken,
    placeOrderStatus,
    changeQuantityHandler,
    removeItemHandler,
  } = useCart();
  return (
    <>
      <Heading name="Cart" />
      <Loading loading={loading} error={error} type="cart">
        {products.length ? (
          <>
            <CartItemList
              products={products}
              changeQuantityHandler={changeQuantityHandler}
              removeItemHandler={removeItemHandler}
            />
            <CartSubtotalPrice
              products={products}
              userAccessToken={userAccessToken}
            />
          </>
        ) : placeOrderStatus === "successeded" ? (
          <LottieHandler
            type="success"
            message="Your order has been placed successfully"
          ></LottieHandler>
        ) : (
          <LottieHandler
            type="empty"
            message="No items in the cart. Please add some products."
          />
        )}
      </Loading>
    </>
  );
};

export default Cart;
