import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home'
import Footer from './components/Footer'
import Contact from './components/Contact';
import About from './components/About'
import Login from './components/Login';
import SignUp from './components/SignUp';
import Servers from './components/Servers';
import serverService from './services/server';

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedDiscourdUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      serverService.setToken(user.token)
    }
  }, [])

  return (
    <div className='container full-height-grow'>
      <NavBar user={user} setUser={setUser}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path='/login' element={<Login user={user} setUser={setUser} />} />
        <Route path='/signup' element={<SignUp setUser={setUser} />} />
        <Route path="/servers" element={<Servers user={user} setUser={setUser} />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App;
