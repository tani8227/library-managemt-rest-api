import express from 'express';
const  v1Router= express.Router();
import userRouter from './user.js';
import bookRouter from './books.js';


v1Router.use('/users',userRouter);
v1Router.use('/books',bookRouter);


export default v1Router;