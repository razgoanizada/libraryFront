import Container from "react-bootstrap/Container";
import { useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../images/logo.png";
import { RiAccountCircleLine } from "react-icons/ri";
import { AiOutlineInfoCircle } from "react-icons/ai";
import "./NavbarTop.css";
import AuthContext from "../../contexts/AuthContext";
import { HasPermission } from "../../utils/HasPermission";
import Clock from "../animations/Clock";

const NavbarTop = () => {
  const { logout, userName } = useContext(AuthContext);

  return (
    <Navbar expand="lg" className="menu-top sticky-top row w-100 m-0">
      <Container className="">
        <Navbar.Brand href="/" className="">
          <img src={logo} alt="home" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto col-lg-6 col-xl-7 col-xxl-8">
            <NavDropdown
              title="Borrow"
              id="navbarScrollingDropdown"
              className=""
            >
              <NavDropdown.Item href="#action/3.1">
                Borrow a book
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
                Return a book
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                The list of borrow books
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Overdue book list
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title="Models"
              id="navbarScrollingDropdown"
              className=""
            >
              <NavDropdown.Item href="/customers">
                List of customers
              </NavDropdown.Item>
              <NavDropdown.Item href="/books">
                List of books
              </NavDropdown.Item>
              <NavDropdown.Item href="/customers-add">
                Add a new customer
              </NavDropdown.Item>
              {HasPermission("pro") && (
                <NavDropdown.Item href="/books-add">
                  Add a new book
                </NavDropdown.Item>
              )}
            </NavDropdown>
            {HasPermission("admin") && (
              <NavDropdown
                title="Settings"
                id="navbarScrollingDropdown"
                className=""
              >
                <NavDropdown.Item href="/books-category">
                  Book category
                </NavDropdown.Item>
                <NavDropdown.Item href="/customers-type">
                  Types of customers
                </NavDropdown.Item>
                <NavDropdown.Item href="/logs">List of logs</NavDropdown.Item>
                <NavDropdown.Item href="/librarians-add">
                  Add a new librarian
                </NavDropdown.Item>
                <NavDropdown.Item href="/librarians">
                  List of librarians
                </NavDropdown.Item>
              </NavDropdown>
            )}

            <NavDropdown
              title={userName}
              id="navbarScrollingDropdown"
              className="d-lg-none"
            >
              <NavDropdown.Item href="/change-password">
                Change password
              </NavDropdown.Item>
              <NavDropdown.Item href="/" onClick={logout}>
                Sign out
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/about" className="links d-lg-none">
              About
            </Nav.Link>
          </Nav>
          <Nav className="me-auto col-lg-6 col-xl-5 col-xxl-4 d-none d-lg-flex justify-content-end align-items-center">
            <Nav.Link href="#link" className="links col-1">
              <AiOutlineInfoCircle size={30} />
            </Nav.Link>
            <NavDropdown
              className="account col-xl-1"
              title={
                <span className="dropdown-title">
                  <RiAccountCircleLine size={30} className="me-2" />
                </span>
              }
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item href="/change-password">
                Change password
              </NavDropdown.Item>
              <NavDropdown.Item href="/" onClick={logout}>
                Sign out
              </NavDropdown.Item>
            </NavDropdown>
            <h6 className="links col-lg-4 col-xl-3 col-xxl-2">{userName}</h6>

            <span className="mx-2 clock col-2">
              <Clock />
            </span>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarTop;
