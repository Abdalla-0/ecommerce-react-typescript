import { Button, Modal, Spinner } from "react-bootstrap";
import styles from "./styles.module.css";
import { TProduct } from "../../../types/product.types";
import { useAppDispatch } from "@store/hook";
import { addToCart } from "@store/cart/cartSlice";
import { likeToggle } from "@store/wishlist/wishlistSlice";
import { memo, useState } from "react";
import { LikeIcon, LikeFillIcon } from "@assets/svg/index";
import ProductInfo from "../productInfo/productInfo";
const { maxNote, whishlistBtn } = styles;
const Product = memo(
  ({
    id,
    title,
    img,
    price,
    max,
    quantity,
    isLiked,
    isAuthenticated,
  }: TProduct) => {
    const dispath = useAppDispatch();
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);
    const currentRemainingQuantity = max - (quantity ?? 0);
    const quantityReachedToMax = currentRemainingQuantity <= 0 ? true : false;
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const addToCartHandler = () => {
      dispath(addToCart(id));
      setIsBtnDisabled(true);
      const debounce = setTimeout(() => {
        setIsBtnDisabled(false);
      }, 300);
      return () => clearTimeout(debounce);
    };
    const likeToggleHandler = () => {
      if (isAuthenticated) {
        if (!isLoading) {
          setIsLoading(true);
          dispath(likeToggle(id))
            .unwrap()
            .then(() => setIsLoading(false))
            .catch(() => setIsLoading(false));
        }
      } else {
        setShowModal(true);
      }
    };
    return (
      <>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Login Required</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>You need to login first to add this item to your whishlist.</p>
          </Modal.Body>
        </Modal>
        <ProductInfo title={title} price={price} img={img} direction="Column">
          <div className={whishlistBtn} onClick={likeToggleHandler}>
            {isLoading ? (
              <Spinner variant="primary" animation="border" size="sm" />
            ) : isLiked ? (
              <LikeFillIcon />
            ) : (
              <LikeIcon />
            )}
          </div>
          <p className={maxNote}>
            {quantityReachedToMax
              ? "You Have Reached To Max Quantity"
              : `You Can Add ${currentRemainingQuantity} item(s)`}
          </p>
          <Button
            onClick={addToCartHandler}
            variant="info"
            style={{ color: "white" }}
            disabled={isBtnDisabled || quantityReachedToMax}
          >
            {isBtnDisabled ? (
              <>
                <Spinner animation="border" size="sm" /> Loading...
              </>
            ) : (
              "Add to Cart"
            )}
          </Button>
        </ProductInfo>
      </>
    );
  }
);

export default Product;
