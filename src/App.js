import React from 'react'
import { Home } from './views/Home'
import { Login } from './views/Login'
import { MessagingInbox } from './views/MessagingInbox'
import { MessagingSent } from './views/MessagingSent'
import { Profile } from './views/Profile'
import { Route, Routes, Link } from 'react-router-dom'
import { useAuth } from './contexts/AuthProvider'
import { Navbar } from './components/Navbar'





export const App = () => {

  // const { signIn } = createContext( AuthContext )
  const { signIn, currentUser, logOut } = useAuth()

  const handleLogin = (e) => {
    e.preventDefault();
    signIn();
  }

  return (
    <React.Fragment>
      <header>
        <Navbar />
      </header>
      
      <main className='container'>

      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/inbox' element={<MessagingInbox />} />
        <Route exact path='/sent' element={<MessagingSent />} />
        <Route exact path='/profile' element={<Profile />} />
      </Routes>

      </main>

      <footer>

      </footer>

    </React.Fragment>
  )
}














