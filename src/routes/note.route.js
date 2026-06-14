import express from "express";
import {
  createNoteController,
  getNoteByIDController,
  getNotesController,
  updateDescriptionController,
} from "../controllers/note.controller.js";

const router = express.Router();

/**
 * @route POST /api/notes
 * @desc Create a new note
 * @access Public
 */
router.post("/notes", createNoteController);

/**
 * @route GET /api/notes
 * @desc Get all notes
 * @access Public
 */
router.get("/notes", getNotesController);

/**
 * @route GET /api/notes/:id
 * @desc Get a note by ID
 * @access Public
 */
router.get("/notes/:id", getNoteByIDController);

/**
 * @route PATCH /api/notes/:id
 * @desc Update a note's description by ID
 * @access Public
 */
router.patch("/notes/:id", updateDescriptionController);

export default router;
