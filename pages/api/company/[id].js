import dbConnect from "../../../lib/dbConnect";
import Company from "../../../models/Company";

export default async function handler(req, res) {
  await dbConnect();

  const {
    method,
    query: { id },
  } = req;
  switch (method) {
    case "GET":
      try {
        const company = await Company.findById(id).lean();

        if (!company) {
          return res.status(404).json({ succes: false });
        }

        return res.json({ succes: true, data: company });
      } catch (error) {
        return res.status(404).json({ succes: false });
      }

    default:
      return res
        .status(500)
        .json({ succes: false, error: "Error del servidor" });
  }
}
