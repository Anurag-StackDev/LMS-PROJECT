import mongoose from "mongoose";

const { Schema } = mongoose;

const LectureSchema = new Schema({
  order: { type: Number },
  title: {
    type: String,
    required: true,
  },
  videoUrl: { type: String },
  public_id: { type: String },
  freePreview: {
    type: Boolean,
    default: false,
  },
});

const CourseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      require: true,
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advance", "Expert"],
    },
    description: {
      type: String,
      required: true,
    },
    instructor: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    enrolledStudents: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    curriculum: [LectureSchema],
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", CourseSchema);

export default Course;
