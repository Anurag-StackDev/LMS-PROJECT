import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      quote:
        "E-Learning was truly a game-changer and a great guide for me as we brought Dimensional to life.",
      name: "John Doe",
      company: "Some Company",
      linkText: "View courses",
    },
    {
      id: 2,
      quote:
        "E-Learning gives you the ability to be persistent. I learned exactly what I needed to know in the real world. It helped me sell myself to get a new role.",
      name: "Jane Smith",
      company: "Another Company",
      linkText: "View more",
    },
    {
      id: 3,
      quote:
        "With E-Learning Business employees were able to marry the two together, technology and consultant soft skills... to help drive their careers forward.",
      name: "Michael Johnson",
      company: "Company ABC",
      linkText: "Read more",
    },
    {
      id: 4,
      quote:
        "E-Learning was rated the most popular online course or certification program for learning how to code according to StackOverflow’s 2024 Developer survey.",
      name: "Emily Davis",
      company: "XYZ Corp",
      linkText: "Learn more",
    },
  ];

  return (
    <div className="bg-gray-100 px-4 font-serif pb-10">
      <h2 className="text-3xl font-extrabold text-gray-800 py-8">
        See what others are achieving through learning
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white p-4 rounded-lg shadow-md h-64"
          >
            <FaQuoteLeft className="text-black mb-2" />
            <div className="h-24">
              <p className="text-sm mb-4">{testimonial.quote}</p>
            </div>
            <FaQuoteRight className="text-black mb-6" />
            <div className="flex gap-2 items-center mb-2">
              <BsPersonCircle size={38} />
              <div>
                <p className="text-gray-600 text-xs">{testimonial.name}</p>
                <p className="text-gray-600 text-xs">{testimonial.company}</p>
              </div>
            </div>
            <a href="#" className="text-purple-600 hover:underline text-xs">
              {testimonial.linkText} &gt;
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
