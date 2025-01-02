import CourseDetails from '../components/CourseDetails';
import CourseAd from '../components/CourseAd';

const courseContent = [
  { title: "Introduction to AWS Certified Security Specialty", duration: "15m" },
  { title: "Understanding CloudTrail", duration: "20m" },
  { title: "Implementing GuardDuty", duration: "30m" },
  // Add more videos as needed
];

const Course = () => {
  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 p-10">
      <CourseDetails
        title="AWS Certified Security Specialty Course"
        description="This course covers various aspects of AWS Security, including CloudTrail, GuardDuty, and ControlTower. It is designed for individuals with prior AWS experience looking to specialize in security."
        level="Expert"
        courseContent={courseContent}
        instructorName="Edward Viaene"
        instructorImage="instructor-image.png"
      />
      <CourseAd />
    </div>
  );
};

export default Course;
