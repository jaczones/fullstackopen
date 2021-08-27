import React, { useEffect, useRef } from 'react'
import BlogForm from './components/BlogForm.js'
import LoginForm from './components/LoginForm.js'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUser, logout } from './reducers/loginReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeAllUsers } from './reducers/userReducer'
import { Switch, Route, useHistory } from 'react-router-dom'
import UserList from './components/UserList'

const App = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector((state) => state.user)
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeBlogs())
    dispatch(initializeAllUsers())
  }, [dispatch])


  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logout())
    history.push('/')
  }

  return (
    <Switch>
      <Route path="/blogs">
        {user === null ? (
            <div>
              <Notification />
              <LoginForm />
            </div>
          ) : (
            <div>
              <h2>Blogs</h2>
              <Notification />
                <p>
                  {user.name} logged in
                  <button onClick={handleLogout} type="submit">
                    logout
                  </button>
                </p>
                <Togglable buttonLabel="Add new blog" ref={blogFormRef}>
                  <BlogForm />
                </Togglable>
                <BlogList />
                <h2>Users</h2>
                <UserList />
            </div>
          )}
      </Route>
      <Route path="/users">
        {user === null ? (
          <div>
            <Notification />
            <LoginForm />
          </div>
        ) : (
          <div>
            <h2>Blogs</h2>
            <Notification />
              <p>
                {user.name} logged in
                <button onClick={handleLogout} type="submit">
                  logout
                </button>
              </p>
              <h2>Users</h2>
              <UserList />
          </div>
        )}
      </Route>
      <Route path="/">
        <Notification />
        <LoginForm />
      </Route>
    </Switch>
  )
}


export default App