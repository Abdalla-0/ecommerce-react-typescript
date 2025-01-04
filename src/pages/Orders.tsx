import { Heading } from "@components/common";
import { Modal, Table } from "react-bootstrap";
import Loading from "@components/feedback/Loading/Loading";
import { ProductInfo } from "@components/eCommerce";
import useOrders from "@hooks/useOrders";

const Orders = () => {
  const {
    loading,
    error,
    orderList,
    showModal,
    selectedProduct,
    viewDetailsHandler,
    closeModalHandler,
  } = useOrders();
  return (
    <>
      <Modal show={showModal} onHide={closeModalHandler}>
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct.map((el) => (
            <ProductInfo
              key={el.id}
              title={el.title}
              img={el.img}
              price={el.price}
              quantity={el.quantity}
              style={{ marginBottom: "8px" }}
            />
          ))}
        </Modal.Body>
      </Modal>
      <Heading name="My Orders" />
      <Loading loading={loading} error={error} type="table">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Items</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((el) => (
              <tr key={el.id}>
                <td>#{el.id}</td>
                <td>
                  {el.items.length?.toString()} item(s)
                  {" / "}
                  <span
                    style={{ textDecoration: "underLine", cursor: "pointer" }}
                    onClick={() => viewDetailsHandler(el.id)}
                  >
                    Product Details
                  </span>
                </td>
                <td>{el.subtotal.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Loading>
    </>
  );
};

export default Orders;
