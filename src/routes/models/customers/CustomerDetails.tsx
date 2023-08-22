import { useParams } from "react-router";
import { useQuery } from "react-query";
import {
  BorrowsLibrarian,
  CustomerIDRequest,
  CustomersLibrarian,
} from "../../../service/library-service";
import { Borrow, Customer } from "../../../@Typs";
import { Helmet } from "react-helmet";

const CustomerDetails = () => {
  const { id } = useParams();
  const { data: res } = useQuery("get customer", () => CustomerIDRequest(id));
  const { data: resBorrows } = useQuery("get borrows", () =>
    BorrowsLibrarian(id)
  );
  const { data: resCustomers } = useQuery("get customers", () =>
    CustomersLibrarian(id)
  );

  const customer: Customer | undefined = res?.data;

  if (customer?.firstName) {
    return (
      <>
      <Helmet>
        <title>{customer.firstName} {customer.lastName}</title>
      </Helmet>
      <div className="bg-white shadow-md rounded-lg my-2 mx-auto p-4 flex flex-col gap-2">
        <div className="mx-5">
          <h1 className="text-center w-11/12">{customer.firstName} {customer.lastName}</h1>
          <table className="w-11/12">
           
            <tr>
              <th className="bg-white">Email: </th>
              <td>{customer.email} </td>
            </tr>
            <tr>
              <th className="bg-white">Phone: </th>
              <td>{customer.phone} </td>
            </tr>
            <tr>
              <th className="bg-white">ID: </th>
              <td>{customer.tz} </td>
            </tr>
            <tr>
              <th className="bg-white">Gender: </th>
              <td>{customer.gender.toString()} </td>
            </tr>
            <tr>
              <th className="bg-white">Address: </th>
              <td>{customer.address} </td>
            </tr>
            <tr>
              <th className="bg-white">Type: </th>
              <td>{customer.customerTypeName} </td>
            </tr>
            <tr>
              <th className="bg-white">Added By: </th>
              <td>{customer.addedByUserName} </td>
            </tr>
            <tr>
              <th className="bg-white">Added On: </th>
              <td>{customer.creationDate ? customer.creationDate.toString() : "" } </td>
            </tr>
            <tr>
              <th className="bg-white">Active: </th>
              <td>{customer.active.toString()} </td>
            </tr>
            <tr>
              <th className="bg-white">Date of birth: </th>
              <td>{customer.dateOfBirth ? customer.dateOfBirth.toString() : ""} </td>
            </tr>
          </table>
          <h2 className="p-3 mt-3 font-thin">
            <span className="relative">
              The last 5 customers that he added
              <span className="bg-sky-300 absolute inset-x-0 bottom-0 h-1"></span>
            </span>
          </h2>
          {resBorrows?.data.totalBorrowed > 0 ? (
            <table className="mt-4 w-11/12">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Phone</th>
                  <th>Creation date</th>
                </tr>
              </thead>
              <tbody>
                {resBorrows?.data.results.map((borrow: Borrow) => (
                  <tr key={borrow.id}>
                    <td>{borrow.id} </td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h5 className="mt-4 text-center w-11/12">
              There are no borrows to display
            </h5>
          )}

          <h2 className="p-3 mt-3 font-thin">
            <span className="relative">
              The last 5 customers that he added
              <span className="bg-sky-300 absolute inset-x-0 bottom-0 h-1"></span>
            </span>
          </h2>
          {resCustomers?.data.totalCustomers > 0 ? (
            <table className="mt-4 w-11/12">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Phone</th>
                  <th>Creation date</th>
                </tr>
              </thead>
              <tbody>
                {resCustomers?.data.results.map((customer: Customer) => (
                  <tr key={customer.id}>
                    <td>
                      {customer.firstName} {customer.lastName}
                    </td>
                    <td>{customer.customerTypeName}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.creationDate.toString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h5 className="mt-4 text-center w-11/12">
              There are no customers to display
            </h5>
          )}

          <h2 className="p-3 mt-3 font-thin">
            <span className="relative">
              The last 5 customers that he added
              <span className="bg-sky-300 absolute inset-x-0 bottom-0 h-1"></span>
            </span>
          </h2>
        </div>
      </div>
      </>
    );
  }

  return <div>No Such Customer</div>;
};
export default CustomerDetails;
