import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = ({title}) => {
  return (
    <div className="navbar bg-primary">
      <h1>
        {title}
      </h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </div>
  )
}

Navbar.defaultProps = {
  title: 'Contact Keeper'
}

export default Navbar
