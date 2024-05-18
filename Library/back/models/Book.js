import mongoose from "mongoose";
import Categoria from '../enums/Categoria.js';
import Status from '../enums/Status.js';

const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String },
    publicationYear: { type: Number },
    category: { type: String, enum: Object.values(Categoria.CATEGORIES), required: true },
    description: { type: String },
    imageURL: { type: String },
    status: { type: String, enum: Object.values(Status.STATUS), required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

export { Book }; 
