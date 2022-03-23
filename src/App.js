import React from 'react'
import { Home } from './views/Home'
import { Profile } from './views/Profile'
import { Route, Routes, Link } from 'react-router-dom'
import { useAuth } from './contexts/AuthProvider'
import { Navbar } from './components/Navbar'


export const App = () => {


  return (
    <React.Fragment>
      <header>
        <Navbar />
      </header>
      
      <main>
        
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/profile' element={<Profile />} />
      </Routes>

      </main>

      <footer>

      </footer>

    </React.Fragment>
  )
}














