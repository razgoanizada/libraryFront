import { CustomerType } from "../../@Typs";
import { MdModeEditOutline } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";

const TypesTable = ({ TypesData, handleOpenEditDialog, handleDelete }: any) => {
  return (
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
        {TypesData.map((type: CustomerType) => (
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
  );
};

export default TypesTable;
