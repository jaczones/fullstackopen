import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { initializeBlogs } from '../reducers/blogReducer'
import { useHistory } from 'react-router-dom'
import { Button } from 'react-bootstrap'


const LoginForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    event.target.username.value = ''
    event.target.password.value = ''
    dispatch(login(username, password))
    dispatch(initializeBlogs())
    history.push('/blogs')
  }

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            id='username'
            type='text'
            name='username'
          />
        </div>
        <div>
          password
          <input
            id='password'
            type='password'
            name='password'
          />
        </div>
        <Button id='login-button' type="submit">login</Button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm