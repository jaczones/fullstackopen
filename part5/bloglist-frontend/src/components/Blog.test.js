import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog component tests', () => {
  let blog = {
    title:'Test Blog',
    author:'Zac',
    url:'https://www.testing.com/',
    likes:8
  }

  const user = {
    username: 'tester',
    name: 'test user',
  }

  let mockHandler = jest.fn()

  let component
  beforeEach(() => {
    component = render(
      <Blog user={user} blog={blog} updateBlog={mockHandler} />
    )
  })

  test('renders title and author', () => {
    expect(component.container).toHaveTextContent(blog.title && blog.author)
    expect(component.container).not.toHaveTextContent(blog.url && blog.likes)
  })

  test('clicking the view button displays url and number of likes', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      'https://www.testing.com/'
    )

    expect(component.container).toHaveTextContent(
      '8'
    )
  })

  test('event handler passed as props is called twice when like button is pressed two times', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})