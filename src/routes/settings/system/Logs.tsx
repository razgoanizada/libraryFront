import { useContext, useEffect, useState } from "react";
import LibraryContext from "../../../contexts/LibraryContext";
import { useQuery } from "react-query";
import { AllLogs, LogsRequest } from "../../../service/library-service";
import Spinner from "../../../components/animations/Spinner";
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from "react-helmet";
import LogsSearch from "../../../components/search/LogsSearch";
import LogsExcel from "../../../components/files/LogsExcel";
import LogsTable from "../../../components/tables/LogsTable";
import PaginationButtons from "../../../components/tables/PaginationButtons";

const Logs = () => {
  // States to manage log data
  const { setLogsPage } = useContext(LibraryContext);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [dateStart, setDateStart] = useState<string>("");
  const [dateEnd, setDateEnd] = useState<string>("");

  const { data: resAllLogs } = useQuery("get all logs", () => AllLogs());

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

  const handleReset = () => {
    setUsername("");
    setIsLogin(true);
    setDateStart("");
    setDateEnd("");
    handleSearch();
  };

  // Function to handle the change in the select dropdown
  const handleIsLoginChange = (e: any) => {
    const selectedValue = e.target.value;
    setIsLogin(selectedValue);
  };

  // Determine if the data is still loading
  const isLoading = pageLoading || !res;

  return (
    <>
      <Helmet>
        <title>Logs</title>
      </Helmet>
      <div className="container mt-3">
        <div className="flex flex-col">
          <div className="flex">
            <LogsSearch
              username={username}
              setUsername={setUsername}
              handleSearch={handleSearch}
              isLogin={isLogin}
              handleIsLoginChange={handleIsLoginChange}
              dateStart={dateStart}
              setDateStart={setDateStart}
              dateEnd={dateEnd}
              setDateEnd={setDateEnd}
              handleReset={handleReset}
            />
          </div>

          {res?.data.totalLogs > 0 ? (
            <>
              <div className="export-button">
                <LogsExcel data={resAllLogs?.data} />
              </div>

              <LogsTable logsData={res?.data.results} />

              <p className="mt-5">
                Page {res?.data.pageNo + 1} of {res?.data.totalPages},<br />
                Showing {res?.data.pageSize} results per page
              </p>

              <PaginationButtons
                onNext={nextPage}
                onPrevious={previousPage}
                hasNext={res?.data.totalPages > res?.data.pageNo + 1}
                hasPrevious={res?.data.pageNo > 0}
              />
            </>
          ) : (
            <div className="flex justify-center items-center mt-16 ">
              {isLoading ? (
                <Spinner name="Puff" />
              ) : (
                <h5> No results have been found</h5>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Logs;
