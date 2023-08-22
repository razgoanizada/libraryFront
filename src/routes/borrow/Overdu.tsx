import { useContext, useEffect, useState } from "react";
import LibraryContext from "../../contexts/LibraryContext";
import { useQuery } from "react-query";
import {
  BorrowRequest,
  Books,
  Customers,
  hasReturnBook,
  ExtraTime,
} from "../../service/library-service";
import { Customer, Borrow, Book } from "../../@Typs";
import { Button, FormControl, Modal } from "react-bootstrap";
import "../../style/list.css";
import Spinner from "../../components/animations/Spinner";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const Overdue = () => {
  // States to manage borrow data
  const { setBorrowedPage } = useContext(LibraryContext);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [showErrorDialog, setShowErrorDialog] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  // States to manage extra time
  const [showExtraTimeDialog, setShowExtraTimeDialog] =
    useState<boolean>(false);
  const [days, setDays] = useState<number | "">("");
  const [selectedBorrowId, setSelectedBorrowId] = useState<number>(0);

  const { data: resBooks } = useQuery("get books", () => Books());
  const { data: resCustomers } = useQuery("get customers", () => Customers());

  // Fetching borrow from the server
  const { data: res } = useQuery(
    "get borrowed",
    () =>
      BorrowRequest(
        currentPage,
        "",
        "",
        "",
        false,
        "",
        "",
        "",
        new Date().toISOString().split("T")[0]
      ),
    {
      enabled: !pageLoading,
    }
  );

  // Function to navigate to the next page
  const nextPage = () => {
    if (!pageLoading) {
      setPageLoading(true);
      setCurrentPage((page) => page + 1);
    }
  };

  // Function to navigate to the previous page
  const previousPage = () => {
    if (!pageLoading) {
      setPageLoading(true);
      setCurrentPage((page) => page - 1);
    }
  };

  // Update borrow data when response is received from the server
  useEffect(() => {
    if (res && res.data) {
      setBorrowedPage(res.data);
      setPageLoading(false);
    }
  }, [currentPage, res]);

  const handleReturnBook = (borrowId: any) => {
    setPageLoading(true);
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        hasReturnBook(borrowId)
          .then((res) => {
            setBorrowedPage(res.data);
            setPageLoading(false);
            Swal.fire({
              title: "Successfully",
              icon: "success",
              timer: 2000,
            });
          })
          .catch((error) => {
            setShowErrorDialog(true);
            setErrorMsg(error.message);
            setPageLoading(false);
          });
      }
    });
  };

  // Functions to manage Edit Extra time dialog
  const handleOpenExtraDialog = (borrowId: number) => {
    setSelectedBorrowId(borrowId);
    setShowExtraTimeDialog(true);
  };

  const handleCloseExtraDialog = () => {
    setShowExtraTimeDialog(false);
    setSelectedBorrowId(0);
    setDays("");
  };

  const handleConfirmExtra = () => {
    if (!setSelectedBorrowId) return;

    if (Number(days) < 1 || Number(days) > 180) {
      setShowErrorDialog(true);
      setErrorMsg("The number of days should be between 1 and 180");
      return;
    }

    setCurrentPage(0);
    setPageLoading(true);

    ExtraTime(selectedBorrowId, Number(days))
      .then((res) => {
        setBorrowedPage(res.data);
        setPageLoading(false);
        setSelectedBorrowId(0);
        Swal.fire({
          title: "Successfully",
          icon: "success",
          timer: 2000,
        });
      })
      .catch((error) => {
        setShowErrorDialog(true);
        setErrorMsg(error.message);
        setPageLoading(false);
      });

    handleCloseExtraDialog();
  };

  // Determine if the data is still loading
  const isLoading = pageLoading || !res;

  return (
    <>
      <Helmet>
        <title>Overdue </title>
      </Helmet>

      <div className="container mt-3">
        <div className="flex flex-column">
          {res?.data.totalBorrowed > 0 ? (
            <>
              <table className="mt-4">
                <thead>
                  <tr>
                    <th className="col-none">Number</th>
                    <th>Book</th>
                    <th>Customer</th>
                    <th className="col-none">Phone</th>
                    <th className="col-none">Email</th>
                    <th className="col-none">Borrowed on</th>
                    <th className="col-none">Return date</th>
                    <th className="col-none">Librarian</th>
                    <th className="col-none">Extra time</th>
                    <th>Return a book</th>
                  </tr>
                </thead>
                <tbody>
                  {res?.data.results.map((borrow: Borrow) => (
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
                      <td className="col-none">
                        {resCustomers?.data.find(
                          (customer: Customer) =>
                            customer.id === borrow.customerId
                        ) ? (
                          <Link
                            to={`tel:${
                              resCustomers.data.find(
                                (customer: Customer) =>
                                  customer.id === borrow.customerId
                              ).phone
                            }`}
                          >
                            {
                              resCustomers.data.find(
                                (customer: Customer) =>
                                  customer.id === borrow.customerId
                              ).phone
                            }
                          </Link>
                        ) : (
                          ""
                        )}
                      </td>
                      <td className="col-none">
                        {resCustomers?.data.find(
                          (customer: Customer) =>
                            customer.id === borrow.customerId
                        ) ? (
                          <Link
                            to={`mailto:${
                              resCustomers.data.find(
                                (customer: Customer) =>
                                  customer.id === borrow.customerId
                              ).email
                            }`}
                          >
                            {
                              resCustomers.data.find(
                                (customer: Customer) =>
                                  customer.id === borrow.customerId
                              ).email
                            }
                          </Link>
                        ) : (
                          ""
                        )}
                      </td>
                      <td className="col-none">
                        {" "}
                        {borrow.borrowingDate.toString()}{" "}
                      </td>
                      <td className="col-none">
                        {" "}
                        {borrow.returnDate.toString()}{" "}
                      </td>
                      <td className="col-none"> {borrow.addedByUserName} </td>
                      <td className="col-none">
                        {!borrow.returnBook ? (
                          <button
                            onClick={() => handleOpenExtraDialog(borrow.id)}
                          >
                            <Button>Extra </Button>
                          </button>
                        ) : (
                          ""
                        )}
                      </td>
                      <td>
                        {!borrow.returnBook ? (
                          <button onClick={() => handleReturnBook(borrow.id)}>
                            <Button>Return</Button>
                          </button>
                        ) : (
                          ""
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-5">
                Page {res?.data.pageNo + 1} of {res?.data.totalPages},<br />
                Showing {res?.data.pageSize} results per page
              </p>
              <div>
                {res?.data.totalPages > res?.data.pageNo + 1 && (
                  <Button onClick={nextPage} className="me-3">
                    Next Page
                  </Button>
                )}
                {res?.data.pageNo > 0 && (
                  <Button onClick={previousPage}>Previous Page</Button>
                )}
              </div>
            </>
          ) : (
            <div>
              {isLoading ? (
                <Spinner name="Puff" />
              ) : (
                "No results have been found"
              )}
            </div>
          )}

          {/* Dialog Extra time  */}

          <Modal show={showExtraTimeDialog} onHide={handleCloseExtraDialog}>
            <Modal.Header closeButton>
              <Modal.Title>Extra time</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <label>Days:</label>
              <FormControl
                placeholder="Enter number of days..."
                className="mb-3"
                type="number"
                value={days}
                onChange={(e) => setDays(parseInt(e.target.value, 10))}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseExtraDialog}>
                Cancel
              </Button>
              <Button className="save" onClick={handleConfirmExtra}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={showErrorDialog}
            onHide={() => setShowErrorDialog(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Error</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>{errorMsg}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                onClick={() => setShowErrorDialog(false)}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Overdue;
