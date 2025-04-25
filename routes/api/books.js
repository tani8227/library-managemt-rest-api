import express from 'express';
import * as bookController from '../../controllers/bookController.js';
import Auth from '../../middleware/JWT_Auth.js';

const bookRouter = express.Router();

bookRouter.post('/', Auth, bookController.createBook);
bookRouter.get('/', Auth, bookController.getAllBooks);
bookRouter.get('/:id', Auth, bookController.getBookById);
bookRouter.put('/:id', Auth, bookController.updateBook);
bookRouter.delete('/:id', Auth, bookController.deleteBook);

export default bookRouter;
