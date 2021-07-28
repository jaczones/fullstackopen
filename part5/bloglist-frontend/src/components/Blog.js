import React, { useState } from 'react'

const Blog = ({blog}) => {
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

  const label = showAll ? 'hide' : 'view'

  return (
    <div style={blogStyle}>
    <p><strong>Title:</strong> {blog.title} <button onClick={toggleVis}>{label}</button> <br/></p>  
    <div style={showWhenVisible}>
    <p>Author: {blog.author} <br/>  URL: {blog.url} <br/> Likes: {blog.likes}</p>
    </div>
    </div>
  )
}


export default Blog