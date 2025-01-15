import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

export const authProtected = (req, res, next) => {
  const token = req.cookies["Access"];
  
  if (!token) return res.status(401).json({ message: "Unauthorized Access" });

  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    req.id = decoded.userId; 
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized Access" });
  }
};
