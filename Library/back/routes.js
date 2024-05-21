import { Router } from 'express';
import { UserController, uploadMiddleware } from './controllers/UserController.js';
import { BookController } from './controllers/BookController.js';
import { authenticateToken } from './middlewares/authenticateToken.js';

const routes = Router();
const userController = new UserController();
const bookController = new BookController();

routes.route('/user')
  .get(userController.startServer);

routes.route('/user/login')
  .post(userController.login);

routes.route('/user/logout/:id')
  .post(userController.logout);

// routes.route('/user/register')
//   .post(userController.register);
routes.post('/register', uploadMiddleware, userController.register.bind(userController));

routes.route('/user/update/:id')
  .put(authenticateToken, userController.updateUser);

routes.route('/user/delete/:id')
  .delete(authenticateToken, userController.deleteUser);

routes.route('/user/:id')
  .get(authenticateToken, userController.getUserById);

routes.route('/books')
  .get(authenticateToken, bookController.getAllBooks);

routes.route('/books/create')
  .post(authenticateToken, bookController.createBook);

routes.route('/books/:id')
  .get(authenticateToken, bookController.getBookById);

routes.route('/:userId/books/:bookId')
  .put(authenticateToken, bookController.updateBook)
  .delete(authenticateToken, bookController.deleteBook);

export default routes;
