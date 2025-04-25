import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
mongoose.connect(process.env.MONGO_URI);
const db= mongoose.connection;

db.on('open', ()=>
  {
    
    console.log(`DB connected successfully`);
  })

  db.on('error', ()=>
    {
      console.log(` Error connecting to DB: ${error.message}`);

    })
 

export default db;
