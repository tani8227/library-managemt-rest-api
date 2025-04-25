import express from 'express';
import { borrowBook, returnBook } from '../controllers/borrowController.js';
import authMiddleware from '../middleware/authMiddleware.js'; 

const borrowRouter = express.Router();

borrowRouter.post('/', authMiddleware, borrowBook);
borrowRouter.put('/return/:id', authMiddleware, returnBook);

export default borrowRouter;
