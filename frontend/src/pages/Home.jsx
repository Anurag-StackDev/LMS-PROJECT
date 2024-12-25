import Banner from "../components/Banner";
import Card from "../components/Card";
import Testimonials from "../components/Testimonials";

const Home = () => {
  return (
    <>
      <Banner />
      <div className="w-full mx-auto px-4">
        <div className="pb-8">
          <h1 className="font-serif text-3xl font-extrabold">
            All the skills you need in one place
          </h1>
          <p className="font-semibold text-gray-700">
            From critical skills to technical topics, Udemy supports your
            professional development.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="flex-grow-0 flex-shrink-0 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 p-2"
            >
              <Card />
            </div>
          ))}
        </div>
        <div className="inline-block px-4 py-10">
          <a
            href="/courses"
            className="font-bold py-3 px-8 hover:bg-indigo-500 hover:text-white rounded-md transition-all duration-300 border-2 border-black"
          >
            Explore all Courses
          </a>
        </div>
      </div>
      <Testimonials/>
    </>
  );
};

export default Home;
