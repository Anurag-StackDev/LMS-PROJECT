import dotenv from "dotenv";

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

export const authProtected = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized Access" });

  try {
    const userId = jwt.verify(token, ACCESS_TOKEN_SECRET);
    req.id = userId;
    next();
  } catch (err) {
    res.status(403).json({ message: "Forbidden" });
  }
};
