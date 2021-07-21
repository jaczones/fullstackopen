import React from 'react'
const Blog = ({blog}) => (
  <div>
    <strong>Title:</strong> {blog.title} <br></br> Author: {blog.author}
  </div>  
)

export default Blog