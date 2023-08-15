import { useNavigate, useParams } from "react-router";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useQuery } from "react-query";
import {
  CustomerIDRequest,
  CustomerUpdate,
  CustomersType,
} from "../../../service/library-service";
import * as Yup from "yup";
import { Customer, CustomerType } from "../../../@Typs";
import { useState } from "react";
import Swal from "sweetalert2";
import Spinner from "../../../components/animations/Spinner";
import { Helmet } from "react-helmet";

const CustomersEdit = () => {
  const { id } = useParams();
  const { data: res } = useQuery("get customers", () => CustomerIDRequest(id));
  const nav = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const customer: Customer | undefined = res?.data;

  const { data: resCustomerType } = useQuery("get typs", () => CustomersType());

  if (customer?.firstName) {
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
      type: Yup.string().required(),
    });

    const intiailValues = {
      firstName: customer.firstName,
      lastName: customer.lastName,
      phone: customer.phone,
      gender: customer.gender,
      address: customer.address,
      dateOfBirth: customer.dateOfBirth,
      type: customer.customerTypeName,
    };

    return (
      <>
        <Helmet>
          <title>
            {customer.firstName} {customer.lastName}
          </title>
        </Helmet>
        <Formik
          validationSchema={validationSchema}
          initialValues={intiailValues}
          onSubmit={({
            firstName,
            lastName,
            phone,
            gender,
            address,
            dateOfBirth,
            type,
          }) => {
            setLoading(true); //show progress spinner

            const formattedDateOfBirth = new Date(dateOfBirth);
            CustomerUpdate(
              firstName,
              lastName,
              phone,
              gender.toString(),
              address,
              formattedDateOfBirth,
              type,
              customer.id
            )
              .then(() => {
                Swal.fire({
                  title: "Customer successfully save",
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
                  {resCustomerType?.data.map((type: CustomerType) => (
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
  } else {
    return <div>No Such Customer</div>;
  }
};
export default CustomersEdit;
