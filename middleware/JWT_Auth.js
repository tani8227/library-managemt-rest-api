import {jwtDecode} from "jwt-decode";
import jwt from "jsonwebtoken";
import Customer from "../models/customer.js";
import dotenv from "dotenv";
dotenv.config();

const Auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
       req.user = await Customer.findById(decoded.id);

      if (!req.user) {
        return res.status(404).json({ message: "User not found" });
      }

      next();
    } catch (err) {
      console.error("JWT verification error:", err.message);
      return res.status(401).json({ message: "Token is invalid or expired" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, token missing" });
  }
};

export default Auth;
