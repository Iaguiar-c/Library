import mongoose from "mongoose";
const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String },
    publicationYear: { type: Number },
    category: { type: String },
    description: { type: String },
    imageURL: { type: String },
    status: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

export { Book }; 
