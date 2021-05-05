/* eslint-disable no-unused-vars */
import { Row, Col, Button, Table } from "react-bootstrap";
import indianState from "../constants/indianState";
import districts from "../constants/districts";
import { useState } from "react";
import { NavLink } from "react-router-dom";
export default function Search() {
  const [chooseState, setChooseState] = useState("");
  const [chooseDistrict, setChooseDistrict] = useState("");
  const [dArr, setDArr] = useState([]);
  const [details, setDetails] = useState([]);
  const getDetails = async (e) => {
    await fetch(
      `http://localhost:5000/search?state=${chooseState}&district=${chooseDistrict}`,
      {
        method: "GET",
        mode: "cors",
      }
    ).then(async (res) => {
      console.log(res);
      if (res.status === 200) {
        let data = await res.json();
        setDetails(data);
      } else {
        setDetails([]);
      }
    });
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
          <NavLink to="/">Become a donor? Click here</NavLink>
        </Col>
      </Row>
      <Row className="m-2">
        <Col lg={5} md={5} sm={12} className="mt-1  ">
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
        </Col>
        <Col lg={5} md={5} sm={12} className="mt-1  ">
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
            ;
            {dArr.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </Col>
        <Col lg={2} md={2} sm={12} className="mt-1">
          <Button className="w-100 p-2 cs-btn" onClick={getDetails}>
            Search
          </Button>
        </Col>
      </Row>
      <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>State</th>
              <th>District</th>
              <th>Resident</th>
              <th>Dignosed on</th>
              <th>Recovered on</th>
            </tr>
          </thead>
          <tbody>
            {details.length > 0 ? (
              details.map((item, index) => {
                let { address, dateOfCovid, dateOfCure, name, mobile } = item;
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      {name.firstName.toUpperCase() +
                        " " +
                        name.lastName.toUpperCase()}
                    </td>
                    <td>{mobile}</td>
                    <td>{address.state.toUpperCase()}</td>
                    <td>{address.district.toUpperCase()}</td>
                    <td>{address.resident?.toUpperCase()}</td>
                    <td>{dateOfCovid}</td>
                    <td>{dateOfCure}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" className="text-center h4 text-muted">
                  No records Found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Row>
    </>
  );
}
