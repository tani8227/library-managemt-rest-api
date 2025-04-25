import express from 'express';
const  userRouter= express.Router();
import * as userController from '../../controllers/customerController.js'

userRouter.post('/register', userController.signUp);
userRouter.post('/login', userController.signIn);



export default userRouter;