import React from "react";
import { Navbar, Nav } from "react-bootstrap";

function Topbar() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Medical Information</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/drug">Drug</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Topbar;
