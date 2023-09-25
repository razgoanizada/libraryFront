import { Link } from "react-router-dom";
import { Customer } from "../../@Typs";
import { Button } from "react-bootstrap";
import { MdModeEditOutline } from "react-icons/md";

const CustomersTable = ({ customersData, handleActive }: any) => {
  return (
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
        {customersData.map((customer: Customer) => (
          <tr key={customer.id}>
            <td>
              <Link to={`/customers/${customer.id}`} key={customer.id}>
                {customer.firstName} {customer.lastName}
              </Link>
            </td>
            <td className="col-none">{customer.phone} </td>
            <td className="col-none">{customer.tz} </td>
            <td className="col-none">{customer.customerTypeName} </td>
            <td className="col-none">{customer.addedByUserName} </td>

            <td>
              <button className="edit">
                <Link to={`/customers-edit/${customer.id}`} key={customer.id}>
                  <MdModeEditOutline size={30} />
                </Link>
              </button>
            </td>

            <td>
              <button
                onClick={() =>
                  handleActive(
                    customer.id,
                    customer.firstName,
                    customer.lastName,
                    customer.active
                  )
                }
              >
                {customer.active ? (
                  <Button variant="danger">Deactivate</Button>
                ) : (
                  <Button variant="success">Activate </Button>
                )}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomersTable;
