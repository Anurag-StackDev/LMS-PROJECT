import User from "../models/user.model.js";
import { deleteCloudinary, uploadCloudinary } from "../utilities/Cloudinary.js";

export const userProfile = async (req, res) => {
  const userId = req.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { name } = req.body;
    const imageFile = req.file;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const updateFields = { name };

    if (imageFile) {
      if (user.imageUrl) {
        const publicId = user.imageUrl.split("/").pop().split(".")[0];
        await deleteCloudinary(publicId);
      }

      const response = await uploadCloudinary(imageFile);
      updateFields.imageUrl = response.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
      new: true,
    });
    res
      .status(200)
      .json({
        success: true,
        message: "Profile updated successfully",
        user: updatedUser,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Profile update failed",
        error: error.message,
      });
  }
};

export const enrolledCourses = async (req, res) => {
  const userId = req.id;
  try {
    const enrolledIn = await Course.find({ enrolledStudents: userId });
    if (!enrolledIn.length) {
      return res
        .status(404)
        .json({ success: false, message: "Not enrolled in any course" });
    }

    res
      .status(200)
      .json({ success: true, message: "Enrolled courses", enrolledIn });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to retrieve enrolled courses",
        error: error.message,
      });
  }
};
