import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    bookDescription: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Não lido", "Lido", "Lendo"],
      default: "Não lido",
    },
  },

  {
    timestamps: true,
  }
);

export const Book = mongoose.model("Book", bookSchema);
