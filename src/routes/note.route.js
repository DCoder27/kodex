import express from "express";
import { createNoteController, getNotesController } from "../controllers/note.controller.js";

const router = express.Router();

/**
 * @route POST /api/notes
 * @desc Create a new note
 * @access Public
 */

router.post('/notes', createNoteController);

router.get('/notes', getNotesController)

export default router;
