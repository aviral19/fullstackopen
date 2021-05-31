import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({course}) => {
    return(
      <div>
        <h1>{course.name}</h1>
      </div>
    )
  }
  
  const Part = ({name, exercises}) => {
    return(
      <div>
        <p>
          {name} {exercises}
        </p>
      </div>
    )
  }
  const Content = ({course}) => {
    return(
      <div>
        {course.parts.map(x => 
        <Part name = {x.name} exercises = {x.exercises}/>
        )}
      </div>
    )
  }
  
  const Total = ({course}) => {
    const total = course.parts.reduce((total,p) => {
      return total + p.exercises
    }, 0)
    return (
      <div>
        <p><b>total of {total} exercises</b></p>
      </div>
    )
  }
  
  const Course = ({course}) => {
    return(
      <div>
          <Header course = {course} />
          <Content course = {course} />
          <Total course = {course} />
      </div>
    )
  }

  export default Course