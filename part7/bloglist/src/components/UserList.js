import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

const User = ({ user }) => {
  return (
  <div>
    <ListGroup>
    <ListGroup.Item><Link to={`/users/${user.id}`}>{user.name}</Link> has {user.blogs.length} blogs </ListGroup.Item>
    </ListGroup>
  </div>
  )
}

const UserList = () => {
  const users = useSelector((state) => state.users)
  return users.map((user) => <User key={user.id} user={user} />)
}

export default UserList