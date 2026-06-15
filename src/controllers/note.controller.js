import NoteModel from "../models/note.model.js";

const createNoteController = async (req, res) => {
  try {
    // Getting title and description from body
    const { title, description } = req.body;

    /* -------- Validation for title and description ---- */
    if (!title || !description) {
      return res.status(400).json({
        message: "Title and Description are required",
      });
    }

    // Validation for title and description length
    if (title.trim().length < 3 || description.trim().length < 10) {
      return res.status(400).json({
        message:
          "Title must be at least 3 characters and Description must be at least 10 characters long",
      });
    }

    // Create a new note with the authenticated user's ID
    const newNote = await NoteModel.create({
      title,
      description,
      userId: req.user.userID,
    });

    // Return the created note in the response
    return res.status(201).json({
      message: "Note created successfully",
      note: newNote,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getNotesController = async (req, res) => {
  try {
    // Get all notes for the authenticated user
    const notes = await NoteModel.find({ userId: req.user.userID });

    // Return the notes in the response
    return res.status(200).json({
      message: "Notes retrieved successfully",
      Notes: notes,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getNoteByIDController = async (req, res) => {
  try {
    // Getting id from params
    const { id } = req.params;

    // Find the note by ID and user ID
    const note = await NoteModel.findOne({ _id: id, userId: req.user.userID });

    // If note not found return 404
    if (!note)
      return res.status(404).json({
        message: "Note not found",
      });

    // Return the note in the response
    return res.status(200).json({
      message: "Note retrieved successfully",
      Note: note,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const updateDescriptionController = async (req, res) => {
  try {
    // Getting id from params and description from body
    const { id } = req.params;
    const { description } = req.body;

    /* -------- Validation for description ---- */
    if (!description) {
      return res.status(400).json({
        message: "Description is required",
      });
    }
    if (description.trim().length < 10)
      return res.status(400).json({
        message: "Description must be at least 10 characters long",
      });

    /* -------- Find the note by ID ---- */
    const note = await NoteModel.findOne({ _id: id, userId: req.user.userID });

    /* -------- If note not found ---- */
    if (!note)
      return res.status(404).json({
        message: "Note not found",
      });

    /* -------- Update the description ---- */
    note.description = description;
    await note.save();

    /* -------- Return the updated note ---- */
    return res.status(200).json({
      message: "Description updated successfully",
      Note: note,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const deleteNoteController = async (req, res) => {
  try {
    // Getting id from params
    const { id } = req.params;

    /* -------- Find the note by ID ---- */
    const note = await NoteModel.findOne({ _id: id, userId: req.user.userID });

    /* -------- If note not found ---- */
    if (!note)
      return res.status(404).json({
        message: "Note not found",
      });

    /* -------- Delete the note ---- */
    await NoteModel.findByIdAndDelete(id);

    /* -------- Return the deleted note ---- */
    return res.status(200).json({
      message: "Note deleted sucessfully",
      Note: note,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export {
  createNoteController,
  getNotesController,
  getNoteByIDController,
  updateDescriptionController,
  deleteNoteController,
};
