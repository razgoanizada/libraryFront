import { useContext, useEffect, useState } from "react";
import LibraryContext from "../../../contexts/LibraryContext";
import { useQuery } from "react-query";
import { LogsRequest } from "../../../service/library-service";
import { Log } from "../../../@Typs";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { LuSearch } from "react-icons/lu";
import "../../../style/list.css";
import Spinner from "../../../components/animations/Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Logs = () => {
  // States to manage log data
  const { setLogsPage } = useContext(LibraryContext);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [dateStart, setDateStart] = useState<string>("");
  const [dateEnd, setDateEnd] = useState<string>("");

  // Fetching logs from the server
  const { data: res } = useQuery(
    "get logs",
    () => LogsRequest(currentPage, username, isLogin, dateStart, dateEnd),
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

  // Update log data when response is received from the server
  useEffect(() => {
    if (res && res.data) {
      setLogsPage(res.data);
      setPageLoading(false);
    }
  }, [currentPage, res]);

  // Function to handle log search
  const handleSearch = () => {
    setCurrentPage(0);
    setPageLoading(true);
    

    LogsRequest(0, username, isLogin, dateStart, dateEnd).then((res) => {
      setLogsPage(res.data);
      setPageLoading(false);
    });
  };

  // Function to handle the change in the select dropdown
  const handleIsLoginChange = (e: any) => {
    const selectedValue = e.target.value;
    setIsLogin(selectedValue);
  };

  // Determine if the data is still loading
  const isLoading = pageLoading || !res;

  return (
    <div className="container mt-3">
      <div className="d-flex flex-column">
        <div className="d-flex">
          <InputGroup className="search d-flex">
            <FormControl
              placeholder="Search user name..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
             <div className="d-none d-md-flex align-items-center mx-4">Is Login:</div>
            <FormControl
              as="select"
              placeholder="Is Login"
              className="d-none d-md-flex"
              value={isLogin.toString()}
              onChange={handleIsLoginChange}
            >
              <option value={"true"}>true</option>
              <option value={"false"}>false</option>
            </FormControl>
           
            <DatePicker
             className="form-control d-none d-lg-flex mx-4"
            selected={dateStart !== "" ? new Date(dateStart) : null}
            onChange={(date) => setDateStart(date ? date.toISOString().split("T")[0] : "")}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select a start date" 
          />
          <DatePicker
            className="form-control d-none d-lg-flex mx-2"
            selected={dateEnd !== "" ? new Date(dateEnd) : null}
            onChange={(date) => setDateEnd(date ? date.toISOString().split("T")[0] : "")}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select a end date"
          />
          
            <Button
              variant="btn-search"
              onClick={handleSearch}
              className="search-icon"
            >
              <LuSearch size={30} />
            </Button>
          </InputGroup>
        </div>

        {res?.data.totalLogs > 0 ? (
          <>
            <table className="mt-4">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Log In?</th>
                  <th>Date</th>
                  <th>Ip Address</th>
                </tr>
              </thead>
              <tbody>
                {res?.data.results.map((log: Log) => (
                  <tr key={log.id}>
                    <td>{log.username}</td>
                   <td> {log.login.toString()}</td>
                    <td>{log.loginDate.toString()}</td>
                    <td>{log.ipAddress}</td>
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
            {isLoading ? <Spinner name="Puff" /> : "No results have been found"}
          </div>
        )}
      </div>
    </div>
  );
};

export default Logs;