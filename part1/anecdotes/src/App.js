import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const [total, setTotal] = useState(0)
  const randomClick = () => {
    setSelected([Math.floor(Math.random() * anecdotes.length)])
  }
  
  const voteClick = () => {
    const addVotes = [...votes];
    addVotes[selected] += 1;
    setVotes(addVotes);
    setTotal(total + 1);
  }
  
  const findMax = () => {
    let x = 0
    let index = 0
    votes.forEach((value, i) => {
      if (x < value) {
        x = value
        index = i
      }
    })
    if (x > 0){
    return index;
    }
  }
  
  const max = findMax()
  
  const showMax = () => {
    if (total > 0) {
      return "has " + votes[max] + " votes"
    }
  }

  const show = showMax()

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button handleClick={voteClick} text = "vote" />
      <Button handleClick={randomClick} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[max]}</p>
      <p>{show}</p>
    </div>
  )
}

export default App