import { Container, Row, Col, Alert } from "react-bootstrap";
import RegisterForm from "../components/Form/RegisterForm";
import MyNavbar from "../components/MyNavbar/MyNavbar";
import { NavLink } from "react-router-dom";
import "./register.css";
export default function Register() {
  return (
    <>
      <Container fluid className="vh-100">
        <MyNavbar />

        <Alert variant="success" className="my-2">
          <Alert.Heading>Hey, Welcome to Plasma Donor App</Alert.Heading>
          <p>
            Small steps can make big changes in the world, By registering with
            us and help needy people to get plasma. it may save their life. once
            again Thank you so much.
          </p>
        </Alert>
        <Row className="m-2">
          <Col lg={12} className="text-right">
            <NavLink to="/search">Search for plasma donors? click here</NavLink>
          </Col>
        </Row>
        <Row className="border d-flex justify-content-center  mx-auto bg-light">
          <Col lg={6}>
            <RegisterForm />
          </Col>
        </Row>
      </Container>
    </>
  );
}
