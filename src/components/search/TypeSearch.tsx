import { Button, FormControl, InputGroup } from "react-bootstrap";
import { LuSearch } from "react-icons/lu";

const TypeSearch = ({
  name,
  setName,
  days,
  setDays,
  amount,
  setAmount,
  handleReset,
  handleSearch,
}: any) => {
  return (
    <InputGroup className="search d-flex ms-5">
      <FormControl
        placeholder="Search types..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <FormControl
        placeholder="Search amount of days..."
        className="mx-3 d-none d-lg-flex"
        type="number"
        value={days}
        onChange={(e) => setDays(e.target.value)}
      />
      <FormControl
        placeholder="Search amount of books..."
        className="mx-3 d-none d-lg-flex"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
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

export default TypeSearch;
