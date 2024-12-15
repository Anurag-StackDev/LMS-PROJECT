import User from "user.model.js";
import Course from "course.model.js";

export const getUserProfile = async (req, res) => {
  const { userId } = req.id;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Profile not found" });
    const enrolledIn = await Course.find({ enrolledStudents: userId });
    if (enrolledIn.length === 0)
      return res.status(404).json({ message: "No courses found" });
    res.status(200).json({ user, enrolledIn });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updatePofile = async (req, res) => {
  try {
    const userId = req.id;
    const { name } = req.body;
    const imageFile = req.file;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    if (user.imageUrl) {
      const publicId = user.imageUrl.split("/").pop().split(".")[0];
      deleteCloudinary(publicId);

      const response = await uploadCloudinary(imageFile);
      const imageUrl = response.secure_url;

      const userData = { name, imageUrl };
      await findByIdAndupdate(userId, userData, { new: true });

      res.status(200).json({
        success: true,
        message: "Profile Updated Successfully",
      });
    }
  } catch (error) {}
};
