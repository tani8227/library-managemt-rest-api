import express from 'express';
import dotenv from "dotenv";
import db from './config/db.js';
import routes from './routes/index.js';

dotenv.config();


const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

app.listen(port, (err) => {
    if (err) {
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server is running at port : ${port}`);
});
