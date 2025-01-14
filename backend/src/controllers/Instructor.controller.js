import Course from "../models/course.model.js";
import { deleteCloudinary, uploadCloudinary } from "../utilities/Cloudinary.js";

export const createCourse = async (req, res) => {
  const userId = req.id;
  const { title, price, category, level, description, curriculum } = JSON.parse(req.body.courseData);

  const thumbnail = req.files.thumbnail ? req.files.thumbnail[0] : null;
  const lectures = req.files.video || [];

  try {
    let thumbnailResponse = null;
    if (thumbnail) {
      try {
        thumbnailResponse = await uploadCloudinary(thumbnail);
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Failed to upload thumbnail to Cloudinary",
          error: error.message,
        });
      }
    }

    let lecturesResponse = [];
    try {
      lecturesResponse = await Promise.all(
        lectures.map(async (lecture) => await uploadCloudinary(lecture))
      );
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to upload lectures to Cloudinary",
        error: error.message,
      });
    }

    const curriculumData = curriculum.map((lecture, index) => ({
      order: lecture.order,
      title: lecture.title,
      videoUrl: lecturesResponse[index].secure_url,
      public_id: lecturesResponse[index].public_id,
      freePreview: lecture.freePreview,
    }));

    const newCourse = await Course.create({
      title,
      price,
      category,
      level,
      description,
      instructor: userId,
      thumbnail: thumbnailResponse ? thumbnailResponse.secure_url : null,
      curriculum: curriculumData,
    });

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      course: newCourse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    });
  }
};

export const updateCourse = async (req, res) => {
  const { courseId } = req.params;
  const { title, description, price, category, level, curriculum } = JSON.parse(req.body.courseData);
  const thumbnail = req.files.thumbnail ? req.files.thumbnail[0] : null;
  const lectures = req.files.video || [];

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    const updateFields = {
      title,
      description,
      price,
      category,
      level,
      curriculum: [],
    };

    if (thumbnail) {
      const publicId = course.thumbnail.split("/").slice(-2).join("/").split(".")[0];

      try {
        await deleteCloudinary(publicId, "image");
        const response = await uploadCloudinary(thumbnail);
        updateFields.thumbnail = response.secure_url;
      } catch (error) {
        return res
          .status(500)
          .json({
            success: false,
            message: "Failed to update thumbnail on Cloudinary",
            error: error.message,
          });
      }
    }

    let lectureUploads = [];
      try {
        lectureUploads = await Promise.all(
          lectures.map(async (lecture) => await uploadCloudinary(lecture))
        );
      } catch (error) {
        return res
          .status(500)
          .json({
            success: false,
            message: "Failed to upload lectures to Cloudinary",
            error: error.message,
          });
      }
    
      const updatedCurriculum = curriculum.map((lecture, index) => {
        const existingLecture = course.curriculum.find(
          (stored) => stored.order === lecture.order
        );
      
        const lectureUpload = lectureUploads[index] || {};
      
        return {
          order: lecture.order,
          title: lecture.title,
          freePreview: lecture.freePreview,
          videoUrl: lectureUpload.secure_url || (existingLecture ? existingLecture.videoUrl : null),
          public_id: lectureUpload.public_id || (existingLecture ? existingLecture.public_id : null),
        };
      });
      
    // Delete removed lectures from Cloudinary
    const removedLectures = course.curriculum.filter(
      (existingLecture) =>
        !curriculum.some((lecture) => lecture.order === existingLecture.order)
    );

    try {
      await Promise.all(
        removedLectures.map(
          async (lecture) => await deleteCloudinary(lecture.public_id, "video")
        )
      );
    } catch (error) {
      return res
        .status(500)
        .json({
          success: false,
          message: "Failed to delete removed lectures from Cloudinary",
          error: error.message,
        });
    }

    updateFields.curriculum = updatedCurriculum;

    console.log(updateFields);

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $set: updateFields },
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

    const deleteThumbnail = course.thumbnail
      .split("/")
      .slice(-2)
      .join("/")
      .split(".")[0];
    try {
      await deleteCloudinary(deleteThumbnail, "image");
    } catch (error) {
      return res
        .status(500)
        .json({
          success: false,
          message: "Failed to delete thumbnail from Cloudinary",
          error: error.message,
        });
    }

    try {
      await Promise.all(
        course.curriculum.map(
          async (lecture) => await deleteCloudinary(lecture.public_id, "video")
        )
      );
    } catch (error) {
      return res
        .status(500)
        .json({
          success: false,
          message: "Failed to delete lectures from Cloudinary",
          error: error.message,
        });
    }

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

export const instructorCourses = async (req, res) => {
  const userId = req.id;

  try {
    const courses = await Course.find({ instructor: userId });
    if (!courses.length) {
      return res.status(404).json({
        success: false,
        message: "No courses found for this instructor",
      });
    }
    res.status(200).json({ success: true, courses });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve courses data",
      error: error.message,
    });
  }
};
