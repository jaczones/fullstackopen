import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'

const AnecdoteRender = ({ anecdote }) => {
    const dispatch = useDispatch()
    return (
    <div>
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
  const sortByVotes = (a1,a2) => a2.votes - a1.votes
  return(
    anecdotes.sort(sortByVotes).map(anecdote => <AnecdoteRender key={anecdote.id} anecdote={anecdote} />)
  )
}

export default AnecdoteSort