import { useParams } from "react-router";
import { useQuery } from "react-query";
import {
  BookIDRequest,
  BorrowsLibrarian,
  CustomersLibrarian,
} from "../../../service/library-service";
import { Book, Borrows, Customer } from "../../../@Typs";
import { Helmet } from "react-helmet";

const BooksDetails = () => {
  const { id } = useParams();
  const { data: res } = useQuery("get book", () => BookIDRequest(id));
  const { data: resBorrows } = useQuery("get borrows", () =>
    BorrowsLibrarian(id)
  );
  const { data: resCustomers } = useQuery("get customers", () =>
    CustomersLibrarian(id)
  );

  const book: Book | undefined = res?.data;

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
              <td>{book.creationDate ? book.creationDate.toString() : ""} </td>
            </tr>
          </table>
          <h2 className="p-3 mt-3 font-thin">
            <span className="relative">
              The last 5 customers that he added
              <span className="bg-sky-300 absolute inset-x-0 bottom-0 h-1"></span>
            </span>
          </h2>
          {resBorrows?.data.totalBorrowed > 0 ? (
            <table className="mt-4 w-11/12">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Phone</th>
                  <th>Creation date</th>
                </tr>
              </thead>
              <tbody>
                {resBorrows?.data.results.map((borrow: Borrows) => (
                  <tr key={borrow.id}>
                    <td>{borrow.id} </td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h5 className="mt-4 text-center w-11/12">
              There are no borrows to display
            </h5>
          )}

          <h2 className="p-3 mt-3 font-thin">
            <span className="relative">
              The last 5 customers that he added
              <span className="bg-sky-300 absolute inset-x-0 bottom-0 h-1"></span>
            </span>
          </h2>
          {resCustomers?.data.totalCustomers > 0 ? (
            <table className="mt-4 w-11/12">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Phone</th>
                  <th>Creation date</th>
                </tr>
              </thead>
              <tbody>
                {resCustomers?.data.results.map((customer: Customer) => (
                  <tr key={customer.id}>
                    <td>
                      {customer.firstName} {customer.lastName}
                    </td>
                    <td>{customer.customerTypeName}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.creationDate.toString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h5 className="mt-4 text-center w-11/12">
              There are no customers to display
            </h5>
          )}

          <h2 className="p-3 mt-3 font-thin">
            <span className="relative">
              The last 5 customers that he added
              <span className="bg-sky-300 absolute inset-x-0 bottom-0 h-1"></span>
            </span>
          </h2>
        </div>
      </div>
      </>
    );
  }

  return <div>No Such Book</div>;
};
export default BooksDetails;
