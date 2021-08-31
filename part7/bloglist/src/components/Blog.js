import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { like, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'

const Blog = (props) => {
  const dispatch = useDispatch()
  const blog = props.blog
  const [showAll, setShowAll] = useState(false)
  const showWhenVisible = { display: showAll ? '' : 'none' }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVis = () => {
    setShowAll(!showAll)
  }

  const addLikes = () => {
    dispatch(like(blog))
    dispatch(
      setNotification(`Blog ${blog.title} successfully updated`, 'success', 5)
    )
  }

  const removeBlog = () => {
    dispatch(deleteBlog(blog.id))
    dispatch(
      setNotification(`Blog ${blog.title} successfully deleted`, 'success', 5)
    )
  }

  const label = showAll ? 'hide' : 'view'

  return (
    <div id="blog" style={blogStyle} className='blog'>
      <p><Link to={`/blogs/${blog.id}`}>{blog.title} - {blog.author}</Link>{' '}
        <button id='view-button'
          onClick={toggleVis}>{label}</button> <br/></p>
      {showAll ? (
        <div style={showWhenVisible}>
          <p>URL: {blog.url} <br/> Likes: {blog.likes} <button id='likes-button' onClick={addLikes}>like</button></p>
          <button id='remove' onClick={removeBlog}>delete</button>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}


export default Blog