import React, { useState } from "react";
import { Formik, Form } from "formik";
import { useHistory, NavLink } from "react-router-dom";
// import { faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Yup from "yup";
import { TextField } from "./TextField";
import { Row, Col } from "react-bootstrap";

export default function Login() {
  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
  });

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validate}
        onSubmit={(values) => {
          console.log(values);
          // LoginPost(values);
          values.email = "";
          values.password = "";
        }}
      >
        {() => (
          <>
            <Row className="m-2">
              <Col lg={12} className="text-right">
                <NavLink to="/search">Search for plasma donors</NavLink>
              </Col>
            </Row>
            <Row className="border">
              <Form
                id="login-form"
                method="POST"
                className="border w-50 m-auto"
              >
                <label htmlFor="firstName">First Name</label>
                <TextField
                  label="firstName"
                  placeholder="Your First Name"
                  className="form-control w-100"
                  name="firstName"
                  type="firstName"
                  aria-describedby="basic-addon1"
                />
              </Form>
            </Row>
          </>
        )}
      </Formik>
    </>
  );
}
