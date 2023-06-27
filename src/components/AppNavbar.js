import React from "react";
import { Container, Navbar, Nav, Row, Col } from 'react-bootstrap';

function AppNavbar() {
  return (
    <Navbar className="app-navbar">
      <Nav className="mr-auto">
        <Navbar.Brand className="my-auto" href="/">ReviewInsight</Navbar.Brand>
        <Nav.Link href="/search">Search</Nav.Link>
        <Nav.Link href="/contribute">Contribute</Nav.Link>
      </Nav>
    </Navbar>

  );
}


export default AppNavbar;