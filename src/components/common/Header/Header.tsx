import { Badge, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import styles from "./style.module.css";
import { NavLink } from "react-router-dom";
import HeaderInlineEnd from "./HeaderInlineEnd/HeaderInlineEnd";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { authLogout } from "@store/auth/authSlice";
import { useEffect } from "react";
import { getWishList } from "@store/wishlist/wishlistSlice";
const { headerRow, firstRow, secondRow } = styles;
const Header = () => {
  const dispatch = useAppDispatch();
  const { accessToken, user } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (accessToken) {
      dispatch(getWishList("productsIds"));
    }
  }, [dispatch, accessToken]);

  return (
    <header>
      <div className={`${headerRow}, ${firstRow}`}>
        <h1>
          <span>Our </span>
          <Badge as={NavLink} to={"/"} bg="warning">
            eCommerce
          </Badge>
        </h1>
        <HeaderInlineEnd />
      </div>
      <div className={`${headerRow}, ${secondRow}`}>
        <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="">
                <Nav.Link as={NavLink} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={NavLink} to="categories">
                  Categories
                </Nav.Link>
                <Nav.Link as={NavLink} to="about-us">
                  About
                </Nav.Link>
              </Nav>
              <Nav className="ms-auto">
                {!accessToken ? (
                  <>
                    <Nav.Link as={NavLink} to="/login">
                      Login
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/register">
                      Register
                    </Nav.Link>
                  </>
                ) : (
                  <NavDropdown
                    title={`Welcome : ${user?.firstName} ${user?.lastName}`}
                    id="basic-nav-dropdown"
                  >
                    <NavDropdown.Item as={NavLink} to="profile" end>
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="profile/orders">
                      Orders
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      as={NavLink}
                      to="/"
                      onClick={() => dispatch(authLogout())}
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </header>
  );
};

export default Header;
