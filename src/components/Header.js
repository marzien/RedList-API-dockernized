import React from "react"
import { Navbar, Nav } from "react-bootstrap"

const Header = () => {
  return (
    <div className="container">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">IUCD RedList API</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Header
