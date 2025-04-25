import express from 'express';
import * as bookController from '../../../controllers/bookController.js';
import Auth from '../../../middleware/JWT_Auth.js';

const bookRouter = express.Router();

bookRouter.post('/', Auth, bookController.createbook);
bookRouter.get('/', Auth, bookController.getAllbooks);
bookRouter.get('/:id', Auth, bookController.getBookById);
bookRouter.put('/:id', Auth, bookController.updatebook);
bookRouter.delete('/:id', Auth, bookController.deletebook);

export default bookRouter;
