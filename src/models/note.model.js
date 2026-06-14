import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      required:true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);
const NoteModel = mongoose.model("Notes", noteSchema);
export default NoteModel;
