import express from "express";
import { loginController, registerController } from "../controllers/auth.controller.js";

const router = express.Router();

/* -------- Routes for Registration --------- */
router.post('/register',registerController)

/* -------- Routes for Login --------- */
router.post('/login',loginController)

export default router;
