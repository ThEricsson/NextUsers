import dbConnect from "../../../lib/dbConnect";
import Company from "../../../models/Company";

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;
  switch (method) {
    case "POST":
      try {
        //console.log(req.body)

        const company = new Company(req.body);
        await company.save();

        console.log(company);

        return res.status(200).json({ succes: true, company });
      } catch (error) {
        return res.status(400).json({ succes: false, error });
      }

    default:
      return res
        .status(500)
        .json({ succes: false, error: "Error del servidor" });
  }
}
