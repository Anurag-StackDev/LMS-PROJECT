import mongoose from "mongoose";

const { Schema } = mongoose;

const lectureProgressSchema = new Schema({
  lectureId: { type: String },
  viewed: { type: Boolean },
});

const courseProgressSchema = new Schema({
  userId: { type: String },
  courseId: { type: String },
  completed: { type: Boolean },
  lectureProgress: [lectureProgressSchema],
  completionDate: { type: Date },
  
});

const CourseProgress = mongoose.model("CourseProgress", courseProgressSchema);
 
export default CourseProgress