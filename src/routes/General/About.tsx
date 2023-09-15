import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Accordion from "react-bootstrap/Accordion";
import { TypeAnimation } from "react-type-animation";
import { Helmet } from "react-helmet";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About</title>
      </Helmet>
      <TypeAnimation
        sequence={[
          "I'm a Python Full Stack Developer.",
          2000,
          "That's not all.",
          1000,
          "I can code with ReactJS, JavaScript, TypeScript VBA and Java.",
          3000,
          "Of course HTML, CSS, SASS and modern design frameworks too.",
          3000,
        ]}
        wrapper="h1"
        cursor={true}
        repeat={Infinity}
        omitDeletionAnimation={false}
        className="text-center"
      />

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
            <Tab eventKey="profile" title="Profile">
              Tab content for Profile
            </Tab>
            <Tab eventKey="longer-tab" title="Loooonger Tab">
              Tab content for Loooonger Tab
            </Tab>
            <Tab eventKey="contact" title="Contact">
              Tab content for Contact
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default About;
