import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'

const AnecdoteRender = ({ anecdote }) => {
    const dispatch = useDispatch()
    return (
    <div key={anecdote.id}>
      <div>
          {anecdote.content}
      </div>
      <div>
          has {anecdote.votes}
          <button onClick={() => dispatch(voteFor(anecdote.id))}>vote</button>
      </div>
    </div>
    )
}

const AnecdoteSort = () => {
  const anecdotes = useSelector(state => state)
  const sortByVotes = (b1,b2) => b2.votes - b1.votes
  return(
    anecdotes.sort(sortByVotes).map(anecdote => <AnecdoteRender anecdote={anecdote} />)
  )
}

export default AnecdoteSort