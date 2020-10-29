import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../context/auth/authContext'
import ContactContext from '../context/contact/contactContext'

const Navbar = ({title}) => {
  const authContext = useContext(AuthContext)
  const contactContext = useContext(ContactContext)

  const { isAuthenticated, logout, user} = authContext
  const { clearContacts } = contactContext

  const onLogout = () => {
    logout()
    clearContacts()
  }


  const authLinks = (
    <>
      <li>Hello { user && user.name}</li>
      <li>
        <a href="/#" onClick={onLogout}>Logout</a>
      </li>
    </>
  )

  const guestLinks = (
    <>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
    </>
  )

  return (
    <div className="navbar bg-primary">
      <h1>
        {title}
      </h1>
      <ul>
        {isAuthenticated ? authLinks : guestLinks}
      </ul>
    </div>
  )
}

Navbar.defaultProps = {
  title: 'Contact Keeper'
}

export default Navbar
