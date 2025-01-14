import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utilities/jwtToken.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please enter all the fields" });
    }
    const formattedName = name
      .trim()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
    const formattedEmail = email.trim().toLowerCase();

    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name: formattedName,
      email: formattedEmail,
      password: hashedPassword,
    });

    generateAccessToken(user._id, res);
    generateRefreshToken(user._id, res);

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.status(201).json({
      user: userWithoutPassword,
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all the fields" });
    }
    const formattedEmail = email.trim().toLowerCase();

    const user = await User.findOne({ email: formattedEmail }).select(
      "+password"
    );
    if (!user) {
      return res
        .status(400)
        .json({ status: "failed", message: "user doesn't exist" });
    }

    if (!password || !user.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid password" });
    }

    generateAccessToken(user._id, res);
    generateRefreshToken(user._id, res);

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return res.status(200).json({
      success: true,
      user: userWithoutPassword,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login error:", error);
    console.error("Error details:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("Access", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.clearCookie("LMS", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Logout failed",
      error: error.message,
    });
  }
};

export const handleRefreshToken = (req, res) => {
  const refreshToken = req.cookies["LMS"];

  if (!refreshToken) {
    return res.status(401).json({ message: "Session expired" });
  }

  const existingToken = req.cookies["Access"];
  if (existingToken) {
    try {
      jwt.verify(existingToken, process.env.ACCESS_TOKEN_SECRET);
      return res.json({
        accessToken: existingToken,
        message: "Authorized Access",
      });
    } catch (error) {
      console.error("Error Invalid Access Token:", error);
    }
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Forbidden: Invalid refresh token" });
    }

    try {
      const userId = decoded.userId;
      generateAccessToken(userId, res);
      const newAccessToken = req.cookies["Access"];
      res.status(200).json({ 
        accessToken: newAccessToken, 
        message: "Token refreshed successfully" 
      });
    } catch (error) {
      console.error("Error generating access token:", error);
      res.status(500).json({
        message: "Internal Server Error: Failed to generate access token",
      });
    }
  });
};
