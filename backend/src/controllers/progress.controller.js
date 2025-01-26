import Course from "../models/course.model.js";
import CourseProgress from "../models/progress.model.js";

export const courseProgress = async (req, res) => {
  const { courseId } = req.body;
  const userId = req.id;

  try {
    const course = await Course.findById(courseId, {
      enrolledStudents: { $elemMatch: { _id: userId } },
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found or user not enrolled",
      });
    }

    const courseProgress = await CourseProgress.findOne({
      userId,
      courseId,
    });

    if (!courseProgress) {
      return res.status(404).json({
        success: false,
        message: "Course progress not found",
      });
    }

    const completedLectures = courseProgress.lectureProgress.filter((lecture) => lecture.viewed).length;
    const totalLectures = course.curriculum.length;
    const completionPercentage = totalLectures > 0 ? Math.round((completedLectures / totalLectures) * 100) : 0;

    res.status(200).json({
      success: true,
      Progress: completionPercentage,
    });
  } catch (error) {
    console.error("Error fetching course progress:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const updateCourseProgress = async (req, res) => {
  console.log("here")
  console.log(req.body.progressData);
  const { courseId, lectureId, viewed } = req.body;
  const userId = req.id;

  try {
    let courseProgress = await CourseProgress.findOne({
      userId,
      courseId,
    });

    if (!courseProgress) {
      courseProgress = new CourseProgress({
        userId,
        courseId,
        completed: false,
        lectureProgress: [],
      });
    }

    const lectureProgress = courseProgress.lectureProgress.find(
      (progress) => progress.lectureId === lectureId
    );

    if (lectureProgress) {
      lectureProgress.viewed = viewed;
    } else {
      courseProgress.lectureProgress.push({
        lectureId,
        viewed,
      });
    }

    const totalLectures = course.lectureProgress.length;
    const completedLectures = course.lectureProgress.filter(
      (progress) => progress.viewed
    ).length;

    courseProgress.completed = totalLectures === completedLectures;
    courseProgress.completionPercentage = calculateCompletionPercentage(
      completedLectures,
      totalLectures
    );

    if (courseProgress.completed) {
      courseProgress.completionDate = new Date();
    }

    await courseProgress.save();

    res.status(200).json({
      success: true,
      message: "Course progress updated successfully",
      courseProgress,
    });
  } catch (error) {
    console.error("Error updating course progress:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};