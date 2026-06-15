import UserModel from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    /* -------- Validation for name, email and password ---- */
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }
    /* -------- Check if user already exists ---- */
    const existingUser = await UserModel.findOne({ email });

    if (existingUser)
      return res.status(409).json({
        message: "User with this email aready exists",
      });
    /* -------- Create new user and generate token ---- */
    const newUser = await UserModel.create({ name, email, password });
    const token = generateToken(newUser._id);

    /* -------- Set token in cookie ---- */
    res.cookie("token", token);

    /* -------- Send response with user data and  ---- */
    return res.status(201).json({
      message: "User registered successfully",
      User: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export { registerController };
