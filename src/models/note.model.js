import mongoose from "mongoose";

// Note Schema
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
  },
  {
    timestamps: true,
  },
);

// Create Note model
const NoteModel = mongoose.model("Notes", noteSchema);
export default NoteModel;
