import { Heading } from "@components/common";
import Input from "@components/form/Input/Input";
import useLogin from "@hooks/useLogin";
import { Form, Button, Row, Col, Alert, Spinner } from "react-bootstrap";
import { Navigate } from "react-router-dom";

const Login = () => {
  const {
    loading,
    error,
    accessToken,
    register,
    handleSubmit,
    formErrors,
    submitForm,
    searchParam,
  } = useLogin();
  if (accessToken) {
    return <Navigate to={"/"} />;
  }
  return (
    <>
      <Heading name="User Login" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          {searchParam.get("message") === "login_required" && (
            <Alert variant="danger">You Need to login to continue.</Alert>
          )}
          {searchParam.get("message") === "account_created" && (
            <Alert variant="success">
              Registration successful! Please login to continue.
            </Alert>
          )}
          <Form className="mt-3" onSubmit={handleSubmit(submitForm)}>
            <Input
              label="Email Addresse"
              name="email"
              register={register}
              error={formErrors.email?.message as string}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              register={register}
              error={formErrors.password?.message as string}
            />
            <Button variant="info" type="submit" style={{ color: "white" }}>
              {loading === "pending" ? (
                <>
                  <Spinner animation="border" size="sm"></Spinner> Loading...
                </>
              ) : (
                "Submit"
              )}
            </Button>
            {error && <p className="text-danger">{error}</p>}
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Login;
