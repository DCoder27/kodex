import UserModel from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import { verifyToken } from "../utils/verifyToken.js";

/* -------- Controller for User Registration --------- */
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
    const newUser = await UserModel.create({
      name,
      email,
      password,
    });
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

/* -------- Controller for User Login --------- */
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    /* -------- Validation for email and password ---- */
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    /* -------- Check if user exists ---- */
    const existingUser = await UserModel.findOne({ email });

    /* -------- If user does not exist, send not found response ---- */
    if (!existingUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    /* -------- Compare password with hashed password ---- */
    const isPasswordValid = await existingUser.comparedPassword(password);

    /* -------- If password is invalid, send unauthorized response ---- */
    if (!isPasswordValid)
      return res.status(401).json({
        message: "Unauthorized login",
      });

    /* -------- Token generation for valid user ---- */
    const token = generateToken(existingUser._id);

    /* -------- Set token in cookie ---- */
    res.cookie("token", token);

    /* -------- Send sucessful login response -------- */
    return res.status(200).json({
      message: "User logged in successfully",
      User: existingUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export { registerController, loginController };
