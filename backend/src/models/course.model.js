import mongoose from "mongoose";

const { Schema } = mongoose;

const LectureSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  public_id: String,
  freePreview: {
    type: Boolean,
    default: false,
  },
});

const CourseSchema = new mongoose.Schema({
  instructorId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
    required: true,
  },
  category: String,
  level: String,
  primaryLanguage: String,
  subtitle: String,
  description: {
    type: String,
    required: true,
  },
  image: String,
  welcomeMessage: String,
  pricing: {
    type: Number,
    required: true,
  },
  objectives: String,
  curriculum: [LectureSchema],
  isPublished: {
    type: Boolean,
    default: false,
  },
});

const Course = mongoose.model("Course", CourseSchema);

export default Course;