import React, { useState } from 'react'

const Blog = (props) => {
  const blog = props.blog
  const [showAll, setShowAll] = useState(false)
  const [blogObject, setBlogObject] = useState(blog)
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
    const updatedBlog = ({
      ...blog,
      likes: blog.likes + 1
    })
    props.updateBlog(updatedBlog)
    setBlogObject(updatedBlog)
  }

  const deleteBlog = () => props.deleteBlog(blog)

  const label = showAll ? 'hide' : 'view'

  return (
    <div id="blog" style={blogStyle}>
      <p><strong>Title:</strong> {blog.title} <br/> Author: {blog.author}{' '}
        <button id='view-button'
          onClick={toggleVis}>{label}</button> <br/></p>
      {showAll ? (
        <div style={showWhenVisible}>
          <p>URL: {blog.url} <br/> Likes: {blog.likes}</p>
          <p>{ blogObject.likes } <button id='likes-button' onClick={addLikes}>like</button></p>
          <button id='remove' onClick={deleteBlog}>delete</button>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}


export default Blog