import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utilities/JWTToken.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please enter all the fields" });
    }

    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const accessToken = generateAccessToken(newUser._id);
    generateRefreshToken(newUser._id, res);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      accessToken,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(400)
        .json({ status: "failed", message: "user doesn't exist" });
    }
    const accessToken = generateAccessToken(user._id);
    return res.status(200).json({ success: true, accessToken });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("LMS", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    if (req.session) {
      req.session.accessToken = null;
    }
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
  const refreshToken = req.cookies.LMS;
  if (!refreshToken) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Refresh token not found" });
  }

  const existingToken = req.session?.accessToken;
  if (existingToken) {
    try {
      jwt.verify(existingToken, process.env.ACCESS_TOKEN_SECRET);
      return res.json({ accessToken: existingToken });
    } catch (error) {
      console.error("Error verifying access token:", error);
    }
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Forbidden: Invalid refresh token" });
    }

    try {
      const accessToken = generateAccessToken(user.userId);
      req.session.accessToken = accessToken;
      res.json({ accessToken });
    } catch (error) {
      console.error("Error generating access token:", error);
      res.status(500).json({
        message: "Internal Server Error: Failed to generate access token",
      });
    }
  });
};
