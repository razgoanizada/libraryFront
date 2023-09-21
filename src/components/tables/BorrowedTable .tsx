import { Link } from "react-router-dom";
import { BsFilePdf } from "react-icons/bs";
import { Book, Borrow, Customer } from "../../@Typs";
import { Button } from "react-bootstrap";
import { useQuery } from "react-query";
import { Books, Customers } from "../../service/library-service";

const BorrowedTable = ({
  borrowedData,
  handleReturnBook,
  handleOpenExtraDialog,
}: any) => {
  const { data: resCustomers } = useQuery("get customers", () => Customers());
  const { data: resBooks } = useQuery("get books", () => Books());

  return (
    <table className="mt-4">
      <thead>
        <tr>
          <th className="col-none">Number</th>
          <th>Book</th>
          <th>Customer</th>
          <th className="col-none">Borrowed on</th>
          <th className="col-none">Return date</th>
          <th className="col-none">Librarian</th>
          <th className="col-none">Returned?</th>
          <th className="col-none">Returned on</th>
          <th>PDF</th>
          <th className="col-none">Extra time</th>
          <th>Return a book</th>
        </tr>
      </thead>
      <tbody>
        {borrowedData.map((borrow: Borrow) => (
          <tr key={borrow.id}>
            <td className="col-none">{borrow.id}</td>
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
            <td>
              {resCustomers?.data.find(
                (customer: Customer) => customer.id === borrow.customerId
              ) ? (
                <Link to={`/customers/${borrow.customerId}`}>
                  {
                    resCustomers.data.find(
                      (customer: Customer) => customer.id === borrow.customerId
                    ).firstName
                  }{" "}
                  {
                    resCustomers.data.find(
                      (customer: Customer) => customer.id === borrow.customerId
                    ).lastName
                  }
                </Link>
              ) : (
                ""
              )}
            </td>
            <td className="col-none"> {borrow.borrowingDate.toString()} </td>
            <td className="col-none"> {borrow.returnDate.toString()} </td>
            <td className="col-none"> {borrow.addedByUserName} </td>
            <td className="col-none"> {borrow.returnBook ? "Yes" : "No"} </td>
            <td className="col-none">
              {" "}
              {borrow.returnedOn
                ? borrow.returnedOn.toString()
                : "not returned"}{" "}
            </td>
            <td className="pdf-col">
              <Link to={`/borrow-pdf/${borrow.id}`} key={borrow.id}>
                <BsFilePdf size={30} />
              </Link>
            </td>
            <td className="col-none">
              {!borrow.returnBook ? (
                <button onClick={() => handleOpenExtraDialog(borrow.id)}>
                  <Button variant="warning">Extra</Button>
                </button>
              ) : (
                ""
              )}
            </td>
            <td>
              {!borrow.returnBook ? (
                <button onClick={() => handleReturnBook(borrow.id)}>
                <Button variant="success">Return</Button> 
              </button>
              ) : (
                ""
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BorrowedTable;
