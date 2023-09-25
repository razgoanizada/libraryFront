import { Button, FormControl, InputGroup } from "react-bootstrap";
import { LuSearch } from "react-icons/lu";

const CategorySearch = ({ searchQuery, setSearchQuery, handleSearch }: any) => {
  return (
    <InputGroup className="search flex ms-5">
      <FormControl
        placeholder="Search categories..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button
        variant="btn-search"
        onClick={handleSearch}
        className="search-icon"
      >
        <LuSearch size={30} />
      </Button>
    </InputGroup>
  );
};

export default CategorySearch;
