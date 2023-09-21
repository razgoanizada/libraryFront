import { useContext, useEffect, useState } from "react";
import LibraryContext from "../../../contexts/LibraryContext";
import { useQuery } from "react-query";
import {
  Customers as allCustomers,
  CustomersRequest,
  CustomerActive,
} from "../../../service/library-service";
import { CgAdd } from "react-icons/cg";
import Spinner from "../../../components/animations/Spinner";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import CustomersSearch from "../../../components/search/CustomersSearch";
import CustomersExcel from "../../../components/files/CustomersExcel";
import CustomersTable from "../../../components/tables/CustomersTable";
import PaginationButtons from "../../../components/tables/PaginationButtons";
import ErrorDialog from "../../../components/dialogues/ErrorDialog";

const Customers = () => {
  // States to manage customer data
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

  const { data: resAllCustomers } = useQuery("get all customers", () =>
    allCustomers()
  );

  // Fetching customers from the server
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

  // Update customer data when response is received from the server
  useEffect(() => {
    if (res && res.data) {
      setCustomersPage(res.data);
      setPageLoading(false);
    }
  }, [currentPage, res]);

  // Function to handle customer search
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

  const handleReset = () => {
    setAddedBy("");
    setFirstName("");
    setLastName("");
    setPhone("");
    setTz("");
    setType("");
    setIsActive(true);
    handleSearch();
  };

  const handleActive = (
    customerId: any,
    customerFisrtName: String,
    cutomerLastName: String,
    CustomerIsActive: boolean
  ) => {
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
              title: `The customer ${customerFisrtName} ${cutomerLastName} is now ${
                CustomerIsActive ? "active" : "inactive"
              } `,
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
            </div>
            <CustomersSearch
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              phone={phone}
              setPhone={setPhone}
              tz={tz}
              setTz={setTz}
              type={type}
              setType={setType}
              addedBy={addedBy}
              setAddedBy={setAddedBy}
              isActive={isActive}
              handleIsActiveChange={handleIsActiveChange}
              handleSearch={handleSearch}
              handleReset={handleReset}
            />
          </div>

          {res?.data.totalCustomers > 0 ? (
            <>
              <div className="export-button">
                <CustomersExcel data={resAllCustomers?.data} />
              </div>

              <CustomersTable
                customersData={res?.data.results}
                handleActive={handleActive}
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

export default Customers;
