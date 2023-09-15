import { useContext, useEffect, useState } from "react";
import LibraryContext from "../../contexts/LibraryContext";
import { useQuery } from "react-query";
import {
  BorrowRequest,
  hasReturnBook,
  ExtraTime,
  OverdueRequest,
} from "../../service/library-service";
import Spinner from "../../components/animations/Spinner";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import OverduTable from "../../components/tables/OverdueTable";
import ExtraTimeDialog from "../../components/dialogues/ExtraTimeDialog";
import ErrorDialog from "../../components/dialogues/ErrorDialog";
import PaginationButtons from "../../components/tables/PaginationButtons";
import OverdueExcel from "../../components/files/OverdueExcel";

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

  const { data: resAllOverdue } = useQuery("get all overdue", () => OverdueRequest());

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
              <div className="export-button">
                <OverdueExcel data={resAllOverdue?.data.results} />
              </div>

              <OverduTable
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

export default Overdue;
