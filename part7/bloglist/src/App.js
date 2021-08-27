import React, { useEffect, useRef } from 'react'
import BlogForm from './components/BlogForm.js'
import LoginForm from './components/LoginForm.js'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUser } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { logout } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeBlogs())
  }, [dispatch])


  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logout())
  }

  return (
    <div>
      <Notification  />
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          {user.name} logged-in <form onSubmit={handleLogout}><button id='logout-button' type='submit'>logout</button></form>
          <br></br>
          <Togglable buttonLabel="Add new blog" ref={blogFormRef}>
            <BlogForm />
          </Togglable>
          <h2>blogs</h2>
          <BlogList />
        </div>
  )}
  </div>
  )
      }

export default App