import mongoose from "mongoose";
import Categoria from '../enums/Categoria.js';
import Status from '../enums/Status.js';

const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String },
    publicationYear: { type: Number },
    category: { type: String },
    isGoogle: { type: Boolean, required: false },
    description: { type: String },
    imageURL: { type: String },
    status: { type: String, enum: Object.values(Status.STATUS), required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

bookSchema.pre('validate', function(next) {
  if (!this.isGoogle) {
    const isValidCategoria = Categoria.isValid(this.category);
    if (!isValidCategoria) {
      this.invalidate('category', 'Categoria inválida');
    }
  }
  next();
});

const Book = mongoose.model("Book", bookSchema);

export { Book }; 
