import React from "react";
import { Container, Navbar, Nav, Row, Col } from 'react-bootstrap';

function AppNavbar() {
  return (
    <Navbar>
      <Nav className="mr-auto">
        <Navbar.Brand className="my-auto" href="/">ReviewInsight</Navbar.Brand>
        <Nav.Link className="light-bold text-center" href="/search">Search</Nav.Link>
        <Nav.Link className="light-bold text-center" href="/contribute">Contribute</Nav.Link>
        <Nav.Link className="light-bold text-center" href="/my-list">My List</Nav.Link>
      </Nav>
    </Navbar>

  );
}


export default AppNavbar;