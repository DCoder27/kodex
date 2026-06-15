import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const UserModel = mongoose.model("Users", userSchema);
export default UserModel;
