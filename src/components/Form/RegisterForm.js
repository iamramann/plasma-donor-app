/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Form, Button, Row, Col, Modal } from "react-bootstrap";
import indianStates from "../../constants/indianStates";
import districts from "../../constants/districts";
import bloodGroups from "../../constants/bloodGroup";
import validator from "validator";
const invalidInputMessage = "This is invalid";
const emptyErrorMessage = "This is invalid";
const invalidDateError = "Please enter a valid date";
const myCases = {
  firstName: "firstName",
  lastName: "lastName",
  mobileNumber: "mobileNumber",
  age: "age",
  gender: "gender",
  state: "state",
  district: "district",
  bloodGroup: "bloodGroup",
  dateOfCovid: "dateOfCovid",
  dateOfCure: "dateOfCure",
};
const phoneRegex = /^[6-9]\d{9}$/;
const minAgeForDonation = 18;
const maxAgeForDonation = 99;
export default function RegisterForm() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    age: 18,
    gender: "",
    state: "none",
    district: "none",
    bloodGroup: "none",
    dateOfCovid: "",
    dateOfCure: "",
  });
  const [error, setError] = useState({
    firstName: undefined,
    lastName: undefined,
    mobileNumber: undefined,
    gender: undefined,
    state: undefined,
    district: undefined,
    bloodGroup: undefined,
    dateOfCovid: undefined,
    dateOfCure: undefined,
  });

  const [modalState, setModalState] = useState(false);
  const [districtArray, setDistrictArray] = useState([]);
  const [serverError, setServerError] = useState(undefined);
  const inputDetailsValidation = (user) => {
    let { gender, state, district, bloodGroup, dateOfCovid, dateOfCure } = user;
    const isStateIncluded = indianStates.includes(state);
    const isDistrictIncluded = districtArray.includes(district);
    const isDateOfCovidIsValid = validator.isDate(dateOfCovid);
    const isDateOfCureIsValid = validator.isDate(dateOfCure);
    const isBloodGroupIncluded = bloodGroups.includes(bloodGroup);
    const isGenderSelected = gender === "male" || gender === "female";

    if (!isGenderSelected) {
      setError({ ...error, gender: "Please specify a gender" });
      return false;
    }

    if (!isBloodGroupIncluded && isGenderSelected) {
      setError({ ...error, bloodGroup: "Please select a blood group" });
      return false;
    }

    if (!isStateIncluded && isBloodGroupIncluded && isGenderSelected) {
      setError({ ...error, state: "Please choose state" });
      return false;
    }

    if (
      !isDistrictIncluded &&
      isBloodGroupIncluded &&
      isGenderSelected &&
      isStateIncluded
    ) {
      setError({ ...error, district: "Please choose district" });
      return false;
    }

    if (
      !isDateOfCovidIsValid &&
      isStateIncluded &&
      isGenderSelected &&
      isBloodGroupIncluded &&
      isDistrictIncluded
    ) {
      setError({ ...error, dateOfCovid: invalidDateError });
      return false;
    }
    if (
      !isDateOfCureIsValid &&
      isDateOfCovidIsValid &&
      isStateIncluded &&
      isGenderSelected &&
      isBloodGroupIncluded &&
      isDistrictIncluded
    ) {
      setError({ ...error, dateOfCure: invalidDateError });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      error.firstName === undefined &&
      user.firstName.length > 0 &&
      error.lastName === undefined &&
      user.lastName.length > 0 &&
      validator.matches(user.mobileNumber, phoneRegex) &&
      user.age > 17 &&
      user.age < 99 &&
      inputDetailsValidation(user)
    ) {
      await fetch("http://localhost:8000/register", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }).then(async (res) => {
        let data = await res.json();

        if (res.status === 201) {
          setModalState(true);
          setUser({
            firstName: "",
            lastName: "",
            mobileNumber: "",
            age: 18,
            gender: "",
            state: "none",
            district: "none",
            bloodGroup: "none",
            dateOfCovid: "",
            dateOfCure: "",
          });
          setDistrictArray([]);
          setServerError("");
        } else {
          setServerError(data.message);
        }
      });
    }
  };

  const toggleModal = (e) => {
    setModalState(false);
  };

  const handleFirstName = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    switch (name) {
      case myCases.firstName:
        setUser({ ...user, [name]: value });
        if (validator.isAlpha(value) || validator.isEmpty(value)) {
          setError({ ...error, [name]: undefined });
        } else {
          setError({
            ...error,
            [name]: "First Name can only contain alphabates",
          });
        }
        break;
      case myCases.lastName:
        setUser({ ...user, [name]: value });
        if (validator.isAlpha(value) || validator.isEmpty(value)) {
          setError({ ...error, [name]: undefined });
        } else {
          setError({
            ...error,
            [name]: "Last Name can only contain alphabates",
          });
        }
        break;
      case myCases.mobileNumber:
        setUser({ ...user, [name]: value });
        if (validator.matches(value, phoneRegex) || validator.isEmpty(value)) {
          setError({ ...error, [name]: undefined });
        } else {
          setError({ ...error, [name]: "Please enter a valid phone number" });
        }
        break;
      case myCases.age:
        setUser({
          ...user,
          [name]: isNaN(Number(value)) ? minAgeForDonation : Number(value),
        });

        if (
          Number(value) < minAgeForDonation ||
          Number(value) > maxAgeForDonation ||
          isNaN(Number(value))
        ) {
          setError({ ...error, [name]: "Please enter a valid age" });
        } else {
          setError({ ...error, [name]: undefined });
        }
        break;

      case myCases.gender:
        setUser({ ...user, [name]: value });
        if (value === "male" || value === "female") {
          setError({ ...error, [name]: undefined });
        } else {
          setError({ ...error, [name]: "Please specify a gender" });
        }
        break;

      case myCases.state:
        setUser({ ...user, [name]: value });
        let requiredObject = districts.states.filter(
          (item) => item.state === value
        );
        setDistrictArray(requiredObject[0]?.districts);
        if (indianStates.includes(value)) {
          setError({ ...error, [name]: undefined });
        } else {
          setError({ ...error, [name]: "Please choose a state" });
        }
        break;
      case myCases.district:
        setUser({ ...user, [name]: value });

        if (districtArray.includes(value)) {
          setError({ ...error, [name]: undefined });
        } else {
          setError({ ...error, [name]: "Please choose a district" });
        }

        break;
      case myCases.bloodGroup:
        setUser({ ...user, [name]: value });
        if (bloodGroups.includes(value)) {
          setError({ ...error, [name]: undefined });
        } else {
          setError({ ...error, [name]: "Please select a blood group" });
        }
        break;

      case myCases.dateOfCovid:
        if (validator.isDate(value)) {
          setUser({ ...user, [name]: value });
          setError({ ...error, [name]: undefined });
        } else {
          setError({ ...error, [name]: invalidDateError });
        }
        break;
      case myCases.dateOfCure:
        setUser({ ...user, [name]: value });
        if (validator.isDate(value)) {
          setUser({ ...user, [name]: value });
          setError({ ...error, [name]: undefined });
        } else {
          setError({ ...error, [name]: invalidDateError });
        }
        break;
      default:
        break;
    }
  };

  const handleOnBlur = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    switch (name) {
      case myCases.firstName:
        if (validator.isEmpty(value)) {
          setError({ ...error, [name]: "Please enter your first name" });
        } else if (!validator.isAlpha(value)) {
          setError({
            ...error,
            [name]: "First Name can only contain alphabates",
          });
        } else {
          setError({ ...error, [name]: undefined });
        }
        break;
      case myCases.lastName:
        if (validator.isEmpty(value)) {
          setError({ ...error, [name]: "Please enter your last name" });
        } else if (!validator.isAlpha(value)) {
          setError({
            ...error,
            [name]: "Last Name can only contain alphabates",
          });
        } else {
          setError({ ...error, [name]: undefined });
        }
        break;
      case myCases.mobileNumber:
        if (validator.isEmpty(value)) {
          setError({ ...error, [name]: "Please enter your mobile number" });
        } else if (!validator.matches(value, phoneRegex)) {
          setError({ ...error, [name]: invalidInputMessage });
        } else {
          setError({ ...error, [name]: undefined });
        }
        break;
      case myCases.age:
        if (validator.isEmpty(value)) {
          setError({ ...error, [name]: "Please enter a valid age" });
        } else if (
          Number(value) < minAgeForDonation ||
          Number(value) > maxAgeForDonation ||
          isNaN(value)
        ) {
          setError({ ...error, [name]: "Please enter a valid age" });
        } else {
          setError({ ...error, [name]: undefined });
        }
        break;

      case myCases.gender:
        if (validator.isEmpty(value)) {
        } else {
        }
        break;

      default:
        break;
    }
  };

  const handleOnFocus = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    switch (name) {
      case myCases.firstName:
        if (!validator.isAlpha(value) && !validator.isEmpty(value)) {
          setError({ ...error, [name]: emptyErrorMessage });
        } else {
          setError({ ...error, [name]: undefined });
        }
        break;
      case myCases.lastName:
        if (!validator.isAlpha(value) && !validator.isEmpty(value)) {
          setError({ ...error, [name]: emptyErrorMessage });
        } else {
          setError({ ...error, [name]: undefined });
        }
        break;
      case myCases.mobileNumber:
        if (
          !validator.matches(value, phoneRegex) &&
          !validator.isEmpty(value)
        ) {
          setError({ ...error, [name]: emptyErrorMessage });
        } else {
          setError({ ...error, [name]: undefined });
        }
        break;

      default:
        break;
    }
  };

  return (
    <>
      {serverError ? (
        <Form.Text className="text-danger">{serverError}</Form.Text>
      ) : null}
      <Form
        className="border p-3 w-100 m-2  mx-auto bg-white"
        onSubmit={handleSubmit}
      >
        <Row>
          <Col lg={6} md={12} sm={12}>
            <Form.Group className="mb-2">
              <Form.Label>First Name*</Form.Label>
              <Form.Control
                type="text"
                id="firstName"
                placeholder="Enter First Name"
                value={user.firstName}
                name="firstName"
                onFocus={handleOnFocus}
                onChange={handleFirstName}
                onBlur={handleOnBlur}
                required
              />
              {error.firstName ? (
                <Form.Text className="text-danger">{error.firstName}</Form.Text>
              ) : null}
            </Form.Group>
          </Col>
          <Col lg={6} md={12} sm={12}>
            <Form.Group className="mb-2">
              <Form.Label>Last Name*</Form.Label>
              <Form.Control
                type="text"
                id="lastName"
                placeholder="Enter Last Name"
                value={user.lastName}
                name="lastName"
                onFocus={handleOnFocus}
                onChange={handleFirstName}
                onBlur={handleOnBlur}
                required
              />
              {error.lastName ? (
                <Form.Text className="text-danger">{error.lastName}</Form.Text>
              ) : null}
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-2">
              <Form.Label>Mobile Number*</Form.Label>
              <Form.Control
                type="text"
                id="mobileNumber"
                placeholder="Enter Mobile Number"
                value={user.mobileNumber}
                name="mobileNumber"
                onFocus={handleOnFocus}
                onChange={handleFirstName}
                onBlur={handleOnBlur}
                maxLength="10"
                minLength="10"
                required
              />
              {error.mobileNumber ? (
                <Form.Text className="text-danger">
                  {error.mobileNumber}
                </Form.Text>
              ) : null}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col lg={6} md={12} sm={12}>
            <Form.Group className="mb-2">
              <Form.Label>Age*</Form.Label>
              <Form.Text>&nbsp;(Age must be over 18)</Form.Text>
              <Form.Control
                type="text"
                id="age"
                placeholder="Age must be over 18"
                value={user.age}
                name="age"
                onFocus={handleOnFocus}
                onChange={handleFirstName}
                onBlur={handleOnBlur}
                min="18"
              />
              {error.age ? (
                <Form.Text className="text-danger">{error.age}</Form.Text>
              ) : null}
            </Form.Group>
          </Col>
          <Col lg={6} md={12} sm={12} className=" d-flex align-items-center">
            <Form.Group className="mb-2">
              <Form.Label>Gender*</Form.Label>
              <br />
              <Form.Check
                inline
                label="Male"
                name="gender"
                value="male"
                onChange={handleFirstName}
                type="radio"
                id={`inline-radio-1`}
              />
              <Form.Check
                inline
                label="Female"
                name="gender"
                type="radio"
                value="female"
                onChange={handleFirstName}
                id={`inline-radio-2`}
              />
              <br />
              {error.gender ? (
                <Form.Text className="text-danger">{error.gender}</Form.Text>
              ) : null}
            </Form.Group>
          </Col>
          <Col lg={6} md={12} sm={12}>
            <Form.Group className="mb-2">
              <Form.Label>Blood Group*</Form.Label>
              <Form.Control
                as="select"
                value={user.bloodGroup}
                onChange={handleFirstName}
                name="bloodGroup"
                custom
                className="p-2 w-100"
              >
                <option id="none" name="none" value="">
                  Please choose your blood group
                </option>
                {bloodGroups.map((groupName, index) => {
                  return (
                    <option key={groupName} value={groupName}>
                      {groupName}
                    </option>
                  );
                })}
              </Form.Control>
              {error.bloodGroup ? (
                <Form.Text className="text-danger">
                  {error.bloodGroup}
                </Form.Text>
              ) : null}
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="exampleForm.SelectCustom" className="mb-2">
          <Form.Label>State*</Form.Label>
          <Form.Control
            as="select"
            value={user.state}
            onChange={handleFirstName}
            name="state"
            custom
            className="w-100 p-2"
          >
            <option id="none" name="none" value="">
              Please select state...
            </option>
            {indianStates.map((stateName, index) => {
              return (
                <option key={stateName} value={stateName}>
                  {stateName}
                </option>
              );
            })}
          </Form.Control>
          {error.state ? (
            <Form.Text className="text-danger">{error.state}</Form.Text>
          ) : null}
        </Form.Group>

        <Form.Group controlId="exampleForm.SelectCustom" className="mb-2">
          <Form.Label>District*</Form.Label>
          <Form.Control
            as="select"
            value={user.district}
            onChange={handleFirstName}
            name="district"
            custom
            className="w-100 p-2"
          >
            <option id="none" name="none" value="">
              Please select district...
            </option>
            {districtArray?.map((districtName, index) => {
              return (
                <option key={districtName} value={districtName}>
                  {districtName}
                </option>
              );
            })}
          </Form.Control>
          {error.district ? (
            <Form.Text className="text-danger">{error.district}</Form.Text>
          ) : null}
        </Form.Group>
        <Form.Group controlId="diagnoseDate" className="mb-2">
          <Form.Label>Covid diagnose date*</Form.Label>
          <Form.Control
            type="date"
            name="dateOfCovid"
            value={user.dateOfCovid}
            onChange={handleFirstName}
            placeholder="Covid diagnose Date"
          />
          {error.dateOfCovid ? (
            <Form.Text className="text-danger">{error.dateOfCovid}</Form.Text>
          ) : null}
        </Form.Group>
        <Form.Group controlId="cureDate" className="mb-2">
          <Form.Label>Covid cure date*</Form.Label>
          <Form.Control
            type="date"
            name="dateOfCure"
            value={user.dateOfCure}
            onChange={handleFirstName}
            placeholder="Covid Cure Date"
          />
          {error.dateOfCure ? (
            <Form.Text className="text-danger">{error.dateOfCure}</Form.Text>
          ) : null}
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Submit
        </Button>
      </Form>
      <Modal
        size="md"
        show={modalState}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Congratulations
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Thank you for registering with us</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={toggleModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
