import express from 'express';
const libraryRouter = express.Router();
import * as libraryController from '../controllers/libraryController.js';
import Auth from '../middleware/JWT_Auth.js';

libraryRouter.post('/', Auth, libraryController.createLibrary);
libraryRouter.get('/', Auth, libraryController.getAllLibraries);
libraryRouter.get('/:id', Auth, libraryController.getLibraryById);
libraryRouter.put('/:id', Auth, libraryController.updateLibrary);
libraryRouter.delete('/:id', Auth, libraryController.deleteLibrary);

export default libraryRouter;
