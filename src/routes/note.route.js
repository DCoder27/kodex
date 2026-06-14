import express from "express";
import noteController from "../controllers/note.controller.js";

const router = express.Router();

/**
 * @route POST /api/notes
 * @desc Create a new note
 * @access Public
 */

router.post('/notes',noteController)

export default router;
