import { useContext, useEffect, useState } from "react";
import LibraryContext from "../../../contexts/LibraryContext";
import { useQuery } from "react-query";
import {
  Librarians,
  CustomersRequest,
  CustomersType,
  CustomerActive,
} from "../../../service/library-service";
import { CustomerType, Customer, Librarian } from "../../../@Typs";
import { Button, FormControl, InputGroup, Modal } from "react-bootstrap";
import { CgAdd } from "react-icons/cg";
import { MdModeEditOutline } from "react-icons/md";
import { LuSearch } from "react-icons/lu";
import { FcSearch } from "react-icons/fc";
import "../../../style/list.css";
import Spinner from "../../../components/animations/Spinner";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { HasPermission } from "../../../utils/HasPermission";

const Customers = () => {
  // States to manage librarian data
  const { setCustomersPage } = useContext(LibraryContext);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [type, setType] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [tz, setTz] = useState<string>("");
  const [addedBy, setAddedBy] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(true);
  const [showErrorDialog, setShowErrorDialog] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const { data: resCustomerType } = useQuery("get typs", () => CustomersType());

  const { data: resLibrarians } = useQuery("get librarians", () =>
    Librarians()
  );

  // Fetching books from the server
  const { data: res } = useQuery(
    "get customers",
    () =>
      CustomersRequest(
        currentPage,
        type,
        firstName,
        lastName,
        phone,
        tz,
        addedBy,
        isActive
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
      setCustomersPage(res.data);
      setPageLoading(false);
    }
  }, [currentPage, res]);

  // Function to handle book search
  const handleSearch = () => {
    setCurrentPage(0);
    setPageLoading(true);
    CustomersRequest(
      0,
      type,
      firstName,
      lastName,
      phone,
      tz,
      addedBy,
      isActive
    ).then((res) => {
      setCustomersPage(res.data);
      setPageLoading(false);
    });
  };

  const handleActive = (customerId: any) => {
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
        CustomerActive(customerId)
          .then((res) => {
            setCustomersPage(res.data);
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

  // Function to handle the change in the select dropdown
  const handleIsActiveChange = (e: any) => {
    const selectedValue = e.target.value;
    setIsActive(selectedValue);
  };

  // Determine if the data is still loading
  const isLoading = pageLoading || !res;

  return (
    <>
      <Helmet>
        <title>Customers</title>
      </Helmet>

      <div className="container mt-3">
        <div className="flex flex-column">
          <div className="flex">
            <div className="flex flex-col">
              {HasPermission("pro") && (
                <div className="flex items-center">
                  <Link
                    to="/customers-add"
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
                    placeholder="Search First Name..."
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <Button
                    variant="btn-search"
                    onClick={handleSearch}
                    className="search-icon d-flex d-lg-none"
                  >
                    <FcSearch size={30} />
                  </Button>
                  <FormControl
                    placeholder="Search Last Name..."
                    className="mx-3 d-none d-lg-flex"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <FormControl
                    placeholder="Search Phone..."
                    className="mx-3 d-none d-lg-flex"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <FormControl
                    placeholder="Search ID..."
                    className="mx-3 d-none d-lg-flex"
                    value={tz}
                    onChange={(e) => setTz(e.target.value)}
                  />
                </div>
                <div className="flex col-11 mt-3">
                  <FormControl
                    as="select"
                    placeholder="select"
                    className="d-none d-lg-flex mx-3"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value={""} className="bg-stone-500">
                      Select Type
                    </option>
                    {resCustomerType?.data.map((type: CustomerType) => (
                      <option value={type.id}>{type.name}</option>
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
                  <div className="d-none d-lg-flex align-items-center mx-4">
                    Active:
                  </div>
                  <FormControl
                    as="select"
                    placeholder="Active?"
                    className="d-none d-lg-flex"
                    value={isActive.toString()}
                    onChange={handleIsActiveChange}
                  >
                    <option value={"true"}>true</option>
                    <option value={"false"}>false</option>
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
                      setFirstName("");
                      setLastName("");
                      setPhone("");
                      setTz("");
                      setType("");
                      setIsActive(true);
                      handleSearch();
                    }}
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </InputGroup>
          </div>

          {res?.data.totalCustomers > 0 ? (
            <>
              <table className="mt-4">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th className="col-none">Phone</th>
                    <th className="col-none">ID</th>
                    <th className="col-none">Type</th>
                    <th className="col-none">Added by</th>
                    <th>Edit</th>
                    <th>Activate / Deactivate</th>
                  </tr>
                </thead>
                <tbody>
                  {res?.data.results.map((customer: Customer) => (
                    <tr key={customer.id}>
                      <td>
                        <Link
                          to={`/customers/${customer.id}`}
                          key={customer.id}
                        >
                          {customer.firstName} {customer.lastName}
                        </Link>
                      </td>
                      <td className="col-none">{customer.phone} </td>
                      <td className="col-none">{customer.tz} </td>
                      <td className="col-none">{customer.customerTypeName} </td>
                      <td className="col-none">{customer.addedByUserName} </td>

                      <td>
                        <button className="edit">
                          <Link
                            to={`/customers-edit/${customer.id}`}
                            key={customer.id}
                          >
                            <MdModeEditOutline size={30} />
                          </Link>
                        </button>
                      </td>

                      <td>
                        <button onClick={() => handleActive(customer.id)}>
                          {customer.active ? (
                            <Button>Deactivate</Button>
                          ) : (
                            <Button>Activate </Button>
                          )}
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

export default Customers;
