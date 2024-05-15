const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authenticateToken = require("../middlewares/authUsuario");
const Book = require("../models/bookModel");
const { validationResult } = require("express-validator");
require("dotenv").config();

const handleErrors = (res, message) => {
  console.error(message);
  return res.status(500).send("Server Error");
};

const createBook = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      author,
      publicationYear,
      category,
      description,
      imageURL,
      status,
      userId,
    } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado" });
    }

    const book = new Book({
      title,
      author,
      publicationYear,
      category,
      description,
      imageURL,
      status,
      user: userId,
    });

    const session = await Book.startSession();
    session.startTransaction();

    try {
      await book.save({ session });
      user.books.push(book);
      await user.save({ session });
      await session.commitTransaction();

      res.status(201).json(book);
    } catch (error) {
      await session.abortTransaction();
      console.error("Erro ao criar o livro:", error);
      return res
        .status(500)
        .json({
          error:
            "Falha ao criar o livro. Por favor, tente novamente mais tarde.",
        });
    } finally {
      session.endSession();
    }
  } catch (err) {
    console.error("Erro ao processar a requisição:", err);
    return res
      .status(500)
      .json({ error: "Ocorreu um erro ao processar a requisição." });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).json({ msg: "User ID is required" });
    }

    const user = await User.findById(userId).populate("books");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 40;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const totalBooks = user.books.length;
    const books = user.books.slice(startIndex, endIndex);

    const pagination = {
      currentPage: page,
      totalPages: Math.ceil(totalBooks / limit),
      totalBooks,
    };

    res.status(200).json({ pagination, books });
  } catch (err) {
    return handleErrors(res, err);
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }

    res.status(200).json(book);
  } catch (err) {
    return handleErrors(res, err);
  }
};

const updateBook = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      author,
      publicationYear,
      category,
      description,
      imageURL,
      status,
    } = req.body;

    const book = await Book.findById(req.params.bookId);

    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }

    if (book.user.toString() !== req.params.userId) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.bookId,
      {
        title,
        author,
        publicationYear,
        category,
        description,
        imageURL,
        status,
      },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ msg: "Book not found" });
    }

    res.status(200).json(updatedBook);
  } catch (err) {
    return handleErrors(res, err);
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);

    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }

    if (book.user.toString() !== req.params.userId) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    await Book.findByIdAndDelete(req.params.bookId);

    res.status(200).json({ msg: "Book deleted" });
  } catch (err) {
    return handleErrors(res, err);
  }
};

router.post("/books/create", authenticateToken, createBook);
router.get("/books/", authenticateToken, getAllBooks);
router.get("/books/:id", authenticateToken, getBookById);
router.put("/:userId/books/:bookId", authenticateToken, updateBook);
router.delete("/:userId/books/:bookId", authenticateToken, deleteBook);

module.exports = router;