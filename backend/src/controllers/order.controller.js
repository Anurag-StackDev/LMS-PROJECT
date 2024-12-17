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

    const instructor = await User.findById(course.instructorId);
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
      success_url: `http://localhost:5173/course-progress/${courseId}`,
      cancel_url: `http://localhost:5173/course-detail/${courseId}`,
      metadata: {
        courseId,
        userId,
      },
    });

    if (!session.url) {
      return res
        .status(400)
        .json({ success: false, message: "Error while creating session" });
    }

    newOrder.paymentId = session.id;
    await newOrder.save();

    res.status(200).json({ success: true, url: session.url });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      await handleCheckoutSessionCompleted(session);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};

const handleCheckoutSessionCompleted = async (session) => {
  const { userId, courseId } = session.metadata;

  const order = await Order.findOne({ paymentId: session.id });

  if (!order) {
    console.error(`Order not found for session ID: ${session.id}`);
    return;
  }

  order.status = "completed";
  await order.save();

  await Course.findByIdAndUpdate(courseId, {
    $addToSet: { enrolledStudents: userId },
  });

  console.log(
    `Order ${order._id} is completed and student enrolled in course ${courseId}.`
  );
};
