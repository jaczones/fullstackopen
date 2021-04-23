import React from 'react';

export const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map(part => <div key={part.id}>
        {part.name} {part.exercises}
      </div>
      )}
    </div>
  );
};

export default Content