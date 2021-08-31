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
import { Button, ListGroup } from 'react-bootstrap'

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
              <h4>Blogs</h4>
              <Notification />
                <h4>{user.name}</h4>
                <h3>Added blogs</h3>
                {!foundUser ? (
                  null
                ) : (
                  <div>
                    <ListGroup>
                    <ListGroup.Item>{foundUser.blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}</ListGroup.Item>
                    </ListGroup>
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
              <h4>Blogs</h4>
              <Notification />
                {!foundBlog ? (
                  null
                ) : (
                  <div>
                    <h4>{foundBlog.title}</h4>
                    <p>{foundBlog.url}</p>
                    <p>
                      {foundBlog.likes}{' '}
                      <Button onClick={() => like(foundBlog)}>
                        like
                      </Button>
                    </p>
                    <p>added by {foundBlog.author}</p>
                      <form onSubmit={handleComment}>
                        <div>
                          <input id="comment" type="text" name="comment" />
                            <Button id="comment-button" type="submit">
                            add comment
                          </Button>
                        </div>
                      </form>
                      <h3> comments </h3>
                        <ul>
                          {foundBlog.comments.map((comment) => <li key={comment} >{comment}</li>)}
                      </ul>
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
              <h4>Blogs</h4>
              <Notification />
                <Togglable buttonLabel="Add new blog" ref={blogFormRef}>
                  <div>
                  <BlogForm />
                  </div>
                </Togglable>
                <ListGroup>
                <ListGroup.Item><BlogList /></ListGroup.Item>
                </ListGroup>
                <h4>Users</h4>
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
            <Notification />
              <h4>Users</h4>
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