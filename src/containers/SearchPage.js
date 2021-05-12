import { Container } from "react-bootstrap";
import MyNavbar from "../components/MyNavbar/MyNavbar";
import Search from "../components/Search/Search";
export default function SearchPage() {
  return (
    <>
      <Container fluid>
        <MyNavbar />
        <Search />
      </Container>
    </>
  );
}
