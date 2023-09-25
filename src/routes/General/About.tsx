import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Accordion from "react-bootstrap/Accordion";
import { TypeAnimation } from "react-type-animation";
import { Helmet } from "react-helmet";
import { HasPermission } from "../../utils/HasPermission";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About</title>
      </Helmet>
      <div className="container-lg text-center">
        <TypeAnimation
          sequence={[
            "Welcome to the library system.",
            2000,
            "Borrowing books: lending a book to a customer",
            2500,
            "Models: Allow you to control your customers and books.",
            3000,
            "Settings: Allow you to control the system and your users.",
            3000,
          ]}
          wrapper="h1"
          cursor={true}
          repeat={Infinity}
          omitDeletionAnimation={false}
          className="text-center mt-5 border border-primary rounded bg-light text-cyan-800"
        ></TypeAnimation>
      </div>

      <div className="flex flex-col items-center ">
        <div className="w-4/5">
          <Tabs defaultActiveKey="borrow" className="m-5" justify>
            <Tab eventKey="borrow" title="Borrow">
              <Accordion className="m-5">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Borrow a book</Accordion.Header>
                  <Accordion.Body>
                    In order to borrow a book, you must select a customer and
                    the name of the book. <br />
                    The name of the book will appear with the author's name and
                    the customer's name will appear with his ID card. <br />{" "}
                    <br />
                    <b>
                      {" "}
                      <u> Note:</u>{" "}
                    </b>{" "}
                    It is not possible to lend a book to an inactive customer or
                    to a customer without a type. It is also not possible to
                    borrow a book that is currently with another customer.{" "}
                    <br />
                    If the customer has reached his book limit, the system will
                    display this.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1" className="mt-3">
                  <Accordion.Header>The list of borrow books</Accordion.Header>
                  <Accordion.Body>
                    In the list of borrowed books you can see the name of the
                    book, the name of the customer, the date the book was
                    borrowed, the last date for returning the book, the name of
                    the lending librarian, has the book been returned? If so,
                    when was it returned, a PDF file for the customer's
                    signature. <br />
                    In addition, it is possible to extend the time of borrowing
                    the book to the customer and the possibility of returning
                    the book to the library. <br />
                    You can also search according to the following parameters:
                    the date range of borrowing the book, the date range of
                    returning the book, the name of the book, the name of the
                    customer, the name of the lending librarian and whether the
                    book has already been returned or not. <br />
                    In addition, the entire list of borrowed books can be
                    exported to an Excel file.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2" className="mt-3">
                  <Accordion.Header>Overdue book list</Accordion.Header>
                  <Accordion.Body>
                    On this page you can see the list of all borrowed books
                    whose return date has passed. <br />
                    You can see the name of the book, the customer's name, the
                    customer's email, the customer's phone, the date the book
                    was borrowed, the last date to return the book and the name
                    of the accompanying librarian. <br />
                    Also, it is possible to extend the time of borrowing the
                    book to the customer and the possibility of returning the
                    book to the library.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Tab>
            <Tab eventKey="Models" title="Models">
              <Accordion className="m-5">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>List of customers</Accordion.Header>
                  <Accordion.Body>
                    In the customer list you can see all the customers with the
                    following details: <br />
                    Full name, mobile phone, ID card, customer type and the name
                    of the librarian who created the customer in the system.{" "}
                    <br />
                    You can search by these fields. In addition to each
                    customer, you can see the full details on the customer's
                    page (clicking on the full name will lead to the customer's
                    page), and you can also edit the customer's details. It is
                    also possible to make a client active / inactive. <br />
                    The customer table can be exported to Excel.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1" className="mt-3">
                  <Accordion.Header>List of books</Accordion.Header>
                  <Accordion.Body>
                    In the list of books you can see all the books with the
                    following details: <br />
                    The name of the book, the name of the author, the number of
                    the bookcase, the year of publication, category and the name
                    of the librarian who created the book in the system. <br />
                    You can search by these fields. In addition to each book,
                    you can see the full details on the book page (clicking on
                    the name will lead to the book page), and you can also edit
                    or delete the book. <br />
                    The book table can be exported to Excel. <br />
                    <b>
                      {" "}
                      <u> Note:</u>{" "}
                    </b>{" "}
                    In order to edit or delete a book, you need pro or admin
                    permissions
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2" className="mt-3">
                  <Accordion.Header>Add a new customer</Accordion.Header>
                  <Accordion.Body>
                    In order to add a new customer, enter the following details:{" "}
                    <br />
                    First name, last name, email, telephone, ID, customer type
                    (according to the list of customer types available in the
                    system), city (from the list of cities in Israel), gender
                    and date of birth. <br />
                    City and date of birth are not required fields. <br />
                    <b>
                      {" "}
                      <u> Note:</u>{" "}
                    </b>{" "}
                    It is not possible to add a new customer with an email or ID
                    that already exists in the system.
                  </Accordion.Body>
                </Accordion.Item>
                {HasPermission("pro") && (
                  <Accordion.Item eventKey="3" className="mt-3">
                    <Accordion.Header>Add a new book</Accordion.Header>
                    <Accordion.Body>
                      In order to add a new book, enter the following details:{" "}
                      <br />
                      The name of the book, the name of the author, the year of
                      publication, a short description, location in the bookcase
                      and category from the list of categories available in the
                      system. <br />
                      <b>
                        {" "}
                        <u> Note:</u>{" "}
                      </b>{" "}
                      It is not possible to add a new book that already exists
                      in the system. (with the same name, author and
                      description) <br />* This page is not open for simple
                      users.
                    </Accordion.Body>
                  </Accordion.Item>
                )}
              </Accordion>
            </Tab>
            {HasPermission("admin") && (
              <Tab eventKey="Settings" title="Settings">
                <div className="m-5">
                  <b>
                    {" "}
                    <u> Note:</u>{" "}
                  </b>{" "}
                  These pages are open to admin users only
                </div>
                <Accordion className="m-5">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Book categories</Accordion.Header>
                    <Accordion.Body>
                      On this page you can see all book categories and you can
                      also export them to an Excel file. <br />
                      You can add a new category. In addition, you can edit or
                      delete an existing category.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1" className="mt-3">
                    <Accordion.Header>Types of customers</Accordion.Header>
                    <Accordion.Body>
                      On this page you can see all types of customers with full
                      details: <br />
                      Name, number of days and maximum number of books to
                      borrow. <br />
                      In addition, a new type can be added. You can also edit or
                      delete an existing type. <br />
                      <b>
                        {" "}
                        <u> Note:</u>{" "}
                      </b>{" "}
                      You cannot add a new type with an existing name in the
                      system and you cannot add a new type with the same number
                      of days and number of books as an existing type in the
                      system. <br />
                      ** You can export the customer types table with the
                      complete details to Excel.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2" className="mt-3">
                    <Accordion.Header>List of logs</Accordion.Header>
                    <Accordion.Body>
                      On this page you can see the entire list of logs. <br />
                      You can see when each user tried to connect and whether
                      they succeeded or not. You can also see the IP address
                      from which a connection attempt was made. <br />
                      You can search and filter by these fields. <br />
                      The log table can be exported to Excel.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="3" className="mt-3">
                    <Accordion.Header>Add a new librarian</Accordion.Header>
                    <Accordion.Body>
                      In order to add a new librarian, enter the following
                      details: <br />
                      First name, last name, username, email, phone, ID card,
                      city, permissions, gender, date of birth and password.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="4" className="mt-3">
                    <Accordion.Header>List of librarians</Accordion.Header>
                    <Accordion.Body>
                      In the list of librarians in the system, you can see all
                      the existing users in the system according to the
                      following details: <br />
                      Username, full name, social security number, phone number,
                      permissions and date of last login to the system. <br />
                      In addition, you can search and filter by these fields.{" "}
                      <br />
                      For each user, the password can be changed, edited or
                      deleted. <br />
                      In addition, the list of all users can be exported to
                      Excel. <br />
                      In addition to each librarian, you can see the full
                      details on the librarian's page (clicking on the username
                      will lead to the librarian's page).
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Tab>
            )}

            <Tab eventKey="General" title="General">
              <Accordion className="m-5">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Home</Accordion.Header>
                  <Accordion.Body>
                    On the home page you can see the number of books currently
                    on loan, the number of active customers in the library, the
                    number of books available in the system. <br />
                    You can also see the percentage of borrowed books out of all
                    the books in the library. <br />
                    You can also see the number of book categories and the
                    number of customer types that exist in the system. <br />
                    In addition, you will be able to see when the login was made
                    and when you will need to log in again.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1" className="mt-3">
                  <Accordion.Header>Change Password</Accordion.Header>
                  <Accordion.Body>
                    In order to change a password, the new password must be
                    entered twice.
                    <br />
                    The password must be at least 8 characters long, an
                    uppercase letter, a lowercase letter, a number, and a
                    character
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default About;
