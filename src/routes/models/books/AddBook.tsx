import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import Spinner from "../../../components/animations/Spinner";
import Swal from "sweetalert2";
import { BookAdd, BooksCategories } from "../../../service/library-service";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { BookCategories } from "../../../@Typs";

const AddBook = () => {
  const nav = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const { data: resBookCategories } = useQuery("get all categories", () =>
    BooksCategories()
  );

  const validationSchema = Yup.object({
    name: Yup.string().min(2).max(15).required(),
    author: Yup.string().min(2).max(10).required(),
    publishYear: Yup.number()
      .min(1000, "Publish year must be greater than or equal to 1000")
      .max(2023, "Publish year must be less than or equal to 2023")
      .required("Publish year is a required field"),
    description: Yup.string().min(15).max(250).required(),
    bookcase: Yup.number().min(10).max(99999).required(),
    category: Yup.string().required(),
  });

  const intiailValues = {
    name: "",
    author: "",
    publishYear: "",
    description: "",
    bookcase: "",
    category: "",
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
          name,
          author,
          publishYear,
          description,
          bookcase,
          category,
        }) => {
          setLoading(true); //show progress spinner

          BookAdd(
            name,
            author,
            publishYear.toString(),
            description,
            bookcase.toString(),
            category
          )
            .then(() => {
              Swal.fire({
                title: "Book successfully added",
                icon: "success",
                timer: 2000,
              });
              //navigate
              nav("/books");
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
              <label htmlFor="name">Name:</label>
              <Field
                className=" px-2 py-1 rounded-md border-blue-300 border-2"
                placeholder="Name..."
                name="name"
                type="text"
                id="name"
              />
              {/* error message for the input */}
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="font-extralight text-lg  my-2 form-group  gap-1 flex flex-col">
              <label htmlFor="author">Author:</label>
              <Field
                className=" px-2 py-1 rounded-md border-blue-300 border-2"
                placeholder="Author..."
                name="author"
                type="text"
                id="author"
              />
              {/* error message for the input */}
              <ErrorMessage
                name="author"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="font-extralight text-lg  my-2 form-group  gap-1 flex flex-col">
              <label htmlFor="publishYear">Publish year</label>
              <Field
                className=" px-2 py-1 rounded-md border-blue-300 border-2"
                placeholder="Publish year..."
                name="publishYear"
                type="number"
                id="publishYear"
              />
              {/* error message for the input */}
              <ErrorMessage
                name="publishYear"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="font-extralight text-lg my-2 form-group gap-2 flex flex-col">
              <label htmlFor="description">Description:</label>
              <Field
                className="px-2 py-1 rounded-md border-blue-300 border-2"
                placeholder="Description..."
                as="textarea"
                name="description"
                id="description"
              />

              <ErrorMessage
                name="description"
                component="div"
                class="text-red-500"
              />
            </div>

            <div className="font-extralight text-lg  my-2 form-group  gap-1 flex flex-col">
              <label htmlFor="bookcase">Bookcase:</label>
              <Field
                className=" px-2 py-1 rounded-md border-blue-300 border-2"
                placeholder="Bookcase..."
                name="bookcase"
                type="number"
                id="bookcase"
              />
              {/* error message for the input */}
              <ErrorMessage
                name="bookcase"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="font-extralight text-lg  my-2 form-group  gap-1 flex flex-col">
              <label htmlFor="category">Category:</label>
              <Field
                className=" px-2 py-1 rounded-md border-blue-300 border-2"
                placeholder="Category..."
                name="category"
                as="select"
                id="category"
              >
                <option value={""} className="bg-stone-500">
                  Select
                </option>
                {resBookCategories?.data
                  .sort((a: BookCategories, b: BookCategories) =>
                    a.name.localeCompare(b.name)
                  )
                  .map((category: BookCategories) => (
                    <option value={category.name}>{category.name}</option>
                  ))}
              </Field>
              {/* error message for the input */}
              <ErrorMessage
                name="category"
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

export default AddBook;
