/* eslint-disable no-unused-vars */
import { Row, Col, Button, Table } from "react-bootstrap";
import indianState from "../../constants/indianStates";
import districts from "../../constants/districts";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import bloodGroups from "../../constants/bloodGroup";
export default function Search() {
  const [chooseState, setChooseState] = useState("");
  const [chooseDistrict, setChooseDistrict] = useState("");
  const [bloodGroupType, setBloodGroupType] = useState("");
  const [dArr, setDArr] = useState([]);
  const [details, setDetails] = useState([]);
  const getDetails = async (e) => {
    await fetch(
      `http://localhost:8000/search?state=${chooseState}&district=${chooseDistrict}&bloodGroup=${bloodGroupType}`,
      {
        method: "GET",
        mode: "cors",
      }
    ).then(async (res) => {
      if (res.status === 200) {
        let data = await res.json();
        setDetails(data);
      } else {
        setDetails([]);
      }
    });
  };

  const handleDistrictOnChange = (e) => {
    setChooseDistrict(e.target.value);
  };
  const handlebloodGroupOnChange = (e) => {
    console.log(e.target.value);
    setBloodGroupType(e.target.value);
  };

  const handleOnChange = (e) => {
    setChooseState(e.target.value);
    let x = districts.states.filter((item) => item.state === e.target.value);
    setDArr(x[0].districts);
  };

  const hideUser = (index) => {
    return async function (e) {
      console.log(index);
      const userID = e.target.id;
      console.log(userID);
      await fetch(`http://localhost:8000/hide?_id=${userID}`, {
        method: "GET",
        mode: "cors",
      }).then(async (res) => {
        let data = await res.json();
        if (res.status === 200) {
          let x = details.splice(index, 1);
          console.log(details);
          setDetails([...details]);
          setChooseDistrict("none");
          setChooseState("none");
          setBloodGroupType("none");
        }
      });
    };
  };
  return (
    <>
      <Row className="m-2">
        <Col lg={12} className="text-right">
          <NavLink to="/">Become a donor? Click here</NavLink>
        </Col>
      </Row>
      <Row className="m-2">
        <Col lg={3} md={3} sm={12} className="mt-1  ">
          <select
            name="state"
            id="State"
            className="w-100 p-2"
            value={chooseState}
            onChange={handleOnChange}
          >
            <option value="none" id="none" name="none">
              Please Select State
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
        <Col lg={3} md={3} sm={12} className="mt-1  ">
          <select
            name="district"
            id="district"
            className="w-100 p-2"
            value={chooseDistrict}
            onChange={handleDistrictOnChange}
          >
            <option value="none" id="none" name="none">
              Please Select District
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
        <Col lg={3} md={3} sm={12} className="mt-1">
          <select
            name="bloodGroup"
            id="bloodGroup"
            className="w-100 p-2"
            value={bloodGroupType}
            onChange={handlebloodGroupOnChange}
          >
            <option value="none" id="none" name="none">
              Please Choose Blood Group
            </option>
            ;
            {bloodGroups.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </Col>
        <Col lg={3} md={3} sm={12} className="mt-1">
          <Button className="w-100 p-2 cs-btn" onClick={getDetails}>
            Search
          </Button>
        </Col>
      </Row>
      <Row className="mx-auto">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Mobile</th>
              <th>Blood Group</th>
              <th>State</th>
              <th>District</th>
              <th>Dignosed on</th>
              <th>Recovered on</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {details.length > 0 ? (
              details.map((item, index) => {
                let {
                  address,
                  dateOfCovid,
                  bloodGroup,
                  dateOfCure,
                  name,
                  mobileNumber,
                  gender,
                  _id,
                } = item;
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      {name.firstName.toUpperCase() +
                        " " +
                        name.lastName.toUpperCase()}
                    </td>
                    <td>{gender ? gender.toUpperCase() : null}</td>
                    <td>{mobileNumber}</td>
                    <td>{bloodGroup}</td>
                    <td>{address.state.toUpperCase()}</td>
                    <td>{address.district.toUpperCase()}</td>
                    <td>{dateOfCovid}</td>
                    <td>{dateOfCure}</td>
                    <td>
                      <Button id={_id} onClick={hideUser(index)}>
                        hide
                      </Button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="10" className="text-center h4 text-muted">
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
