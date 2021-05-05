/* eslint-disable no-unused-vars */
import { useFormik, Field } from "formik";
import * as Yup from "yup";
import { Button, Container, Row, Col, Form, Dropdown } from "react-bootstrap";
import indianState from "../constants/indianState";
import district from "../constants/districts";
import { NavLink } from "react-router-dom";
export default function Register() {
  return (
    <>
      <Row className="m-2">
        <Col lg={12} className="text-right">
          <NavLink to="/search">Looking for plasma donors?click here</NavLink>
        </Col>
      </Row>
    </>
  );
}
