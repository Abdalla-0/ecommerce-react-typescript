import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "@components/common/index";
import styles from "./style.module.css";

const { index, wrapper } = styles;
const MainLayout = () => {
  return (
    <Container>
      <div id={index}>
        <Header />
        <div className={wrapper}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </Container>
  );
};

export default MainLayout;
