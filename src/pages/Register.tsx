import { Heading } from "@components/common";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import Input from "@components/form/Input/Input";
import { Navigate } from "react-router-dom";
import useRegister from "@hooks/useRegister";

const Register = () => {
  const {
    loading,
    error,
    accessToken,
    register,
    handleSubmit,
    emailAvailibility,
    submitForm,
    emailOnBlurHandler,
    formErrors,
  } = useRegister();
  if (accessToken) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <Heading name="User Registeration" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form className="my-3" onSubmit={handleSubmit(submitForm)}>
            <Input
              label="First Name"
              name="firstName"
              register={register}
              error={formErrors.lastName?.message as string}
            />
            <Input
              label="Last Name"
              name="lastName"
              register={register}
              error={formErrors.lastName?.message as string}
            />
            <Input
              label="Email Addresse"
              name="email"
              register={register}
              onBlur={emailOnBlurHandler}
              formText={
                emailAvailibility === "chicking" ? "loading please wait " : " "
              }
              error={
                (formErrors.email?.message as string)
                  ? (formErrors.email?.message as string)
                  : emailAvailibility === "notAvailable"
                  ? "this email is already in use."
                  : emailAvailibility === "faild"
                  ? "error from the server."
                  : ""
              }
              success={
                emailAvailibility === "available"
                  ? "this email is available for use."
                  : ""
              }
              disabled={emailAvailibility === "chicking" ? true : false}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              register={register}
              error={formErrors.password?.message as string}
            />
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              register={register}
              error={formErrors.confirmPassword?.message as string}
            />
            <Button
              variant="info"
              type="submit"
              style={{ color: "white" }}
              disabled={
                emailAvailibility === "chicking"
                  ? true
                  : false || loading === "pending"
              }
            >
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

export default Register;
