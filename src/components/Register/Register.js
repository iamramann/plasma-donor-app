/* eslint-disable no-unused-vars */
// import { getByDisplayValue } from "@testing-library/dom";
import React, { useState } from "react";
import { Row, Col, Image, Form, Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "./Register.css";
import { NavLink, useHistory } from "react-router-dom";
import indianState from "../../constants/indianState";
import districts from "../../constants/districts";

import validator from "validator";
export default function Register() {
  const [fNameError, setFNameError] = useState(null);
  const [lNameError, setLNameError] = useState(null);
  const [mobileError, setMobileError] = useState(null);
  const [ageError, setAgeError] = useState(null);
  const [stateError, setStateError] = useState(null);
  const [districtError, setDistrictError] = useState(null);
  const [covidError, setCovidError] = useState(null);
  const [cureError, setCureError] = useState(null);
  const [residentError, setResidentError] = useState(null);
  const [fvError, setFvError] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    age: "",
    gender: "",
    resident: "",
    dateOfCovid: "",
    dateOfCure: "",
  });

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
  const [modalState, setModalState] = useState(false);
  const toggleModal = (e) => {
    setModalState(false);
  };

  const customValidator = (allDetails) => {
    console.log(allDetails);
    let errorArr = [];
    if (!validator.isAlpha(allDetails.firstName)) {
      console.log(fvError);
      setFNameError("First Name must contain alphabates");
      errorArr.push(1);
    } else {
      setFNameError(null);
    }
    if (!validator.isAlpha(allDetails.lastName)) {
      setLNameError("Last Name must contain alphabates");
      errorArr.push(1);
    } else {
      setLNameError(null);
    }

    if (!validator.matches(allDetails.mobile, /^[6-9]\d{9}$/)) {
      setMobileError("Please enter correct phone number");
      errorArr.push(1);
    } else {
      setMobileError(null);
    }

    if (!validator.isNumeric(allDetails.age)) {
      setAgeError("Please enter a valid age");
      errorArr.push(1);
    } else {
      setAgeError(null);
    }

    if (indianState.indexOf(allDetails.state) === -1) {
      setStateError("Please choose from the above options");
      errorArr.push(1);
    } else {
      setStateError(null);
    }

    if (validator.isEmpty(allDetails.resident)) {
      setResidentError("Residential address can't be left blank");
      errorArr.push(1);
    } else {
      setResidentError(null);
    }

    if (dArr.indexOf(allDetails.district) === -1) {
      setDistrictError("Please choose from the above options");
      errorArr.push(1);
    } else {
      setDistrictError(null);
    }

    if (!validator.isDate(allDetails.dateOfCovid)) {
      setCovidError("Please choose a correct date");
      errorArr.push(1);
    } else {
      setCovidError(null);
    }
    if (!validator.isDate(allDetails.dateOfCure)) {
      setCureError("Please choose a correct date");
      errorArr.push(1);
    } else {
      setCureError(null);
    }
    if (errorArr.length > 0) {
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let obj = { ...user, state: chooseState, district: chooseDistrict };
    let isSubmit = customValidator(obj);
    console.log(isSubmit);
    if (isSubmit) {
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
            setModalState(true);
          } else {
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
    }
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
                      // required={true}
                    ></Form.Control>
                    {fNameError ? (
                      <Form.Text className="text-danger">
                        {fNameError}
                      </Form.Text>
                    ) : null}
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
                      // required={true}
                    ></Form.Control>
                    {lNameError ? (
                      <Form.Text className="text-danger">
                        {lNameError}
                      </Form.Text>
                    ) : null}
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
                  placeholder="Enter your 10-digit Mobile Number"
                  // required={true}
                  maxLength="10"
                  minLength="10"
                  // pattern="^[6-9]\d{9}$"
                ></Form.Control>
                {mobileError ? (
                  <Form.Text className="text-danger">{mobileError}</Form.Text>
                ) : null}
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
                      // required={true}
                    />
                    {ageError ? (
                      <Form.Text className="text-danger">{ageError}</Form.Text>
                    ) : null}
                  </Col>
                  <Col lg={6} className="mt-2">
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
                      // required={true}
                    />
                    {/* {fNameError ? (
                      <Form.Text className="text-danger">
                        {fNameError}
                      </Form.Text>
                    ) : null} */}
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
                  // required={true}
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
                {stateError ? (
                  <Form.Text className="text-danger">{stateError}</Form.Text>
                ) : null}
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
                  // required={true}
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
                {districtError ? (
                  <Form.Text className="text-danger">{districtError}</Form.Text>
                ) : null}
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
                  // required={true}
                ></Form.Control>
                {residentError ? (
                  <Form.Text className="text-danger">{residentError}</Form.Text>
                ) : null}
              </Form.Group>

              <Form.Group controlId="dob">
                <Form.Label>Covid Diagnosis Date</Form.Label>
                <Form.Control
                  type="date"
                  name="dateOfCovid"
                  onChange={handleInputs}
                  value={user.dateOfCovid}
                  placeholder="Covid Diagnosis Date"
                  // required={true}
                />

                {covidError ? (
                  <Form.Text className="text-danger">{covidError}</Form.Text>
                ) : null}
              </Form.Group>

              <Form.Group controlId="dob">
                <Form.Label>Covid Cure Date</Form.Label>
                <Form.Control
                  type="date"
                  name="dateOfCure"
                  onChange={handleInputs}
                  value={user.dateOfCure}
                  placeholder="Covid Cure Date"
                  // required={true}
                />
                {cureError ? (
                  <Form.Text className="text-danger">{cureError}</Form.Text>
                ) : null}
              </Form.Group>

              <Button className="  w-100 mt-1 clr" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
      <Modal
        size="md"
        show={modalState}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton onClick={toggleModal}>
          <Modal.Title id="contained-modal-title-vcenter">
            Thank You
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Small steps can make big changes in the world, By registering with
            us and help needy people to get plasma. it may save their life. once
            again Thank you so much.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={toggleModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
