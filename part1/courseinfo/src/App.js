import React from 'react'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    part: [
      {
      name: 'Fundamentals of React',
      exercises: 10
      },
      {
      name: 'Using props to pass data',
      exercises: 7
      },
      {
      name: 'State of a component',
      exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

const Header = (props) => {
  return (
    <>
      <h1>{props.course.name}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.part} {props.exercise}</p>
    </div>
  )
}
const Content = (props) => {
  return (
    <div>
      <Part part={props.course.part[0].name}  exercise={props.course.part[0].exercises} />
      <Part part={props.course.part[1].name}  exercise={props.course.part[1].exercises} />
      <Part part={props.course.part[2].name}  exercise={props.course.part[2].exercises} />
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises: {props.course.part[0].exercises + props.course.part[1].exercises  + props.course.part[2].exercises }</p>
    </div>
  )
}
export default App