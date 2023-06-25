import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function AppNavbar() {
    return (
        <Navbar bg="danger" variant="dark" style={{ paddingLeft: "20%", paddingRight: "20%" }}>
            <Navbar.Collapse>
                <Nav className="mr-auto">
                    <Navbar.Brand href="/"> Hello </Navbar.Brand>
                    <Nav.Link href="/search"> Hello </Nav.Link>
                    <Nav.Link href="/contribute"> Hello </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}


export default AppNavbar;