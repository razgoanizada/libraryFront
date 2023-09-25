import { useContext, useEffect, useState } from "react";
import LibraryContext from "../../contexts/LibraryContext";
import { useQuery } from "react-query";
import {
  BorrowRequest,
  hasReturnBook,
  ExtraTime,
  Borrow,
} from "../../service/library-service";
import { CgAdd } from "react-icons/cg";
import Spinner from "../../components/animations/Spinner";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import BorrowedExcel from "../../components/files/BorrowedExcel";
import ErrorDialog from "../../components/dialogues/ErrorDialog";
import ExtraTimeDialog from "../../components/dialogues/ExtraTimeDialog";
import BorrowedTable from "../../components/tables/BorrowedTable ";
import PaginationButtons from "../../components/tables/PaginationButtons";
import BorrowSearch from "../../components/search/BorrowSearch";

const Borrowed = () => {
  // States to manage borrow data
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

  const { data: resAllBorrow } = useQuery("get all borrows", () => Borrow());

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

  // Update borrow data when response is received from the server
  useEffect(() => {
    if (res && res.data) {
      setBorrowedPage(res.data);
      setPageLoading(false);
    }
  }, [currentPage, res]);

  // Function to handle borrow search
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

  const handleReset = () => {
    setBorrowingDateStart("");
    setBorrowingDateEnd("");
    setReturnDateStart("");
    setReturnDateEnd("");
    setBookId("");
    setCustomerId("");
    setAddedBy("");
    setReturnBook(false);
    handleSearch();
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
              title: "The book was returned to the library",
              icon: "success",
              timer: 2000,
            });
          })
          .catch((error) => {
            setErrorMsg(error.message);
            setShowErrorDialog(true);
            setPageLoading(false);
          });
      }
    });
  };

  // Functions to manage Edit Extra days dialog
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
          title: `${Number(days)} days have been successfully added`,
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
            <BorrowSearch
              borrowingDateStart={borrowingDateStart}
              setBorrowingDateStart={setBorrowingDateStart}
              borrowingDateEnd={borrowingDateEnd}
              setBorrowingDateEnd={setBorrowingDateEnd}
              returnDateStart={returnDateStart}
              setReturnDateStart={setReturnDateStart}
              returnDateEnd={returnDateEnd}
              setReturnDateEnd={setReturnDateEnd}
              bookId={bookId}
              setBookId={setBookId}
              customerId={customerId}
              setCustomerId={setCustomerId}
              addedBy={addedBy}
              setAddedBy={setAddedBy}
              returnBook={returnBook}
              handleIsReturned={handleIsReturned}
              handleSearch={handleSearch}
              handleReset={handleReset}
            />
          </div>

          {res?.data.totalBorrowed > 0 ? (
            <>
              <div className="export-button">
                <BorrowedExcel data={resAllBorrow?.data} />
              </div>

              <BorrowedTable
                borrowedData={res?.data.results}
                handleReturnBook={handleReturnBook}
                handleOpenExtraDialog={handleOpenExtraDialog}
              />

              <p className="mt-5">
                Page {res?.data.pageNo + 1} of {res?.data.totalPages},<br />
                Showing {res?.data.pageSize} results per page
              </p>
              <PaginationButtons
                onNext={nextPage}
                onPrevious={previousPage}
                hasNext={res?.data.totalPages > res?.data.pageNo + 1}
                hasPrevious={res?.data.pageNo > 0}
              />
            </>
          ) : (
            <div className="flex justify-center items-center mt-16 ">
              {isLoading ? (
                <Spinner name="Puff" />
              ) : (
                <h5> No results have been found</h5>
              )}
            </div>
          )}

          <ExtraTimeDialog
            show={showExtraTimeDialog}
            handleClose={handleCloseExtraDialog}
            handleConfirm={handleConfirmExtra}
            days={days}
            setDays={setDays}
          />

          <ErrorDialog
            show={showErrorDialog}
            onClose={() => setShowErrorDialog(false)}
            errorMsg={errorMsg}
          />
        </div>
      </div>
    </>
  );
};

export default Borrowed;
