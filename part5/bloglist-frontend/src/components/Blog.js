import React from 'react'
const Blog = ({blog}) => (
  <div>
    <strong>Title:</strong> {blog.title} <br/> Author: {blog.author} <br/>
  </div>  
)

export default Blog