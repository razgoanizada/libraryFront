import { useContext, useEffect, useState } from "react";
import LibraryContext from "../../../contexts/LibraryContext";
import { useQuery } from "react-query";
import {
  BookCategoriesAdd,
  BookCategoriesDelete,
  BookCategoriesUpdate,
  BookCategoriesRequest,
  BooksCategories,
} from "../../../service/library-service";
import { CgAdd } from "react-icons/cg";
import Spinner from "../../../components/animations/Spinner";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import AddCategoryDialog from "../../../components/dialogues/AddCategoryDialog";
import CategorySearch from "../../../components/search/CategorySearch";
import ErrorDialog from "../../../components/dialogues/ErrorDialog";
import EditCategoryDialog from "../../../components/dialogues/EditCategoryDialog";
import CategoryExcel from "../../../components/files/CategoryExcel";
import CategoriesTable from "../../../components/tables/CategoriesTable";
import PaginationButtons from "../../../components/tables/PaginationButtons";

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

  const { data: resAllCategories } = useQuery("get all categories", () =>
    BooksCategories()
  );

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
          title: "The category was successfully edited",
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
    setPageLoading(true);
    Swal.fire({
      title: "Are you sure?",
      text: `Are you sure you want to delete the ${categoryName} category?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
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
    });
  };

  // Determine if the data is still loading
  const isLoading = pageLoading || !res;

  return (
    <>
      <Helmet>
        <title>Book category</title>
      </Helmet>
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

            <CategorySearch
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearch={handleSearch}
            />
          </div>

          {res?.data.totalCategories > 0 ? (
            <>
              <div className="export-button">
                <CategoryExcel data={resAllCategories?.data} />
              </div>

              <CategoriesTable
                CategoriesData={res?.data.results}
                handleOpenEditDialog={handleOpenEditDialog}
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

          <AddCategoryDialog
            showAddDialog={showAddDialog}
            handleCloseAddDialog={handleCloseAddDialog}
            handleConfirmAdd={handleConfirmAdd}
            newCategoryName={newCategoryName}
            setNewCategoryName={setNewCategoryName}
          />

          <EditCategoryDialog
            showEditDialog={showEditDialog}
            handleCloseEditDialog={handleCloseEditDialog}
            handleConfirmEdit={handleConfirmEdit}
            selectedCategoryName={selectedCategoryName}
            setSelectedCategoryName={setSelectedCategoryName}
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

export default BookCategory;
