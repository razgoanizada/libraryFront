import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import {
  BooksRequest,
  BorrowRequest,
  CustomersRequest,
} from "../../service/library-service";

const Home = () => {
  const { data: resBorrow } = useQuery("get borrowed", () =>
    BorrowRequest(0, "", "", "", false, "", "", "", "")
  );

  const { data: resCustomers } = useQuery("get customers", () =>
    CustomersRequest(0, "", "", "", "", "", "", true)
  );

  const { data: resBooks } = useQuery("get books", () =>
    BooksRequest(0, "", "", "", "", "", "")
  );

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="d-flex flex-column flex-lg-row items-center justify-center mt-5 p-3">
        <a href="/borrowed">
          <div className="circle flex justify-center items-center text-center bg-slate-100 m-4">
            <div className="text-black">
              <h1>{resBorrow?.data.totalBorrowed}</h1>
              <p>Borrowed Books</p>
            </div>
          </div>
        </a>
        <a href="/customers">
          <div className="circle flex justify-center items-center text-center bg-slate-100 m-4">
            <div className="text-black">
              <h1>{resCustomers?.data.totalCustomers}</h1>
              <p>Active Customers</p>
            </div>
          </div>
        </a>
        <a href="/books">
          <div className="circle flex justify-center items-center text-center bg-slate-100 m-4">
            <div className="text-black">
              <h1>{resBooks?.data.totalBooks}</h1>
              <p>Books in the library</p>
            </div>
          </div>
        </a>
      </div>
    </>
  );
};

export default Home;
