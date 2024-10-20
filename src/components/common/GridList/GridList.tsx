import { LottieHandler } from "@components/feedback";
import { Col, Row } from "react-bootstrap";

type TGridListProps<T> = {
  records: T[];
  renderItem: (record: T) => React.ReactNode;
  emptyMessage: string;
};
type hasId = { id?: number };
const GridList = <T extends hasId>({
  records,
  renderItem,
  emptyMessage,
}: TGridListProps<T>) => {
  return (
    <Row>
      {records.length > 0 ? (
        records.map((record) => {
          return (
            <Col
              key={record.id}
              xs={6}
              md={3}
              className="d-flex justify-content-center mb-5 mt-2"
            >
              {renderItem(record)}
            </Col>
          );
        })
      ) : (
        <LottieHandler type="empty" message={emptyMessage} />
      )}
    </Row>
  );
};

export default GridList;
