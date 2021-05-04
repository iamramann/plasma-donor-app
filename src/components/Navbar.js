/* eslint-disable no-unused-vars */
import { useState, useRef } from "react";
import {
  IconButton,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Grid,
  Select,
  MenuItem,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Button,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Image from "material-ui-image";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";
import { sizing } from "@material-ui/system";
import indianState from "../constants/indianState";
import districts from "../constants/districts";
import * as Yup from "yup";

import { Formik, Form } from "formik";
export default function Navbar() {
  const { stateValue, setStateValue } = useState(`None`);
  const { district, setDistrict } = useState([]);

  const validate = Yup.object({
    firstName: Yup.string()
      .matches(/^[a-zA-Z]{2,30}$/, "Invalid First Name")
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),

    lastName: Yup.string()
      .matches(/^[a-zA-Z]{2,30}$/, "Invalid Last Name")
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),

    address: Yup.string()
      .matches(/^[a-zA-Z]{2,30}$/, "Invalid Address")
      .required("Required"),

    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
    cpassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
    mobile: Yup.string().matches(/^[6-9]\d{9}$/, "Phone number is not valid"),
    profession: Yup.string().required("Profession is Required"),
  });
  return (
    <>
      <Box bgcolor="primary.main">
        <IconButton color="inherit">
          <AcUnitIcon fontSize="large" className="white" />
          <Typography variant="h4" className="white">
            Plasma Donor App
          </Typography>
        </IconButton>
      </Box>

      <Grid container direction="row" justify="space-evenly">
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <img
            src="https://res.cloudinary.com/oncloud9/image/upload/v1619924430/photoApp/edvrmcmioho9mdwjoezc.jpg"
            alt="..."
          />
        </Grid>

        <Grid item sm={12} md={6} lg={6}>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={validate}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {() => (
              <Box mt={2} p={5} border={1}>
                {/* firstname */}
                <Form id="register-form" method="POST">
                  <Grid container>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      lg={5}
                      style={{ marginRight: "10px" }}
                    >
                      <FormControl
                        variant="filled"
                        style={{
                          width: "100%",
                          marginBottom: "5px",
                        }}
                      >
                        <InputLabel htmlFor="my-input">First Name</InputLabel>
                        <Input
                          id="my-first-name"
                          width={1}
                          name="firstName"
                          aria-describedby="my-helper-text"
                        />

                        <FormHelperText>Required</FormHelperText>
                      </FormControl>
                    </Grid>
                    {/* lastname */}
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <FormControl
                        variant="filled"
                        style={{ width: "100%", marginBottom: "5px" }}
                      >
                        <InputLabel htmlFor="my-input">Last Name</InputLabel>
                        <Input
                          id="my-last-name"
                          width={1}
                          name="lastName"
                          aria-describedby="my-helper-text"
                        />
                        <FormHelperText>Required</FormHelperText>
                      </FormControl>
                    </Grid>
                  </Grid>
                  {/* email id */}

                  <FormControl style={{ width: "100%", marginBottom: "5px" }}>
                    <InputLabel htmlFor="my-input">Email address</InputLabel>
                    <Input
                      id="my-email"
                      name="email"
                      type="email"
                      width={1}
                      aria-describedby="my-helper-text"
                    />
                    <FormHelperText id="my-helper-text">
                      We'll never share your email.
                    </FormHelperText>
                  </FormControl>
                  {/* mobile number */}
                  <FormControl style={{ width: "100%", marginBottom: "15px" }}>
                    <InputLabel htmlFor="my-input">
                      Enter Mobile Number
                    </InputLabel>
                    <Input
                      id="my-mobile"
                      name="mobile"
                      type="tel"
                      width={1}
                      aria-describedby="my-helper-text"
                    />
                    <FormHelperText>Required</FormHelperText>
                  </FormControl>

                  {/* Age */}
                  <Grid container>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      lg={5}
                      style={{ marginRight: "10px" }}
                    >
                      <FormControl
                        variant="filled"
                        style={{
                          width: "100%",
                          marginBottom: "15px",
                        }}
                      >
                        <InputLabel htmlFor="my-input"> Age</InputLabel>
                        <Input
                          id="my-age"
                          width={1}
                          name="age"
                          type="number"
                          aria-describedby="my-helper-text"
                        />
                        <FormHelperText>Required</FormHelperText>
                      </FormControl>
                    </Grid>
                    {/* gender */}
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Gender</FormLabel>

                        <RadioGroup row aria-label="gender" name="gender1">
                          <FormControlLabel
                            value="male"
                            control={<Radio />}
                            label="Male"
                          />
                          <FormControlLabel
                            value="female"
                            control={<Radio />}
                            label="Female"
                          />
                        </RadioGroup>
                        <FormHelperText>Required</FormHelperText>
                      </FormControl>
                    </Grid>
                  </Grid>

                  {/* State */}
                  <FormControl
                    style={{ width: "100%", marginBottom: "5px" }}
                    required
                  >
                    <InputLabel id="my-state">State</InputLabel>
                    <Select
                      labelId="my-state"
                      id="my-state"
                      defaultValue="None"
                      name="state"
                      value={stateValue}
                    >
                      <MenuItem value="None" disabled="true">
                        <em>Please select a state</em>
                      </MenuItem>
                      {indianState.map((stateName, index) => {
                        return (
                          <MenuItem key={index} value={stateName}>
                            {stateName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText>Required</FormHelperText>
                  </FormControl>
                  {/* District */}
                  <FormControl
                    style={{ width: "100%", marginBottom: "5px" }}
                    required
                  >
                    <InputLabel id="my-district">District</InputLabel>
                    <Select
                      labelId="my-state"
                      id="my-district"
                      defaultValue="None"
                      name="district"
                      value={stateValue}
                    >
                      <MenuItem value="None" disabled="true">
                        <em>Please select a district</em>
                      </MenuItem>
                      {district?.map((stateName, index) => {
                        return (
                          <MenuItem key={index} value={stateName}>
                            {stateName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText>Required</FormHelperText>
                  </FormControl>
                  {/* Residential Address */}
                  <FormControl
                    variant="filled"
                    style={{ width: "100%", marginBottom: "5px" }}
                  >
                    <InputLabel htmlFor="my-address">Address</InputLabel>
                    <Input
                      id="my-address"
                      width={1}
                      name="address"
                      aria-describedby="my-helper-text"
                    />
                  </FormControl>
                  {/* Date Positive */}
                  <FormControl
                    variant="filled"
                    style={{ width: "100%", marginBottom: "5px" }}
                  >
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-postive"
                        name="datePositive"
                        label="Covid Positive Date"
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                      <FormHelperText>Required</FormHelperText>
                    </MuiPickersUtilsProvider>
                  </FormControl>
                  {/* Date Negative */}
                  <FormControl
                    variant="filled"
                    style={{ width: "100%", marginBottom: "5px" }}
                  >
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-negative"
                        name="dateNegative"
                        label="Covid Negative Date"
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                      <FormHelperText>Required</FormHelperText>
                    </MuiPickersUtilsProvider>
                  </FormControl>
                  <FormControl>
                    <Button type="submit" variant="contained" color="primary">
                      Submit
                    </Button>
                  </FormControl>
                </Form>
              </Box>
            )}
          </Formik>
        </Grid>
      </Grid>
    </>
  );
}
