import mongoose from "mongoose";

const { Schema } = mongoose;

const OrderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  orderStatus: {
    type: String,
    enum: ["pending", "completed", "canceled"],
    default: "pending"
  },
  paymentMethod: {
    type: String,
    enum: ["credit_card", "stripe"],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ["paid", "unpaid"],
    default: "unpaid"
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  paymentId: {
    type: String,
    required: true
  },
  instructorId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  courseImage: String,
  courseTitle: {
    type: String,
    required: true
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  coursePricing: {
    type: Number,
    required: true
  }
});


const Order = mongoose.model("Order", OrderSchema);

export default Order;