/**
 * handle user registration
 */

import schema from "../models/schema";
export default async function (req: any, res: any) {
  console.log(req.body);
  // console.log(req.formError);
  // if (req.formError.length > 0) {
  //   return res.status(422).json({ error: req.formError });
  // }

  try {
    let userDetails = getUserDetailsObject(req);
    let user = await schema.create(userDetails);
    res.status(201).json({ message: "user registered successfully" });
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: err._message });
  }
}

function getUserDetailsObject(req: any) {
  let {
    firstName,
    lastName,
    mobile,
    state,
    district,
    dateOfCovid,
    dateOfCure,
    age,
    gender,
  } = req.body;

  let userDetails = {
    name: {
      firstName: firstName.toLowerCase(),
      lastName: lastName.toLowerCase(),
    },
    mobile,
    address: {
      state: state.toLowerCase(),
      district: district.toLowerCase(),
      // resident: resident.toLowerCase(),
    },
    dateOfCovid,
    dateOfCure,
    age,
    gender,
  };

  return userDetails;
}
