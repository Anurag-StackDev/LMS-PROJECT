import CourseCard from "../components/CourseCard";
import FilterSidebar from "../components/FilterSidebar";

const Courses = () => {
  const courseData = [
    {
      title: "Edward's AWS Certified Security Specialty Course (SCS-C02)",
      description: "AWS Security Certification Course from someone with years of AWS experience. Covers CloudTrail, GuardDuty, ControlTower! This is a truncated description for large screens.",
      shortDescription: "AWS Security Certification Course from someone with years of AWS experience.",
      instructorName: "Edward Viaene",
      instructorImage: "instructor-image.png",
      level: "Expert",
      price: 549,
      originalPrice: 1499,
      imageUrl: "aws-certified-logo.png"
    },
    {
      title: "Edward's AWS Certified Security Specialty Course (SCS-C02)",
      description: "AWS Security Certification Course from someone with years of AWS experience. Covers CloudTrail, GuardDuty, ControlTower! This is a truncated description for large screens.",
      shortDescription: "AWS Security Certification Course from someone with years of AWS experience.",
      instructorName: "Edward Viaene",
      instructorImage: "instructor-image.png",
      level: "Expert",
      price: 549,
      originalPrice: 1499,
      imageUrl: "aws-certified-logo.png"
    },
    {
      title: "Edward's AWS Certified Security Specialty Course (SCS-C02)",
      description: "AWS Security Certification Course from someone with years of AWS experience. Covers CloudTrail, GuardDuty, ControlTower! This is a truncated description for large screens.",
      shortDescription: "AWS Security Certification Course from someone with years of AWS experience.",
      instructorName: "Edward Viaene",
      instructorImage: "instructor-image.png",
      level: "Expert",
      price: 549,
      originalPrice: 1499,
      imageUrl: "aws-certified-logo.png"
    },
    {
      title: "Edward's AWS Certified Security Specialty Course (SCS-C02)",
      description: "AWS Security Certification Course from someone with years of AWS experience. Covers CloudTrail, GuardDuty, ControlTower! This is a truncated description for large screens.",
      shortDescription: "AWS Security Certification Course from someone with years of AWS experience.",
      instructorName: "Edward Viaene",
      instructorImage: "instructor-image.png",
      level: "Expert",
      price: 549,
      originalPrice: 1499,
      imageUrl: "aws-certified-logo.png"
    },
    {
      title: "Edward's AWS Certified Security Specialty Course (SCS-C02)",
      description: "AWS Security Certification Course from someone with years of AWS experience. Covers CloudTrail, GuardDuty, ControlTower! This is a truncated description for large screens.",
      shortDescription: "AWS Security Certification Course from someone with years of AWS experience.",
      instructorName: "Edward Viaene",
      instructorImage: "instructor-image.png",
      level: "Expert",
      price: 549,
      originalPrice: 1499,
      imageUrl: "aws-certified-logo.png"
    },
    {
      title: "Edward's AWS Certified Security Specialty Course (SCS-C02)",
      description: "AWS Security Certification Course from someone with years of AWS experience. Covers CloudTrail, GuardDuty, ControlTower! This is a truncated description for large screens.",
      shortDescription: "AWS Security Certification Course from someone with years of AWS experience.",
      instructorName: "Edward Viaene",
      instructorImage: "instructor-image.png",
      level: "Expert",
      price: 549,
      originalPrice: 1499,
      imageUrl: "aws-certified-logo.png"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-gray-900 text-white py-4">
        <h1 className="text-3xl font-bold text-center">All Courses</h1>
      </div>
      <div className="flex flex-1 p-4 bg-gray-100 gap-2">
        <div className="hidden lg:block w-1/4">
          <FilterSidebar />
        </div>
        <div className="w-full lg:w-3/4 flex flex-wrap gap-6 justify-center px-2 lg:px-4">
          {courseData.map((course, index) => (
            <div key={index} className="w-full">
              <CourseCard {...course} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
