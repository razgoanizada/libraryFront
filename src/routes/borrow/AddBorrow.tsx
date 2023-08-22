import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import Spinner from "../../components/animations/Spinner";
import Swal from "sweetalert2";
import { Books, BorrowAdd, Customers } from "../../service/library-service";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Book, Customer } from "../../@Typs";

const AddBorrow = () => {
  const nav = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const { data: resBook } = useQuery("get books", () =>
    Books()
  );

  const { data: resCustomers } = useQuery("get customers", () =>
    Customers()
  );

  const validationSchema = Yup.object({
    customer: Yup.number().min(1, "customer is a required field").required(),
    book: Yup.number().min(1, "book is a required field").required(),
  });

  const intiailValues = {
    customer: 0,
    book: 0,
  };

  return (
    <>
      <Helmet>
        <title>Add Borrow</title>
      </Helmet>
      <Formik
        validationSchema={validationSchema}
        initialValues={intiailValues}
        onSubmit={({
        customer,
          book,
        }) => {
          setLoading(true); //show progress spinner
          BorrowAdd(
            customer,
            book,
          )
            .then(() => {
              Swal.fire({
                title: "successfully",
                icon: "success",
                timer: 2000,
              });
              //navigate
              nav("/borrowed");
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
              <label htmlFor="customer">Customer:</label>
              <Field
                className=" px-2 py-1 rounded-md border-blue-300 border-2"
                placeholder="Customer..."
                name="customer"
                as="select"
                id="customer"
              >
                <option value={""} className="bg-stone-500">
                  Select
                </option>
                {resCustomers?.data.map((customer: Customer) => (
                (customer.active && customer.customerTypeName != null &&  (
                    <option value={customer.id}>{customer.firstName} {customer.lastName} ({customer.tz})</option>
                ))
              ))}
              </Field>
              {/* error message for the input */}
              <ErrorMessage
                name="customer"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="font-extralight text-lg  my-2 form-group  gap-1 flex flex-col">
              <label htmlFor="book">Book:</label>
              <Field
                className=" px-2 py-1 rounded-md border-blue-300 border-2"
                placeholder="Custommer..."
                name="book"
                as="select"
                id="book"
              >
                <option value={""} className="bg-stone-500">
                  Select
                </option>
                {resBook?.data.map((book: Book) => (
                <option value={book.id}>{book.name} ({book.author})</option>
              ))}
              </Field>
              {/* error message for the input */}
              <ErrorMessage
                name="book"
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

export default AddBorrow;
