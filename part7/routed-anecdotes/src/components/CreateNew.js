import React, {useState} from 'react'
import  { useField } from '../hooks'
import { useHistory } from 'react-router-dom'

const CreateNew = (props) => {
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')
    const history = useHistory()
  
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })
      const message = `a new anecdote '${content.value}' created`
      props.showNotification(message)
      history.push('/')
    }

    const handleReset = () => {
        content.reset()
        author.reset()
        info.reset()
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...content} />
          </div>
          <div>
            author
            <input {...author}/>
          </div>
          <div>
            url for more info
            <input {...info} />
          </div>
          <button>create</button>
          <button type="reset" onClick={() => handleReset()}>reset</button>
        </form>
      </div>
    )
  
  }
  
export default CreateNew