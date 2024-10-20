import Arrow from "@assets/svg/arrow.svg?react";
import styles from "./styles.module.css";
import { memo } from "react";
const { headingBox, arrowBox, arrowIcon, prefixTitle, disabled } = styles;
const Heading = memo(
  ({
    prefix,
    name,
    arrow,
  }: {
    prefix?: string;
    name: string;
    arrow?: boolean;
  }) => {
    return (
      <div className={headingBox}>
        <span className={prefix ? prefixTitle : disabled}>{prefix}</span>
        <span className={arrow ? arrowBox : disabled}>
          <Arrow className={arrowIcon} />
        </span>
        <span>{name}</span>
      </div>
    );
  }
);

export default Heading;
