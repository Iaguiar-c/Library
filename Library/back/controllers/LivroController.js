const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Book = require("../models/bookModel");

const { validationResult } = require("express-validator");

require("dotenv").config();

//BEGIN: CRUD livro
// Função para criar um novo livro
router.post("/upload-book", async (request, response) => {
    try {
      // Certifique-se de que o ID do usuário está disponível na solicitação
      const userId = request.body.userId; // Supondo que você envie o ID do usuário no corpo da solicitação
      console.log(userId)
      // Verifique se o userId é válido, dependendo da lógica do seu aplicativo
  
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
      }
  
      // Criar um novo livro
      const newBook = {
        title: request.body.title,
        author: request.body.author,
        publishYear: request.body.publishYear,
        category: request.body.category,
        bookDescription: request.body.bookDescription,
        imageURL: request.body.imageURL,
        status: request.body.status,
        user: userId,
      };
  
      const book = await Book.create(newBook);
  
      // Adicione o ID do livro ao array de livros do usuário
      await User.findByIdAndUpdate(
        userId,
        { $push: { books: book._id } },
        { new: true }
      );
  
      return response.status(201).json(book);
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: "Internal server error", error: error.message });
    }
  });


module.exports = router;
