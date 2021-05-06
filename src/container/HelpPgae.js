import { Container, Row, Card } from "react-bootstrap";
import MyNavbar from "../components/MyNavbar";
// import Help from "../components/Help";
export default function HelpPage() {
  return (
    <>
      <Container>
        <MyNavbar />
        <Row>
          <div className="border w-100 m-3 p-3">
            if you want to de-register yourself please email us with your Name
            and Mobile Number at &nbsp;
            <a href="mailto: abc@example.com">kukreti.rs@gmail.com</a>
            <br />
            Thank you
          </div>
        </Row>
      </Container>
    </>
  );
}
