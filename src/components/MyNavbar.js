import { Navbar } from "react-bootstrap";
import { CloudPlus } from "react-bootstrap-icons";
export default function MyNavbar() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <CloudPlus size={40} className="mr-2" />
          Plasma Donor App
        </Navbar.Brand>
      </Navbar>
    </>
  );
}
