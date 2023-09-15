import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import {
  BooksRequest,
  BorrowRequest,
  CustomersRequest,
} from "../../service/library-service";
import { ProgressBar } from "react-bootstrap";
import { Height } from "@mui/icons-material";

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
      <h2 className="flex items-center justify-center mt-5">
        What is currently in the library system?
      </h2>
      <div className="d-flex flex-column flex-lg-row items-center justify-center mt-2 p-3">
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

      <div className="flex items-center justify-center mt-3">
        <ProgressBar
          now={percentages}
          label={`${percentages}%`}
          className="w-1/3 h-16"
          style={{ height: "30px" }}
        />
      </div>
    </>
  );
};

export default Home;
