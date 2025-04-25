import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const DB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    console.log(`DB connected successfully`);
  } catch (error) {
    console.log(` Error connecting to DB: ${error.message}`);
    process.exit(1); 
  }
};

export default DB;
