import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "El nombre de usuario es obligatorio"],
  },
  role: { type: String, required: true },
  passwd: { type: String, required: true },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
