import { useContext, useEffect, useState } from "react";
import LibraryContext from "../../../contexts/LibraryContext";
import { useQuery } from "react-query";
import {
  CustomerTypeRequest,
  CustomerTypeDelete,
  CustomerTypeAdd,
  CustomerTypeUpdate,
} from "../../../service/library-service";
import { CustomerType } from "../../../@Typs";
import { Button, FormControl, InputGroup, Modal } from "react-bootstrap";
import { CgAdd } from "react-icons/cg";
import { MdModeEditOutline } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { LuSearch } from "react-icons/lu";
import Spinner from "../../../components/animations/Spinner";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

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
          title: "Type successfully save",
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
          <InputGroup className="search d-flex ms-5">
            <FormControl
              placeholder="Search types..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FormControl
              placeholder="Search amount of days..."
              className="mx-3 d-none d-md-flex"
              type="number"
              value={days}
              onChange={(e) => setDays(e.target.value)}
            />
            <FormControl
              placeholder="Search amount of books..."
              className="mx-3 d-none d-md-flex"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
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

        {res?.data.totalTypes > 0 ? (
          <>
            <table className="mt-4">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Days</th>
                  <th>Amount</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {res?.data.results.map((type: CustomerType) => (
                  <tr key={type.id}>
                    <td>{type.name}</td>
                    <td>{type.days}</td>
                    <td>{type.amount}</td>
                    <td>
                      <button
                        className="edit"
                        onClick={() =>
                          handleOpenEditDialog(type.days, type.amount, type.id)
                        }
                      >
                        <MdModeEditOutline size={30} />
                      </button>
                    </td>
                    <td>
                      <button
                        className="delete"
                        onClick={() => handleDelete(type.name, type.id)}
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
            <Modal.Title>Add Type</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormControl
              placeholder="Enter type name..."
              className="mb-3"
              value={newTypeName}
              onChange={(e) => setNewTypeName(e.target.value)}
            />
            <FormControl
              placeholder="Enter the amount of days..."
              className="mb-3"
              type="number"
              value={newTypeDays}
              onChange={(e) => setNewTypeDays(parseInt(e.target.value, 10))}
            />
            <FormControl
              placeholder="Enter the amount of books..."
              type="number"
              value={newTypeAmount}
              onChange={(e) => setNewTypeAmount(parseInt(e.target.value, 10))}
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
            <Modal.Title>Edit Type</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label>Days:</label>
            <FormControl
              placeholder="Enter the amount of days..."
              className="mb-3"
              type="number"
              value={selectedTypeDays}
              onChange={(e) =>
                setSelectedTypeDays(parseInt(e.target.value, 10))
              }
            />
            <label>Amount:</label>
            <FormControl
              placeholder="Enter the amount of books..."
              type="number"
              value={selectedTypeAmount}
              onChange={(e) =>
                setSelectedTypeAmount(parseInt(e.target.value, 10))
              }
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
    </>
  );
};

export default CustomersType;
