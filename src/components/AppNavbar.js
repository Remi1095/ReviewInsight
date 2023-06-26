import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function AppNavbar() {
    return (
        <Navbar className="app-navbar">
            <Navbar.Collapse>
                <Nav className="mr-auto">
                    <Navbar.Brand className="app-brand my-auto" href="/">ReviewInsight</Navbar.Brand>
                    <Nav.Link className="app-link my-auto" href="/search">Search</Nav.Link>
                    <Nav.Link className="app-link my-auto" href="/contribute">Contribute</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}


export default AppNavbar;