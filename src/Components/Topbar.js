import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

function Topbar() {
  return (
    <Navbar bg="info" expand="lg">
      <Container>
        <Navbar.Brand href="/">Medical Information</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/drug">Drug</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Topbar;
