import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthProvider'


export const Navbar = () => {

const { currentUser} = useAuth()
const {signIn, logOut} = useAuth()
  return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
          <a class="pull-left" ><img src="/images/CW.jpeg"/></a> 
          <Link className="navbar-brand" to="/">CryptoWorld</Link>
          <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
              aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>             </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
              <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                  <li className="nav-item active">
                      <Link className="nav-link" to="/">Home <span class="sr-only">(current)</span></Link>
                  </li>
              </ul>
              <ul className="navbar-nav ml auto">
                  {
                      !currentUser.loggedIn
                          ?
                  <li className="nav-item">
                      <Link onClick={ () => signIn() }  to="/" className="nav-link">Login</Link>
                  </li>
                          :
                  <li className="nav-item">
                      <Link to="/profile" className="nav-link">My Profile</Link>
                      <Link onClick={ () => logOut() } to="/" className='nav-link'>Logout</Link>
                  </li>
                  
                  }
              </ul>
          </div>
      </nav>
  )
}
