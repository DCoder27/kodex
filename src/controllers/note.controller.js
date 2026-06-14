import NoteModel from "../models/note.model.js";

const createNoteController = async (req, res) => {
  try {
    const { title, description } = req.body;

    /* -------- Validation for title and description ---- */
    if (!title || !description) {
      return res.status(400).json({
        message: "Title and Description are required",
      });
    }

    if (title.trim().length < 3 || description.trim().length < 10) {
      return res.status(400).json({
        message:
          "Title must be at least 3 characters and Description must be at least 10 characters long",
      });
    }

    const newNote = await NoteModel.create({ title, description });

    return res.status(201).json({
      message: "Note created successfully",
      note: newNote,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getNotesController = async (req, res) => {
  try {
    const notes = await NoteModel.find();
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
    const { id } = req.params;
    const note = await NoteModel.findById(id);
    if (!note)
      return res.status(404).json({
        message: "Note not found",
      });
    return res.status(200).json({
      message: "Note retrieved successfully",
      Note: note,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const updateDescriptionController = async (req, res) => {
  try {
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
    const note = await NoteModel.findById(id);
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

export {
  createNoteController,
  getNotesController,
  getNoteByIDController,
  updateDescriptionController,
};
