import React, { useEffect, useRef } from 'react'
import BlogForm from './components/BlogForm.js'
import LoginForm from './components/LoginForm.js'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Menu from './components/Menu'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUser } from './reducers/loginReducer'
import { initializeBlogs, like, comment } from './reducers/blogReducer'
import { initializeAllUsers } from './reducers/userReducer'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import UserList from './components/UserList'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blog)
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeBlogs())
    dispatch(initializeAllUsers())
  }, [dispatch])

  const userMatch = useRouteMatch('/users/:id')
  const foundUser = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const foundBlog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null

    const handleComment = (event) => {
      event.preventDefault()
      const newComment = event.target.comment.value
      event.target.comment.value = ''
      dispatch(comment(foundBlog, newComment))
    }

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
              <Menu />
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
              <Menu />
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
                      <form onSubmit={handleComment}>
                        <div>
                          <input id="comment" type="text" name="comment" />
                            <button id="comment-button" type="submit">
                            add comment
                          </button>
                        </div>
                      </form>
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
              <Menu />
              <h2>Blogs</h2>
              <Notification />
                <Togglable buttonLabel="Add new blog" ref={blogFormRef}>
                  <div>
                  <BlogForm />
                  </div>
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
            <Menu />
            <h2>Blogs</h2>
            <Notification />
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