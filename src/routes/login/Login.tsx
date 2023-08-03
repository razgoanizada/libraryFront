import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";
import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import library from "../../images/library.jpg";
import "./Login.css";
import authService from "../../service/auth-service";
import AuthContext from "../../contexts/AuthContext";

const Login = () => {
  const {login } = useContext(AuthContext);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const validationSchema = Yup.object({
    username: Yup.string().required("User Name is a required field"),
    password: Yup.string().required("password is a required field"),
  });

  const initialValues = {
    username: "",
    password: "",
  };

  return (
    <Formik
    validationSchema={validationSchema}
    initialValues={initialValues}
    onSubmit={({ username, password }) => {
      setLoading(true);
      setError(undefined);
      authService
        .login(username, password)
        .then((res) => {
          login(username, res.data.jwt, res.data.permission);
        })
        .catch(() => {
          setLoading(false);
          setError("Sign in failed, username or password is incorrect");
        })
        .finally(() => {
          setLoading(false);
        });
    }}
  >
    {(formik) => (
      <div className="d-flex text-center align-items-center bg-light">
        <div className="login w-100 w-sm-50 m-5 d-flex flex-column justify-content-center flex-1">
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>User Name</Form.Label>
              <div className="row d-flex justify-content-center">
                <Field
                  type="text"
                  name="username"
                  placeholder="Enter User Name"
                  className="w-50 text-center custom-form-control"
                  as={Form.Control}
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-danger"
                />
              </div>
            </Form.Group>
  
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <div className="row d-flex justify-content-center">
                <Field
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  className="w-50 text-center custom-form-control"
                  as={Form.Control}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-danger"
                />
              </div>
            </Form.Group>
            {error && <div className="text-danger mb-3">{error}</div>}
            <Button
              variant="primary"
              type="submit"
              className="fs-5 w-50 mt-2"
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </Button>
          </Form>
        </div>
        <div className="login-img d-none d-lg-flex lg:flex-1">
          <img src={library} alt="" />
        </div>
      </div>
    )}
  </Formik>
  );
};

export default Login;
