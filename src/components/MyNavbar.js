import { Navbar, Nav } from "react-bootstrap";
import { CloudPlus } from "react-bootstrap-icons";
import { NavLink } from "react-router-dom";
export default function MyNavbar() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <CloudPlus size={40} className="mr-2" />
          Plasma Donor App
        </Navbar.Brand>
        <Nav className="ml-auto ">
          <NavLink to="/help" className="text-white">
            Need Help?
          </NavLink>
        </Nav>
      </Navbar>
    </>
  );
}
