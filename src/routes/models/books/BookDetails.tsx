import { useParams } from "react-router";
import { useQuery } from "react-query";
import {
  BookIDRequest,
  BorrowRequest,
  Customers,
} from "../../../service/library-service";
import { Book, Borrow, Customer } from "../../../@Typs";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { BsFilePdf } from "react-icons/bs";
import Spinner from "../../../components/animations/Spinner";

const BooksDetails = () => {
  const { id } = useParams();
  const { data: res, isLoading } = useQuery("get book", () =>
    BookIDRequest(id)
  );
  const { data: resCustomers } = useQuery("get all customers", () =>
    Customers()
  );

  const { data: resAllBorrowsReturned } = useQuery("get borrowed", () =>
    BorrowRequest(0, "", id || "0", "", true, "", "", "", "")
  );

  const { data: resAllBorrowsNotReturned } = useQuery(
    "get borrowed not returned",
    () => BorrowRequest(0, "", id || "0", "", false, "", "", "", "")
  );

  const book: Book | undefined = res?.data;

  if (isLoading) {
    return <Spinner />;
  }

  if (book?.name) {
    return (
      <>
        <Helmet>
          <title>{book.name}</title>
        </Helmet>
        <div className="bg-white shadow-md rounded-lg my-2 mx-auto p-4 flex flex-col gap-2">
          <div className="mx-5">
            <h1 className="text-center w-11/12">{book.name}</h1>
            <table className="w-11/12">
              <tr>
                <th className="bg-white">Author: </th>
                <td>{book.author} </td>
              </tr>
              <tr>
                <th className="bg-white">Publish year: </th>
                <td>{book.publishYear} </td>
              </tr>
              <tr>
                <th className="bg-white">Description: </th>
                <td>{book.description} </td>
              </tr>
              <tr>
                <th className="bg-white">Bookcase: </th>
                <td>{book.bookcase} </td>
              </tr>
              <tr>
                <th className="bg-white">Category: </th>
                <td>{book.bookCategoriesName} </td>
              </tr>
              <tr>
                <th className="bg-white">Added by: </th>
                <td>{book.addedByUserName} </td>
              </tr>
              <tr>
                <th className="bg-white">Added on: </th>
                <td>
                  {book.creationDate ? book.creationDate.toString() : ""}{" "}
                </td>
              </tr>
              <tr>
                <th className="bg-white">
                  Number of times the book was borrowed
                </th>
                <td>
                  {resAllBorrowsNotReturned?.data.totalBorrowed +
                    resAllBorrowsReturned?.data.totalBorrowed}
                </td>
              </tr>
            </table>
            <h2 className="p-3 mt-3 font-thin">
              <span className="relative">
                Currently at the customer's
                <span className="bg-sky-300 absolute inset-x-0 bottom-0 h-1"></span>
              </span>
            </h2>
            {resAllBorrowsNotReturned?.data.totalBorrowed > 0 ? (
              <table className="mt-4 w-8/12">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Borrowed on</th>
                    <th className="col-none">Librarian</th>
                    <th>Return date</th>
                    <th>PDF</th>
                  </tr>
                </thead>
                <tbody>
                  {resAllBorrowsNotReturned?.data.results.map(
                    (borrow: Borrow) => (
                      <tr key={borrow.id}>
                        <td>
                          {resCustomers?.data.find(
                            (customer: Customer) =>
                              customer.id === borrow.customerId
                          ) ? (
                            <Link to={`/customers/${borrow.customerId}`}>
                              {
                                resCustomers.data.find(
                                  (customer: Customer) =>
                                    customer.id === borrow.customerId
                                ).firstName
                              }{" "}
                              {
                                resCustomers.data.find(
                                  (customer: Customer) =>
                                    customer.id === borrow.customerId
                                ).lastName
                              }
                            </Link>
                          ) : (
                            ""
                          )}
                        </td>
                        <td>{borrow.borrowingDate.toString()}</td>
                        <td className="col-none">{borrow.addedByUserName}</td>
                        <td>
                          {" "}
                          {borrow.returnDate
                            ? borrow.returnDate.toString()
                            : ""}
                        </td>
                        <td className="pdf-col">
                          <Link to={`/borrow-pdf/${borrow.id}`} key={borrow.id}>
                            <BsFilePdf size={30} />
                          </Link>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            ) : (
              <h5 className="mt-4 text-center w-11/12">
                There are no borrows to display
              </h5>
            )}

            <h2 className="p-3 mt-3 font-thin">
              <span className="relative">
                Last 10 customers who borrowed the book
                <span className="bg-sky-300 absolute inset-x-0 bottom-0 h-1"></span>
              </span>
            </h2>
            {resAllBorrowsReturned?.data.totalBorrowed > 0 ? (
              <table className="mt-4 w-8/12">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Borrowed on</th>
                    <th className="col-none">Librarian</th>
                    <th>Returned on</th>
                  </tr>
                </thead>
                <tbody>
                  {resAllBorrowsReturned?.data.results.map((borrow: Borrow) => (
                    <tr key={borrow.id}>
                      <td>
                        {resCustomers?.data.find(
                          (customer: Customer) =>
                            customer.id === borrow.customerId
                        ) ? (
                          <Link to={`/customers/${borrow.customerId}`}>
                            {
                              resCustomers.data.find(
                                (customer: Customer) =>
                                  customer.id === borrow.customerId
                              ).firstName
                            }{" "}
                            {
                              resCustomers.data.find(
                                (customer: Customer) =>
                                  customer.id === borrow.customerId
                              ).lastName
                            }
                          </Link>
                        ) : (
                          ""
                        )}
                      </td>
                      <td>{borrow.borrowingDate.toString()}</td>
                      <td className="col-none">{borrow.addedByUserName}</td>
                      <td>
                        {" "}
                        {borrow.returnedOn
                          ? borrow.returnedOn.toString()
                          : "not returned"}{" "}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <h5 className="mt-4 text-center w-11/12">
                There are no borrows to display
              </h5>
            )}
          </div>
        </div>
      </>
    );
  }

  return <div>No Such Book</div>;
};
export default BooksDetails;
