import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = () => {
  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value
    dispatch(createBlog({
      title: title,
      author: author,
      url: url
    }))
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
    dispatch(
      setNotification(`Blog ${title} successfully created`, 'success', 5)
    )
  }

return (
    <form onSubmit={addBlog}>
      <div>
        Title: <input id='title' name="title" />
      </div>
      <div>
        Author: <input id='author' name="author" />
      </div>
      <div>
        Url: <input id='url' name="url" />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}
BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm