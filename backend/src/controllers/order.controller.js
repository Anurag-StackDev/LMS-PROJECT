import Stripe from "stripe";
import Course from "../models/course.model.js";
import Order from "../models/order.model.js";
import User from "../models/user.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET);

export const createStripeSession = async (req, res) => {
  try {
    const userId = req.id;
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const instructor = await User.findById(course.instructor._id);
    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }

    const newOrder = new Order({
      userId,
      courseId,
      amount: course.price,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: course.title,
              description: `Instructor: ${instructor.name}`,
            },
            unit_amount: course.price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/failure`,
      metadata: {
        courseId,
        userId,
      },
    });

    if (!session.id) {
      return res
        .status(400)
        .json({ success: false, message: "Error while creating session" });
    }

    newOrder.paymentId = session.id;
    await newOrder.save();

    res.status(200).json({ success: true, sessionId: session.id });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const handlePaymentSuccess = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const order = await Order.findOne({ paymentId: sessionId });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = "completed";
    await order.save();

    await Course.findByIdAndUpdate(order.courseId, {
      $addToSet: { enrolledStudents: order.userId },
    });

    res.status(200).json(order);
  } catch (error) {
    console.error("Error handling payment success:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
