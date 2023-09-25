import { Button, FormControl, InputGroup } from "react-bootstrap";
import { LuSearch } from "react-icons/lu";
import { useQuery } from "react-query";
import {
  CustomersType,
  Librarians,
} from "../../service/library-service";
import { CustomerType, Librarian } from "../../@Typs";
import { FcSearch } from "react-icons/fc";

const CustomersSearch = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  phone,
  setPhone,
  tz,
  setTz,
  type,
  setType,
  addedBy,
  setAddedBy,
  isActive,
  handleIsActiveChange,
  handleSearch,
  handleReset,
}: any) => {
  const { data: resCustomerType } = useQuery("get all typs", () => CustomersType());
  const { data: resLibrarians } = useQuery("get all librarians", () =>
    Librarians()
  );

  return (
    <InputGroup className="search row ms-5">
      <div className="search-bar">
        <div className="flex col-10">
          <FormControl
            placeholder="Search First Name..."
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Button
            variant="btn-search"
            onClick={handleSearch}
            className="search-icon d-flex d-lg-none"
          >
            <FcSearch size={30} />
          </Button>
          <FormControl
            placeholder="Search Last Name..."
            className="mx-3 d-none d-lg-flex"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <FormControl
            placeholder="Search Phone..."
            className="mx-3 d-none d-lg-flex"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <FormControl
            placeholder="Search ID..."
            className="mx-3 d-none d-lg-flex"
            value={tz}
            onChange={(e) => setTz(e.target.value)}
          />
        </div>
        <div className="flex col-11 mt-3">
          <FormControl
            as="select"
            placeholder="select"
            className="d-none d-lg-flex mx-3"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value={""} className="bg-stone-500">
              Select Type
            </option>
            {resCustomerType?.data
              .sort((a: CustomerType, b: CustomerType) =>
                a.name.localeCompare(b.name)
              )
              .map((type: CustomerType) => (
                <option value={type.id}>{type.name}</option>
              ))}
          </FormControl>

          <FormControl
            as="select"
            placeholder="select"
            className="d-none d-lg-flex"
            value={addedBy}
            onChange={(e) => setAddedBy(e.target.value)}
          >
            <option value={""} className="bg-stone-500">
              Select Added by
            </option>

            {resLibrarians?.data
              .sort((a: Librarian, b: Librarian) =>
                a.userName.localeCompare(b.userName)
              )
              .map((librarian: Librarian) => (
                <option value={librarian.id}>{librarian.userName}</option>
              ))}
          </FormControl>
          <div className="d-none d-lg-flex align-items-center mx-4">
            Active:
          </div>
          <FormControl
            as="select"
            placeholder="Active?"
            className="d-none d-lg-flex"
            value={isActive.toString()}
            onChange={handleIsActiveChange}
          >
            <option value={"true"}>Yes</option>
            <option value={"false"}>No</option>
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
            className="d-none d-lg-flex"
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </div>
    </InputGroup>
  );
};

export default CustomersSearch;
