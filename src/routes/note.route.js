import express from "express";
import {
  createNoteController,
  deleteNoteController,
  getNoteByIDController,
  getNotesController,
  updateDescriptionController,
} from "../controllers/note.controller.js";
import noteMiddleware from "../middlewares/note.middleware.js";

const router = express.Router();

/**
 * @route POST /api/notes
 * @desc Create a new note
 * @access Public
 */
router.post("/notes", noteMiddleware, createNoteController);

/**
 * @route GET /api/notes
 * @desc Get all notes
 * @access Public
 */
router.get("/notes", noteMiddleware, getNotesController);

/**
 * @route GET /api/notes/:id
 * @desc Get a note by ID
 * @access Public
 */
router.get("/notes/:id", noteMiddleware, getNoteByIDController);

/**
 * @route PATCH /api/notes/:id
 * @desc Update a note's description by ID
 * @access Public
 */
router.patch("/notes/:id", noteMiddleware, updateDescriptionController);

/**
 * @route DELETE api/notes/:id
 * @description Delete note by ID
 * @access Public
 */
router.delete("/notes/:id", noteMiddleware, deleteNoteController);

export default router;
