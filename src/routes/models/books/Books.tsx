import { useContext, useEffect, useState } from "react";
import LibraryContext from "../../../contexts/LibraryContext";
import { useQuery } from "react-query";
import { BooksRequest, BooksDelete, BooksCategories, Librarians } from "../../../service/library-service";
import { Book, BookCategories, Librarian } from "../../../@Typs";
import { Button, FormControl, InputGroup, Modal } from "react-bootstrap";
import { CgAdd } from "react-icons/cg";
import { MdModeEditOutline } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { LuSearch } from "react-icons/lu";
import { FcSearch } from "react-icons/fc";
import "../../../style/list.css";
import Spinner from "../../../components/animations/Spinner";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { HasPermission } from "../../../utils/HasPermission";

const Books = () => {
  // States to manage librarian data
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

  const { data: resBookCategories } = useQuery("get categories", () =>
  BooksCategories()
  );

  const { data: resLibrarians } = useQuery("get librarians", () =>
  Librarians()
  );

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

  // Function to handle book deletion
  const handleDelete = (name: string, bookId: any) => {
    setCurrentPage(0);
    setPageLoading(true);
    const confirmation = window.confirm(
      `Are you sure you want to delete ${name}?`
    );
    if (confirmation) {
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
            <InputGroup className="search row ms-5">
              <div className="search-bar">
                <div className="flex col-10">
                  <FormControl
                    placeholder="Search Name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Button
                    variant="btn-search"
                    onClick={handleSearch}
                    className="search-icon d-flex d-lg-none"
                  >
                    <FcSearch size={30} />
                  </Button>
                  <FormControl
                    placeholder="Search Author..."
                    className="mx-3 d-none d-lg-flex"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                  <FormControl
                    placeholder="Search Bookcase..."
                    className="mx-3 d-none d-lg-flex"
                    value={bookcase}
                    onChange={(e) => setBookcase(e.target.value)}
                  />
                </div>
                <div className="flex col-11 mt-3">
                  <FormControl
                    placeholder="Search Publishing year..."
                    className="mx-3 d-none d-lg-flex"
                    value={publishYear}
                    onChange={(e) => setPublishYear(e.target.value)}
                  />
                  <FormControl
                    as="select"
                    placeholder="select"
                    className="d-none d-lg-flex mx-3"
                    value={bookCategories}
                    onChange={(e) => setBookCategories(e.target.value)}
                  >
                    <option value={""} className="bg-stone-500 ">
                      Select Category
                    </option>
                    {resBookCategories?.data.map((category: BookCategories) => (
                      <option value={category.id}>{category.name}</option>
                    ))}
                  </FormControl>
                  <FormControl
                    as="select"
                    placeholder="select"
                    className="d-none d-lg-flex"
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
                  <Button
                    variant="btn-search"
                    onClick={handleSearch}
                    className="search-icon d-none d-lg-flex"
                  >
                    <LuSearch size={30} />
                  </Button>
                  <Button
                    variant="secondary"
                    className="d-none d-lg-flex"
                    onClick={() => {
                      setAddedBy("");
                      setAuthor("");
                      setPublishYear("");
                      setBookCategories("");
                      setBookcase("");
                      setName("");
                      handleSearch();
                    }}
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </InputGroup>
          </div>

          {res?.data.totalBooks > 0 ? (
            <>
              <table className="mt-4">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th className="col-none">Author</th>
                    <th className="col-none">Bookcase</th>
                    <th className="col-none">Publishing year</th>
                    <th className="col-none">Category</th>
                    <th className="col-none">Added by</th>
                    {HasPermission("pro") && <th>Edit</th>}
                    {HasPermission("pro") && <th>Delete</th>}
                  </tr>
                </thead>
                <tbody>
                  {res?.data.results.map((book: Book) => (
                    <tr key={book.id}>
                      <td>
                        <Link to={`/books/${book.id}`} key={book.id}>
                          {book.name}
                        </Link>
                      </td>
                      <td className="col-none">{book.author} </td>
                      <td className="col-none">{book.bookcase} </td>
                      <td className="col-none">{book.publishYear} </td>
                      <td className="col-none">{book.bookCategoriesName} </td>
                      <td className="col-none">{book.addedByUserName} </td>
                      {HasPermission("pro") && (
                        <td>
                          <button className="edit">
                            <Link to={`/books-edit/${book.id}`} key={book.id}>
                              <MdModeEditOutline size={30} />
                            </Link>
                          </button>
                        </td>
                      )}
                      {HasPermission("pro") && (
                        <td>
                          <button
                            className="delete"
                            onClick={() => handleDelete(book.name, book.id)}
                          >
                            <AiFillDelete size={30} />
                          </button>
                        </td>
                      )}
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

export default Books;
