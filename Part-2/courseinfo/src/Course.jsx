import React from 'react';
import Part from './Part';

const Course = ({ course }) => {
  return (
    <div>
      <h2>{course.name}</h2> 
      {course.parts.map(part => (
        <Part key={part.id} name={part.name} exercises={part.exercises} /> 
      ))}
    </div>
  );
};

export default Course;
