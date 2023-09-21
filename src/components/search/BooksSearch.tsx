import { Button, FormControl, InputGroup } from "react-bootstrap";
import { LuSearch } from "react-icons/lu";
import { useQuery } from "react-query";
import {
  BooksCategories,
  Librarians,
} from "../../service/library-service";
import { BookCategories, Librarian } from "../../@Typs";
import { FcSearch } from "react-icons/fc";

const BooksSearch = ({
  name,
  setName,
  author,
  setAuthor,
  bookcase,
  setBookcase,
  publishYear,
  setPublishYear,
  bookCategories,
  setBookCategories,
  addedBy,
  setAddedBy,
  handleSearch,
  handleReset,
}: any) => {
  const { data: resBookCategories } = useQuery("get categories", () =>
    BooksCategories()
  );
  const { data: resLibrarians } = useQuery("get librarians", () =>
    Librarians()
  );

  return (
    <InputGroup className="search row ms-5">
      <div className="search-bar">
        <div className="flex col-10">
          <FormControl
            placeholder="Search Name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            variant="btn-search"
            onClick={handleSearch}
            className="search-icon d-flex d-lg-none"
          >
            <FcSearch size={30} />
          </Button>
          <FormControl
            placeholder="Search Author..."
            className="mx-3 d-none d-lg-flex"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <FormControl
            placeholder="Search Bookcase..."
            className="mx-3 d-none d-lg-flex"
            value={bookcase}
            onChange={(e) => setBookcase(e.target.value)}
          />
        </div>
        <div className="flex col-11 mt-3">
          <FormControl
            placeholder="Search Publishing year..."
            className="mx-3 d-none d-lg-flex"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
          />
          <FormControl
            as="select"
            placeholder="select"
            className="d-none d-lg-flex mx-3"
            value={bookCategories}
            onChange={(e) => setBookCategories(e.target.value)}
          >
            <option value={""} className="bg-stone-500 ">
              Select Category
            </option>
            {resBookCategories?.data
              .sort((a: BookCategories, b: BookCategories) =>
                a.name.localeCompare(b.name)
              )
              .map((category: BookCategories) => (
                <option value={category.id}>{category.name}</option>
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

export default BooksSearch;
