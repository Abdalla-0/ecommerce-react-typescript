import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LottieHandler } from "@components/feedback";

const Error = () => {
  return (
    <Container className="notFound">
      <div className="d-flex justify-content-center align-items-center flex-column row-gap-3">
        <LottieHandler type="notFound" />
        <Link to="/" replace={true}>
          How about going back to safety?
        </Link>
      </div>
    </Container>
  );
};

export default Error;
