import express from 'express';
const inventoryRouter = express.Router();
import * as libraryController from '../controllers/libraryController.js';
import Auth from '../middleware/JWT_Auth.js';

inventoryRouter.get('/:id/inventory', Auth, libraryController.getLibraryInventory);
inventoryRouter.post('/:id/inventory', Auth, libraryController.addBookToInventory);
inventoryRouter.delete('/:id/inventory/:bookId', Auth, libraryController.removeBookFromInventory);

export default inventoryRouter;
