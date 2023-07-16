import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import library from "../images/library.jpg";
import '../routes/Login.css';

function BasicExample() {
  return (
    <div className="d-flex text-center align-items-center bg-light">
      <div className="login w-100 w-sm-50 m-5 d-flex flex-column justify-content-center">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>User Name</Form.Label>
            <div className="row d-flex justify-content-center">
              <Form.Control
                type="email"
                placeholder="Enter User Name"
                className="w-50 text-center custom-form-control"
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <div className="d-flex justify-content-center">
              <Form.Control
                type="password"
                placeholder="Enter Password"
                className="w-50 text-center custom-form-control"
              />
            </div>
          </Form.Group>
          <Button variant="primary" type="submit" className="fs-5 w-50 mt-2">
            Login
          </Button>
        </Form>
      </div>
      <div className="login-img w-50 d-none d-lg-flex">
        <img src={library} alt="" />
      </div>
    </div>
  );
}

export default BasicExample;