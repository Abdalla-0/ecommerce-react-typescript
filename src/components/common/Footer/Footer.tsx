import styles from "./styles.module.css";
const { footer, copyRights } = styles;
const Footer = () => {
  return (
    <div className={footer}>
      <h1>Footer</h1>
      <div className={copyRights}>© 2024 Our Ecom. All rights reserved.</div>
    </div>
  );
};

export default Footer;
