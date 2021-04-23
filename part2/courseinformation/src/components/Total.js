import React from 'react';

export const Total = ({ course }) => {
  const total = course.parts.map(part => part.exercises);
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const sum = total.reduce(reducer);
  return (
    <p><strong>Total of exercises {sum}</strong></p>
  );
};

export default Total