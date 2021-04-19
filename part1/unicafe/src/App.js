import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistic = (props) => {
  return (
    <div>
      {props.text} {props.value}
    </div>
  )
}

const Statistics = (props) => {
  if (props.total !== 0) {
    return (
    <div>
      <Statistic text="Good:" value={props.good}/>
      <Statistic text="Neutral:" value={props.neutral}/>
      <Statistic text="Bad:" value={props.bad}/>
      <Statistic text="Total:" value={props.total}/>
      <Statistic text="Average:" value={props.average}/>
      <Statistic text="Positive:" value={props.positive}/>
    </div>
    )
  }
  return (
    <div>
      Press a button to show staistics
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