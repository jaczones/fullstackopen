const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'VOTE': 
      const id = action.data.id
      const anecdoteToVote = state.find(n => n.id === id)
      const votedAnecdote = {...anecdoteToVote, votes: anecdoteToVote.votes + 1}
      return state.map(anecdote => anecdote.id === id ? votedAnecdote : anecdote)
    case 'ADD_ANECDOTE':
      return [...state, action.data]
      case 'INIT_ANECDOTES':
        return action.data
    default: 
      return state
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}

export const createAnecdote = (data) => {
  return{
    type: 'ADD_ANECDOTE',
    data
  }
}

export const voteFor = (id) => {
  return{ 
    type: 'VOTE', 
    data: { id } 
  }
}

export default reducer