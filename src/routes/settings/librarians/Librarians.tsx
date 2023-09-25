import { useContext, useEffect, useState } from "react";
import LibraryContext from "../../../contexts/LibraryContext";
import { useQuery } from "react-query";
import {
  LibrariansRequest,
  LibrariansDelete,
  LibrarianChangePassword,
  Librarians as AllLibrarians,
} from "../../../service/library-service";
import { CgAdd } from "react-icons/cg";
import Spinner from "../../../components/animations/Spinner";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import LibrariansSearch from "../../../components/search/LibratransSearch";
import LibrariansExcel from "../../../components/files/LibrariansExcel";
import LibrariansTable from "../../../components/tables/LibrariansTable";
import ErrorDialog from "../../../components/dialogues/ErrorDialog";
import ChangePasswordDialog from "../../../components/dialogues/ChangePasswordDialog";
import PaginationButtons from "../../../components/tables/PaginationButtons";

const Librarians = () => {
  // States to manage librarian data
  const { setLibrariansPage } = useContext(LibraryContext);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [permission, setPermission] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [tz, setTz] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [showErrorDialog, setShowErrorDialog] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  // States to manage librarian edit dialog
  const [showChangePasswordDialog, setShowChangePasswordDialog] =
    useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [selectedLibrarianId, setSelectedLibrarianId] = useState<number>(0);

  const { data: resAllLibrarians } = useQuery("get all librarians", () =>
    AllLibrarians()
  );

  // Fetching librarians from the server
  const { data: res } = useQuery(
    "get librarians",
    () =>
      LibrariansRequest(
        currentPage,
        permission,
        firstName,
        lastName,
        phone,
        tz,
        userName
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

  // Update librarian data when response is received from the server
  useEffect(() => {
    if (res && res.data) {
      setLibrariansPage(res.data);
      setPageLoading(false);
    }
  }, [currentPage, res]);

  // Function to handle librarian search
  const handleSearch = () => {
    setCurrentPage(0);
    setPageLoading(true);
    LibrariansRequest(
      0,
      permission,
      firstName,
      lastName,
      phone,
      tz,
      userName
    ).then((res) => {
      setLibrariansPage(res.data);
      setPageLoading(false);
    });
  };

  const handleReset = () => {
    setUserName("");
    setFirstName("");
    setLastName("");
    setTz("");
    setPhone("");
    setPermission("");
    handleSearch();
  };

  // Functions to manage Edit Change Password dialog
  const handleOpenChangeDialog = (librarianId: number) => {
    setSelectedLibrarianId(librarianId);
    setShowChangePasswordDialog(true);
  };

  const handleCloseChangeDialog = () => {
    setShowChangePasswordDialog(false);
    setSelectedLibrarianId(0);
    setPassword("");
    setPasswordConfirm("");
  };

  const handleConfirmChange = () => {
    if (!setSelectedLibrarianId) return;

    if (password !== passwordConfirm) {
      setShowErrorDialog(true);
      setErrorMsg("Passwords must match..");
      return;
    }

    const isValidPassword =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?\W)|.{8,20}$/.test(password);

    if (!isValidPassword) {
      setShowErrorDialog(true);
      setErrorMsg(
        "The password must be at least 8 characters long, an uppercase letter, a lowercase letter, a number, and a character.."
      );
      return;
    }

    setCurrentPage(0);
    setPageLoading(true);

    LibrarianChangePassword(password, passwordConfirm, selectedLibrarianId)
      .then((res) => {
        setLibrariansPage(res.data);
        setPageLoading(false);
        setSelectedLibrarianId(0);
        Swal.fire({
          title: "Password changed successfully",
          icon: "success",
          timer: 2000,
        });
      })
      .catch((error) => {
        setShowErrorDialog(true);
        setErrorMsg(error.message);
        setPageLoading(false);
      });

    setShowChangePasswordDialog(false);
  };

  // Function to handle librarian deletion
  const handleDelete = (userName: string, librarianId: any) => {
    setPageLoading(true);
    Swal.fire({
      title: "Are you sure?",
      text: `Are you sure you want to delete the user ${userName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        LibrariansDelete(librarianId)
          .then((res) => {
            setLibrariansPage(res.data);
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
        <title>Librarians</title>
      </Helmet>

      <div className="container mt-3">
        <div className="flex flex-column">
          <div className="flex">
            <div className="flex flex-col">
              <div className="flex items-center">
                <Link
                  to="/librarians-add"
                  className="add btn-primary py-2 px-2 rounded-lg"
                >
                  <div className="flex items-center text-black">
                    <CgAdd className="w-6 h-6" />
                    <span className="ml-2">Add</span>
                  </div>
                </Link>
              </div>
            </div>
            <LibrariansSearch
              userName={userName}
              setUserName={setUserName}
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              tz={tz}
              setTz={setTz}
              phone={phone}
              setPhone={setPhone}
              permission={permission}
              setPermission={setPermission}
              handleSearch={handleSearch}
              handleReset={handleReset}
            />
          </div>

          {res?.data.totalLibrarians > 0 ? (
            <>
              <div className="export-button">
                <LibrariansExcel data={resAllLibrarians?.data} />
              </div>

              <LibrariansTable
                librariansData={res?.data.results}
                handleOpenChangeDialog={handleOpenChangeDialog}
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

          <ChangePasswordDialog
            showChangePasswordDialog={showChangePasswordDialog}
            handleCloseChangeDialog={handleCloseChangeDialog}
            passwordConfirm={passwordConfirm}
            setPasswordConfirm={setPasswordConfirm}
            handleConfirmChange={handleConfirmChange}
            password={password}
            setPassword={setPassword}
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

export default Librarians;
