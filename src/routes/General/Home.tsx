import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import {
  BookCategoriesRequest,
  BooksRequest,
  BorrowRequest,
  CustomerTypeRequest,
  CustomersRequest,
} from "../../service/library-service";
import { ProgressBar } from "react-bootstrap";
import AuthContext from "../../contexts/AuthContext";
import { useContext } from "react";
import { Navigate, useNavigate } from "react-router";

const Home = () => {
  const { userName, token } = useContext(AuthContext);

  const expiration = JSON.parse(atob(token?.split(".")[1] || "")).exp;
  const expirationDate = new Date(expiration * 1000);
  const entry = JSON.parse(atob(token?.split(".")[1] || "")).iat;
  const entryDate = new Date(entry * 1000);

  const { data: resBorrow, isLoading} = useQuery("get borrowed", () =>
    BorrowRequest(0, "", "", "", false, "", "", "", "")
  );

  const { data: resCustomers } = useQuery("get customers", () =>
    CustomersRequest(0, "", "", "", "", "", "", true)
  );

  const { data: resBooks } = useQuery("get books", () =>
    BooksRequest(0, "", "", "", "", "", "")
  );

  const { data: resCustomerType } = useQuery("get typs", () => CustomerTypeRequest(
    0, "", "", ""
  ));

  const { data: resBookCategories } = useQuery("get categories", () =>
  BookCategoriesRequest(0, "")
  );

  var percentages = Math.floor(
    (resBorrow?.data.totalBorrowed / resBooks?.data.totalBooks) * 100
  );

  if (percentages == Infinity) {
    percentages = 0;
  }

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className=" bg-blue-100 border border-blue-200 rounded-lg text-blue-900">
        <h2 className="text-center mt-5 py-3 px-6">
          What is currently in the library system?
        </h2>
        <div className="d-flex flex-column flex-lg-row items-center justify-center">
          <a href="/borrowed">
            <div className="circle flex justify-center items-center text-center m-4 text-white">
              <div>
                <h1>{resBorrow?.data.totalBorrowed}</h1>
                <p>Borrowed Books</p>
              </div>
            </div>
          </a>
          <a href="/customers">
            <div className="circle flex justify-center items-center text-center m-4 text-white">
              <div>
                <h1>{resCustomers?.data.totalCustomers}</h1>
                <p>Active Customers</p>
              </div>
            </div>
          </a>
          <a href="/books">
            <div className="circle flex justify-center items-center text-center m-4 text-white">
              <div>
                <h1>{resBooks?.data.totalBooks}</h1>
                <p>Books in the library</p>
              </div>
            </div>
          </a>
        </div>
        <h4 className="flex items-center justify-center mt-3">
          Percentage of books currently being borrowed
        </h4>

        <div className="flex items-center justify-center mt-3 mb-5">
          <ProgressBar
            now={percentages}
            label={`${percentages}%`}
            className="w-1/3 h-16"
            style={{ height: "30px" }}
          />
        </div>

        <div className="flex justify-center items-center">
          <table>
            <thead>
              <tr>
                <th>Model</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Book categories</td>
                <td className="text-center">{resBookCategories?.data.totalCategories}</td>
              </tr>
              <tr>
                <td>Types of customers</td>
                <td className="text-center">{resCustomerType?.data.totalTypes}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <hr />
        <div className="flex justify-center items-center mt-3">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th className="text-center">Entry</th>
                <th className="text-center">Expiration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{userName}</td>
                <td>{entryDate.toLocaleString()}</td>
                <td>{expirationDate.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
