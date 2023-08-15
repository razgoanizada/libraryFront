import { useContext, useEffect, useState } from "react";
import LibraryContext from "../../../contexts/LibraryContext";
import { useQuery } from "react-query";
import {
  LibrariansRequest,
  LibrariansDelete,
  LibrarianChangePassword,
} from "../../../service/library-service";
import { Librarian } from "../../../@Typs";
import { Button, FormControl, InputGroup, Modal } from "react-bootstrap";
import { CgAdd } from "react-icons/cg";
import { MdModeEditOutline } from "react-icons/md";
import { AiFillDelete, AiFillLock } from "react-icons/ai";
import { LuSearch } from "react-icons/lu";
import { FcSearch } from "react-icons/fc";
import "../../../style/list.css";
import Spinner from "../../../components/animations/Spinner";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

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

  // Fetching librarians from the server
  const { data: res } = useQuery(
    "get typs",
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
            <InputGroup className="search row ms-5">
              <div className="search-bar">
                <div className="flex col-10">
                  <FormControl
                    placeholder="Search User..."
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  <Button
                    variant="btn-search"
                    onClick={handleSearch}
                    className="search-icon d-flex d-lg-none"
                  >
                    <FcSearch size={30} />
                  </Button>
                  <FormControl
                    placeholder="Search first name..."
                    className="mx-3 d-none d-lg-flex"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <FormControl
                    placeholder="Search last name..."
                    className="mx-3 d-none d-lg-flex"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="flex col-11 mt-3">
                  <FormControl
                    placeholder="Search ID..."
                    className="mx-3 d-none d-lg-flex"
                    value={tz}
                    onChange={(e) => setTz(e.target.value)}
                  />
                  <FormControl
                    placeholder="Search phone..."
                    className="mx-3 d-none d-lg-flex"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <FormControl
                    as="select"
                    placeholder="select"
                    className="d-none d-lg-flex"
                    value={permission}
                    onChange={(e) => setPermission(e.target.value)}
                  >
                    <option value={""} className="bg-stone-500">
                      Select Permission
                    </option>
                    <option value={"3"}>Simple</option>
                    <option value={"2"}>Pro</option>
                    <option value={"1"}>Admin</option>
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
                      setUserName("");
                      setFirstName("");
                      setLastName("");
                      setTz("");
                      setPhone("");
                      setPermission("");
                      handleSearch();
                    }}
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </InputGroup>
          </div>

          {res?.data.totalLibrarians > 0 ? (
            <>
              <table className="mt-4">
                <thead>
                  <tr>
                    <th>User</th>
                    <th className="col-none">Name</th>
                    <th className="col-none">ID</th>
                    <th className="col-none">Phone</th>
                    <th className="col-none">Permission</th>
                    <th className="col-none">Last Login</th>
                    <th>Change Password</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {res?.data.results.map((librarian: Librarian) => (
                    <tr key={librarian.id}>
                      <td>
                        <Link
                          to={`/librarians/${librarian.id}`}
                          key={librarian.id}
                        >
                          {librarian.userName}
                        </Link>
                      </td>
                      <td className="col-none">
                        {librarian.firstName} {librarian.lastName}
                      </td>
                      <td className="col-none">{librarian.tz}</td>
                      <td className="col-none">{librarian.phone}</td>
                      <td className="col-none">{librarian.permission}</td>
                      <td className="col-none">
                        {librarian.lastLogin
                          ? format(
                              new Date(librarian.lastLogin),
                              "yyyy-MM-dd HH:mm:ss"
                            )
                          : "Does not exist"}
                      </td>
                      <td>
                        {" "}
                        <button
                          onClick={() =>
                            librarian.userName === "admin"
                              ? alert(
                                  "You cannot change the admin user password."
                                )
                              : handleOpenChangeDialog(librarian.id)
                          }
                        >
                          {librarian.userName === "admin" ? (
                            <AiFillLock size={30} />
                          ) : (
                            <Button>Change</Button>
                          )}
                        </button>
                      </td>
                      <td>
                        <button className="edit"
                        onClick={() => 
                        librarian.userName === "admin" && alert("You cannot edit an admin user.")}>
                          {librarian.userName === "admin" ? (
                            <AiFillLock size={30} />
                          ) : (
                            <Link
                              to={`/librarians-edit/${librarian.id}`}
                              key={librarian.id}
                            >
                              <MdModeEditOutline size={30} />
                            </Link>
                          )}
                        </button>
                      </td>
                      <td>
                        <button
                          className="delete"
                          onClick={() =>
                            librarian.userName !== "admin"
                              ? handleDelete(librarian.userName, librarian.id)
                              : alert("You cannot delete an admin user.")
                          }
                        >
                          {librarian.userName === "admin" ? (
                            <AiFillLock size={30} />
                          ) : (
                            <AiFillDelete size={30} />
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

          {/* Dialog Change Password  */}

          <Modal
            show={showChangePasswordDialog}
            onHide={handleCloseChangeDialog}
          >
            <Modal.Header closeButton>
              <Modal.Title>Change Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <label>Password:</label>
              <FormControl
                placeholder="Enter the new password..."
                className="mb-3"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Repeat password:</label>
              <FormControl
                placeholder="Enter the repeat password..."
                type="password"
                autoComplete="new-password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseChangeDialog}>
                Cancel
              </Button>
              <Button className="save" onClick={handleConfirmChange}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>

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

export default Librarians;
