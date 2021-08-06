import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const VisibilityFilter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    dispatch(filterChange(event.target.value))
}
const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      Filter results: <input onChange={handleChange} placeholder="Start typing..."/>
    </div>
  )
}

export default VisibilityFilter