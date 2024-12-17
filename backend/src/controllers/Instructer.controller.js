import Course from "../models/course.model.js";
import { deleteCloudinary, uploadCloudinary } from "../utilities/Cloudinary.js";

export const createCourse = async (req, res) => {
  const userId = req.id;
  const courseData = req.body;
  const thumbnail = req.files.thumbnail[0];
  const lectures = req.files.lectures;

  try {
    const thumbnailResponse = await uploadCloudinary(thumbnail);
    const lecturesResponse = await Promise.all(
      lectures.map(async (lecture) => await uploadCloudinary(lecture))
    );

    const curriculum = lecturesResponse.map((upload, index) => ({
      title: courseData.lectureTitles[index],
      videoUrl: upload.secure_url,
      public_id: upload.public_id,
    }));

    await Course.create({
      ...courseData,
      instructorId: userId,
      thumbnailUrl: thumbnailResponse.secure_url,
      curriculum,
    });

    res.status(201).json({ success: true, message: "New course created" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Course creation failed",
      error: error.message,
    });
  }
};

export const updateCourse = async (req, res) => {
  const courseId = req.query.courseId;
  const courseData = req.body;
  const thumbnail = req.files.thumbnail ? req.files.thumbnail[0] : null;
  const lectures = req.files.lectures;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    let updateFields = { ...courseData };

    if (thumbnail) {
      const publicId = course.thumbnailUrl.split("/").pop().split(".")[0];
      await deleteCloudinary(publicId);
      const response = await uploadCloudinary(thumbnail);
      updateFields.thumbnailUrl = response.secure_url;
    }

    if (lectures && lectures.length > 0) {
      const lectureUploads = await Promise.all(
        lectures.map((lecture) => uploadCloudinary(lecture))
      );

      updateFields.curriculum = lectureUploads.map((upload, index) => ({
        title: courseData.lectureTitles[index],
        videoUrl: upload.secure_url,
        public_id: upload.public_id,
        freePreview: courseData.freePreview[index] === "true",
      }));
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      updateFields,
      { new: true }
    );
    res.status(200).json({ success: true, course: updatedCourse });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Course update failed",
      error: error.message,
    });
  }
};

export const deleteCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    const deleteThumbnail = course.thumbnailUrl.split("/").pop().split(".")[0];
    await deleteCloudinary(deleteThumbnail);

    await Promise.all(
      course.curriculum.map(
        async (lecture) => await deleteCloudinary(lecture.public_id)
      )
    );

    await Course.findByIdAndDelete(courseId);

    res
      .status(200)
      .json({ success: true, message: "Course deleted from database" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Course deletion failed",
      error: error.message,
    });
  }
};

export const enrolledStudents = async (req, res) => {
  const userId = req.id;

  try {
    const courses = await Course.find({ instructorId: userId });
    if (!courses.length) {
      return res
        .status(404)
        .json({
          success: false,
          message: "No courses found for this instructor",
        });
    }

    const enrolledStudentsData = courses.map((course) => ({
      courseTitle: course.title,
      numberOfStudents: course.enrolledStudents.length,
    }));

    res
      .status(200)
      .json({ success: true, enrolledStudents: enrolledStudentsData });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve enrolled students data",
      error: error.message,
    });
  }
};
