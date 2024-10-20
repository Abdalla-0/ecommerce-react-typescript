import { Form, Button } from "react-bootstrap";
import styles from "./styles.module.css";
import { TProduct } from "@types";
import { memo } from "react";
import ProductInfo from "@components/eCommerce/productInfo/productInfo";

const { cartItem, cartItemSelection } = styles;

type CartItemProps = TProduct & {
  changeQuantityHandler: (id: number, quantity: number) => void;
  removeItemHandler: (id: number) => void;
};

const CartItem = memo(
  ({
    id,
    title,
    img,
    price,
    quantity,
    max,
    changeQuantityHandler,
    removeItemHandler,
  }: CartItemProps) => {
    const changeQuantity = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const quantity = +e.target.value;
      changeQuantityHandler(id, quantity);
    };

    return (
      <div className={cartItem}>
        <ProductInfo title={title} img={img} price={price}>
          <Button
            variant="secondary"
            style={{
              color: "white",
              width: "100px",
              paddingInline: "4px",
              paddingBlock: "4px",
              fontSize: "14px",
            }}
            className="mt-auto"
            onClick={() => removeItemHandler(id)}
          >
            Remove
          </Button>
        </ProductInfo>
        <div className={cartItemSelection}>
          <span className="d-block mb-1">Quantity</span>
          <Form.Select value={quantity} onChange={changeQuantity}>
            {Array(max)
              .fill(0)
              .map((_, index) => {
                const quantity = ++index;
                return (
                  <option value={quantity} key={quantity}>
                    {quantity}
                  </option>
                );
              })}
          </Form.Select>
        </div>
      </div>
    );
  }
);

export default CartItem;
