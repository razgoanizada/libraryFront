import { useParams } from "react-router";
import { useQuery } from "react-query";
import {
  BooksLibrarian,
  BorrowsLibrarian,
  CustomersLibrarian,
  LibrarianIDRequest,
} from "../../../service/library-service";
import { Book, Borrow, Customer, Librarian } from "../../../@Typs";
import format from "date-fns/format";
import { Helmet } from "react-helmet";

const LibrariansDetails = () => {
  const { id } = useParams();
  const { data: res } = useQuery("get librarian", () => LibrarianIDRequest(id));
  const { data: resBorrows } = useQuery("get borrowed", () =>
    BorrowsLibrarian(id)
  );
  const { data: resCustomers } = useQuery("get customers", () =>
    CustomersLibrarian(id)
  );

  const { data: resBooks } = useQuery("get books", () => BooksLibrarian(id));
  const librarian: Librarian | undefined = res?.data;

  if (librarian?.userName) {
    return (
      <>
      <Helmet>
        <title>{librarian.userName}</title>
      </Helmet>
      <div className="bg-white shadow-md rounded-lg my-2 mx-auto p-4 flex flex-col gap-2">
        <div className="mx-5">
          <h1 className="text-center w-11/12">{librarian.userName}</h1>
          <table className="w-11/12">
            {/* <img src={librarian.image} alt="sdsd" /> */}
            <tr>
              <th className="bg-white">Name: </th>
              <td>
                {librarian.firstName} {librarian.lastName}
              </td>
            </tr>
            <tr>
              <th className="bg-white">Email: </th>
              <td>{librarian.email} </td>
            </tr>
            <tr>
              <th className="bg-white">Phone: </th>
              <td>{librarian.phone} </td>
            </tr>
            <tr>
              <th className="bg-white">ID: </th>
              <td>{librarian.tz} </td>
            </tr>
            <tr>
              <th className="bg-white">Gender: </th>
              <td>{librarian.gender.toString()} </td>
            </tr>
            <tr>
              <th className="bg-white">Address: </th>
              <td>{librarian.address} </td>
            </tr>
            <tr>
              <th className="bg-white">Date of birth: </th>
              <td>{librarian.dateOfBirth ? librarian.dateOfBirth.toString() : ""} </td>
            </tr>
            <tr>
              <th className="bg-white">Created on: </th>
              <td>{librarian.creationDate.toString()} </td>
            </tr>
            <tr>
              <th className="bg-white">Permission: </th>
              <td>{librarian.permission} </td>
            </tr>
            <tr>
              <th className="bg-white">Last : </th>
              <td>
                {" "}
                {librarian.lastLogin
                  ? format(new Date(librarian.lastLogin), "yyyy-MM-dd HH:mm:ss")
                  : "Does not exist"}{" "}
              </td>
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
                {resBorrows?.data.results.map((borrow: Borrow) => (
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
          {resBooks?.data.totalBooks > 0 ? (
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
                {resBooks?.data.results.map((book: Book) => (
                  <tr key={book.id}>
                    <td>{book.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h5 className="mt-4 text-center w-11/12">
              There are no books to display
            </h5>
          )}
        </div>
      </div>
      </>
    );
  }

  return <div>No Such Librarian</div>;
};
export default LibrariansDetails;
