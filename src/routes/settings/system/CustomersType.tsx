import { useContext, useEffect, useState } from "react";
import LibraryContext from "../../../contexts/LibraryContext";
import { useQuery } from "react-query";
import {
  CustomerTypeRequest,
  CustomerTypeDelete,
  CustomerTypeAdd,
  CustomerTypeUpdate,
  CustomersType as CustomersTypes,
} from "../../../service/library-service";
import { CgAdd } from "react-icons/cg";
import Spinner from "../../../components/animations/Spinner";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import TypeSearch from "../../../components/search/TypeSearch";
import AddTypeDialog from "../../../components/dialogues/AddTypeDialog";
import TypeExcel from "../../../components/files/TypeExcel";
import ErrorDialog from "../../../components/dialogues/ErrorDialog";
import EditTypeDialog from "../../../components/dialogues/EditTypeDialog";
import TypesTable from "../../../components/tables/TypesTable";
import PaginationButtons from "../../../components/tables/PaginationButtons";

const CustomersType = () => {
  // States to manage type data
  const { setTypsPage } = useContext(LibraryContext);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [days, setDays] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [showAddDialog, setShowAddDialog] = useState<boolean>(false);
  const [newTypeName, setNewTypeName] = useState<string>("");
  const [newTypeDays, setNewTypeDays] = useState<number | "">("");
  const [newTypeAmount, setNewTypeAmount] = useState<number | "">("");
  const [showErrorDialog, setShowErrorDialog] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  // States to manage type edit dialog
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
  const [selectedTypeDays, setSelectedTypeDays] = useState<number>(0);
  const [selectedTypeAmount, setSelectedTypeAmount] = useState<number>(0);
  const [selectedTypeId, setSelectedTypeId] = useState<number>(0);

  const { data: resAllTypes } = useQuery("get all typs", () =>
    CustomersTypes()
  );

  // Fetching types from the server
  const { data: res } = useQuery(
    "get typs",
    () => CustomerTypeRequest(currentPage, name, days, amount),
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

  // Update type data when response is received from the server
  useEffect(() => {
    if (res && res.data) {
      setTypsPage(res.data);
      setPageLoading(false);
    }
  }, [currentPage, res]);

  // Function to handle type search
  const handleSearch = () => {
    setCurrentPage(0);
    setPageLoading(true);
    CustomerTypeRequest(0, name, days, amount).then((res) => {
      setTypsPage(res.data);
      setPageLoading(false);
    });
  };

  const handleReset = () => {
    setName("");
    setDays("");
    setAmount("");
    handleSearch();
  };

  // Functions to manage Add type dialog
  const handleOpenAddDialog = () => {
    setShowAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setShowAddDialog(false);
    setNewTypeName("");
    setNewTypeDays("");
    setNewTypeAmount("");
  };

  const handleConfirmAdd = () => {
    if (newTypeName.length < 2) {
      setShowErrorDialog(true);
      setErrorMsg("The name must contain at least 2 characters");
      return;
    }

    if (Number(newTypeDays) < 1 || Number(newTypeDays) > 180) {
      setShowErrorDialog(true);
      setErrorMsg("The number of days should be between 1 and 180");
      return;
    }

    if (Number(newTypeAmount) < 1 || Number(newTypeAmount) > 10) {
      setShowErrorDialog(true);
      setErrorMsg("The number of books should be between 1 and 10");
      return;
    }

    if (newTypeDays === "" || newTypeAmount === "") {
      setShowErrorDialog(true);
      setErrorMsg("Please fill in all the fields.");
      return;
    }

    setCurrentPage(0);
    setPageLoading(true);

    CustomerTypeAdd(newTypeName, newTypeDays, newTypeAmount)
      .then((res) => {
        setTypsPage(res.data);
        setPageLoading(false);
        Swal.fire({
          title: "Type successfully added",
          icon: "success",
          timer: 2000,
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
  const handleOpenEditDialog = (
    days: number,
    amount: number,
    typeId: number
  ) => {
    setSelectedTypeDays(days);
    setSelectedTypeAmount(amount);
    setSelectedTypeId(typeId);
    setShowEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setShowEditDialog(false);
    setSelectedTypeId(0);
    setSelectedTypeDays(0);
    setSelectedTypeAmount(0);
  };

  const handleConfirmEdit = () => {
    if (!selectedTypeId) return;

    if (selectedTypeDays < 1 || selectedTypeDays > 180) {
      setShowErrorDialog(true);
      setErrorMsg("The number of days should be between 1 and 180");
      return;
    }

    if (selectedTypeAmount < 1 || selectedTypeAmount > 10) {
      setShowErrorDialog(true);
      setErrorMsg("The number of books should be between 1 and 10");
      return;
    }

    setCurrentPage(0);
    setPageLoading(true);

    CustomerTypeUpdate(selectedTypeDays, selectedTypeAmount, selectedTypeId)
      .then((res) => {
        setTypsPage(res.data);
        setPageLoading(false);
        setSelectedTypeId(0);
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

  // Function to handle type deletion
  const handleDelete = (typeName: string, typeId: any) => {
    setPageLoading(true);
    Swal.fire({
      title: "Are you sure?",
      text: `Are you sure you want to delete the ${typeName} category?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        CustomerTypeDelete(typeId)
          .then((res) => {
            setTypsPage(res.data);
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
        <title>Types of customers</title>
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

            <TypeSearch
              name={name}
              setName={setName}
              days={days}
              setDays={setDays}
              amount={amount}
              setAmount={setAmount}
              handleReset={handleReset}
              handleSearch={handleSearch}
            />
          </div>

          {res?.data.totalTypes > 0 ? (
            <>
              <div className="export-button">
                <TypeExcel data={resAllTypes?.data} />
              </div>

              <TypesTable
                TypesData={res?.data.results}
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

          <AddTypeDialog
            showAddDialog={showAddDialog}
            handleCloseAddDialog={handleCloseAddDialog}
            handleConfirmAdd={handleConfirmAdd}
            newTypeName={newTypeName}
            setNewTypeName={setNewTypeName}
            newTypeDays={newTypeDays}
            setNewTypeDays={setNewTypeDays}
            newTypeAmount={newTypeAmount}
            setNewTypeAmount={setNewTypeAmount}
          />

          <EditTypeDialog
            showEditDialog={showEditDialog}
            handleCloseEditDialog={handleCloseEditDialog}
            selectedTypeDays={selectedTypeDays}
            setSelectedTypeDays={setSelectedTypeDays}
            selectedTypeAmount={selectedTypeAmount}
            setSelectedTypeAmount={setSelectedTypeAmount}
            handleConfirmEdit={handleConfirmEdit}
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

export default CustomersType;
