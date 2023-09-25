import { useParams } from "react-router";
import { useQuery } from "react-query";
import {
  BooksRequest,
  BorrowRequest,
  CustomersRequest,
  LibrarianIDRequest,
} from "../../../service/library-service";
import { Librarian } from "../../../@Typs";
import format from "date-fns/format";
import { Helmet } from "react-helmet";
import Spinner from "../../../components/animations/Spinner";

const LibrariansDetails = () => {
  const { id } = useParams();
  const { data: res, isLoading } = useQuery("get librarian", () =>
    LibrarianIDRequest(id)
  );
  const librarian: Librarian | undefined = res?.data;
  const { data: resAllBorrowsReturned } = useQuery("get borrowed", () =>
    BorrowRequest(0, "", "", id || "0", true, "", "", "", "")
  );
  const { data: resAllBorrowsNotReturned } = useQuery(
    "get borrowed not return",
    () => BorrowRequest(0, "", "", id || "0", false, "", "", "", "")
  );
  const { data: resBooks } = useQuery("get books", () =>
    BooksRequest(0, "", "", "", "", "", id || "0")
  );
  const { data: resCustomers } = useQuery("get customers", () =>
    CustomersRequest(0, "", "", "", "", "", id || "0", true)
  );

  if (isLoading) {
    return <Spinner />;
  }

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
                <th className="bg-white">City: </th>
                <td>{librarian.address} </td>
              </tr>
              <tr>
                <th className="bg-white">Date of birth: </th>
                <td>
                  {librarian.dateOfBirth
                    ? librarian.dateOfBirth.toString()
                    : ""}{" "}
                </td>
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
                <th className="bg-white">Last logon: </th>
                <td>
                  {" "}
                  {librarian.lastLogin
                    ? format(
                        new Date(librarian.lastLogin),
                        "yyyy-MM-dd HH:mm:ss"
                      )
                    : "Does not exist"}{" "}
                </td>
              </tr>
              <tr>
                <th className="bg-white">Amount of books he borrowed: </th>
                <td>
                  {resAllBorrowsReturned?.data.totalBorrowed +
                    resAllBorrowsNotReturned?.data.totalBorrowed}{" "}
                </td>
              </tr>
              <tr>
                <th className="bg-white">Amount of books he added: </th>
                <td>{resBooks?.data.totalBooks} </td>
              </tr>
              <tr>
                <th className="bg-white">Amount of customers he added: </th>
                <td>{resCustomers?.data.totalCustomers} </td>
              </tr>
            </table>
          </div>
        </div>
      </>
    );
  }

  return <div>No Such Librarian</div>;
};
export default LibrariansDetails;
