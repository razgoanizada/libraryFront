import { useNavigate, useParams } from "react-router";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useQuery } from "react-query";
import {
  BookIDRequest,
  BookUpdate,
  BooksCategories,
} from "../../../service/library-service";
import * as Yup from "yup";
import { Book, BookCategories } from "../../../@Typs";
import { useState } from "react";
import Swal from "sweetalert2";
import Spinner from "../../../components/animations/Spinner";
import { Helmet } from "react-helmet";

const BooksEdit = () => {
  const { id } = useParams();
  const { data: res, isLoading } = useQuery("get book", () =>
    BookIDRequest(id)
  );
  const nav = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const book: Book | undefined = res?.data;

  const { data: resBookCategories } = useQuery("get all categories", () =>
    BooksCategories()
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (book?.name) {
    const validationSchema = Yup.object({
      description: Yup.string().min(15).max(250).required(),
      bookcase: Yup.number().min(10).max(99999).required(),
      category: Yup.string().required(),
    });

    const intiailValues = {
      description: book.description,
      bookcase: book.bookcase,
      category: book.bookCategoriesName,
    };

    return (
      <>
        <Helmet>
          <title>{book.name}</title>
        </Helmet>
        <Formik
          validationSchema={validationSchema}
          initialValues={intiailValues}
          onSubmit={({ description, bookcase, category }) => {
            setLoading(true); //show progress spinner

            BookUpdate(description, bookcase, category, book?.id)
              .then(() => {
                Swal.fire({
                  title: "The book was successfully edited",
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
            <div className="bg-white shadow-md rounded-lg my-5 w-1/2 mx-auto p-4 flex flex-col gap-2">
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
  } else {
    return <div>No Such Book</div>;
  }
};
export default BooksEdit;
