import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "El nombre de empresa es obligatorio"],
  },
  description: {
    type: String,
    required: false,
  },
  users_id: {
    type: Array,
    required: false,
  },
});

export default mongoose.models.Company ||
  mongoose.model("Company", CompanySchema);
