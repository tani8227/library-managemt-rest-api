import express from 'express';
import { borrowBook, returnBook } from '../controllers/borrowController.js';
import Auth from '../middleware/authMiddleware.js'; 

const borrowRouter = express.Router();

borrowRouter.post('/', Auth, borrowBook);
borrowRouter.put('/return/:id', Auth, returnBook);

export default borrowRouter;
