import { Button, FormControl, InputGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { LuSearch } from "react-icons/lu";

const LogsSearch = ({
  username,
  setUsername,
  handleSearch,
  isLogin,
  handleIsLoginChange,
  dateStart,
  setDateStart,
  dateEnd,
  setDateEnd,
  handleReset,
}: any) => {

  return (
    <InputGroup className="search d-flex">
    <FormControl
      placeholder="Search user name..."
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
     <div className="d-none d-md-flex align-items-center mx-4">Log In:</div>
    <FormControl
      as="select"
      placeholder="Log In"
      className="d-none d-md-flex"
      value={isLogin.toString()}
      onChange={handleIsLoginChange}
    >
      <option value={"true"}>Yes</option>
      <option value={"false"}>No</option>
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
    <Button
            variant="secondary"
            className="d-none d-lg-flex"
            onClick={handleReset}
          >
            Reset
          </Button>
  </InputGroup>
  );
};

export default LogsSearch;
