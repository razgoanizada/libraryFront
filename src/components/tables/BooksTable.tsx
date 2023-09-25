import { Link } from "react-router-dom";
import { Book } from "../../@Typs";
import { MdModeEditOutline } from "react-icons/md";
import { HasPermission } from "../../utils/HasPermission";
import { AiFillDelete } from "react-icons/ai";

const BooksTable = ({ BooksData, handleDelete }: any) => {
  return (
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
        {BooksData.map((book: Book) => (
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
  );
};

export default BooksTable;
