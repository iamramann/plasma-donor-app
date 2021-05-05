// router.get("/search", async (req: any, res: any) => {
//   let { state, district } = req.query;
//   try {
//     let result = await schema.find({
//       "address.state": state,
//       "address.district": district,
//     });
//     if (result.length > 0) {
//       res.status(200).json(result);
//     } else {
//       res.status(404).json({ message: "No records found" });
//     }
//   } catch (err) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// });
