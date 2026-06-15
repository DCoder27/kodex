import express from "express";
import { registerController } from "../controllers/auth.controller.js";

const router = express.Router();

/* -------- Routes for Registration --------- */
router.post('/register',registerController)

export default router;
