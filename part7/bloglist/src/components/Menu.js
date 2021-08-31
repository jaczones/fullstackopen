import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import { Button, Navbar, Nav, Container } from 'react-bootstrap'

const Menu = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector((state) => state.user)


  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logout())
    history.push('/')
  }

  return (
    <Navbar sticky='top' bg="light" expand="lg">
  <Container>
  <Nav.Link href="/blogs">Blogs</Nav.Link>
  <Nav.Link href="/users">Users</Nav.Link>
    <Navbar.Toggle />
    <Navbar.Collapse className="justify-content-end">
      <Navbar.Text>
        Signed in as: {user.name}
        <Button variant="outline-warning" onClick={handleLogout} type="submit">
        logout
        </Button>
      </Navbar.Text>
    </Navbar.Collapse>
  </Container>
</Navbar>
  )
}

export default Menu