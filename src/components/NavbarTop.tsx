import Container from "react-bootstrap/Container";
import { ReactNode, createContext, useEffect, useState, useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../images/logo.png";
import { RiAccountCircleLine } from "react-icons/ri";
import "./NavbarTop.css";
import AuthContext from "../contexts/AuthContext";

const NavbarTop = () => {

    const {logout} = useContext(AuthContext);
  
  return (
    <Navbar expand="lg" className="menu-top d-flex row">
      <Container>
        <Navbar.Brand href="#home">
          <img src={logo} alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav row">
          <Nav className="me-auto d-flex col-9 justify-content-start">
            <Nav.Link href="#link" className="links">
              Link
            </Nav.Link>
            <NavDropdown title="dsfdsf" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="dsfdsf" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="me-auto d-flex col-3 justify-content-center">
            <Nav.Link href="#link" className="links">
              Link
            </Nav.Link>
            <NavDropdown
              className="account"
              title={
                <span className="dropdown-title">
                  <RiAccountCircleLine size={25} className="me-2" />
                </span>
              }
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item href="#action/3.3">Change password</NavDropdown.Item>
              <NavDropdown.Item href="/" onClick={logout}>Sign out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarTop;
