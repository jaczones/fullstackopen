import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/loginReducer'

const Menu = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector((state) => state.user)

  const padding = {
    paddingRight: 5
  }

  const style = {
    background: 'lightgrey',
    font_size: 20,
    border_style: 'solid',
    border_radius: 5,
    padding: 10,
    margin_bottom: 10
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logout())
    history.push('/')
  }

  return (
    <div style={style}>
        {user.name} is currently logged in {' '}
      <button onClick={handleLogout} type="submit">
        logout
      </button>
      <div>
      <Link to="/blogs" style={padding}>
        blogs
      </Link>
      <Link to="/users" style={padding}>
        users
      </Link>
      </div>
    </div>
  )
}

export default Menu