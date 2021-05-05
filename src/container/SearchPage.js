import { Container } from "react-bootstrap";
import MyNavbar from "../components/MyNavbar";
import Search from "../components/Search";
export default function SearchPage() {
  return (
    <>
      <Container>
        <MyNavbar />
        <Search />
      </Container>
    </>
  );
}
