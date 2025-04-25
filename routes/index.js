import express from 'express';
const router = express.Router();
import apirouter from './api/index.js';



router.use('/api',apirouter);


export default router;