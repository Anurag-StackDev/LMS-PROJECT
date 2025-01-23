import Course from "../models/course.model.js";

export const getAllCourse = async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor");

    if (!courses.length) {
      return res
        .status(404)
        .json({ success: false, message: "No courses found" });
    }

    res.status(200).json({ success: true, courses });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
      error: error.message,
    });
  }
};

export const searchCourse = async (req, res) => {
  try {
    const query = {};

    Object.keys(req.query).forEach(key => {
      query.$or = [
        { title: { $regex: req.query[key], $options: 'i' } },
        { description: { $regex: req.query[key], $options: 'i' } }
      ];
    });

    const courses = await Course.find(query);

    if (!courses.length) {
      return res
        .status(404)
        .json({ success: false, message: "No courses found" });
    }

    res.status(200).json({ success: true, courses });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Search failed",
      error: error.message,
    });
  }
};


export const singleCourse = async (req, res) => {
  const { courseId } = req.params;
  try {
    const course = await Course.findById(courseId).populate("instructor");

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    res.status(200).json({ success: true, course });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch course",
      error: error.message,
    });
  }
};
