import { BookCategories } from "../../@Typs";
import { MdModeEditOutline } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";

const CategoriesTable = ({
  CategoriesData,
  handleOpenEditDialog,
  handleDelete,
}: any) => {
  return (
    <table className="mt-4">
      <thead>
        <tr>
          <th>Category</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {CategoriesData.map((category: BookCategories) => (
          <tr key={category.id}>
            <td>{category.name}</td>
            <td>
              <button
                className="edit"
                onClick={() => handleOpenEditDialog(category.name, category.id)}
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
  );
};

export default CategoriesTable;
