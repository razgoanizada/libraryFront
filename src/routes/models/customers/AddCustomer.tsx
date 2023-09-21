import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import Spinner from "../../../components/animations/Spinner";
import Swal from "sweetalert2";
import { CustomerAdd, CustomersType } from "../../../service/library-service";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { CustomerType } from "../../../@Typs";
import { City } from "../../../service/address";

const AddCustomer = () => {
  const nav = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const { data: resCustomerType } = useQuery("get typs", () => CustomersType());

  const { data: resCity } = useQuery("get city", () => City());

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(2, "First name must be at least 2 characters")
      .max(10, "First name must be at most 10 characters")
      .required("First name is a required field"),
    lastName: Yup.string()
      .min(2, "Last name must be at least 2 characters")
      .max(10, "Last name must be at most 10 characters")
      .required("Last name is a required field"),
    email: Yup.string().email().required(),
    phone: Yup.string().min(9).max(11).required(),
    tz: Yup.string()
      .matches(/^\d{9}$/, "ID card must have 9 digits")
      .required("ID is a required field"),
    gender: Yup.string().required(),
    address: Yup.string(),
    dateOfBirth: Yup.date().max(
      new Date(),
      "Date of birth should be in the past"
    ),
    type: Yup.string().required(),
  });

  const intiailValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    tz: "",
    gender: "",
    address: "",
    dateOfBirth: "",
    type: "",
  };

  return (
    <>
      <Helmet>
        <title>Add Customer</title>
      </Helmet>
      <Formik
        validationSchema={validationSchema}
        initialValues={intiailValues}
        onSubmit={({
          firstName,
          lastName,
          email,
          phone,
          tz,
          gender,
          address,
          dateOfBirth,
          type,
        }) => {
          setLoading(true); //show progress spinner

          if (tz.length < 9) {
            // Add leading zeros to tz until it has 9 digits
            tz = tz.padStart(9, "0");
          }

          const formattedDateOfBirth = new Date(dateOfBirth);
          CustomerAdd(
            firstName,
            lastName,
            email,
            phone,
            tz,
            gender,
            address,
            formattedDateOfBirth,
            type
          )
            .then(() => {
              Swal.fire({
                title: "Customer successfully added",
                icon: "success",
                timer: 2000,
              });
              //navigate
              nav("/customers");
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
              <ErrorMessage
                name="tz"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="font-extralight text-lg  my-2 form-group  gap-1 flex flex-col">
              <label htmlFor="type">Type:</label>
              <Field
                className=" px-2 py-1 rounded-md border-blue-300 border-2"
                placeholder="Type..."
                name="type"
                as="select"
                id="type"
              >
                <option value={""} className="bg-stone-500">
                  Select Type
                </option>
                {resCustomerType?.data
                  .sort((a: CustomerType, b: CustomerType) =>
                    a.name.localeCompare(b.name)
                  )
                  .map((type: CustomerType) => (
                    <option value={type.name}>{type.name}</option>
                  ))}
              </Field>

              {/* error message for the input */}
              <ErrorMessage
                name="type"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="font-extralight text-lg  my-2 form-group  gap-1 flex flex-col">
              <label htmlFor="address">City:</label>
              <Field
                className=" px-2 py-1 rounded-md border-blue-300 border-2"
                placeholder="City..."
                name="address"
                as="select"
                id="address"
              >
                <option value={""} className="bg-stone-500">
                  Select City
                </option>
                {resCity?.data.result.records.map(
                  (city: any) =>
                    city.city_name_en != " " && (
                      <option value={city.city_name_en}>{city.city_name_en}</option>
                    )
                )}
              </Field>

              {/* error message for the input */}
              <ErrorMessage
                name="address"
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
        </Form>
      </Formik>
    </>
  );
};

export default AddCustomer;
