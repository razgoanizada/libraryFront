import { Link } from "react-router-dom";
import { Librarian } from "../../@Typs";
import { Button } from "react-bootstrap";
import { MdModeEditOutline } from "react-icons/md";
import { format } from "date-fns";
import { AiFillDelete, AiFillLock } from "react-icons/ai";

const LibrariansTable = ({
  librariansData,
  handleOpenChangeDialog,
  handleDelete,
}: any) => {
  return (
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
        {librariansData.map((librarian: Librarian) => (
          <tr key={librarian.id}>
            <td>
              <Link to={`/librarians/${librarian.id}`} key={librarian.id}>
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
                ? format(new Date(librarian.lastLogin), "yyyy-MM-dd HH:mm:ss")
                : "Does not exist"}
            </td>
            <td>
              {" "}
              <button
                onClick={() =>
                  librarian.userName === "admin"
                    ? alert("You cannot change the admin user password.")
                    : handleOpenChangeDialog(librarian.id)
                }
              >
                {librarian.userName === "admin" ? (
                  <AiFillLock size={30} />
                ) : (
                  <Button variant="warning">Change</Button>
                )}
              </button>
            </td>
            <td>
              <button
                className="edit"
                onClick={() =>
                  librarian.userName === "admin" &&
                  alert("You cannot edit an admin user.")
                }
              >
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
  );
};

export default LibrariansTable;
