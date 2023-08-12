import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import Spinner from "../../../components/animations/Spinner";
import Swal from "sweetalert2";
import { LibrarianAdd } from "../../../service/library-service";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const AddLibrarian = () => {
  const nav = useNavigate();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(2, "First name must be at least 2 characters")
      .max(10, "First name must be at most 10 characters")
      .required("First name is a required field"),
    lastName: Yup.string()
      .min(2, "Last name must be at least 2 characters")
      .max(10, "Last name must be at most 10 characters")
      .required("Last name is a required field"),
    userName: Yup.string()
      .min(3, "User name must be at least 3 characters")
      .max(10, "User name must be at most 10 characters")
      .required("User name is a required field"),
    email: Yup.string().email().required(),
    phone: Yup.string().min(9).max(11).required(),
    tz: Yup.string()
      .matches(/^\d{9}$/, "ID card must have 9 digits")
      .required("ID is a required field"),
    gender: Yup.string().required(),
    address: Yup.string().max(20),
    dateOfBirth: Yup.date().max(
      new Date(),
      "Date of birth should be in the past"
    ),
    permission: Yup.string().required(),
    password: Yup.string()
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?\W).{8,20}$/,
        "The password must be at least 8 characters long, an uppercase letter, a lowercase letter, a number, and a character"
      )
      .required(),
  });

  const intiailValues = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    phone: "",
    tz: "",
    gender: "",
    address: "",
    dateOfBirth: "",
    permission: "",
    password: "",
  };

  return (
    <>
     <Helmet>
        <title>Add Librarian</title>
      </Helmet>
    <Formik
      validationSchema={validationSchema}
      initialValues={intiailValues}
      onSubmit={({
        firstName,
        lastName,
        userName,
        password,
        email,
        phone,
        tz,
        address,
        dateOfBirth,
        gender,
        permission,
      }) => {
        setLoading(true); //show progress spinner
        setError(""); //new round - clean slate

        if (tz.length < 9) {
          // Add leading zeros to tz until it has 9 digits
          tz = tz.padStart(9, "0");
        }

        const formattedDateOfBirth = new Date(dateOfBirth);
        LibrarianAdd(
          firstName,
          lastName,
          userName,
          password,
          email,
          phone,
          tz,
          address,
          formattedDateOfBirth,
          gender,
          permission
        )
          .then((res) => {
            Swal.fire({
              title: "Librarian successfully added",
              icon: "success",
              timer: 2000,
            });
            //navigate
            nav("/librarians");
          })
          .catch((error) => {
            // console.log(error.response.data);
            setError(error.message);
          })
          .finally(() => {
            setLoading(false);
          });
      }}
    >
      <Form>
        {loading && <Spinner name="Puff" />}
        <div className="bg-white shadow-md rounded-lg my-2 w-1/2 mx-auto p-4 flex flex-col gap-2">
          <div className="font-extralight text-lg  my-2 form-group  gap-1 flex flex-col">
            <label htmlFor="firstName">First name:</label>
            <Field
              className=" px-2 py-1 rounded-md border-blue-300 border-2"
              placeholder="First name..."
              name="firstName"
              type="text"
              id="firstName"
            />
            {/* error message for the input */}
            <ErrorMessage
              name="firstName"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="font-extralight text-lg  my-2 form-group  gap-1 flex flex-col">
            <label htmlFor="lastName">Last name:</label>
            <Field
              className=" px-2 py-1 rounded-md border-blue-300 border-2"
              placeholder="Last name..."
              name="lastName"
              type="text"
              id="lastName"
            />
            {/* error message for the input */}
            <ErrorMessage
              name="lastName"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="font-extralight text-lg  my-2 form-group  gap-1 flex flex-col">
            <label htmlFor="userName">User name:</label>
            <Field
              className=" px-2 py-1 rounded-md border-blue-300 border-2"
              placeholder="User name..."
              name="userName"
              type="text"
              id="userName"
            />
            {/* error message for the input */}
            <ErrorMessage
              name="userName"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="font-extralight text-lg  my-2 form-group  gap-2 flex flex-col">
            <label htmlFor="email">Email:</label>
            <Field
              className=" px-2 py-1 rounded-md border-blue-300 border-2"
              placeholder="email..."
              name="email"
              type="email"
              id="email"
            />
            {/* error message for the input */}
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="font-extralight text-lg  my-2 form-group  gap-1 flex flex-col">
            <label htmlFor="phone">Phone:</label>
            <Field
              className=" px-2 py-1 rounded-md border-blue-300 border-2"
              placeholder="Phone..."
              name="phone"
              type="text"
              id="phone"
            />
            {/* error message for the input */}
            <ErrorMessage
              name="phone"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="font-extralight text-lg  my-2 form-group  gap-1 flex flex-col">
            <label htmlFor="tz">ID:</label>
            <Field
              className=" px-2 py-1 rounded-md border-blue-300 border-2"
              placeholder="ID..."
              name="tz"
              type="string"
              id="tz"
            />
            {/* error message for the input */}
            <ErrorMessage name="tz" component="div" className="text-red-500" />
          </div>

          <div className="font-extralight text-lg  my-2 form-group  gap-1 flex flex-col">
            <label htmlFor="address">Address:</label>
            <Field
              className=" px-2 py-1 rounded-md border-blue-300 border-2"
              placeholder="Address..."
              name="address"
              type="text"
              id="address"
            />
            {/* error message for the input */}
            <ErrorMessage
              name="address"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="font-extralight text-lg  my-2 form-group  gap-1 flex flex-col">
            <label htmlFor="permission">Permission:</label>
            <Field
              className=" px-2 py-1 rounded-md border-blue-300 border-2"
              placeholder="Permission..."
              name="permission"
              as="select"
              id="permission"
            >
              <option value={""} className="bg-stone-500">
                Select
              </option>
              <option value="simple">Simple</option>
              <option value="pro">Pro</option>
              <option value="admin">Admin</option>
            </Field>

            {/* error message for the input */}
            <ErrorMessage
              name="permission"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="font-extralight text-lg  my-2 form-group  gap-1 flex flex-col">
            <label htmlFor="gender">Gender:</label>
            <Field
              className=" px-2 py-1 rounded-md border-blue-300 border-2"
              placeholder="Gender..."
              name="gender"
              as="select"
              id="gender"
            >
              <option value={""} className="bg-stone-500">
                Select
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Field>

            {/* error message for the input */}
            <ErrorMessage
              name="gender"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="font-extralight text-lg  my-2 form-group  gap-1 flex flex-col">
            <label htmlFor="dateOfBirth">Date of birth:</label>
            <Field
              className=" px-2 py-1 rounded-md border-blue-300 border-2"
              placeholder="Date of birth..."
              name="dateOfBirth"
              type="date"
              id="address"
            />
            {/* error message for the input */}
            <ErrorMessage
              name="dateOfBirth"
              component="div"
              className="text-red-500"
            />
          </div>

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

          <button
            disabled={loading}
            className="disabled:bg-gray-400 rounded text-white px-3 py-2 w-full bg-green-600"
          >
            Save
          </button>
        </div>
        {error && (
          <p className="text-red-500 flex justify-center w-fit mx-auto px-10 py-5 mt-4 rounded-3xl italic shadow-md">
            {error}
          </p>
        )}
      </Form>
    </Formik>
    </>
  );
};

export default AddLibrarian;
