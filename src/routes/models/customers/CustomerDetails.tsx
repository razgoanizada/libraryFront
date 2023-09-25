import { useParams } from "react-router";
import { useQuery } from "react-query";
import {
  Books,
  BorrowRequest,
  CustomerIDRequest,
} from "../../../service/library-service";
import { Book, Borrow, Customer } from "../../../@Typs";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { BsFilePdf } from "react-icons/bs";
import Spinner from "../../../components/animations/Spinner";

const CustomerDetails = () => {
  const { id } = useParams();
  const { data: res, isLoading } = useQuery("get customer", () =>
    CustomerIDRequest(id)
  );
  const { data: resBooks } = useQuery("get all books", () => Books());

  const { data: resAllBorrowsReturned } = useQuery("get borrowed", () =>
    BorrowRequest(0, id || "0", "", "", true, "", "", "", "")
  );

  const { data: resAllBorrowsNotReturned } = useQuery(
    "get borrowed not returned",
    () => BorrowRequest(0, id || "0", "", "", false, "", "", "", "")
  );

  const customer: Customer | undefined = res?.data;

  if (isLoading) {
    return <Spinner />;
  }

  if (customer?.firstName && customer.lastName) {
    return (
      <>
        <Helmet>
          <title>
            {customer.firstName} {customer.lastName}
          </title>
        </Helmet>
        <div className="bg-white shadow-md rounded-lg my-2 mx-auto p-4 flex flex-col gap-2">
          <div className="mx-5">
            <h1 className="text-center w-11/12">
              {customer.firstName} {customer.lastName}
            </h1>
            <table className="w-11/12">
              <tr>
                <th className="bg-white">Email: </th>
                <td>{customer.email} </td>
              </tr>
              <tr>
                <th className="bg-white">Phone: </th>
                <td>{customer.phone} </td>
              </tr>
              <tr>
                <th className="bg-white">ID: </th>
                <td>{customer.tz} </td>
              </tr>
              <tr>
                <th className="bg-white">Gender: </th>
                <td>{customer.gender?.toString() || ""} </td>
              </tr>
              <tr>
                <th className="bg-white">City: </th>
                <td>{customer.address} </td>
              </tr>
              <tr>
                <th className="bg-white">Type: </th>
                <td>{customer.customerTypeName} </td>
              </tr>
              <tr>
                <th className="bg-white">Added By: </th>
                <td>{customer.addedByUserName} </td>
              </tr>
              <tr>
                <th className="bg-white">Added On: </th>
                <td>
                  {customer.creationDate
                    ? customer.creationDate.toString()
                    : ""}{" "}
                </td>
              </tr>
              <tr>
                <th className="bg-white">Active: </th>
                <td>{customer.active ? "yes" : "no"} </td>
              </tr>
              <tr>
                <th className="bg-white">Date of birth: </th>
                <td>
                  {customer.dateOfBirth ? customer.dateOfBirth.toString() : ""}{" "}
                </td>
              </tr>
              <tr>
                <th className="bg-white">Amount of books he borrowed</th>
                <td>
                  {resAllBorrowsNotReturned?.data.totalBorrowed +
                    resAllBorrowsReturned?.data.totalBorrowed}
                </td>
              </tr>
            </table>

            <h2 className="p-3 mt-3 font-thin">
              <span className="relative">
                Books currently on loan
                <span className="bg-sky-300 absolute inset-x-0 bottom-0 h-1"></span>
              </span>
            </h2>
            {resAllBorrowsNotReturned?.data.totalBorrowed > 0 ? (
              <table className="mt-4 w-8/12">
                <thead>
                  <tr>
                    <th>Book</th>
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
                          {resBooks?.data.find(
                            (book: Book) => book.id === borrow.bookId
                          ) ? (
                            <Link to={`/books/${borrow.bookId}`}>
                              {
                                resBooks.data.find(
                                  (book: Book) => book.id === borrow.bookId
                                ).name
                              }
                            </Link>
                          ) : (
                            "The book has been deleted"
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
                Last 10 books he borrowed
                <span className="bg-sky-300 absolute inset-x-0 bottom-0 h-1"></span>
              </span>
            </h2>
            {resAllBorrowsReturned?.data.totalBorrowed > 0 ? (
              <table className="mt-4 w-8/12">
                <thead>
                  <tr>
                    <th>Book</th>
                    <th>Borrowed on</th>
                    <th className="col-none">Librarian</th>
                    <th>Returned on</th>
                  </tr>
                </thead>
                <tbody>
                  {resAllBorrowsReturned?.data.results.map((borrow: Borrow) => (
                    <tr key={borrow.id}>
                      <td>
                        {resBooks?.data.find(
                          (book: Book) => book.id === borrow.bookId
                        ) ? (
                          <Link to={`/books/${borrow.bookId}`}>
                            {
                              resBooks.data.find(
                                (book: Book) => book.id === borrow.bookId
                              ).name
                            }
                          </Link>
                        ) : (
                          "The book has been deleted"
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

  return <div>No Such Customer</div>;
};
export default CustomerDetails;
