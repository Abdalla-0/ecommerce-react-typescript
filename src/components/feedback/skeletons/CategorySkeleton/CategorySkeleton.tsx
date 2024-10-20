import { Col, Row } from "react-bootstrap";
import ContentLoader from "react-content-loader";

const CategorySkeleton = () => {
  const skeletons = Array(4).fill(0);
  return (
    <Row>
      {skeletons.map((_, index) => (
        <Col
          key={index}
          sx={3}
          className="d-flex justify-content-center mb-5 mt-2"
        >
          <ContentLoader
            speed={2}
            width={180}
            height={207}
            viewBox="0 0 180 207"
            backgroundColor="#e0e0e0"
            foregroundColor="#d9d9d9"
          >
            <rect x="45" y="191" rx="3" ry="3" width="96" height="5" />
            <circle cx="89" cy="89" r="83" />
          </ContentLoader>
        </Col>
      ))}
    </Row>
  );
};

export default CategorySkeleton;
