import { Container } from "react-bootstrap";
import { Category } from "@components/eCommerce";
import Loading from "@components/feedback/Loading/Loading";
import GridList from "@components/common/GridList/GridList";
import useCategories from "@hooks/useCategories";
import { Heading } from "@components/common";
const Categories = () => {
  const { loading, records, error } = useCategories();
  return (
    <Container>
      <Heading name="Categories" />
      <Loading loading={loading} error={error}>
        <GridList
          emptyMessage="No categories found"
          records={records}
          renderItem={(record) => <Category {...record} />}
        />
      </Loading>
    </Container>
  );
};

export default Categories;
