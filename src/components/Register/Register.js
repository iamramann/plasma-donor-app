/* eslint-disable no-unused-vars */
// import { getByDisplayValue } from "@testing-library/dom";
import React, { useState } from "react";
import { Row, Col, Image, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "./Register.css";
import { NavLink, useHistory } from "react-router-dom";
import indianState from "../../constants/indianState";
import districts from "../../constants/districts";
export default function Register() {
  const history = useHistory();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    age: "",
    gender: "",
    resident: "",
    dateOfCovid: "",
    dateOfCure: "",
  });

  const [chooseState, setChooseState] = useState("none");
  const [dArr, setDArr] = useState([]);
  const [errors, setErrors] = useState([]);
  const [chooseDistrict, setChooseDistrict] = useState("none");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(chooseState, chooseDistrict);
    console.log(user);
    let obj = { ...user, state: chooseState, district: chooseDistrict };
    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then(async (res) => {
        let data = await res.json();
        if (res.status === 201) {
        } else if (res.status === 422) {
          setErrors([data.message]);
        } else if (res.status === 500) {
          setErrors([data.message]);
        }
        setUser({
          firstName: "",
          lastName: "",
          mobile: "",
          age: "",
          gender: "",
          resident: "",
          dateOfCovid: "",
          dateOfCure: "",
        });

        setChooseDistrict("none");
        setChooseState("none");
      })
      .catch((error) => {
        alert("something went wrong");
      });
  };

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const handleDistrictOnChange = (e) => {
    console.log(e.target.value);
    setChooseDistrict(e.target.value);
  };

  const handleOnChange = (e) => {
    console.log(e.target.value);
    setChooseState(e.target.value);
    let x = districts.states.filter((item) => item.state === e.target.value);
    setDArr(x[0].districts);
  };

  return (
    <>
      <Row className="m-2">
        <Col lg={12} className="text-right">
          <NavLink to="/search">Search for plasma donors? click here</NavLink>
        </Col>
      </Row>

      <Row className="mt-2">
        <Col lg={12}>
          {errors.length > 0
            ? errors.map((err, index) => {
                return (
                  <li
                    className="text-danger text-capitalize error-msg"
                    key={index}
                  >
                    {err}
                  </li>
                );
              })
            : null}
          <div className="container  d-flex justify-content-center align-items-center p-2 m-2 border bg-light">
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col lg={6} md={6} sm={12}>
                  <Form.Group controlId="firstname">
                    <Form.Label className="fs-cs-1">First Name*</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      className="margin-b"
                      onChange={handleInputs}
                      value={user.firstName}
                      placeholder="Enter your First Name"
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <Form.Group controlId="lastname">
                    <Form.Label className="fs-cs-1">Last Name*</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      className="margin-b"
                      onChange={handleInputs}
                      value={user.lastName}
                      placeholder="Enter your Last Name"
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group controlId="tel">
                <div className="d-flex">
                  <Form.Label className="fs-cs-1 mr-2">Mobile</Form.Label>
                </div>
                <Form.Control
                  type="tel"
                  name="mobile"
                  className="margin-b"
                  onChange={handleInputs}
                  value={user.mobile}
                  placeholder="Enter your Mobile Number"
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="formBasicAge">
                <Row>
                  <Col lg={6}>
                    <div className="d-flex justify-content-between">
                      <Form.Label className="fs-cs-1">Age*</Form.Label>
                    </div>
                    <Form.Control
                      type="text"
                      className="margin-b"
                      placeholder="Enter Your Age"
                      value={user.age}
                      name="age"
                      onChange={handleInputs}
                    />
                  </Col>
                  <Col lg={6}>
                    <div className="d-flex justify-content-between">
                      <Form.Label className="fs-cs-1">Gender*</Form.Label>
                    </div>
                    <Form.Check
                      inline
                      label="Male"
                      name="gender"
                      type="radio"
                      id={`inline-radio-1`}
                    />
                    <Form.Check
                      inline
                      label="Female"
                      type="radio"
                      name="gender"
                      id={`inline-radio-2`}
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group>
                <div className="d-flex justify-content-between">
                  <Form.Label className="fs-cs-1">State*</Form.Label>
                </div>
                <select
                  name="state"
                  id="State"
                  className="w-100 p-2"
                  value={chooseState}
                  onChange={handleOnChange}
                >
                  <option value="none" id="none" name="none">
                    Please Select
                  </option>
                  ;
                  {indianState.map((item, index) => {
                    return (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              </Form.Group>
              <Form.Group>
                <div className="d-flex justify-content-between">
                  <Form.Label className="fs-cs-1">District*</Form.Label>
                </div>
                <select
                  name="district"
                  id="district"
                  className="w-100 p-2"
                  value={chooseDistrict}
                  onChange={handleDistrictOnChange}
                >
                  <option value="none" id="none" name="none">
                    Please Select
                  </option>
                  {dArr.map((item, index) => {
                    return (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              </Form.Group>
              <Form.Group controlId="resident">
                <div className="d-flex">
                  <Form.Label className="fs-cs-1 mr-2">
                    Residential Address
                  </Form.Label>
                </div>
                <Form.Control
                  type="text"
                  name="resident"
                  className="margin-b"
                  onChange={handleInputs}
                  value={user.resident}
                  placeholder="Enter your permanent address*"
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="dob">
                <Form.Label>Covid Diagnosis Date</Form.Label>
                <Form.Control
                  type="date"
                  name="dateOfCovid"
                  onChange={handleInputs}
                  value={user.dateOfCovid}
                  placeholder="Covid Diagnosis Date"
                />
              </Form.Group>

              <Form.Group controlId="dob">
                <Form.Label>Covid Cure Date</Form.Label>
                <Form.Control
                  type="date"
                  name="dateOfCure"
                  onChange={handleInputs}
                  value={user.dateOfCure}
                  placeholder="Covid Cure Date"
                />
              </Form.Group>

              <Button className="  w-100 mt-1 clr" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </>
  );
}
