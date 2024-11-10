import { validationResult } from "express-validator";
import User from "../models/User.js"; // Use importação padrão
import Book from "../models/Book.js";
import Categoria from "../enums/Categoria.js";
import Status from "../enums/Status.js";

export class BookController {
  async handleErrors(res, message) {
    console.error(message);
    return res.status(500).send("Server Error");
  }

  async createBook(req, res) {
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
        isGoogle,
        isFavorite,
        rating,
        userId,
        comments,
      } = req.body;

      console.log('userId recebido:', userId, req.body);

      if (!isGoogle) {
        if (!Categoria.isValid(category)) {
          return res.status(400).json({ error: "Categoria Inválida" });
        }

        if (!Status.isValid(status)) {
          return res.status(400).json({ error: "Status Inválido" });
        }
      }

      if (!userId) {
        return res.status(400).json({ error: "userId é obrigatório" });
      }

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ msg: "Usuário não encontrado" });
      }

      // Inicia uma transação com o Sequelize
      const transaction = await Book.sequelize.transaction();

      try {
        // Cria o livro associado ao usuário
        const book = await Book.create(
          {
            title,
            author,
            publicationYear,
            category,
            description,
            imageURL,
            status,
            isGoogle,
            isFavorite,
            rating,
            comments,
            user_id: userId,
          },
          { transaction }
        );
        console.log('book criado', book)

        // Confirma a transação
        await transaction.commit();
        res.status(201).json(book);
      } catch (error) {
        // Reverte a transação em caso de erro
        await transaction.rollback();
        console.error("Erro ao criar o livro:", error);
        return res.status(500).json({
          error: "Falha ao criar o livro. Por favor, tente novamente mais tarde.",
        });
      }
    } catch (err) {
      console.error("Erro ao processar a requisição:", err);
      return res
        .status(500)
        .json({ error: "Ocorreu um erro ao processar a requisição." });
    }
  }

  async getAllBooks(req, res) {
    try {
      const userId = req.query.userId;
  
      if (!userId) {
        return res.status(400).json({ msg: "User ID is required" });
      }
  
      // Verifica se o usuário existe no banco de dados
      const user = await User.findByPk(userId); // Use findByPk no lugar de findById, já que estamos no Sequelize
  
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
  
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 15;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
  
      // Busca os livros associados ao usuário com a paginação
      const books = await Book.findAll({
        where: { user_id: userId },
        limit: limit,
        offset: startIndex,
        order: [['createdAt', 'DESC']], // Opcional: ordena os livros pela data de criação (pode ajustar conforme necessário)
      });
  
      // Conta o número total de livros do usuário
      const totalBooks = await Book.count({ where: { user_id: userId } });
  
      const pagination = {
        currentPage: page,
        totalPages: Math.ceil(totalBooks / limit),
        totalBooks,
      };
  
      res.status(200).json({ pagination, books });
    } catch (err) {
      return handleErrors(res, err);
    }
  }
  async getAllCategories(req, res) {
    try {
      const categories = Object.values(Categoria.CATEGORIES); // Obtém todas as categorias de Categoria.CATEGORIES
  
      if (!categories.length) {
        return res.status(404).json({ msg: 'No categories found' });
      }
  
      res.status(200).json({ categories });
    } catch (err) {
      return handleErrors(res, err);
    }
  }

  async getAllStatus(req, res) {
    try {
      const status = Object.values(Status.STATUS); // Obtém todos os status de Status.STATUS
  
      if (!status.length) {
        return res.status(404).json({ msg: 'No status found' });
      }
  
      res.status(200).json({ status });
    } catch (err) {
      return handleErrors(res, err);
    }
  }
  
  async getBookById(req, res) {
    try {
      // Usa 'findByPk' em vez de 'findById', já que o Sequelize não possui o 'findById'.
      const book = await Book.findByPk(req.params.id);
  
      if (!book) {
        return res.status(404).json({ msg: "Book not found" });
      }
  
      res.status(200).json(book);
    } catch (err) {
      return handleErrors(res, err);
    }
  }

  // nao ta funcionando
  async updateBook(req, res) {
    try {
      // Verifica erros de validação
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
        isFavorite,
        rating,
        comments
      } = req.body;
  
      // Busca o livro pelo ID
      const book = await Book.findByPk(req.params.bookId);
  
      if (!book) {
        return res.status(404).json({ msg: "Book not found" });
      }
  
      // Verifica se o usuário é o dono do livro
      if (book.userId !== req.params.userId) {
        return res.status(401).json({ msg: "Unauthorized" });
      }
  
      // Atualiza o livro
      await book.update({
        title,
        author,
        publicationYear,
        category,
        description,
        imageURL,
        status,
        isFavorite,
        rating,
        comments
      });
  
      // Retorna o livro atualizado
      res.status(200).json(book);
    } catch (err) {
      return handleErrors(res, err);
    }
  }
  
  async deleteBook(req, res) {
    try {
      // Busca o livro pelo ID
      const book = await Book.findByPk(req.params.bookId);
  
      if (!book) {
        return res.status(404).json({ msg: "Book not found" });
      }
  
      // Verifica se o usuário é o dono do livro
      if (book.userId !== req.params.userId) {
        return res.status(401).json({ msg: "Unauthorized" });
      }
  
      // Deleta o livro
      await book.destroy();
  
      // Retorna a resposta de sucesso
      res.status(200).json({ msg: "Book deleted" });
    } catch (err) {
      return handleErrors(res, err);
    }
  }  

  async createMultipleBooks(req, res) {
    try {
      // Verifica erros de validação
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { books, isGoogle, userId } = req.body;
  
      // Verifica se os livros foram passados corretamente
      if (!Array.isArray(books) || books.length === 0) {
        return res
          .status(400)
          .json({ error: "Books must be a non-empty array." });
      }
  
      // Verifica se o usuário existe
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ msg: "Usuário não encontrado" });
      }
  
      // Criação do array de livros a serem inseridos
      const booksToInsert = [];
  
      for (const bookData of books) {
        const {
          title,
          author,
          publicationYear,
          category,
          description,
          imageURL,
          status,
          isFavorite,
          rating,
          comments
        } = bookData;
  
        // Validação das categorias e status
        if (!isGoogle) {
          if (!Categoria.isValid(category)) {
            return res.status(400).json({ error: "Categoria Inválida" });
          }
  
          if (!Status.isValid(status)) {
            return res.status(400).json({ error: "Status Inválido" });
          }
        }
  
        // Adiciona os dados de cada livro ao array de livros a serem inseridos
        booksToInsert.push({
          title,
          author,
          publicationYear,
          category,
          description,
          imageURL,
          status,
          isGoogle,
          isFavorite,
          rating,
          comments,
          user: userId,
        });
      }
  
      // Utiliza o método insertMany para inserir todos os livros de uma vez
      const createdBooks = await Book.insertMany(booksToInsert);
  
      // Atualiza o usuário com os livros criados (se necessário)
      user.books.push(...createdBooks.map(book => book._id));
      await user.save();
  
      // Retorna a resposta com os livros criados
      res.status(201).json(createdBooks);
    } catch (err) {
      console.error("Erro ao processar a requisição:", err);
      return res.status(500).json({
        error: "Ocorreu um erro ao processar a requisição.",
      });
    }
  }
  
}
