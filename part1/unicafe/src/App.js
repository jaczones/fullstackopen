import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = (props) => {
  return (
    <div>
      <p>Good: {props.good}</p>
      <p>Neutral: {props.neutral}</p>
      <p>Bad: {props.bad}</p>
      <p>All: {props.total}</p>
      <p>Average: {props.average}</p>
      <p>Positive: {props.positive}%</p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [count, setCount] = useState(0)
  const average = (count / total).toFixed(2)
  const positive = (good / total).toFixed(2)

  const handleGoodClick = () => {
    setGood(good + 1)
    setTotal(total + 1)
    setCount(count + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setTotal(total + 1)
    setCount(count - 1 )
  }

  return (
    <div>
      <h1>
      give feedback
    </h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
    <h1>statistics</h1>
    <Statistics good={good} neutral={neutral} bad={bad}
    total={total} average={average} positive={positive} />
    </div>
  )
}

export default App