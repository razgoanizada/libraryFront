import { useNavigate, useParams } from "react-router";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useQuery } from "react-query";
import { LibrarianIDRequest, LibrarianUpdate } from "../../../service/library-service";
import * as Yup from "yup";
import { Librarian } from "../../../@Typs";
import { useState } from "react";
import Swal from "sweetalert2";
import Spinner from "../../../components/animations/Spinner";
import { Helmet } from "react-helmet";

const LibrariansEdit = () => {
  const { id } = useParams();
  const { data: res } = useQuery("get typs", () => LibrarianIDRequest(id));
  const nav = useNavigate();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const librarian: Librarian | undefined = res?.data;

  if (librarian?.userName && librarian.userName !== "admin" ) {

    const validationSchema = Yup.object({
      firstName: Yup.string()
        .min(2, "First name must be at least 2 characters")
        .max(10, "First name must be at most 10 characters")
        .required("First name is a required field"),
      lastName: Yup.string()
        .min(2, "Last name must be at least 2 characters")
        .max(10, "Last name must be at most 10 characters")
        .required("Last name is a required field"),
      phone: Yup.string().min(9).max(11).required(),
      gender: Yup.string().required(),
      address: Yup.string().max(20),
      dateOfBirth: Yup.date().max(
        new Date(),
        "Date of birth should be in the past"
      ),
      permission: Yup.string().required(),
    });

    const intiailValues = {
      firstName: librarian.firstName,
      lastName: librarian.lastName,
      phone: librarian.phone,
      gender: librarian.gender.toString(),
      address: librarian.address,
      dateOfBirth: librarian.dateOfBirth,
      permission: librarian.permission,
    };
    
    return (
      <>
      <Helmet>
        <title>{librarian.userName}</title>
      </Helmet>
    <Formik
    validationSchema={validationSchema}
    initialValues={intiailValues}
    onSubmit={({
      firstName,
      lastName,
      phone,
      address,
      dateOfBirth,
      gender,
      permission,
    }) => {
      setLoading(true); //show progress spinner
      setError(""); //new round - clean slate

      const formattedDateOfBirth = new Date(dateOfBirth);
      LibrarianUpdate(
        firstName,
        lastName,
        phone,
        address,
        formattedDateOfBirth,
        gender,
        permission,
        librarian?.id
      )
        .then(() => {
          Swal.fire({
            title: "Librarian successfully save",
            icon: "success",
            timer: 2000,
          });
          //navigate
          nav("/librarians");
        })
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }}
  >
    <Form>
      {loading && <Spinner name="CirclesWithBar" />}
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
            id="dateOfBirth"
          />
          {/* error message for the input */}
          <ErrorMessage
            name="dateOfBirth"
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
  )}

  else {
    return <div>No Such Librarian</div>;
  }
};
export default LibrariansEdit;
