import React, { useEffect, useRef } from 'react'
import BlogForm from './components/BlogForm.js'
import LoginForm from './components/LoginForm.js'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUser, logout } from './reducers/loginReducer'
import { initializeBlogs, like } from './reducers/blogReducer'
import { initializeAllUsers } from './reducers/userReducer'
import { Switch, Route, useHistory, useRouteMatch } from 'react-router-dom'
import UserList from './components/UserList'

const App = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blog)
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

  const userMatch = useRouteMatch('/users/:id')
  const foundUser = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const foundBlog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null

  return (
    <Switch>
      <Route path="/users/:id">
        {user === null ? (
            <div>
              <Notification />
              <LoginForm />
            </div>
          ) : (
            <div>
              <h2>Blogs</h2>
              <Notification />
                <h2>{user.name}</h2>
                <h3>Added blogs</h3>
                {!foundUser ? (
                  null
                ) : (
                  <div>
                    {foundUser.blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
                  </div>
                )}
            </div>
        )}
      </Route>
      <Route path="/blogs/:id">
        {user === null ? (
            <div>
              <Notification />
              <LoginForm />
            </div>
          ) : (
            <div>
              <h2>Blogs</h2>
              <Notification />
                {!foundBlog ? (
                  null
                ) : (
                  <div>
                    <h2>{foundBlog.title}</h2>
                    <p>{foundBlog.url}</p>
                    <p>
                      {foundBlog.likes}{' '}
                      <button onClick={() => like(foundBlog)}>
                        like
                      </button>
                    </p>
                    <p>added by {foundBlog.author}</p>
                  </div>
                )}
            </div>
        )}
      </Route>
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