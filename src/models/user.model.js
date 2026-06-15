import mongoose from "mongoose";
import bcrypt, { hashSync } from "bcryptjs";

// User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      unique: true,
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

// Hash the password before saving the user document
userSchema.pre("save", function () {
  this.password = hashSync(this.password, 10);
});

// Method to compare the provided password with the hashed password in the database
userSchema.methods.comparedPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

//create user model
const UserModel = mongoose.model("users", userSchema);
export default UserModel;
