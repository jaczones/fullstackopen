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
    <div style={blogStyle}>
      <p><strong>Title:</strong> {blog.title} <button onClick={toggleVis}>{label}</button> <br/></p>
      <div style={showWhenVisible}>
        <p>Author: {blog.author} <br/>  URL: {blog.url} <br/> Likes: {blog.likes}</p>
        <p>{ blogObject.likes } <button id='likes-button' onClick={addLikes}>like</button></p>
        <button id='remove' onClick={deleteBlog}>delete</button>
      </div>
    </div>
  )
}


export default Blog