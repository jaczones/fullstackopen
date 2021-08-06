import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'

const AnecdoteRender = ({ anecdote }) => {
    const dispatch = useDispatch()

    const votedFor = () => {
      dispatch(voteFor(anecdote.id))
      dispatch(addNotification(`You voted for ${anecdote.content}`))
      setTimeout(() => {
        dispatch(addNotification(null))
      }, 5000)
    }
    return (
    <div>
      <div>
          {anecdote.content}
      </div>
      <div>
          has {anecdote.votes}
          <button onClick={votedFor}>vote</button>
      </div>
    </div>
    )
}

const AnecdoteSort = () => {
  const anecdotes = useSelector(({filter, anecdotes}) => {
    if ( filter === null ) {
      return anecdotes
    }
    const regex = new RegExp( filter, 'i' )
    return anecdotes.filter(anecdote => anecdote.content.match(regex))
  })
  const sortByVotes = (a1,a2) => a2.votes - a1.votes
  return(
    anecdotes.sort(sortByVotes).map(anecdote => <AnecdoteRender key={anecdote.id} anecdote={anecdote} />)
  )
}

export default AnecdoteSort