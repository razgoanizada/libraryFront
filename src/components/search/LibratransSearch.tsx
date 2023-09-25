import { Button, FormControl, InputGroup } from "react-bootstrap";
import { LuSearch } from "react-icons/lu";
import { FcSearch } from "react-icons/fc";

const LibrariansSearch = ({
  userName,
  setUserName,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  tz,
  setTz,
  phone,
  setPhone,
  permission,
  setPermission,
  handleSearch,
  handleReset,
}: any) => {
  return (
    <InputGroup className="search row ms-5">
      <div className="search-bar">
        <div className="flex col-10">
          <FormControl
            placeholder="Search User..."
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Button
            variant="btn-search"
            onClick={handleSearch}
            className="search-icon d-flex d-lg-none"
          >
            <FcSearch size={30} />
          </Button>
          <FormControl
            placeholder="Search first name..."
            className="mx-3 d-none d-lg-flex"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <FormControl
            placeholder="Search last name..."
            className="mx-3 d-none d-lg-flex"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="flex col-11 mt-3">
          <FormControl
            placeholder="Search ID..."
            className="mx-3 d-none d-lg-flex"
            value={tz}
            onChange={(e) => setTz(e.target.value)}
          />
          <FormControl
            placeholder="Search phone..."
            className="mx-3 d-none d-lg-flex"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <FormControl
            as="select"
            placeholder="select"
            className="d-none d-lg-flex"
            value={permission}
            onChange={(e) => setPermission(e.target.value)}
          >
            <option value={""} className="bg-stone-500">
              Select Permission
            </option>
            <option value={"3"}>Simple</option>
            <option value={"2"}>Pro</option>
            <option value={"1"}>Admin</option>
          </FormControl>
          <Button
            variant="btn-search"
            onClick={handleSearch}
            className="search-icon d-none d-lg-flex"
          >
            <LuSearch size={30} />
          </Button>
          <Button
            variant="secondary"
            onClick={handleReset}
            className="d-none d-lg-flex"
          >
            Reset
          </Button>
        </div>
      </div>
    </InputGroup>
  );
};

export default LibrariansSearch;
