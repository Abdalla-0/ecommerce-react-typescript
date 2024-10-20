import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const { itemBox, itemIcon, totalNum, pumpAnimate } = styles;

type HeaderCounterProps = {
  totalQuantity: number;
  pagePath: string;
  svgIcon?: React.ReactNode;
  title: string;
};

const HeaderCounter = ({
  totalQuantity,
  pagePath,
  svgIcon,
  title,
}: HeaderCounterProps) => {
  const [isAnimate, setIsAnimate] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!totalQuantity) return;
    setIsAnimate(true);
    const debounce = setTimeout(() => {
      setIsAnimate(false);
    }, 300);
    return () => clearTimeout(debounce);
  }, [totalQuantity]);
  return (
    <div className={itemBox} onClick={() => navigate(pagePath)}>
      <span className={itemIcon}>{svgIcon}</span>
      <span className={`${totalNum} ${isAnimate ? pumpAnimate : null}`}>
        {totalQuantity}
      </span>
      <h3>{title}</h3>
    </div>
  );
};

export default HeaderCounter;
