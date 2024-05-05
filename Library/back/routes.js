import { Router } from 'express';
import { UserController } from './controllers/UserController.js';
import { BookController } from './controllers/BookController.js ';
import { authenticateToken } from './middlewares/authenticateToken.js'

const routes = Router();
const userController = new UserController();
const bookController = new BookController();

routes.route('/user')
.get(userController.startServer)

routes.route('/user/login')
  .post(userController.login);

routes.route('/user/register')
  .post(userController.register)

routes.route('/user/:id')
  .get(authenticateToken, userController.getUserById)
  .post(authenticateToken, userController.logout)
  .put(authenticateToken, userController.updateUser)
  .delete(authenticateToken, userController.deleteUser);

routes.route('/books')
  .get(authenticateToken, bookController.getAllBooks)
  .post(authenticateToken, bookController.createBook);

routes.route('/books/:id')
  .get(authenticateToken, bookController.getBookById);

routes.route('/:userId/books/:bookId')
  .put(authenticateToken, bookController.updateBook)
  .delete(authenticateToken, bookController.deleteBook);

export default routes;
