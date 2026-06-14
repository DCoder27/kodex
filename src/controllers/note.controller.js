import NoteModel from "../models/note.model.js";

const noteController = async (req, res) => {
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
export default noteController;
