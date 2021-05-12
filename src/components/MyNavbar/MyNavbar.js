import { Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
export default function MyNavbar() {
  return (
    <>
      <Navbar bg="dark" className="">
        <Navbar.Brand className="p-2 ">
          <NavLink to="/" className="text-decoration-none text-white ">
            Plasma Donor App
          </NavLink>
        </Navbar.Brand>
      </Navbar>
    </>
  );
}
