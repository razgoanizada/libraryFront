import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import Spinner from "../../components/animations/Spinner";
import Swal from "sweetalert2";
import { AuthChangePassword } from "../../service/library-service";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const ChangePassword = () => {
  const nav = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const validationSchema = Yup.object({
    password: Yup.string()
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?\W).{8,20}$/,
        "The password must be at least 8 characters long, an uppercase letter, a lowercase letter, a number, and a character"
      )
      .required(),
    repeatPassword: Yup.string()
      .test("passwords-match", "Passwords must match", function (value) {
        return value === this.resolve(Yup.ref("password"));
      })
      .required("Repeat Password is a required field"),
  });

  const intiailValues = {
    password: "",
    repeatPassword: "",
  };

  return (
    <>
      <Helmet>
        <title>Change Password</title>
      </Helmet>
      <Formik
        validationSchema={validationSchema}
        initialValues={intiailValues}
        onSubmit={({ password, repeatPassword }) => {
          setLoading(true); //show progress spinner

          AuthChangePassword(password, repeatPassword)
            .then(() => {
              Swal.fire({
                title: "Password changed successfully",
                icon: "success",
                timer: 2000,
              });
              //navigate
              nav("/");
            })
            .catch((error) => {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message,
              });
            })
            .finally(() => {
              setLoading(false);
            });
        }}
      >
        <Form>
          {loading && <Spinner name="Puff" />}
          <div className="bg-white shadow-md rounded-lg my-5 w-1/2 mx-auto p-4 flex flex-col gap-2">
            <div className="font-extralight text-lg my-2 form-group  gap-2 flex flex-col">
              <label htmlFor="password">Password:</label>
              <Field
                className=" px-2 py-1 rounded-md border-blue-300 border-2"
                placeholder="password..."
                autoComplete="new-password"
                name="password"
                type="password"
                id="password"
              />
              {/* error message for the input */}
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="font-extralight text-lg my-2 form-group  gap-2 flex flex-col">
              <label htmlFor="repeatPassword">Repeat Password:</label>
              <Field
                className=" px-2 py-1 rounded-md border-blue-300 border-2"
                placeholder="Repeat Password..."
                autoComplete="new-password"
                name="repeatPassword"
                type="password"
                id="repeatPassword"
              />
              {/* error message for the input */}
              <ErrorMessage
                name="repeatPassword"
                component="div"
                className="text-red-500"
              />
            </div>

            <button
              disabled={loading}
              className="disabled:bg-gray-400 rounded text-white px-3 py-2 w-full bg-green-600"
            >
              Save
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default ChangePassword;
