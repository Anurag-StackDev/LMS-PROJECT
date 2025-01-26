import Course from "../models/course.model.js";

export const getAllCourse = async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor");

    if (!courses.length) {
      return res
        .status(404)
        .json({ success: false, message: "No courses found" });
    }

    const filteredCourses = courses.map((course) => {
      const { curriculum, ...courseData } = course.toObject();
      return courseData;
    });
    res.status(200).json({ success: true, courses: filteredCourses });
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

    Object.keys(req.query).forEach((key) => {
      query.$or = [
        { title: { $regex: req.query[key], $options: "i" } },
        { description: { $regex: req.query[key], $options: "i" } },
      ];
    });

    const courses = await Course.find(query).populate("instructor");

    if (!courses.length) {
      return res
        .status(404)
        .json({ success: false, message: "No courses found" });
    }

    const filteredCourses = courses.map((course) => {
      const { curriculum, ...courseData } = course.toObject();
      return courseData;
    });

    res.status(200).json({ success: true, courses: filteredCourses });
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

    const filteredCurriculum = course.curriculum.map((lecture) => {
      if (lecture.freePreview) {
        return lecture;
      } else {
        return { ...lecture.toObject(), videoUrl: null };
      }
    });

    res.status(200).json({
      success: true,
      course: { ...course.toObject(), curriculum: filteredCurriculum },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch course",
      error: error.message,
    });
  }
};
