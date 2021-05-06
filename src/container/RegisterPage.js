import { Container } from "react-bootstrap";
import MyNavbar from "../components/MyNavbar";
import Register from "../components/Register/Register";
export default function SearchPage() {
  return (
    <>
      <Container>
        <MyNavbar />
        <Register />
      </Container>
    </>
  );
}
