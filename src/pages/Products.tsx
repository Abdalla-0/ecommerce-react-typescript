import { Container } from "react-bootstrap";
import { Product } from "@components/eCommerce/index";
import { memo } from "react";
import Loading from "@components/feedback/Loading/Loading";
import { Heading, GridList } from "@components/common";
import useProducts from "@hooks/useProducts";
const Products = memo(() => {
  const { loading, error, productsFullInfo, prefix } = useProducts();
  return (
    <Container>
      <Heading prefix={prefix} name="Products" arrow={true} />
      <Loading loading={loading} error={error} type="product">
        <GridList
          emptyMessage="No products found"
          records={productsFullInfo}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </Container>
  );
});

export default Products;
