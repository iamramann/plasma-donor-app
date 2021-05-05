/*
 * return an array of user who does belong to queried state and district
 */
import schema from "../models/schema";
export default async function (req: any, res: any) {
  let { state, district } = req.query;
  let x = state.toLowerCase();
  let y = district.toLowerCase();

  try {
    let result = await schema.find({
      "address.state": x,
      "address.district": y,
    });
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "No records found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}
