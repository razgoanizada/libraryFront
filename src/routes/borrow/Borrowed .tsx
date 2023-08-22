import { useContext, useEffect, useState } from "react";
import LibraryContext from "../../contexts/LibraryContext";
import { useQuery } from "react-query";
import {
  Librarians,
  BorrowRequest,
  Books,
  Customers,
  hasReturnBook,
  ExtraTime,
} from "../../service/library-service";
import { Customer, Librarian, Borrow, Book } from "../../@Typs";
import { Button, FormControl, InputGroup, Modal } from "react-bootstrap";
import { CgAdd } from "react-icons/cg";
import { LuSearch } from "react-icons/lu";
import "../../style/list.css";
import Spinner from "../../components/animations/Spinner";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import DatePicker from "react-datepicker";

const Borrowed = () => {
  // States to manage librarian data
  const { setBorrowedPage } = useContext(LibraryContext);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [customerId, setCustomerId] = useState<string>("");
  const [bookId, setBookId] = useState<string>("");
  const [addedBy, setAddedBy] = useState<string>("");
  const [returnBook, setReturnBook] = useState<boolean>(false);
  const [borrowingDateStart, setBorrowingDateStart] = useState<string>("");
  const [borrowingDateEnd, setBorrowingDateEnd] = useState<string>("");
  const [returnDateStart, setReturnDateStart] = useState<string>("");
  const [returnDateEnd, setReturnDateEnd] = useState<string>("");
  const [showErrorDialog, setShowErrorDialog] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  // States to manage extra time
  const [showExtraTimeDialog, setShowExtraTimeDialog] =
    useState<boolean>(false);
  const [days, setDays] = useState<number | "">("");
  const [selectedBorrowId, setSelectedBorrowId] = useState<number>(0);

  const { data: resBooks } = useQuery("get books", () => Books());
  const { data: resCustomers } = useQuery("get customers", () => Customers());

  const { data: resLibrarians } = useQuery("get librarians", () =>
    Librarians()
  );

  // Fetching borrow from the server
  const { data: res } = useQuery(
    "get borrowed",
    () =>
      BorrowRequest(
        currentPage,
        customerId,
        bookId,
        addedBy,
        returnBook,
        borrowingDateStart,
        borrowingDateEnd,
        returnDateStart,
        returnDateEnd
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

  // Update book data when response is received from the server
  useEffect(() => {
    if (res && res.data) {
      setBorrowedPage(res.data);
      setPageLoading(false);
    }
  }, [currentPage, res]);

  // Function to handle book search
  const handleSearch = () => {
    setCurrentPage(0);
    setPageLoading(true);
    BorrowRequest(
      0,
      customerId,
      bookId,
      addedBy,
      returnBook,
      borrowingDateStart,
      borrowingDateEnd,
      returnDateStart,
      returnDateEnd
    ).then((res) => {
      setBorrowedPage(res.data);
      setPageLoading(false);
    });
  };

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

  // Functions to manage Edit Change Password dialog
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

  // Function to handle the returned in the select dropdown
  const handleIsReturned = (e: any) => {
    const selectedValue = e.target.value;
    setReturnBook(selectedValue);
  };

  // Determine if the data is still loading
  const isLoading = pageLoading || !res;

  return (
    <>
      <Helmet>
        <title>Borrowed</title>
      </Helmet>

      <div className="container mt-3">
        <div className="flex flex-column">
          <div className="flex">
            <div className="flex flex-col">
              <div className="flex items-center">
                <Link
                  to="/borrow-add"
                  className="add btn-primary py-2 px-2 rounded-lg"
                >
                  <div className="flex items-center text-black">
                    <CgAdd className="w-6 h-6" />
                    <span className="ml-2">Add</span>
                  </div>
                </Link>
              </div>
            </div>
            <InputGroup className="search row ms-5">
              <div className="search-bar">
                <div className="flex col-10">
                  <DatePicker
                    className="form-control d-none d-lg-flex"
                    selected={
                      borrowingDateStart !== ""
                        ? new Date(borrowingDateStart)
                        : null
                    }
                    onChange={(date) =>
                      setBorrowingDateStart(
                        date ? date.toISOString().split("T")[0] : ""
                      )
                    }
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Start date of borrowing"
                  />
                  <DatePicker
                    className="form-control d-none d-lg-flex"
                    selected={
                      borrowingDateEnd !== ""
                        ? new Date(borrowingDateEnd)
                        : null
                    }
                    onChange={(date) =>
                      setBorrowingDateEnd(
                        date ? date.toISOString().split("T")[0] : ""
                      )
                    }
                    dateFormat="yyyy-MM-dd"
                    placeholderText="End date of borrowing"
                  />
                 <div className="flex mx-5">
                 <DatePicker
                    className="form-control d-none d-lg-flex"
                    selected={
                      returnDateStart !== ""
                        ? new Date(returnDateStart)
                        : null
                    }
                    onChange={(date) =>
                      setReturnDateStart(
                        date ? date.toISOString().split("T")[0] : ""
                      )
                    }
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Start date of return."
                  />{" "}
                  <DatePicker
                    className="form-control d-none d-lg-flex"
                    selected={
                      returnDateEnd !== ""
                        ? new Date(returnDateEnd)
                        : null
                    }
                    onChange={(date) =>
                      setReturnDateEnd(
                        date ? date.toISOString().split("T")[0] : ""
                      )
                    }
                    dateFormat="yyyy-MM-dd"
                    placeholderText="End date of return"
                  />
                 </div>
                </div>
                <div className="flex col-11 mt-3">
                  <FormControl
                    as="select"
                    placeholder="select"
                    className="d-none d-lg-flex mx-2"
                    value={bookId}
                    onChange={(e) => setBookId(e.target.value)}
                  >
                    <option value={""} className="bg-stone-500">
                      Select Book
                    </option>
                    {resBooks?.data.map((book: Book) => (
                      <option value={book.id}>{book.name}</option>
                    ))}
                  </FormControl>

                  <FormControl
                    as="select"
                    placeholder="select"
                    className="d-none d-lg-flex mx-2"
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                  >
                    <option value={""} className="bg-stone-500">
                      Select Customer
                    </option>
                    {resCustomers?.data.map((customer: Customer) => (
                      <option value={customer.id}>
                        {customer.firstName} {customer.lastName} ({customer.tz})
                      </option>
                    ))}
                  </FormControl>

                  <FormControl
                    as="select"
                    placeholder="select"
                    className="d-none d-lg-flex mx-2"
                    value={addedBy}
                    onChange={(e) => setAddedBy(e.target.value)}
                  >
                    <option value={""} className="bg-stone-500">
                      Select Added by
                    </option>

                    {resLibrarians?.data.map((librarian: Librarian) => (
                      <option value={librarian.id}>{librarian.userName}</option>
                    ))}
                  </FormControl>
                  <div className="flex align-items-center mx-4">
                    Returned:
                  </div>
                  <FormControl
                    as="select"
                    placeholder="Returned ?"
                    value={returnBook.toString()}
                    onChange={handleIsReturned}
                  >
                    <option value={"true"}>Yes</option>
                    <option value={"false"}>No</option>
                  </FormControl>
                  <Button
                    variant="btn-search"
                    onClick={handleSearch}
                    className="search-icon"
                  >
                    <LuSearch size={30} />
                  </Button>
                  <Button
                    variant="secondary"
                    className="d-none d-lg-flex"
                    onClick={() => {
                      setBorrowingDateStart("")
                      setBorrowingDateEnd("")
                      setReturnDateStart("")
                      setReturnDateEnd("")
                      setBookId("")
                      setCustomerId("")
                      setAddedBy("");
                      setReturnBook(false)
                      handleSearch();
                    }}
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </InputGroup>
          </div>

          {res?.data.totalBorrowed > 0 ? (
            <>
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
                        {" "}
                        {borrow.borrowingDate.toString()}{" "}
                      </td>
                      <td className="col-none">
                        {" "}
                        {borrow.returnDate.toString()}{" "}
                      </td>
                      <td className="col-none"> {borrow.addedByUserName} </td>
                      <td className="col-none">
                        {" "}
                        {borrow.returnBook ? "Yes" : "No"}{" "}
                      </td>
                      <td className="col-none">
                        {" "}
                        {borrow.returnedOn
                          ? borrow.returnedOn.toString()
                          : "not returned"}{" "}
                      </td>
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

export default Borrowed;
