// router.post(
//   "/register",
//   validatonChecks(),
//   validate,
//   async (req: any, res: any) => {
//     console.log(req.formError);

//     if (req.formError.length > 0) {
//       return res.status(422).json(req.formError);
//     }

//     let {
//       firstName,
//       lastName,
//       mobile,
//       state,
//       district,
//       resident,
//       dateOfCovid,
//       dateOfCure,
//     } = req.body;

//     let userDetails = {
//       name: {
//         firstName: firstName.toLowerCase(),
//         lastName: lastName.toLowerCase(),
//       },
//       mobile,
//       address: {
//         state: state.toLowerCase(),
//         district: district.toLowerCase(),
//         resident: resident.toLowerCase(),
//       },
//       dateOfCovid,
//       dateOfCure,
//     };
//     try {
//       let user = await schema.create(userDetails);
//       res.status(201).json({ message: "user registered successfully" });
//     } catch (err) {
//       res.json({ message: err._message });
//     }
//   }
// );
