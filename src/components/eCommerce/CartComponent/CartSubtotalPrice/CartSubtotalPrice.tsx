import { Button, Modal, Spinner } from "react-bootstrap";
import styles from "./styles.module.css";
import { TProduct } from "@types";
import { useState } from "react";
import { useAppDispatch } from "@store/hook";
import { cleanCartAfterPlaceOrder } from "@store/cart/cartSlice";
import getPlaceOrder from "@store/orders/actions/placeOrder";
type CartSubtotalPriceProps = {
  products: TProduct[];
  userAccessToken: string | null;
};
const CartSubtotalPrice = ({
  products,
  userAccessToken,
}: CartSubtotalPriceProps) => {
  const subtotal = products.reduce((acc, current) => {
    if (current.quantity && typeof current.quantity === "number") {
      return acc + current.price * current.quantity;
    } else {
      return acc;
    }
  }, 0);
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const modalHandler = () => {
    setShowModal(!showModal);
    setError(null);
  };

  const placeOrderHandler = () => {
    setLoading(true);
    dispatch(getPlaceOrder(subtotal))
      .unwrap()
      .then(() => {
        dispatch(cleanCartAfterPlaceOrder());
        setShowModal(false);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <Modal show={showModal} onHide={modalHandler} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Placing Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to place order with subtotal :{" "}
          {subtotal.toFixed(2)} EGP
          {!loading && error && (
            <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={modalHandler}>
            Close
          </Button>
          <Button
            variant="info"
            style={{ color: "white" }}
            onClick={placeOrderHandler}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm"></Spinner> Loading...
              </>
            ) : (
              "Confirm"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={styles.container}>
        <span>Subtotal:</span>
        <span>{subtotal.toFixed(2)} EGP</span>
      </div>
      {userAccessToken && (
        <div className={styles.container}>
          <Button
            variant="info"
            style={{ color: "white" }}
            onClick={modalHandler}
          >
            Place Order
          </Button>
        </div>
      )}
    </>
  );
};

export default CartSubtotalPrice;
