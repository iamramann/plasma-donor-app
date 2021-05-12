/**
 * handle user registration
 */

import schema from "../models/schema";
export default async function (req: any, res: any) {
  if (req.formError.length > 0) {
    return res.status(422).json(req.formError[0]);
  }

  try {
    let userDetails = getUserDetailsObject(req);
    let user = await schema.create(userDetails);
    res.status(201).json({ message: "user registered successfully" });
  } catch (err) {
    if (err.code === 11000) {
      res.status(500).json({ message: "Mobile Number is already in use" });
      return;
    }

    res.status(500).json({ message: "something went wrong" });
  }
}

function getUserDetailsObject(req: any) {
  const month = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JULY",
    "AUGUST",
    "SEPT",
    "OCT",
    "NOV",
    "DEC",
  ];
  let {
    firstName,
    lastName,
    mobileNumber,
    state,
    district,
    dateOfCovid,
    dateOfCure,
    age,
    gender,
    bloodGroup,
  } = req.body;

  let newDateOfCovid = Date.parse(dateOfCovid);
  let newDateOfCure = Date.parse(dateOfCure);
  let x = new Date(newDateOfCovid);
  let y = new Date(newDateOfCure);

  let userDetails = {
    name: {
      firstName: firstName.toLowerCase(),
      lastName: lastName.toLowerCase(),
    },
    mobileNumber,
    address: {
      state: state.toLowerCase(),
      district: district.toLowerCase(),
    },
    dateOfCovid:
      x.getDate() + "-" + month[x.getMonth()] + "-" + x.getFullYear(),
    dateOfCure: y.getDate() + "-" + month[y.getMonth()] + "-" + y.getFullYear(),
    age,
    gender,
    bloodGroup,
  };

  return userDetails;
}
