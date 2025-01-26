import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { singleCourse } from "../store/features/courseSlice";
import CourseDetails from "../components/CourseDetails";
import CourseAd from "../components/CourseAd";
import { useParams } from "react-router-dom";

const Course = () => {
  const { courseId } = useParams();
  const { courses, loading, error } = useSelector((state) => state.course);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(singleCourse(courseId));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const {
    _id,
    thumbnail,
    title,
    level,
    price,
    description,
    instructor,
    curriculum,
  } = courses || {};

  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 p-10">
      <CourseDetails
        id={_id}
        title={title}
        thumbnail={thumbnail}
        price={price}
        description={description}
        level={level}
        courseContent={curriculum}
        instructorName={instructor?.name}
        instructorImage={instructor?.imageUrl}
      />
      <CourseAd id={_id} title={title} price={price} thumbnail={thumbnail} />
    </div>
  );
};

export default Course;
