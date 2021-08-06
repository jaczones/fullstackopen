import React from 'react'
import NewAnecdote from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import VisibilityFilter from './components/VisibilityFilter'
import Notification from './components/Notification'

const App = () => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <VisibilityFilter />
      <AnecdoteList />
      <NewAnecdote />
    </div>
  )
}

export default App