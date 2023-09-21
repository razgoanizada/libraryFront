import { useContext, useEffect, useState } from "react";
import LibraryContext from "../../../contexts/LibraryContext";
import { useQuery } from "react-query";
import {
  Books as allBooks,
  BooksRequest,
  BooksDelete,
} from "../../../service/library-service";
import { CgAdd } from "react-icons/cg";
import Spinner from "../../../components/animations/Spinner";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { HasPermission } from "../../../utils/HasPermission";
import BooksSearch from "../../../components/search/BooksSearch";
import BooksExcel from "../../../components/files/BooksExcel";
import ErrorDialog from "../../../components/dialogues/ErrorDialog";
import BooksTable from "../../../components/tables/BooksTable";
import PaginationButtons from "../../../components/tables/PaginationButtons";

const Books = () => {
  // States to manage book data
  const { setBooksPage } = useContext(LibraryContext);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [publishYear, setPublishYear] = useState<string>("");
  const [bookcase, setBookcase] = useState<string>("");
  const [bookCategories, setBookCategories] = useState<string>("");
  const [addedBy, setAddedBy] = useState<string>("");
  const [showErrorDialog, setShowErrorDialog] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const { data: resAllBooks } = useQuery("get all books", () => allBooks());

  // Fetching books from the server
  const { data: res } = useQuery(
    "get books",
    () =>
      BooksRequest(
        currentPage,
        name,
        author,
        publishYear,
        bookcase,
        bookCategories,
        addedBy
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
      setBooksPage(res.data);
      setPageLoading(false);
    }
  }, [currentPage, res]);

  // Function to handle book search
  const handleSearch = () => {
    setCurrentPage(0);
    setPageLoading(true);
    BooksRequest(
      0,
      name,
      author,
      publishYear,
      bookcase,
      bookCategories,
      addedBy
    ).then((res) => {
      setBooksPage(res.data);
      setPageLoading(false);
    });
  };

  const handleReset = () => {
    setName("");
    setAuthor("");
    setBookcase("");
    setPublishYear("");
    setBookCategories("");
    setAddedBy("");
    handleSearch();
  };

  // Function to handle book deletion
  const handleDelete = (name: string, bookId: any) => {
    setPageLoading(true);
    Swal.fire({
      title: "Are you sure?",
      text: `Are you sure you want to delete the ${name} book?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        BooksDelete(bookId)
          .then((res) => {
            setBooksPage(res.data);
            setPageLoading(false);
            Swal.fire({
              title: "Deleted successfully",
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

  // Determine if the data is still loading
  const isLoading = pageLoading || !res;

  return (
    <>
      <Helmet>
        <title>Books</title>
      </Helmet>

      <div className="container mt-3">
        <div className="flex flex-column">
          <div className="flex">
            <div className="flex flex-col">
              {HasPermission("pro") && (
                <div className="flex items-center">
                  <Link
                    to="/books-add"
                    className="add btn-primary py-2 px-2 rounded-lg"
                  >
                    <div className="flex items-center text-black">
                      <CgAdd className="w-6 h-6" />
                      <span className="ml-2">Add</span>
                    </div>
                  </Link>
                </div>
              )}
            </div>
            <BooksSearch
              name={name}
              setName={setName}
              author={author}
              setAuthor={setAuthor}
              bookcase={bookcase}
              setBookcase={setBookcase}
              publishYear={publishYear}
              setPublishYear={setPublishYear}
              bookCategories={bookCategories}
              setBookCategories={setBookCategories}
              addedBy={addedBy}
              setAddedBy={setAddedBy}
              handleSearch={handleSearch}
              handleReset={handleReset}
            />
          </div>

          {res?.data.totalBooks > 0 ? (
            <>
              <div className="export-button">
                <BooksExcel data={resAllBooks?.data} />
              </div>

              <BooksTable
                BooksData={res?.data.results}
                handleDelete={handleDelete}
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

export default Books;
