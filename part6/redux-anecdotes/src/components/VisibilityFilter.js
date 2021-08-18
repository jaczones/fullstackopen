import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const VisibilityFilter = (props) => {

  const handleChange = (event) => {
    props.filterChange(event.target.value)
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

const mapDispatchToProps = {
  filterChange
}

const ConnectedFilter = connect(null, mapDispatchToProps)(VisibilityFilter)
export default ConnectedFilter