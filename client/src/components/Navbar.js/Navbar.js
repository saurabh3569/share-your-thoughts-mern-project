import React, { useContext } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const {user} = useContext(AuthContext)

  const LogOut = () => {

    localStorage.clear()
    navigate('/login')

  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Share UR Thoughts</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      </ul>
        <span className="nav-text">
          <Link className="nav-link text-dark" to={`/mypost/${user.username}`}>My Post</Link>
        </span>
        <span className="nav-text">
          <Link className="nav-link text-dark" to="/profile">Profile</Link>
        </span>
        <span className="nav-text">
          <Link className="nav-link text-dark" to="/login" onClick={LogOut}>Log Out</Link>
        </span>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar
