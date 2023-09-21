import { Button, FormControl, InputGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { LuSearch } from "react-icons/lu";
import { useQuery } from "react-query";
import { Books, Customers, Librarians } from "../../service/library-service";
import { Book, Customer, Librarian } from "../../@Typs";

const BorrowSearch = ({
  borrowingDateStart,
  setBorrowingDateStart,
  borrowingDateEnd,
  setBorrowingDateEnd,
  returnDateStart,
  setReturnDateStart,
  returnDateEnd,
  setReturnDateEnd,
  bookId,
  setBookId,
  customerId,
  setCustomerId,
  addedBy,
  setAddedBy,
  returnBook,
  handleIsReturned,
  handleSearch,
  handleReset,
}: any) => {
  const { data: resBooks } = useQuery("get books", () => Books());
  const { data: resCustomers } = useQuery("get customers", () => Customers());
  const { data: resLibrarians } = useQuery("get librarians", () =>
    Librarians()
  );

  return (
    <InputGroup className="search row ms-5">
      <div className="search-bar">
        <div className="flex col-10">
          <DatePicker
            className="form-control d-none d-lg-flex"
            selected={
              borrowingDateStart !== "" ? new Date(borrowingDateStart) : null
            }
            onChange={(date) =>
              setBorrowingDateStart(
                date ? date.toISOString().split("T")[0] : ""
              )
            }
            dateFormat="yyyy-MM-dd"
            placeholderText="Start date of borrowing"
          />
          <DatePicker
            className="form-control d-none d-lg-flex"
            selected={
              borrowingDateEnd !== "" ? new Date(borrowingDateEnd) : null
            }
            onChange={(date) =>
              setBorrowingDateEnd(date ? date.toISOString().split("T")[0] : "")
            }
            dateFormat="yyyy-MM-dd"
            placeholderText="End date of borrowing"
          />
          <div className="flex mx-5">
            <DatePicker
              className="form-control d-none d-lg-flex"
              selected={
                returnDateStart !== "" ? new Date(returnDateStart) : null
              }
              onChange={(date) =>
                setReturnDateStart(date ? date.toISOString().split("T")[0] : "")
              }
              dateFormat="yyyy-MM-dd"
              placeholderText="Start date of return."
            />{" "}
            <DatePicker
              className="form-control d-none d-lg-flex"
              selected={returnDateEnd !== "" ? new Date(returnDateEnd) : null}
              onChange={(date) =>
                setReturnDateEnd(date ? date.toISOString().split("T")[0] : "")
              }
              dateFormat="yyyy-MM-dd"
              placeholderText="End date of return"
            />
          </div>
        </div>
        <div className="flex col-11 mt-3">
          <FormControl
            as="select"
            placeholder="select"
            className="d-none d-lg-flex mx-2"
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
          >
            <option value={""} className="bg-stone-500">
              Select Book
            </option>
            {resBooks?.data
              .sort((a: Book, b: Book) => a.name.localeCompare(b.name))
              .map((book: Book) => (
                <option value={book.id}>{book.name}</option>
              ))}
          </FormControl>

          <FormControl
            as="select"
            placeholder="select"
            className="d-none d-lg-flex mx-2"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
          >
            <option value={""} className="bg-stone-500">
              Select Customer
            </option>
            {resCustomers?.data
              .sort((a: Customer, b: Customer) =>
                `${a.firstName} ${a.lastName}`.localeCompare(
                  `${b.firstName} ${b.lastName}`
                )
              )
              .map((customer: Customer) => (
                <option value={customer.id}>
                  {customer.firstName} {customer.lastName} ({customer.tz})
                </option>
              ))}
          </FormControl>

          <FormControl
            as="select"
            placeholder="select"
            className="d-none d-lg-flex mx-2"
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
          <div className="flex align-items-center mx-2">Returned:</div>
          <FormControl
            as="select"
            placeholder="Returned ?"
            value={returnBook.toString()}
            onChange={handleIsReturned}
          >
            <option value={"true"}>Yes</option>
            <option value={"false"}>No</option>
          </FormControl>
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
        </div>
      </div>
    </InputGroup>
  );
};

export default BorrowSearch;
