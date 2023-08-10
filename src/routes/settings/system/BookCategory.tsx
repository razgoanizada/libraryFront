import { useContext, useEffect, useState } from "react";
import LibraryContext from "../../../contexts/LibraryContext";
import { useQuery } from "react-query";
import {
  BookCategoriesAdd,
  BookCategoriesDelete,
  BookCategoriesUpdate,
  BookCategoriesRequest,
} from "../../../service/library-service";
import { BookCategories } from "../../../@Typs";
import { Button, FormControl, InputGroup, Modal } from "react-bootstrap";
import { CgAdd } from "react-icons/cg";
import { MdModeEditOutline } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { LuSearch } from "react-icons/lu";
import "../../../style/list.css"
import Spinner from "../../../components/animations/Spinner";
import Swal from "sweetalert2";

const BookCategory = () => {
  // States to manage category data
  const { setCategoriesPage } = useContext(LibraryContext);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showAddDialog, setShowAddDialog] = useState<boolean>(false);
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [showErrorDialog, setShowErrorDialog] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  // States to manage category edit dialog
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);

  // Fetching categories from the server
  const { data: res } = useQuery(
    "get categories",
    () => BookCategoriesRequest(currentPage, searchQuery),
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

  // Update category data when response is received from the server
  useEffect(() => {
    if (res && res.data) {
      setCategoriesPage(res.data);
      setPageLoading(false);
    }
  }, [currentPage, res]);

  // Function to handle category search
  const handleSearch = () => {
    setCurrentPage(0);
    setPageLoading(true);
    BookCategoriesRequest(0, searchQuery).then((res) => {
      setCategoriesPage(res.data);
      setPageLoading(false);
    });
  };

  // Functions to manage Add Category dialog
  const handleOpenAddDialog = () => {
    setShowAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setShowAddDialog(false);
    setNewCategoryName("");
  };

  const handleConfirmAdd = () => {
    if (newCategoryName.length < 2) {
      
      setShowErrorDialog(true);
      setErrorMsg("The name must contain at least 2 characters");
      return;
    }

    setCurrentPage(0);
    setPageLoading(true);

    BookCategoriesAdd(newCategoryName)
      .then((res) => {
        setCategoriesPage(res.data);
        setPageLoading(false);
        Swal.fire({
          title: "Category successfully added",
          icon: "success",
          timer: 3000,
        });
      })
      .catch((error) => {
        setShowErrorDialog(true);
        setErrorMsg(error.message);
        setPageLoading(false);
      });

    handleCloseAddDialog();
  };

  // Functions to manage Edit Category dialog
  const handleOpenEditDialog = (categoryName: string, categoryId: any) => {
    setSelectedCategoryName(categoryName);
    setSelectedCategoryId(categoryId);
    setShowEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setShowEditDialog(false);
    setSelectedCategoryId(0);
    setSelectedCategoryName("");
  };

  const handleConfirmEdit = () => {
    if (!selectedCategoryId) return;

    setCurrentPage(0);
    setPageLoading(true);

    BookCategoriesUpdate(selectedCategoryName, selectedCategoryId)
      .then((res) => {
        setCategoriesPage(res.data);
        setPageLoading(false);
        setSelectedCategoryId(0);
        setSelectedCategoryName("");
        Swal.fire({
          title: "Category successfully save",
          icon: "success",
          timer: 2000,
        });
      })
      .catch((error) => {
        setShowErrorDialog(true);
        setErrorMsg(error.message);
        setPageLoading(false);
      });

    setShowEditDialog(false);
  };

  // Function to handle category deletion
  const handleDelete = (categoryName: string, categoryId: any) => {
    setCurrentPage(0);
    setPageLoading(true);
    const confirmation = window.confirm(
      `Are you sure you want to delete ${categoryName}?`
    );
    if (confirmation) {
      BookCategoriesDelete(categoryId)
        .then((res) => {
          setCategoriesPage(res.data);
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
    <div className="container mt-3">
      <div className="flex flex-col">
        <div className="flex">
          <div className="flex flex-col">
            <div className="flex items-center">
              <button
                className="add btn-primary py-2 px-2 rounded-lg"
                onClick={handleOpenAddDialog}
              >
                <div className="flex items-center">
                  <CgAdd className="w-6 h-6" />
                  <span className="ml-2">Add</span>
                </div>
              </button>
            </div>
          </div>

          <InputGroup className="search flex ms-5">
            <FormControl
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
           <Button
              variant="btn-search"
              onClick={handleSearch}
              className="search-icon"
            >
              <LuSearch size={30} />
            </Button>
          </InputGroup>
        </div>

        {res?.data.totalCategories > 0 ? (
          <>
            <table className="mt-4">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {res?.data.results.map((category: BookCategories) => (
                  <tr key={category.id}>
                    <td>{category.name}</td>
                    <td>
                      <button
                        className="edit"
                        onClick={() =>
                          handleOpenEditDialog(category.name, category.id)
                        }
                      >
                        <MdModeEditOutline size={30} />
                      </button>
                    </td>
                    <td>
                      <button
                        className="delete"
                        onClick={() => handleDelete(category.name, category.id)}
                      >
                        <AiFillDelete size={30} />
                      </button>
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
            {isLoading ? <Spinner name="Puff" /> : "No results have been found"}
          </div>
        )}

        {/* Dialog add  */}

        <Modal show={showAddDialog} onHide={handleCloseAddDialog}>
          <Modal.Header closeButton>
            <Modal.Title>Add Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormControl
              placeholder="Enter category name..."
              value={newCategoryName}
              onChange={(e) => 
                setNewCategoryName(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAddDialog}>
              Cancel
            </Button>
            <Button className="save" onClick={handleConfirmAdd}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Dialog edit  */}

        <Modal show={showEditDialog} onHide={handleCloseEditDialog}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormControl
              placeholder="Enter category name..."
              value={selectedCategoryName}
              onChange={(e) => setSelectedCategoryName(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEditDialog}>
              Cancel
            </Button>
            <Button className="save" onClick={handleConfirmEdit}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showErrorDialog} onHide={() => setShowErrorDialog(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{errorMsg}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => setShowErrorDialog(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default BookCategory;
