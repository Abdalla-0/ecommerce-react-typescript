import styles from "./styles.module.css";
type productInfoProps = {
  title: string;
  img: string;
  price: number;
  quantity?: number;
  direction?: "Row" | "Column";
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

const ProductInfo = ({
  title,
  img,
  price,
  quantity,
  direction = "Row",
  style,
  children,
}: productInfoProps) => {
  return (
    <div className={`${styles[`product${direction}`]}`} style={style}>
      <div className={`${styles[`productImg${direction}`]}`} style={style}>
        <img src={img} alt={title} />
      </div>
      <div className={`${styles[`productInfo${direction}`]}`} style={style}>
        <h2>{title}</h2>
        <h3>{price.toFixed(2)} EGP</h3>
        {quantity && <h3>Total Quantity : {quantity}</h3>}
        {quantity && <h3>Total Price : {(quantity * price).toFixed(2)}</h3>}
        {children}
      </div>
    </div>
  );
};

export default ProductInfo;
